import React from 'react';
import { styles } from './styles';
import CardWrapper from '../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { DangerButton } from '../../common/buttons';
import { deleteConnectionRequest } from '../../../db/queries/user/connections';
import { useUserConnections } from '../../../services/userConnectionsAccess';
import { useAuth } from '../../../services/auth';

const ConnectionsUserCard = (props) => {
  const { id, firstName, lastName, username, createdAt, parentId, eventOwnerId, ...restProps } =
    props;
  const { isUserFollowing, isFollowingUser } = useUserConnections();
  const { user } = useAuth();

  const unsubscribeUserConnection = async () => {
    const [reqStatus, reqError] = await deleteConnectionRequest(user.id, id);

    reqError && console.log('error: ', reqError);
  };

  return (
    <CardWrapper>
      <View style={styles.mainSection}>
        <View style={styles.row}>
          <Avatar.Image size={44} source={{ uri: '' }} />
          <TouchableWithoutFeedback style={styles.textSection}>
            <View style={styles.centered_row}>
              <Text style={{ ...styles.text, ...styles.title }}>{firstName + ' ' + lastName}</Text>
              <Text style={styles.highlight}>
                {'@'}
                {username}
              </Text>
              <Text style={styles.greyText}>{createdAt}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          {isUserFollowing(user.id, eventOwnerId) ? (
            <DangerButton onPress={unsubscribeUserConnection}> unsubscribe </DangerButton>
          ) : (
            <DangerButton onPress={unsubscribeUserConnection}>block</DangerButton>
          )}
        </View>
      </View>
    </CardWrapper>
  );
};

export default ConnectionsUserCard;
