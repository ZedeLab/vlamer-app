import { useRoute } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../services/auth';
import {
  selectActors,
  setCurrentUserConnections,
  setCurrentUserVlamList,
} from '../../../store/actors';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import UserVlams from '../../sections/VlamList/CurrentUserVlams';
import { getUserConnections } from '../../../services/db/queries/connections';
import { getUserVlamList } from '../../../services/db/queries/vlam';

const UserProfile = ({ navigation, route }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const actors = useSelector(selectActors);

  useEffect(async () => {
    if (user) {
      const fetchUserVlamList = async () => {
        const [vlamList, error] = await getUserVlamList(user.id);
        const [connections, connectionsError] = await getUserConnections(user.id);

        if (vlamList && connections) {
          dispatch(setCurrentUserVlamList(vlamList));
          dispatch(setCurrentUserConnections(connections));
        } else {
          console.log('connectionsError: ', connectionsError, '\nvlamListError: ', error);
        }
      };
      fetchUserVlamList();
    }
  }, [user]);

  if (!user || !actors.currentUserConnections || !actors.userVolt || !actors.currentUserVlamList) {
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
          userVolt={actors.userVolt}
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
