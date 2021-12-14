import React, { useState } from 'react';
import { styles } from './styles';
import { Modal, View, TextInput } from 'react-native';
import { Avatar, Button, Divider, Searchbar, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../../services/auth';
import { VlamMainSection } from '../../sections/cards/VlamPostCard';
import { createComment } from '../../../db/queries/vlam/comments';
import { IN_APP_NOTIFICATION_TYPES, useToast } from '../../../services/toast';

const CommentModal = ({ vlam, toggleModal }) => {
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const sendReply = async () => {
    const { data, error } = await createComment(vlam, comment, user);
    if (data) {
      setComment('');
      toggleModal();
      toast.show({
        show: true,
        message: 'Comment sent',
        type: IN_APP_NOTIFICATION_TYPES.SUCCESS,
      });
    } else {
      toast.show({
        show: true,
        message: 'Something went wrong, Please try again.',
        type: IN_APP_NOTIFICATION_TYPES.FAILURE,
      });
    }
  };

  const vlamOwner = vlam.__ownerAccountSnapShot;
  return (
    <Modal animationType={'slide'} style={styles.modal} transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendReply}>
            <Button
              disabled={comment.length > 0}
              labelStyle={styles.buttonTextStyle}
              style={styles.replyButton}
            >
              Reply
            </Button>
          </TouchableOpacity>
        </View>
        <View style={styles.vlamContentWrapper}>
          <View style={styles.vlamHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar.Image
                size={46}
                source={{
                  uri: vlamOwner.avatarURL,
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ ...styles.text, fontFamily: 'openSans-bold' }}>
                  {vlamOwner.firstName} {vlamOwner.lastName}
                </Text>
                <Text style={{ ...styles.greyText, marginTop: 2, color: 'gray' }}>
                  @{vlamOwner.username}
                </Text>
                <Text style={{ ...styles.greyText }}>{vlam.createdAt}</Text>
              </View>
            </View>
          </View>
          <View style={styles.vlamContent}>
            <Divider />
            <Text style={styles.vlamMessage}>{vlam.message}</Text>
            <View style={styles.vlamDetails}>
              <VlamMainSection data={vlam} />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.commentWritingSection}>
          <Avatar.Image
            size={40}
            source={{
              uri: user.avatarURL,
            }}
          />
          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            caretHidden={false}
            keyboardType="default"
            underlineColorAndroid="transparent"
            underlineColor="transparent"
            style={styles.input}
            placeholderTextColor={'#969191'}
            placeholder="Write your comment..."
            activeUnderlineColor="transparent"
            multiline
            value={comment}
            onChangeText={(value) => {
              setComment(value);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
