import React, { Component, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import ChatListHeader from '../../sections/chatListHeader';
import MessageCard from '../../sections/messageCard';
import { Searchbar } from 'react-native-paper';
import { useChat } from '../../../services/chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserListModal from './userListModal';
import { useUserConnections } from '../../../services/userConnectionsAccess';
import { useAuth } from '../../../services/auth';

export default () => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showUserListModal, toggleModal] = useState(false);
  const { getFullConnections } = useUserConnections();
  const { user } = useAuth();
  const { chats } = useChat();

  useEffect(() => {
    const fetchConnections = async () => {
      const acceptedUsers = getFullConnections(user);
      setAllFollowers(acceptedUsers);
      setSearchedUsers(acceptedUsers);
    };
    fetchConnections();
  }, []);

  const searchUser = (value) => {
    setSearchText(value);
    const users = allFollowers.filter((item) => {
      const user = item.__eventOwnerAccountSnapshot;
      const name = `${user.firstName} ${user.lastName}`;
      return name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchedUsers(users);
  };

  const closeModal = () => {
    setSearchedUsers(allFollowers);
    setSearchText('');
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ChatListHeader onNewMessageButtonClick={toggleModal} />
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
        {showUserListModal && (
          <UserListModal
            searchText={searchText}
            setSearchText={setSearchText}
            searchUser={searchUser}
            users={searchedUsers}
            toggleModal={closeModal}
          />
        )}
      </SafeAreaView>
    </View>
  );
};
