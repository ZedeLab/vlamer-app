import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { View, useWindowDimensions, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import globalTheme from '../../../utils/theme';
import VlamPosts from '../cards/VlamPostCard';
import { selectActors } from '../../../store/actors';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../services/auth';
import { useNavigation } from '@react-navigation/core';
import theme from '../../../utils/theme';

let LIST_SIZE = 0;

const renderVlamList = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const actors = useSelector(selectActors);

  return (
    <View>
      {actors.currentUserVlamList.map((item) => {
        return (
          <VlamPosts
            key={item.id}
            authorAccount={item.__ownerAccountSnapShot}
            vlamType={''}
            likeIds={item.likeUsersIds}
            id={item.id}
            likes={item.likes}
            message={item.message}
            totalLikes={item.totalNumberOfLikes}
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

export default function UserVlams() {
  const layout = useWindowDimensions();
  const actors = useSelector(selectActors);
  const styles = useStyle(actors.currentUserVlamList.length);
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

const useStyle = (LIST_SIZE) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      minHeight: theme.spacing(LIST_SIZE) * 16.8,
    },

    scene: {
      alignItems: 'center',
      paddingHorizontal: theme.spacing(0.7),
      paddingVertical: theme.spacing(0.7),
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
  });
