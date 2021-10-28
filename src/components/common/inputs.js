import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../utils/theme";

export const InputText = (props) => {
  const { style, label, children, ...restProps } = props;
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.label}> {label} </Text>
      <TextInput
        autoComplete='password'
        {...restProps}
        style={{ ...defaultStyles.textInput, ...style }}
      >
        {children}
      </TextInput>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing(1),
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
    color: theme.colors.textDisabled,
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.spacing(0.8),
    fontFamily: "openSans",
  },
});
