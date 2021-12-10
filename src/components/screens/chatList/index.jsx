import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import ChatListHeader from '../../sections/chatListHeader';
import MessageCard from '../../sections/messageCard';
import { Searchbar } from 'react-native-paper';
import { useChat } from '../../../services/chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserListModal from './userListModal';

export default () => {
  const [showSearch, toggleSearch] = useState(false);
  const [showUserListModal, toggleModal] = useState(true);
  const { chats } = useChat();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ChatListHeader showSearch={showSearch} onNewMessageButtonClick={toggleModal} />
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
        {showUserListModal && <UserListModal />}
      </SafeAreaView>
    </View>
  );
};
