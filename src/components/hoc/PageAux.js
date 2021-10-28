import React from "react";
import { StyleSheet, View } from "react-native";
import theme from "../../utils/theme";
import Header from "../common/Header";
import Footer from "../common/Footer";

export const PageAux = (props) => {
  const { children, fullScreen, style, ...restProps } = props;
  return (
    <View {...restProps} style={{ ...style, ...styles.container }}>
      {!fullScreen && <Header />}
      <View style={styles.mainScreen}>{children}</View>
      {!fullScreen && <Footer />}
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
    overflow: "hidden",
  },
});

export default PageAux;
