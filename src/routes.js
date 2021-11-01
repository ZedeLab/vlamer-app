import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, LoginScreen, RegisterScreen } from "./components/screens";
import { useAuth } from "./services/auth";

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name='Login'
        component={LoginScreen}
        options={{ title: "login" }}
      />
      <AuthStack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ title: "register" }}
      />
    </AuthStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </HomeStack.Navigator>
  );
};

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
            name='App'
            component={HomeStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name='Auth'
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
