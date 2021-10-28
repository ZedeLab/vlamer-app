import React from "react";
import { StyleSheet, View } from "react-native";
import theme from "../../utils/theme";

export const PageAux = (props) => {
  const { children, style, ...restProps } = props;
  return (
    <View {...restProps} style={{ ...style, ...styles.container }}>
      {children}
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
});

export default PageAux;
