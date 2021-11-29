import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../../services/auth';
import theme from '../../../utils/theme';
import { styles } from './styles';

const MessageBubble = ({ data }) => {
  const { user } = useAuth();
  const isSentByMe = data.senderId === user.id;
  return (
    <View
      style={{
        alignSelf: isSentByMe ? 'flex-end' : 'flex-start',
        backgroundColor: isSentByMe ? '#e7eaed' : theme.colors.divider,
        ...styles.message,
      }}
    >
      <Text>{data.message}</Text>
    </View>
  );
};

export default MessageBubble;
