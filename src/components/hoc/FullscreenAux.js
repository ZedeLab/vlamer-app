import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';

export const FullscreenAux = (props) => {
  const { children, fullScreen, style, ...restProps } = props;
  return (
    <View {...restProps} style={{ ...style, ...styles.container }}>
      <SafeAreaView style={styles.top}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.background}
          barStyle="dark-content"
        />
      </SafeAreaView>
      <View style={styles.container}>{children}</View>
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
});

export default FullscreenAux;
