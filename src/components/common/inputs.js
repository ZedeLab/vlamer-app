import React from "react";
import { StyleSheet, TextInput } from "react-native";
import theme from "../../utils/theme";

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
    margin: theme.spacing(1),
    padding: theme.spacing(0.7),

    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: theme.spacing(0.01),
    borderRadius: theme.spacing(1),
    fontSize: 16,
    fontFamily: "courier-prime",
  },
});
