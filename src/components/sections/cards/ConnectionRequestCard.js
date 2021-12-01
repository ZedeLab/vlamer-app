import React from 'react';
import { styles } from './styles';
import CardWrapper from '../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../services/auth';
import { DangerButton, SuccessButton } from '../../common/buttons';
import {
  acceptConnectionRequest,
  ignoreConnectionRequest,
} from '../../../db/queries/user/connections';

const ConnectionRequestCard = (props) => {
  const { id, firstName, lastName, username, createdAt, parentId, ...restProps } = props;

  const { user } = useAuth();
  const dispatch = useDispatch();

  const acceptRequest = async () => {
    const [reqStatus, reqError] = await acceptConnectionRequest(parentId, id);

    reqError && console.log('error: ', reqError);
  };

  const ignoreRequest = async () => {
    const [reqStatus, reqError] = await ignoreConnectionRequest(parentId, id);

    reqError && console.log('error: ', reqError);
  };

  return (
    <CardWrapper style={styles.row}>
      <View style={styles.fullWidth}>
        <Avatar.Image size={44} source={{ uri: '' }} />
        <View style={styles.row}>
          <TouchableWithoutFeedback style={styles.headerUserSection}>
            <View style={styles.centered_row}>
              <Text style={{ ...styles.text, ...styles.title }}>{firstName + ' ' + lastName}</Text>
              <Text style={styles.highlight}>
                {'@'}
                {username}
              </Text>
              <Text style={styles.greyText}>{createdAt}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.row}>
            <SuccessButton onPress={acceptRequest}>accept</SuccessButton>
            <DangerButton onPress={ignoreRequest}>ignore</DangerButton>
          </View>
        </View>
      </View>
    </CardWrapper>
  );
};

export default ConnectionRequestCard;
