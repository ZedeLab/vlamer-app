import {
  ExploreStackScreen,
  HomeStackScreen,
  NotificationStackScreen,
  SearchStackScreen,
  UserProfileStackScreen,
} from './screens';
import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../../utils/theme';
import { AvatarIcon, TabBarIcon, TabBarNotificationIcon } from '../../components/common/icons';
import { useAuth } from '../../services/auth';

const TabStack = createMaterialBottomTabNavigator();

export default TabStackScreen = () => {
  const { user } = useAuth();

  return (
    <TabStack.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.accent}
      labeled={false}
      barStyle={{
        backgroundColor: theme.colors.primary_light,
        paddingTop: theme.spacing(0.3),
        justifyContent: 'center',
      }}
    >
      <TabStack.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (iconProps) => (
            <TabBarIcon iconName="home" style={styles.barIcon} {...iconProps} />
          ),
        }}
        name="Home"
        component={HomeStackScreen}
      />
      <TabStack.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: (iconProps) => (
            <TabBarIcon iconName="search" style={styles.barIcon} {...iconProps} />
          ),
        }}
        name="Search"
        component={SearchStackScreen}
      />
      <TabStack.Screen
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: (iconProps) => (
            <TabBarIcon iconName="add-circle-outline" style={styles.barIcon} {...iconProps} />
          ),
        }}
        name="Explore"
        component={ExploreStackScreen}
      />
      <TabStack.Screen
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: (iconProps) => (
            <TabBarNotificationIcon
              iconName="notifications"
              style={styles.barIcon}
              {...iconProps}
            />
          ),
        }}
        name="Notification"
        component={NotificationStackScreen}
      />
      <TabStack.Screen
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TouchableWithoutFeedback>
              <View style={styles.wrapper}>
                <View
                  style={
                    focused
                      ? { ...styles.avatarContainer, ...styles.avatarContainer_dark }
                      : { ...styles.avatarContainer, ...styles.avatarContainer_light }
                  }
                >
                  <AvatarIcon
                    style={styles.avatar}
                    imgSrc={user.avatarURL}
                    size={theme.spacing(1.8)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
        name="User"
        component={UserProfileStackScreen}
      />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {},

  avatarContainer: {
    position: 'relative',
    top: theme.spacing(-0.5),
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
