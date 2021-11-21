import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen, ChatList, ProfileScreen } from '../../components/screens';

import Header from '../../components/sections/header';
import { UserProfileScreen } from '../../components/screens';
import ProfileViewHeader from '../../components/sections/profileViewHeader';
import ChatRoom from '../../components/screens/chatRoom';

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
      <ChatStack.Screen name="Chat List" component={ChatList} />
      <ChatStack.Screen name="Chat Room" component={ChatRoom} />
    </ChatStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = ({ route, navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};
