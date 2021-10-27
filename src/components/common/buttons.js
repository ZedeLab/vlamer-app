import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

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
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,

    borderColor: "#009688",
    borderWidth: 1,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: "courier-prime",
    fontSize: 15,
    letterSpacing: 2,
    color: "#fff",

    alignSelf: "center",
    textTransform: "capitalize",
  },
});
