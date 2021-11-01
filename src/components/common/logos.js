import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import theme from '../../utils/theme';
import LogoImage from '../../../assets/logo.png';
export const MainLogo = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={LogoImage} />
      <Text style={styles.logoText}>Valmer Express </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing(0.6),
    paddingHorizontal: theme.spacing(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.common,
  },
  tinyLogo: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  logoText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(1.1),
    textTransform: 'capitalize',
    paddingHorizontal: theme.spacing(1),
  },
});
