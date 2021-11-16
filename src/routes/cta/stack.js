import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen, ChatScreen, ProfileScreen } from '../../components/screens';

import TabStackScreen from '../tab/stack';
import ProfileViewHeader from '../../components/sections/profileViewHeader';
import { ProfileStackScreen } from './screens';

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

      <CallToActionStack.Screen name="Chat" component={ChatScreen} />
      <CallToActionStack.Screen name="Settings" component={SettingsScreen} />
    </CallToActionStack.Navigator>
  );
};
