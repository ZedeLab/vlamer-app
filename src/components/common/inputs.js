import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import theme from "../../utils/theme";

export const InputText = (props) => {
  const { style, label, children, ...restProps } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.label}> {label} </Text>
        <TextInput
          keyboardType='ascii-capable'
          {...restProps}
          underlineColorAndroid='transparent'
          style={{ ...defaultStyles.textInput, ...style }}
        >
          {children}
        </TextInput>
      </View>
    </TouchableWithoutFeedback>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing(1),
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  textInput: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.colors.paper,
    marginBottom: theme.spacing(1),
    borderColor: "transparent",
    borderWidth: theme.spacing(0.01),
    borderRadius: theme.spacing(0.5),
    fontSize: theme.spacing(0.8),
    fontFamily: "openSans",
  },
  label: {
    marginBottom: theme.spacing(0.5),
    color: theme.colors.textPrimary,
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.spacing(0.8),
    fontFamily: "openSans",
  },
});
