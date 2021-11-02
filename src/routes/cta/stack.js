import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen, ChatScreen } from '../../components/screens';

import TabStackScreen from '../../routes/tab/stack';

const CallToActionStack = createStackNavigator();

export default CallToActionStackScreen = ({ route }) => {
  return (
    <CallToActionStack.Navigator initialRouteName="Tab">
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
