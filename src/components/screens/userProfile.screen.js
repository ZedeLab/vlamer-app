import { useRoute } from '@react-navigation/core';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAuth } from '../../services/auth';
import { selectActors } from '../../store/actors';
import PageAux from '../hoc/PageAux';
import UserProfileHeader from '../sections/ProfileHeader';
import UserVlams from '../sections/currentUser/UserVlams';

const UserProfile = ({ navigation, route }) => {
  const { user } = useAuth();
  const actors = useSelector(selectActors);

  if (!user || !actors.currentUserConnections) {
    return (
      <PageAux>
        <Text>Loading...</Text>
      </PageAux>
    );
  }

  return (
    <PageAux noGutter style={styles.pageContainer}>
      <ScrollView style={styles.pagesWrapper}>
        <UserProfileHeader
          account={user}
          admin
          accountConnections={actors.currentUserConnections}
        />

        <UserVlams />
      </ScrollView>
    </PageAux>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  pageContainer: {
    // justifyContent: 'flex-start',
  },

  pagesWrapper: {
    height: '100%',
  },
});
