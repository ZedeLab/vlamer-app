import { useRoute } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../services/auth';
import { selectActors, setCurrentUserVlamList } from '../../../store/actors';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import UserVlams from '../../sections/VlamList/CurrentUserVlams';
import { getUserVlamList } from '../../../services/db';

const UserProfile = ({ navigation, route }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const actors = useSelector(selectActors);

  useEffect(() => {
    if (user) {
      const fetchUserVlamList = async () => {
        const [vlamList, error] = await getUserVlamList(user.id);
        if (vlamList) {
          dispatch(setCurrentUserVlamList(vlamList));
        }
      };
      fetchUserVlamList();
    }
  }, [user]);

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
