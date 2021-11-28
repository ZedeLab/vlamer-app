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
import { getUserConnections } from '../../../db/queries/user/connections';
import { getUserVolt } from '../../../db/queries/user/volt';
import ProfileViewVlams from '../../sections/VlamList/ProfileViewVlams';
import { useDispatch } from 'react-redux';
import { getUserVlamList, onNewVlamInUserProfile } from '../../../db/queries/vlam';
import { formatTime } from '../../../utils/timeManager';
import { Timestamp } from '@firebase/firestore';

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { focusedUser, focusedUserConnections, focusedUserVolt, profileVlamList } =
    useSelector(selectActors);

  useEffect(() => {
    if (focusedUser) {
      const fetchProfileVlamList = async () => {
        const [connections, connectionError] = await getUserConnections(focusedUser.id);
        const [volt, voltError] = await getUserVolt(focusedUser.id);
        const [{ eventHandler, docRef }, _] = await onNewVlamInUserProfile(focusedUser.id);

        const unsubscribe = eventHandler(docRef, (querySnapshot) => {
          let vlamList = profileVlamList ? [...profileVlamList] : [];

          querySnapshot.forEach((doc) => {
            const document = doc.data();
            const formattedCreatedAt = formatTime(
              new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
            );

            vlamList.push({ ...document, createdAt: formattedCreatedAt });
          });
          dispatch(setProfileVlamList(vlamList));
          dispatch(setFocusedUserConnections(connections));
          dispatch(setFocusedUserVolt(volt));
        });
      };
      fetchProfileVlamList();
    }
  }, []);

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
