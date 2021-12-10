import React from 'react';
import { styles } from './styles';
import { Modal, View } from 'react-native';
import { Text } from 'react-native-paper';

const UserListModal = () => {
  return (
    <Modal style={styles.modal} transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <View style={styles.modalTitle}>
            <Text style={styles.cancel}>Cancel</Text>
            <Text style={styles.modalTitleText}>New Message</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserListModal;
