import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => (
  <SafeAreaView style={styles.footer}>
    <View style={styles.footerContainer}>
      <Ionicons size={20} style={styles.icon} name="home" />
      <Ionicons size={20} style={styles.icon} name="search" />
      <Ionicons size={22} style={styles.icon} name="add-circle-outline" />
      <Ionicons size={20} style={styles.icon} name="notifications" />
      <Ionicons size={20} style={styles.icon} name="settings" />
    </View>
  </SafeAreaView>
);

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(0.6),
    paddingHorizontal: theme.spacing(1),
    paddingVertical: theme.spacing(0.9),
  },
  footer: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary_light,
    paddingBottom: theme.spacing(0.5),
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
  icon: {
    color: theme.colors.textSecondary,
  },
});
