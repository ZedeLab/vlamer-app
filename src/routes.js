import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  SearchScreen,
  SettingsScreen,
  ExploreScreen,
  NotificationScreen,
  ChatScreen,
  ProfileScreen,
} from "./components/screens";
import { useAuth } from "./services/auth";

import { PixelRatio, StyleSheet, Text, View } from "react-native";
import theme from "./utils/theme";
import { AvatarIcon, TabBarIcon } from "./components/common/icons";
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

export const HomeStackScreen = ({ route }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: route.name === "Home",
        header: (headerProps) => <Header {...headerProps} />,
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

export const SearchStackScreen = ({ route }) => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: route.name === "Search",
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

const ExploreStack = createStackNavigator();

export const ExploreStackScreen = ({ route }) => {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: route.name === "Explore",
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <ExploreStack.Screen name='Explore' component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();

export const NotificationStackScreen = ({ route }) => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerShown: route.name === "Notification",
        header: (headerProps) => <Header {...headerProps} />,
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

export const SettingsStackScreen = ({ route }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: route.name === "Settings",
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = ({ route }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: route.name === "Profile",
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <SettingsStack.Screen name='Profile' component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const ChatStack = createStackNavigator();

export const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <SettingsChatStackStack.Screen name='Chat' component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

const TabsStack = createMaterialBottomTabNavigator();
const TabsStackScreen = () => (
  <TabsStack.Navigator
    activeColor={theme.colors.accent}
    inactiveColor={"red"}
    labeled={false}
    barStyle={{
      backgroundColor: theme.colors.primary_light,
    }}
    screenOptions={
      {
        // tabBarColor: theme.colors.primary_light,
      }
    }
  >
    <TabsStack.Screen
      options={{
        tabBarLabel: "Home",
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='home' style={styles.barIcon} {...iconProps} />
        ),
      }}
      name='Home'
      component={HomeStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: "Search",
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName='search' style={styles.barIcon} {...iconProps} />
        ),
      }}
      name='Search'
      component={SearchStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: "Explore",
        tabBarIcon: (iconProps) => (
          <TabBarIcon
            iconName='add-circle-outline'
            style={styles.barIcon}
            {...iconProps}
          />
        ),
      }}
      name='Explore'
      component={ExploreStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: "Notification",
        tabBarIcon: (iconProps) => (
          <TabBarIcon
            iconName='notifications'
            style={styles.barIcon}
            {...iconProps}
          />
        ),
      }}
      name='Notification'
      component={NotificationStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ focused }) => (
          // <TabBarIcon iconName='settings' style={styles.barIcon} {...iconProps} />
          <View
            style={
              focused
                ? { ...styles.avatarContainer, ...styles.avatarContainer_dark }
                : { ...styles.avatarContainer, ...styles.avatarContainer_light }
            }
          >
            <AvatarIcon
              style={styles.avatar}
              size={theme.spacing(1.8)}
              // source={require("../../../assets/avatar_f.jpg")}
            />
          </View>
        ),
      }}
      name='Profile'
      component={ProfileStackScreen}
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
          headerShown: false,
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
  avatarContainer: {
    justifyContent: "center",
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
