import {
  ExploreStackScreen,
  HomeStackScreen,
  NotificationStackScreen,
  ProfileStackScreen,
  SearchStackScreen,
} from './screens';
import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';
import { AvatarIcon, TabBarIcon } from '../../components/common/icons';

const TabsStack = createMaterialBottomTabNavigator();

export default TabStackScreen = () => (
  <TabsStack.Navigator
    activeColor={theme.colors.accent}
    labeled={false}
    barStyle={{
      backgroundColor: theme.colors.primary_light,
    }}
  >
    <TabsStack.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName="home" style={styles.barIcon} {...iconProps} />
        ),
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName="search" style={styles.barIcon} {...iconProps} />
        ),
      }}
      name="Search"
      component={SearchStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName="add-circle-outline" style={styles.barIcon} {...iconProps} />
        ),
      }}
      name="Explore"
      component={ExploreStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: 'Notification',
        tabBarIcon: (iconProps) => (
          <TabBarIcon iconName="notifications" style={styles.barIcon} {...iconProps} />
        ),
      }}
      name="Notification"
      component={NotificationStackScreen}
    />
    <TabsStack.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => (
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
      name="Profile"
      component={ProfileStackScreen}
    />
  </TabsStack.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.textSecondary,
  },
  avatarContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    padding: theme.spacing(0.2),
    marginBottom: theme.spacing(0.4),
    height: theme.spacing(2.3),
    width: theme.spacing(2.3),
    borderRadius: theme.spacing(2.3) / 2,
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
