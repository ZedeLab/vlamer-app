import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const ChatListHeader = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <Feather name="chevron-left" size={26} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Chats</Text>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="search" size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatListHeader;
