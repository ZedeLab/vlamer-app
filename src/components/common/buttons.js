import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../../utils/theme";

export const PrimaryButton = ({ style, children, ...restProps }) => {
  return (
    <TouchableOpacity
      mode='contained'
      {...restProps}
      style={{ ...style, ...defaultStyles.primaryButton }}
    >
      <Text style={defaultStyles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  primaryButton: {
    alignSelf: "center",
    width: "50%",
    elevation: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.spacing(1),
    paddingVertical: theme.spacing(0.7),
    borderColor: theme.colors.primary,

    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    ...theme.shadows[2],
  },
  buttonText: {
    fontFamily: "openSans",
    fontSize: 15,
    letterSpacing: 2,
    color: "#fff",

    alignSelf: "center",
    textTransform: "capitalize",
  },
});
