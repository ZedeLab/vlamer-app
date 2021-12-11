import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  checkForIncomingMessages,
  getMessageReceiverData,
  getSenderId,
  getUserChats,
  initiateChat,
  sendMessage as sendMessageQuery,
} from '../db/queries/chat';
import { notifyError } from '../store/errors';
import { useAuth } from './auth';
import _ from 'lodash';

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  // const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);

  useEffect(async () => {
    let unsubscribe = null;
    const listenToMessages = async () => {
      const { data, error } = await checkForIncomingMessages(user.id);

      if (data) {
        const { eventHandler, docRef } = data;
        let allChats = [];
        let modifiedChat = {};
        unsubscribe = eventHandler(docRef, (querySnapshot) => {
          querySnapshot.docChanges().forEach(async (change) => {
            let chat = change.doc.data();
            if (chat) {
              const receiverId = await getSenderId(user, chat);
              const messageReceiverProfile = await getMessageReceiverData(receiverId);
              modifiedChat = { ...change.doc.data(), receiver: messageReceiverProfile };
              if (chat.lastMessageSender !== user.id) {
                setMessages([
                  ...messages,
                  {
                    createdAt: chat.lastMessageDate,
                    message: chat.lastMessage,
                    id: chat.lastMessageId,
                    senderId: chat.lastMessageSender,
                  },
                ]);
              }
            }
          });
          querySnapshot.docs.forEach(async (doc) => {
            let chat = doc.data();
            const receiverId = await getSenderId(user, chat);
            const messageReceiverProfile = await getMessageReceiverData(receiverId);
            modifiedChat = { ...change.doc.data(), receiver: messageReceiverProfile };
            if (chat.lastMessageSender !== user.id) {
              setMessages([
                ...messages,
                {
                  createdAt: chat.lastMessageDate,
                  message: chat.lastMessage,
                  id: chat.lastMessageId,
                  senderId: chat.lastMessageSender,
                },
              ]);
            }
          }
        });
        querySnapshot.docs.forEach(async (doc) => {
          let chat = doc.data();
          const receiverId = await getSenderId(user, chat);
          const messageReceiverProfile = await getMessageReceiverData(receiverId);
          allChats.push({ ...chat, receiver: messageReceiverProfile });
          const result = await cleanUpChatsArray(allChats, modifiedChat);
          setChats(result);
        });
      });
    }
    listenToMessages();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user]);

  const cleanUpChatsArray = (allChats, modifiedChat) => {
    let result = allChats
      .map((item) => {
        if (item.id === modifiedChat.id) return modifiedChat;
        return item;
      })
      .sort((a, b) => a.lastMessageDate < b.lastMessageDate);
    return _.uniqBy(result, (item) => item.id);
  };

  const initiateChatRoom = async (chatData) => {
    const { data, error } = await initiateChat(user, chatData);
    if (data) {
      setIsFirstTime(data.isFirstTime);
      setMessages(data.messages);
      return data.chat;
    } else {
      dispatch(
        notifyError({
          type: 'chat',
          message: "Couldn't load messages. Please try again",
        })
      );
    }
  };

  const sendMessage = async (message, chatData) => {
    const { data, error } = await sendMessageQuery(user, message, { ...chatData, isFirstTime });
    if (data) {
      setMessages([...messages, data]);
    } else {
      dispatch(
        notifyError({
          type: 'chat',
          message: "Couldn't send message. Please try again.",
        })
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        initiateChat: initiateChatRoom,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
