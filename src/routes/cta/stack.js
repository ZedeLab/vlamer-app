import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen, ChatList, ProfileScreen } from '../../components/screens';

import TabStackScreen from '../tab/stack';
import ProfileViewHeader from '../../components/sections/profileViewHeader';
import { ProfileStackScreen } from './screens';
import ChatRoom from '../../components/screens/chatRoom';

const CallToActionStack = createStackNavigator();

export default CallToActionStackScreen = ({ route, navigation }) => {
  return (
    <CallToActionStack.Navigator initialRouteName="Tab">
      <CallToActionStack.Screen
        name="Profile"
        options={{
          headerShown: true,
          header: (headerProps) => <ProfileViewHeader {...headerProps} />,
        }}
        component={ProfileStackScreen}
      />
      <CallToActionStack.Screen
        name="Tab"
        options={{ headerShown: false }}
        component={TabStackScreen}
      />

      <CallToActionStack.Screen options={{ headerShown: false }} name="Chat" component={ChatList} />
      <CallToActionStack.Screen
        options={{ headerShown: false }}
        name="Chat Room"
        component={ChatRoom}
      />
      <CallToActionStack.Screen name="Settings" component={SettingsScreen} />
    </CallToActionStack.Navigator>
  );
};
