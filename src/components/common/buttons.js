import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";

export const PrimaryButton = ({ style, children, ...restProps }) => {
  return (
    <Button
      {...restProps}
      style={{
        ...style,
        ...defaultStyles.button,
        ...defaultStyles.primaryButton,
      }}
    >
      <Text style={defaultStyles.buttonText}>{children}</Text>
    </Button>
  );
};

export const FacebookLoginButton = ({ style, ...restProps }) => {
  return (
    <Button
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.facebook }}
    >
      <Ionicons size={20} style={defaultStyles.icon} name='logo-facebook' />
      <Text style={defaultStyles.buttonText}>Login with Facebook</Text>
    </Button>
  );
};

export const GoogleLoginButton = ({ style, ...restProps }) => {
  return (
    <Button
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.google }}
    >
      <Ionicons size={20} style={defaultStyles.icon_dark} name='logo-google' />
      <Text style={defaultStyles.buttonText_dark}>Login with Google</Text>
    </Button>
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
    ...theme.shadows[1],
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
  },
  buttonText_dark: {
    fontFamily: "openSans",
    fontSize: theme.spacing(0.8),
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    alignSelf: "center",
    textTransform: "capitalize",
  },
  icon: {
    color: theme.colors.textPrimary,
  },
  icon_dark: {
    color: theme.colors.textSecondary,
  },
});
