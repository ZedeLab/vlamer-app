import React, { useState } from 'react';
import firebaseApp from '../utils/firebase';
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
} from 'firebase/firestore';
import { useAuth } from './auth';
import { Message } from '../db/models/message';
import { Chat } from '../db/models/chat';
import { v4 as uuid } from 'uuid';

const useChat = () => {
  const { user } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const db = getFirestore(firebaseApp);
  const [messages, setMessages] = useState([]);

  const initiateChat = async (account) => {
    const userRef = doc(db, 'users', account.id);
    let user = {};
    await getDoc(userRef).then((snapshot) => {
      if (snapshot.exists) {
        user = snapshot.data();
      }
    });
    const { hasPreviousChats, chat } = await checkIfUsersHavePreviousChats(user);

    if (hasPreviousChats) {
      await fetchMessages(chat.id);
      await makeLastMessageSeen(chat);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
      return [];
    }
  };

  const makeLastMessageSeen = async (chat) => {
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

  const fetchMessages = async (chatId) => {
    const chatConnectionsRef = collection(db, 'chats', chatId, 'messages');
    const docRef = query(chatConnectionsRef, orderBy('createdAt'));
    try {
      const messages = [];
      const collections = await getDocs(docRef);
      collections.forEach((collectionDoc) => {
        messages.push({ id: collectionDoc.id, ...collectionDoc.data() });
      });
      setMessages(messages);
      return [messages, null];
    } catch (error) {
      return [null, error];
    }
  };

  const sendMessage = async (message, chatData) => {
    let chatRoom = chatData;
    // this will be moved to the model.{ message, senderId: user.id }
    const messageObj = { message, senderId: user.id, ...Message.getDefaultMessageValue() };
    const messageData = await new Message(messageObj).__validate();

    try {
      if (isFirstTime) {
        chatRoom = await createChatRoom(message, chatData);
      }

      await setDoc(doc(db, 'chats', chatRoom.id, 'messages', messageData.id), messageData);
      await updateDoc(doc(db, 'chats', chatRoom.id), {
        lastMessage: message,
        lastMessageDate: messageData.createdAt,
        lastMessageSender: user.id,
        hasUnreadMessage: true,
      });
      setMessages([...messages, messageData]);
    } catch (err) {
      console.log(err);
    }
  };

  const createChatRoom = async (message, data) => {
    try {
      const chatData = {
        id: uuid(),
        members: [user.id, data.receiver.id],
        lastMessage: message,
        lastMessageDate: new Date(),
        lastMessageSender: user.id,
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

  // two cases here... either the logged in user have previously contacted the account or not.
  const checkIfUsersHavePreviousChats = async (account) => {
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

  const fetchChatById = async (chatId) => {
    const chatRef = doc(db, 'chats', chatId);
    return await getDoc(chatRef).then(async (snapshot) => {
      if (snapshot.exists) {
        const chat = await snapshot.data();
        const senderId = await getSenderId(chat);
        const messageReceiverData = await getMessageReceiverData(senderId);
        return {
          ...chat,
          receiver: { ...messageReceiverData },
        };
      }
    });
  };

  const getSenderId = (chat) => {
    return chat.members.filter((id) => {
      return id !== user.id;
    })[0];
  };

  const getMessageReceiverData = async (senderId) => {
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

  const getUserChats = async () => {
    const userRef = doc(db, 'users', user.id);
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
    let chats = [];
    for (const id of userChatIds) {
      const result = await fetchChatById(id);
      chats.push(result);
    }
    return chats.sort((a, b) => a.lastMessageDate < b.lastMessageDate);
  };

  return {
    getUserChats,
    sendMessage,
    initiateChat,
    messages,
  };
};

export default useChat;
