import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import theme from '../../utils/theme';

const CardWrapper = (props) => {
  const { children, ...restProps } = props;
  return (
    <View {...restProps} style={styles.container}>
      {children}
    </View>
  );
};

export default CardWrapper;

const styles = StyleSheet.create({
  container: {
    ...theme.shadows[1],
    borderRadius: theme.shapes.borderRadios,
    marginVertical: theme.spacing(0.8),
    backgroundColor: theme.colors.common,
  },
});
