import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainLogo } from '../common/logos';
import { AvatarIcon } from '../common/icons';
import { useNavigation } from '@react-navigation/core';

const Header = (props) => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.top}>
      <StatusBar animated={true} backgroundColor={theme.colors.common} barStyle="dark-content" />
      <Appbar style={styles.header}>
        <MainLogo />

        <View style={styles.ctaContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('App', { screen: 'Chat' })}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="black" />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('App', { screen: 'Message' })}
          >
            <Ionicons name="settings" size={20} style={styles.icon} />
          </TouchableWithoutFeedback>
        </View>
      </Appbar>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // height: theme.spacing(5),
    ...theme.shadows[2],
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.common,
  },
  top: {
    backgroundColor: theme.colors.common,
    // ...theme.shadows[2],
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
  },
  avatar: {
    margin: theme.spacing(0.5),
    ...theme.shadows[2],
  },
  ctaContainer: {
    flexDirection: 'row',
    width: theme.spacing(4),
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.textPrimary,
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(0.9),
  },
});
