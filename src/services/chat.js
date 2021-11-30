import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserChats, initiateChat, sendMessage as sendMessageQuery } from '../db/queries/chat';
import { notifyError } from '../store/errors';
import { useAuth } from './auth';

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  // messages of the currently opened chat room
  const [messages, setMessages] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    //TODO: initial new message fetch here.
  }, []);

  const fetchChats = async () => {
    const { data, error } = await getUserChats(user);
    if (data) {
      setChats(data);
    } else {
      dispatch(
        notifyError({
          type: 'chat',
          message: "Couldn't load messages. Please try again",
        })
      );
    }
  };

  const initiateChatRoom = async (chatData) => {
    const { data, error } = await initiateChat(user, chatData);
    if (data) {
      setIsFirstTime(data.isFirstTime);
      setMessages(data.messages);
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
        fetchChats,
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
