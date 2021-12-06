import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';

export const PageAux = (props) => {
  const { children, fullScreen, noGutter, style: propStyle, ...restProps } = props;

  const customStyle = noGutter
    ? { ...styles.container, ...propStyle }
    : { ...styles.container, ...propStyle, ...styles.gutter };

  return <View style={customStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  gutter: {
    paddingHorizontal: theme.spacing(0.8),
  },
});

export default PageAux;
