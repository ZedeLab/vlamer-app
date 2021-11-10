import React, { useState } from 'react';
import {
  View,
  useWindowDimensions,
  SectionList,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import theme from '../../../utils/theme';
import VlamPosts from '../../sections/cards/VlamPostCard';
import DATA from '../../../utils/__mock__/feeds.json';
import { v4 as uuid } from 'uuid';

const renderVlamList = () => {
  return (
    <View>
      {DATA.map((item) => {
        return (
          <VlamPosts
            firstName={item.firstName}
            userName={item.userName}
            userAvatar={item.userAvatar}
            postedAt={item.postedAt}
            vlamType={item.vlamType}
            description={item.description}
          />
        );
      })}
    </View>
    // <FlatList
    //   data={DATA}
    //   keyExtractor={(item) => item.id}
    //   keyExtractor={(item) => item.id}
    //   renderItem={({ item }) => (
    //     <VlamPosts
    //       firstName={item.firstName}
    //       userName={item.userName}
    //       userAvatar={item.userAvatar}
    //       postedAt={item.postedAt}
    //       vlamType={item.vlamType}
    //       description={item.description}
    //     />
    //   )}
    //   ListHeaderComponent={null}
    // />
  );
};

const renderScene = SceneMap({
  allScene: () => renderVlamList(),
  wonScene: () => renderVlamList(),
  earningStats: () => renderVlamList(),
});

export default function UserVlams() {
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
    height: Dimensions.get('window').height * 3,
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
