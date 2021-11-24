import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import ChatListHeader from '../../sections/chatListHeader';
import MessageCard from '../../sections/messageCard';
import dummyData from '../../../utils/__mock__/users.json';
import useChat from '../../../services/chat';

export default () => {
  const [chats, setChats] = useState([...dummyData, ...dummyData]);
  const { chatsAll, getUserChats } = useChat();

  return (
    <View style={styles.container}>
      <ChatListHeader />
      <View style={styles.chatList}>
        <FlatList
          data={chats}
          renderItem={({ item }) => {
            return <MessageCard data={item} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
