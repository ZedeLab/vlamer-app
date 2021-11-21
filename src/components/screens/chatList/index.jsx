import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import ChatListHeader from '../../sections/chatListHeader';
import MessageCard from '../../sections/messageCard';
import dummyData from '../../../utils/__mock__/users.json';

export default () => {
  const [chats, setChats] = useState([...dummyData, ...dummyData]);
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
