import * as React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { StatusBar, StyleSheet } from "react-native";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainLogo } from "../common/logos";

const Header = (props) => {
  return (
    <SafeAreaView style={styles.top}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.common}
        barStyle='dark-content'
      />
      <Appbar style={styles.header}>
        <MainLogo />
        <Avatar.Image
          style={styles.avatar}
          size={34}
          source={require("../../../assets/avatar_f.jpg")}
        />
      </Appbar>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // height: theme.spacing(5),
    ...theme.shadows[2],
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: theme.colors.common,
  },
  top: {
    backgroundColor: theme.colors.common,
    // ...theme.shadows[2],
    position: "absolute",
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
  },
  avatar: {
    margin: theme.spacing(0.5),
    ...theme.shadows[2],
  },
  menuIcon: {
    color: theme.colors.textSecondary,
    margin: theme.spacing(0.5),
  },
});
