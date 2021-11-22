import { useRoute } from '@react-navigation/core';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../services/auth';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import { selectActors, setProfileVlamList } from '../../../store/actors';
import { useSelector } from 'react-redux';
import UserVlams from '../../sections/VlamList/CurrentUserVlams';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserVlamList } from '../../../services/db';
import ProfileViewVlams from '../../sections/VlamList/ProfileViewVlams';
import { useDispatch } from 'react-redux';

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { focusedUser, focusedUserConnections } = useSelector(selectActors);

  useEffect(() => {
    if (focusedUser) {
      const fetchProfileVlamList = async () => {
        const [vlamList, error] = await getUserVlamList(focusedUser.id);

        if (vlamList) {
          dispatch(setProfileVlamList(vlamList));
        } else {
        }
      };
      fetchProfileVlamList();
    }
  }, [focusedUser]);

  if (!focusedUser || !focusedUserConnections) {
    return (
      <PageAux>
        <Text> Account could not be found</Text>
      </PageAux>
    );
  }

  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <UserProfileHeader account={focusedUser} accountConnections={focusedUserConnections} />
        <ProfileViewVlams />
      </ScrollView>
    </PageAux>
  );
};

export default Profile;
