import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { useAuth } from '../../../services/auth';
import theme from '../../../utils/theme';
import { AvatarIcon } from '../../common/icons';
import { styles } from './styles';

const MessageCard = ({ data }) => {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { lastMessage, receiver, lastMessageSender } = data;

  const hasUnreadMessage = data.hasUnreadMessage && user.id !== lastMessageSender;

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => navigate('Chat Room', { data })}
      style={styles.container}
    >
      <View style={styles.avatar}>
        <AvatarIcon imgSrc={receiver.avatarURL} size={64} />
      </View>
      <View style={styles.content}>
        <View style={styles.subContent}>
          <Text
            style={{
              ...styles.receiver,
              fontFamily: hasUnreadMessage ? 'openSans-bold' : 'openSans',
            }}
          >
            {receiver.firstName} {receiver.firstName}
          </Text>
          <Text style={{ ...styles.message, fontWeight: hasUnreadMessage ? 'bold' : 'normal' }}>
            {lastMessage.length > 45 ? `${lastMessage.slice(0, 100)}...` : lastMessage}
          </Text>
        </View>
        <View style={styles.rightContent}>
          {hasUnreadMessage && <Badge style={{ backgroundColor: theme.colors.accent }}></Badge>}
          <Text style={{ ...styles.time, marginTop: hasUnreadMessage ? 12 : 0 }}>11:00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
