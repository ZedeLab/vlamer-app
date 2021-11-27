import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../services/auth';
import { useCurrentUserVlamList } from '../../../services/userVlamListAccess';
import { selectActors, setCurrentUserVlamList } from '../../../store/actors';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import UserVlams from '../../sections/VlamList/CurrentUserVlams';

const UserProfile = ({ navigation, route }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const actors = useSelector(selectActors);

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
