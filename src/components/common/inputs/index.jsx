import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles as defaultStyles } from './styles';
import theme from '../../../utils/theme';

export const InputText = (props) => {
  const { style, label, children, value, ...restProps } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.label}> {label} </Text>
        <TextInput
          {...restProps}
          underlineColorAndroid="transparent"
          style={{ ...defaultStyles.textInput, ...style }}
          value={value + ''}
        >
          {children}
        </TextInput>
      </View>
    </TouchableWithoutFeedback>
  );
};
