import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useAuth } from '../../../services/auth';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import UserProfileHeader from '../../sections/profileHeader';
import {
  selectActors,
  setFocusedUserConnections,
  setFocusedUserVolt,
  setProfileVlamList,
} from '../../../store/actors';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserConnections } from '../../../services/db/queries/user/connections';
import { getUserVolt } from '../../../services/db/queries/user/volt';
import ProfileViewVlams from '../../sections/VlamList/ProfileViewVlams';
import { useDispatch } from 'react-redux';
import { getUserVlamList } from '../../../services/db/queries/vlam';

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { focusedUser, focusedUserConnections, focusedUserVolt, profileVlamList } =
    useSelector(selectActors);

  useEffect(() => {
    if (focusedUser) {
      const fetchProfileVlamList = async () => {
        const [vlamList, vlamListError] = await getUserVlamList(focusedUser.id, user.id);
        const [connections, connectionError] = await getUserConnections(focusedUser.id);
        const [volt, voltError] = await getUserVolt(focusedUser.id);

        if (vlamList) {
          dispatch(setProfileVlamList(vlamList));
          dispatch(setFocusedUserConnections(connections));
          dispatch(setFocusedUserVolt(volt));
        } else {
        }
      };
      fetchProfileVlamList();
    }
  }, [focusedUser]);

  if (!focusedUser || !focusedUserConnections || !focusedUserVolt || !profileVlamList) {
    return (
      <PageAux>
        <Text> Loading </Text>
      </PageAux>
    );
  }

  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <UserProfileHeader
          account={focusedUser}
          accountConnections={focusedUserConnections}
          userVolt={focusedUserVolt}
        />
        <ProfileViewVlams />
      </ScrollView>
    </PageAux>
  );
};

export default Profile;
