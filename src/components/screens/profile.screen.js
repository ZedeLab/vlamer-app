import { useRoute } from '@react-navigation/core';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../services/auth';
import PageAux from '../hoc/PageAux';
import UserProfileHeader from '../sections/ProfileHeader';
import { selectActors } from '../../store/actors';
import { useSelector } from 'react-redux';
import UserVlams from '../sections/currentUser/UserVlams';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ navigation, route }) => {
  const actors = useSelector(selectActors);

  if (!actors?.focusedUser || !actors.focusedUserConnections) {
    return (
      <PageAux>
        <Text> Account could not be found</Text>
      </PageAux>
    );
  }

  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <UserProfileHeader
          account={actors.focusedUser}
          accountConnections={actors.focusedUserConnections}
        />

        <UserVlams />
      </ScrollView>
    </PageAux>
  );
};

export default Profile;

const styles = StyleSheet.create({
  pageContainer: {
    // justifyContent: 'flex-start',
  },

  pagesWrapper: {
    height: '100%',
  },
});
