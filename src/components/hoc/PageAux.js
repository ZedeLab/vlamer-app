import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../../utils/theme";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

export const PageAux = (props) => {
  const { children, fullScreen, style, ...restProps } = props;
  return (
    <View {...restProps} style={styles.container}>
      <Header />
      <View style={styles.mainScreen}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  mainScreen: {
    padding: theme.spacing(1),
  },
});

export default PageAux;
