import React, { Component, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import ChatListHeader from '../../sections/chatListHeader';
import MessageCard from '../../sections/messageCard';
import dummyData from '../../../utils/__mock__/users.json';
import { Searchbar } from 'react-native-paper';

export default () => {
  const [chats, setChats] = useState([...dummyData, ...dummyData]);
  const [showSearch, toggleSearch] = useState(true);
  return (
    <View style={styles.container}>
      <ChatListHeader showSearch={showSearch} toggleSearch={toggleSearch} />
      {showSearch && (
        <Searchbar placeholder="Search..." style={{ paddingLeft: 8, shadowOpacity: 0.04 }} />
      )}
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
