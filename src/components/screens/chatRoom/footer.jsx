import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../../utils/theme';
import { styles } from './styles';

const Footer = ({ onSend, onTyping, message }) => (
  <View style={styles.footer}>
    <TouchableOpacity>
      <Entypo name="attachment" size={22} color="black" />
    </TouchableOpacity>
    <TextInput
      keyboardType="ascii-capable"
      underlineColorAndroid="transparent"
      underlineColor="transparent"
      style={styles.input}
      placeholder="type something..."
      activeUnderlineColor="transparent"
      multiline
      value={message}
      onChangeText={onTyping}
    />
    <TouchableOpacity onPress={onSend}>
      <MaterialCommunityIcons
        style={styles.sendIcon}
        name="send-circle"
        size={42}
        color={theme.colors.accent}
      />
    </TouchableOpacity>
  </View>
);

export default Footer;
