import { useRoute } from '@react-navigation/core';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../services/auth';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import {
  selectFocusedUserActors,
  setFocusedUserVolt,
  setProfileVlamList,
} from '../../../store/actors/focusedUser';
import { useSelector } from 'react-redux';
import UserVlams from '../../sections/VlamList/CurrentUserVlams';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserVlamList, getUserVolt } from '../../../services/db';
import ProfileViewVlams from '../../sections/VlamList/ProfileViewVlams';
import { useDispatch } from 'react-redux';

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { focusedUser, focusedUserConnections, focusedUserVolt } =
    useSelector(selectFocusedUserActors);

  useEffect(() => {
    if (focusedUser) {
      const fetchProfileVlamList = async () => {
        const [vlamList, error] = await getUserVlamList(focusedUser.id);
        const [focusedVolt, voltError] = await getUserVolt(focusedUser.id);

        if (vlamList && focusedVolt) {
          dispatch(setProfileVlamList(vlamList));
          dispatch(setFocusedUserVolt(focusedVolt));
        } else {
          console.log('vlamListError: ', error, '\nvoltError: ', voltError);
        }
      };
      fetchProfileVlamList();
    }
  }, [focusedUser]);

  if (!focusedUser || !focusedUserConnections || !focusedUserVolt) {
    return (
      <PageAux>
        <Text> Loading... </Text>
      </PageAux>
    );
  }

  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <UserProfileHeader
          account={focusedUser}
          userVolt={focusedUserVolt}
          accountConnections={focusedUserConnections}
        />
        <ProfileViewVlams />
      </ScrollView>
    </PageAux>
  );
};

export default Profile;
