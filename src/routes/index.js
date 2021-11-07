import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../services/auth';

import { StyleSheet } from 'react-native';
import theme from '../utils/theme';
import CallToActionStackScreen from './cta/stack';
import AuthStackScreen from './auth/stack';
import { useStaticData } from '../services/staticURLs';
import { StaticData } from '../services/db/models/staticData';
import { getStaticData } from '../services/db';

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

const styles = StyleSheet.create({});
