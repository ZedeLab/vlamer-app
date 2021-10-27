import React from "react";
import { StyleSheet, TextInput } from "react-native";

export const InputText = (props) => {
  const { style, children, ...restProps } = props;
  return (
    <TextInput
      //   inlineImageLeft={<TextInput.Icon name='eye' />}
      mode='outlined'
      placeholder=''
      autoComplete='password'
      {...restProps}
      style={{ ...defaultStyles.textInput, ...style }}
    >
      {children}
    </TextInput>
  );
};

const defaultStyles = StyleSheet.create({
  textInput: {
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    fontFamily: "courier-prime",
  },
});
