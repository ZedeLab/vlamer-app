import React, { useState, useEffect } from 'react';
import firebaseApp from '../utils/firebase';
import { doc, collection, getDoc, getFirestore } from 'firebase/firestore';
import { useAuth } from './auth';

const useChat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    getUserChats();
  }, []);

  const fetchChatsById = async (chatId) => {
    const chatRef = doc(db, 'chats', chatId);
    return await getDoc(chatRef).then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.data();
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
    userChatIds.forEach((id) => {
      fetchChatsById(id).then((res) => {
        chats = [...chats, res];
      });
    });
    setChats(chats);
  };

  const sendMessage = () => {};

  return {
    chatsAll: chats,
    getUserChats,
    sendMessage,
  };
};

export default useChat;
