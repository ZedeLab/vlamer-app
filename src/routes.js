import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  SettingsScreen,
  ExploreScreen,
  NotificationScreen,
} from "./components/screens";
import { useAuth } from "./services/auth";

import { StyleSheet } from "react-native";
import theme from "./utils/theme";
import { TabBarIcon } from "./components/common/icons";
import Header from "./components/sections/Header";

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

const SearchStack = createStackNavigator();

export const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

const ExploreStack = createStackNavigator();

export const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreStack.Screen name='Explore' component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();

export const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NotificationStack.Screen
        name='Notification'
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const TabsStack = createBottomTabNavigator();
const TabsStackScreen = () => (
  <TabsStack.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: theme.colors.primary_light },
      tabBarShowLabel: false,
    }}
  >
    <TabsStack.Screen
      options={{
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='home' {...iconProps} />
        ),
      }}
      name='Home'
      component={HomeStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='search' {...iconProps} />
        ),
      }}
      name='Search'
      component={SearchStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='add-circle-outline' {...iconProps} />
        ),
      }}
      name='Explore'
      component={ExploreStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='notifications' {...iconProps} />
        ),
      }}
      name='Notification'
      component={NotificationStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='settings' {...iconProps} />
        ),
      }}
      name='Settings'
      component={SettingsStackScreen}
    />
  </TabsStack.Navigator>
);

const RootStack = createStackNavigator();

export default () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          // headerShown: false,
          header: (headerProps) => <Header {...headerProps} />,
        }}
      >
        <RootStack.Screen
          name='App'
          component={TabsStackScreen}
          options={{
            animationEnabled: true,
          }}
        />
        <RootStack.Screen
          name='Auth'
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
        {/* {user ? (
          
        ) : (
          
        )} */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.textSecondary,
  },
});
