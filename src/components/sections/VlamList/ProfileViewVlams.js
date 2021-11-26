import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import theme from '../../../utils/theme';
import VlamPosts from '../cards/VlamPostCard';
import { selectActors } from '../../../store/actors';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useNavigation } from '@react-navigation/core';

const renderVlamList = () => {
  const navigation = useNavigation();
  const { profileVlamList, focusedUser } = useSelector(selectActors);

  if (!profileVlamList || !focusedUser) {
    return <Text> Loading...</Text>;
  }

  return (
    <View>
      {profileVlamList.map((item) => {
        return (
          <VlamPosts
            key={uuid()}
            id={item.id}
            authorAccount={item.__ownerAccountSnapShot}
            vlamType={''}
            likes={item.likes}
            totalLikes={item.totalNumberOfLikes}
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
  const actors = useSelector(selectActors);
  const styles = useStyle(actors.profileVlamList.length);
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
      minHeight: theme.spacing(LIST_SIZE) * 15.8,
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
