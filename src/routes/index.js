import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../../services/auth';

import { StyleSheet } from 'react-native';
import theme from '../utils/theme';
import CallToActionStackScreen from './cta/stack';
import AuthStackScreen from './auth/stack';

const RootStack = createStackNavigator();

export default () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <RootStack.Screen
            name="App"
            component={CallToActionStackScreen}
            options={{
              animationEnabled: true,
            }}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.textSecondary,
  },
  avatarContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    padding: theme.spacing(0.2),
    marginBottom: theme.spacing(0.4),
    height: theme.spacing(2.3),
    width: theme.spacing(2.3),
    borderRadius: theme.spacing(2.3) / 2,
  },
  tabBarContainer: {
    paddingTop: theme.spacing(),
  },
  avatarContainer_light: {
    borderColor: theme.colors.common,
  },
  avatarContainer_dark: {
    borderColor: theme.colors.accent,
  },
  barIcon: {
    fontSize: theme.spacing(1.3),
    ...theme.shadows[4],
  },
});
