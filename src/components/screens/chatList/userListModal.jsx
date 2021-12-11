import React from 'react';
import { styles } from './styles';
import { Modal, View } from 'react-native';
import { Avatar, Searchbar, Text } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const UserListModal = ({ toggleModal, users, searchText, searchUser }) => {
  const { navigate } = useNavigation();
  return (
    <Modal animationType={'slide'} style={styles.modal} transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderTitle}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Message</Text>
            <View />
          </View>
          <Searchbar
            value={searchText}
            onChangeText={(value) => searchUser(value)}
            inputStyle={{ fontSize: 14 }}
            placeholder="Search..."
            style={styles.searchbar}
          />
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => {
            const user = item.__eventOwnerAccountSnapshot;
            return (
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  navigate('Chat Room', { data: { receiver: user } });
                }}
              >
                <View style={styles.user}>
                  <Avatar.Image
                    size={46}
                    source={{
                      uri: 'https://basaschools.co.za/wp-content/uploads/2021/04/boy-avator.png',
                    }}
                  />
                  <Text style={styles.name}>
                    {user.firstName} {user.lastName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default UserListModal;
