import * as React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => (
  <Appbar style={{ ...styles.bottom, ...styles.footer }}>
    <Ionicons size={20} style={styles.icon} name='home' />
    <Ionicons size={20} style={styles.icon} name='search' />
    <Ionicons size={22} style={styles.icon} name='add-circle-outline' />
    <Ionicons size={20} style={styles.icon} name='notifications' />
    <Ionicons size={20} style={styles.icon} name='settings' />
  </Appbar>
);

export default Footer;

const styles = StyleSheet.create({
  footer: {
    paddingBottom: theme.spacing(0.6),
    paddingHorizontal: theme.spacing(1),
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: theme.colors.background,
    ...theme.shadows[2],
  },
  bottom: {
    position: "absolute",
    zIndex: 1000,
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    color: theme.colors.textDisabled,
  },
});
