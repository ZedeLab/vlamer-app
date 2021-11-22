import React, { Component } from 'react';
import { styles } from './styles';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import theme from '../../../utils/theme';
import { CompleteRegistrationBanner } from '../../common/banners';
import { PrimaryButton } from '../../common/buttons';
import VlamPosts from '../../sections/cards/VlamPostCard';
import PageAux from '../../hoc/PageAux';
import DATA from '../../../utils/__mock__/feeds.json';
import { useNavigation } from '@react-navigation/core';
import { useStaticData } from '../../../services/staticURLs';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';

export default Home = () => {
  const navigation = useNavigation();
  const { currentUserFeedList: feedList } = useSelector(selectActors);

  if (!feedList) {
    return <Text>Loading...</Text>;
  }

  const renderVlams = ({ item }) => {
    return (
      <VlamPosts
        authorAccount={item.authorAccount}
        postedAt={item.postedAt}
        vlamType={''}
        message={item.message}
        numberOfParticipants={item.numberOfParticipants}
        participatingPrice={item.participatingPrice}
        winingPrice={item.winingPrice}
        createdAt={item.createdAt}
        navigation={navigation}
      />
    );
  };

  return (
    <PageAux>
      <CompleteRegistrationBanner />
      <FlatList
        data={feedList}
        renderItem={renderVlams}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </PageAux>
  );
};
