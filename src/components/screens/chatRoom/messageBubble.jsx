import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../../utils/theme';
import { styles } from './styles';

const MessageBubble = ({ data }) => {
  return (
    <View
      style={{
        alignSelf: data.received ? 'flex-start' : 'flex-end',
        backgroundColor: data.received ? theme.colors.divider : '#e7eaed',
        ...styles.message,
      }}
    >
      <Text>{data.message}</Text>
    </View>
  );
};

export default MessageBubble;
