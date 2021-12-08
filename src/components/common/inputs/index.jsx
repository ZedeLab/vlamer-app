import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles as defaultStyles } from './styles';
import theme from '../../../utils/theme';
import { TextInput } from 'react-native-paper';
import { useField } from 'formik';

export const InputText = (props) => {
  const { style, label, error, errorText, ...restProps } = props;
  const [pureFields, meta, helpers] = useField(props);
  const { onBlur, onChange, value, ...field } = pureFields;

  const changeHandler = (newValue) => {
    helpers.setValue(newValue + '');
    !meta.touched && helpers.setTouched(true);
  };

  return (
    <TouchableWithoutFeedback style={defaultStyles.container} onPress={Keyboard.dismiss}>
      <View>
        <TextInput
          dense
          {...field}
          value={value + ''}
          onChangeText={changeHandler}
          error={meta.error && meta.touched}
          activeUnderlineColor={theme.colors.accent}
          label={label}
          {...restProps}
          style={{ ...defaultStyles.textInput, ...style }}
        />
        {meta.error && meta.touched && <Text style={defaultStyles.errorText}> {meta.error} </Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};
