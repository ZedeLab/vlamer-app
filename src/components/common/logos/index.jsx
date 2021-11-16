import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import theme from '../../../utils/theme';
import LogoImage from '../../../../assets/logo.png';
import { styles } from './styles';

export const MainLogo = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={LogoImage} />
      <Text style={styles.logoText}>Valmer Express </Text>
    </View>
  );
};

export const MainLogoSlimRt = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={LogoImage} />
    </View>
  );
};
