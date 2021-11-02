import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen, ChatScreen } from './components/screens';

import Header from '../../components/sections/Header';

const SettingsStack = createStackNavigator();

export const SettingsStackScreen = ({ route }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: route.name === 'Settings',
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const ChatStack = createStackNavigator();

export const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: route.name === 'Chat',
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};
