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
} from 'firebase/firestore';
import { useAuth } from './auth';
import { Message } from '../db/models/message';
import { Chat } from '../db/models/chat';
import { uuid } from 'yup';

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
    const { hasPreviousChats, chatId } = await checkIfUsersHavePreviousChats(user);
    if (hasPreviousChats) {
      await fetchMessages(chatId);
      await makeLastMessageSeen(chatId);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  };

  const makeLastMessageSeen = async (chatId) => {
    try {
      await updateDoc(doc(db, 'chats', chatId), {
        hasUnreadMessage: false,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const fetchMessages = async (chatId) => {
    const chatConnectionsRef = collection(db, 'chats', chatId, 'messages');
    const docRef = query(chatConnectionsRef, orderBy('createdAt'));
    try {
      const messages = [];
      const collections = await getDocs(docRef);
      collections.forEach((collectionDoc) => {
        console.log(collectionDoc.data());
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
        chatRoom = await createChatRoom(chatData);
        console.log('result', chatRoom);
      }

      await setDoc(doc(db, 'chats', chatRoom.id, 'messages', messageData.id), messageData);
      await updateDoc(doc(db, 'chats', chatRoom.id), {
        lastMessage: message,
        lastMessageDate: messageData.createdAt,
        lastMessageSender: user.id,
      });
      setMessages([...messages, messageData]);
    } catch (err) {
      console.log(err);
    }
  };

  const createChatRoom = async (data) => {
    const chatData = {
      id: uuid(),
      members: [user.id, data.sender.id],
    };
    const chat = new Chat(chatData).__validate();
    const result = await setDoc(db, 'chats', chat.id, chat);
    return result;
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
    let chatId = '';
    const hasPreviousChats =
      Boolean(account.chats) &&
      allChats.some(({ id, members }) => {
        if (members.includes(account.id) && members.includes(user.id)) {
          chatId = id;
        }
        return members.includes(account.id) && members.includes(user.id);
      });
    return { hasPreviousChats, chatId };
  };

  const fetchChatById = async (chatId) => {
    const chatRef = doc(db, 'chats', chatId);
    return await getDoc(chatRef).then(async (snapshot) => {
      if (snapshot.exists) {
        const chat = await snapshot.data();
        const senderId = await getSenderId(chat);
        const senderData = await getSenderProfile(senderId);
        return {
          ...chat,
          sender: { ...senderData },
        };
      }
    });
  };

  const getSenderId = (chat) => {
    return chat.members.filter((id) => {
      return id !== user.id;
    })[0];
  };

  const getSenderProfile = async (senderId) => {
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
      console.log(snapshot);
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
    return chats;
  };

  return {
    getUserChats,
    sendMessage,
    initiateChat,
    messages,
  };
};

export default useChat;
