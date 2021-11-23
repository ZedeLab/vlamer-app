import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import theme from '../../../utils/theme';
import VlamPosts from '../cards/VlamPostCard';
import { selectFocusedUserActors } from '../../../store/actors/focusedUser';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../services/auth';
import { useNavigation } from '@react-navigation/core';

const renderVlamList = () => {
  const navigation = useNavigation();
  const { profileVlamList, focusedUser } = useSelector(selectFocusedUserActors);

  if (!profileVlamList || !focusedUser) {
    return <Text> Loading...</Text>;
  }

  return (
    <View>
      {profileVlamList.map((item) => {
        return (
          <VlamPosts
            authorAccount={focusedUser}
            vlamType={''}
            message={item.message}
            numberOfParticipants={item.numberOfParticipants}
            participatingPrice={item.participatingPrice}
            winingPrice={item.winingPrice}
            createdAt={item.createdAt}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  allScene: () => renderVlamList(),
  wonScene: () => renderVlamList(),
  earningStats: () => renderVlamList(),
});

export default function ProfileViewVlams() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'allScene', title: 'All' },
    { key: 'wonScene', title: 'Won' },
    { key: 'earningStats', title: 'Earning Stats' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.accent }}
      style={styles.tabBar}
      labelStyle={styles.label}
      pressColor={theme.colors.accent}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.container}
      sceneContainerStyle={styles.scene}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    minHeight: '100%',
  },

  scene: {
    paddingHorizontal: theme.spacing(0.5),
  },

  tabBar: {
    backgroundColor: theme.colors.common,
    // height: 400,
    ...theme.shadows[2],
  },
  label: {
    fontFamily: 'openSans-bold',
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(0.8),
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginRight: theme.spacing(0.5),
  },
  vlamList: {
    height: 300,
    width: 300,
    backgroundColor: 'red',
  },
});
