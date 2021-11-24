import { useNavigation } from '@react-navigation/native';
import React from 'react';
import moment from 'moment';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AvatarIcon } from '../../common/icons';
import { styles } from './styles';

const MessageCard = ({ data }) => {
  const { navigate } = useNavigation();
  const { sender, lastMessage, lastMessageDate } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => navigate('Chat Room', { data })}
      style={styles.container}
    >
      <View style={styles.avatar}>
        <AvatarIcon imgSrc={sender.avatarURL} size={64} />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.sender}>
            {sender.firstName} {sender.lastName}
          </Text>
          <Text style={styles.time}>
            {moment(new Date(lastMessageDate.seconds)).format('HH:MM')}
          </Text>
        </View>
        <Text style={styles.lastMessage}>
          {lastMessage.length > 45 ? `${lastMessage.slice(0, 100)}...` : lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
