import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { AvatarIcon } from '../../common/icons';

const Header = ({ data }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => goBack()}>
        <Feather name="chevron-left" size={26} color="black" />
      </TouchableOpacity>
      <Text style={styles.name}>
        {data.firstName} {data.lastName}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <AvatarIcon imgSrc={data.userAvatar} size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
