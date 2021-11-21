import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AvatarIcon } from '../../common/icons';
import { styles } from './styles';

const MessageCard = ({ data }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => navigate('Chat Room', { data })}
      style={styles.container}
    >
      <View style={styles.avatar}>
        <AvatarIcon imgSrc={data.userAvatar} size={64} />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.sender}>
            {data.firstName} {data.firstName}
          </Text>
          <Text style={styles.time}>11:00</Text>
        </View>
        <Text style={styles.message}>
          {data.bio.length > 45 ? `${data.bio.slice(0, 100)}...` : data.bio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
