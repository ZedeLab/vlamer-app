import React from 'react';
import { styles } from './styles';
import { Modal, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const UserListModal = ({ toggleModal, users }) => {
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
            inputStyle={{ fontSize: 14 }}
            placeholder="Search..."
            style={styles.searchbar}
          />
        </View>
        <FlatList data={users} />
      </View>
    </Modal>
  );
};

export default UserListModal;
