import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen } from '../../components/screens';

const AuthStack = createStackNavigator();

export default AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'login' }} />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'register' }}
      />
    </AuthStack.Navigator>
  );
};
