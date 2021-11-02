import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';

export const PageAux = (props) => {
  const { children, fullScreen, style, ...restProps } = props;
  return (
    <View {...restProps} style={styles.container}>
      <View style={styles.mainScreen}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  mainScreen: {
    paddingHorizontal: theme.spacing(1),
  },
});

export default PageAux;
