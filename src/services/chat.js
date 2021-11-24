import React, { useState, useEffect } from 'react';
import firebaseApp from '../utils/firebase';
import { doc, collection, getDoc, getFirestore } from 'firebase/firestore';
import { useAuth } from './auth';

const useChat = () => {
  // const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const db = getFirestore(firebaseApp);

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
      if (snapshot.exists) {
        userChatIds = snapshot.data().chats;
      }
    });
    let chats = [];
    for (const id of userChatIds) {
      const result = await fetchChatById(id);
      chats.push(result);
    }
    return chats;
  };

  const sendMessage = () => {};

  return {
    getUserChats,
    sendMessage,
  };
};

export default useChat;
