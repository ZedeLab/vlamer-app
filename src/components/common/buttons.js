import React from "react";
import { StyleSheet, TouchableHighlight, Text, View } from "react-native";
import { Button } from "react-native-paper";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";

export const PrimaryButton = ({ style, children, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{
        ...style,
        ...defaultStyles.button,
        ...defaultStyles.primaryButton,
      }}
    >
      <Text style={defaultStyles.buttonText}>{children}</Text>
    </TouchableHighlight>
  );
};

export const FacebookLoginButton = ({ style, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.facebook }}
    >
      <View style={defaultStyles.buttonContent}>
        <Ionicons size={20} style={defaultStyles.icon} name='logo-facebook' />
        <Text style={defaultStyles.buttonText}>Login with Facebook</Text>
      </View>
    </TouchableHighlight>
  );
};

export const GoogleLoginButton = ({ style, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.google }}
    >
      <View style={defaultStyles.buttonContent}>
        <Ionicons
          size={20}
          style={defaultStyles.icon_dark}
          name='logo-google'
        />
        <Text style={defaultStyles.buttonText_dark}>Login with Google</Text>
      </View>
    </TouchableHighlight>
  );
};

const defaultStyles = StyleSheet.create({
  button: {
    justifyContent: "space-around",
    elevation: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    paddingVertical: theme.spacing(0.3),
    ...theme.shadows[1],
  },
  buttonContent: {
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: theme.spacing(0.3),
  },
  facebook: {
    backgroundColor: "#4267b2",
    color: "white",
    borderColor: "#4267b2",
  },

  google: {
    backgroundColor: theme.colors.paper,
    borderColor: theme.colors.paper,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    fontFamily: "openSans",
    fontSize: theme.spacing(0.8),
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    alignSelf: "center",
    textTransform: "capitalize",
    paddingHorizontal: theme.spacing(1),
  },
  buttonText_dark: {
    fontFamily: "openSans",
    fontSize: theme.spacing(0.8),
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    alignSelf: "center",
    textTransform: "capitalize",
    paddingHorizontal: theme.spacing(1),
  },
  icon: {
    color: theme.colors.textPrimary,
  },
  icon_dark: {
    color: theme.colors.textSecondary,
  },
});
