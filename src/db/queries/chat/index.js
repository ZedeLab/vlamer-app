import firebaseApp from '../../../utils/firebase';
import {
  doc,
  collection,
  getDoc,
  getFirestore,
  getDocs,
  query,
  orderBy,
  startAt,
  updateDoc,
  setDoc,
  arrayUnion,
  where,
  collectionGroup,
  onSnapshot,
} from 'firebase/firestore';
import { Message } from '../../models/message';
import { v4 as uuid } from 'uuid';

export const checkForIncomingMessages = async (userId) => {
  try {
    const db = getFirestore(firebaseApp);
    const chatsRef = collectionGroup(db, 'chats');
    const docRef = query(chatsRef, where('members', 'array-contains', userId));

    const snapShotObj = {
      docRef: docRef,
      eventHandler: onSnapshot,
    };
    return {
      data: snapShotObj,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

/**********************************************/
export const initiateChat = async (currentUser, account) => {
  try {
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, 'users', account.id);
    let user = {};
    await getDoc(userRef).then((snapshot) => {
      if (snapshot.exists) {
        user = snapshot.data();
      }
    });

    const { hasPreviousChats, chat } = await checkIfUsersHavePreviousChats(currentUser, user);
    let messages = [];
    if (hasPreviousChats) {
      messages = await fetchMessages(chat.id);
      await makeLastMessageSeen(currentUser, chat);
      return { data: { isFirstTime: false, messages }, error: null };
    } else {
      return { data: { isFirstTime: true, messages }, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

// two cases here... either the logged in user have
// previously contacted the account or not.
export const checkIfUsersHavePreviousChats = async (currentUser, account) => {
  const db = getFirestore(firebaseApp);
  const user = currentUser;
  const chatSnapshot = await getDocs(collection(db, 'chats'));
  let allChats = [];
  chatSnapshot.forEach((doc) => {
    if (doc.exists()) {
      allChats.push(doc.data());
    }
  });
  let chat = {};
  const hasPreviousChats =
    Boolean(account.chats) &&
    allChats.some((data) => {
      const { members, id } = data;
      if (members.includes(account.id) && members.includes(user.id)) {
        chat = data;
      }
      return members.includes(account.id) && members.includes(user.id);
    });
  return { hasPreviousChats, chat };
};

export const makeLastMessageSeen = async (user, chat) => {
  const db = getFirestore(firebaseApp);
  if (chat.lastMessageSender !== user.id) {
    try {
      await updateDoc(doc(db, 'chats', chat.id), {
        hasUnreadMessage: false,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};

export const fetchMessages = async (chatId) => {
  const db = getFirestore(firebaseApp);
  const chatConnectionsRef = collection(db, 'chats', chatId, 'messages');
  const docRef = query(chatConnectionsRef, orderBy('createdAt'));
  try {
    const messages = [];
    const collections = await getDocs(docRef);
    collections.forEach((collectionDoc) => {
      messages.push({ id: collectionDoc.id, ...collectionDoc.data() });
    });
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};
/******************************************************* */

/******************* Functions triggered when sending a message ********/
export const sendMessage = async (user, message, chatData) => {
  const db = getFirestore(firebaseApp);
  let chatRoom = chatData;
  const messageObj = { message, senderId: user.id, ...Message.getDefaultMessageValue() };
  const messageData = await new Message(messageObj).__validate();

  try {
    if (chatData.isFirstTime) {
      chatRoom = await createChatRoom(user, messageData, chatData);
    }

    await setDoc(doc(db, 'chats', chatRoom.id, 'messages', messageData.id), messageData);
    await updateDoc(doc(db, 'chats', chatRoom.id), {
      lastMessage: message,
      lastMessageId: messageData.id,
      lastMessageDate: messageData.createdAt,
      lastMessageSender: user.id,
      hasUnreadMessage: true,
    });
    return { data: messageData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createChatRoom = async (user, message, data) => {
  const db = getFirestore(firebaseApp);
  //   const { user } = useAuth();
  try {
    const chatData = {
      id: uuid(),
      members: [user.id, data.receiver.id],
      lastMessage: message.message,
      lastMessageDate: new Date(),
      lastMessageSender: user.id,
      lastMessageId: message.id,
      createdAt: new Date(),
      hasUnreadMessage: true,
    };
    await updateDoc(doc(db, 'users', user.id), {
      chats: arrayUnion(chatData.id),
    });
    await updateDoc(doc(db, 'users', data.receiver.id), {
      chats: arrayUnion(chatData.id),
    });
    // const chat = await new Chat(chatData).__validate();
    await setDoc(doc(db, 'chats', chatData.id), chatData);
    return chatData;
  } catch (err) {
    console.log('error here', err);
  }
};

/******************************************/

/*****  Functions to fetch user chats*****/

export const getUserChats = async (user) => {
  const db = getFirestore(firebaseApp);

  try {
    let userChatIds = await getUserChatIds(user.id);
    let chats = [];
    for (const id of userChatIds) {
      const result = await fetchChatById(user, id);
      chats.push(result);
    }
    chats = chats.sort((a, b) => a.lastMessageDate < b.lastMessageDate);
    return { data: chats, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
};

export const getUserChatIds = async (userId) => {
  const db = getFirestore(firebaseApp);
  const userRef = doc(db, 'users', userId);
  try {
    let userChatIds = [];
    await getDoc(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.data().chats) {
          userChatIds = snapshot.data().chats;
        } else {
          return [];
        }
      }
    });
    return userChatIds;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchChatById = async (user, chatId) => {
  const db = getFirestore(firebaseApp);
  const chatRef = doc(db, 'chats', chatId);
  return await getDoc(chatRef).then(async (snapshot) => {
    if (snapshot.exists) {
      const chat = await snapshot.data();
      const senderId = await getSenderId(user, chat);
      const messageReceiverData = await getMessageReceiverData(senderId);
      return {
        ...chat,
        receiver: { ...messageReceiverData },
      };
    }
  });
};

export const getSenderId = (user, chat) => {
  return chat.members.filter((id) => {
    return id !== user.id;
  })[0];
};

export const getMessageReceiverData = async (senderId) => {
  const db = getFirestore(firebaseApp);
  const userRef = doc(db, 'users', senderId);
  return await getDoc(userRef).then((snapshot) => {
    if (snapshot.exists) {
      const { id, firstName, lastName, avatarURL } = snapshot.data();
      return {
        id,
        firstName,
        lastName,
        avatarURL,
      };
    }
  });
};

/*************************************/
