import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import theme from '../../utils/theme';
import { CompleteRegistrationBanner } from '../common/banners';
import { PrimaryButton } from '../common/buttons';
import VlamPosts from '../sections/cards/VlamPostCard';
import PageAux from '../hoc/PageAux';
import DATA from '../../utils/__mock__/feeds.json';
import { useNavigation } from '@react-navigation/core';
import { useStaticData } from '../../services/staticURLs';

export default Home = () => {
  const navigation = useNavigation();

  const renderVlams = ({ item }) => {
    return (
      <VlamPosts
        firstName={item.firstName}
        userName={item.userName}
        userAvatar={item.userAvatar}
        postedAt={item.postedAt}
        vlamType={item.vlamType}
        description={item.description}
        navigation={navigation}
      />
    );
  };

  return (
    <PageAux>
      <CompleteRegistrationBanner />
      <FlatList
        data={DATA}
        renderItem={renderVlams}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </PageAux>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    textAlign: 'center',
    fontFamily: 'playfair-display',
    letterSpacing: 2,
    color: '#fff',
    marginBottom: 25,
    fontSize: 25,
  },
  item: {
    width: '90%',
    height: theme.spacing(8),
    justifyContent: 'center',
  },
  firstName: {
    fontSize: 32,
  },
});
