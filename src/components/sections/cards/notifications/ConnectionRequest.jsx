import React from 'react';
import { styles } from './styles';
import CardWrapper from '../../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../../services/auth';
import { DangerButton, SuccessButton } from '../../../common/buttons';
// import {
//   acceptConnectionRequest,
//   ignoreConnectionRequest,
// } from '../../../db/queries/user/connections';

const ConnectionRequestNotificationCard = (props) => {
  const {
    id,
    avatar,
    firstName,
    lastName,
    username,
    createdAt,
    notificationMessage,
    ...restProps
  } = props;

  const { user } = useAuth();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Avatar.Image size={44} source={{ uri: avatar }} />
      <View style={styles.userInfoContainer}>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.text, ...styles.title }}>{firstName + ' ' + lastName}</Text>
            <Text style={styles.highlight}>
              {'@'}
              {username}
            </Text>
            <Text style={styles.greyText}>Sent {createdAt}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.contentContainer}>
        <Paragraph style={{ ...styles.text, ...styles.message }}>{notificationMessage}</Paragraph>
        <View style={styles.actionContainer}>
          <SuccessButton style={styles.button}>accept</SuccessButton>
          <DangerButton style={styles.button}>ignore</DangerButton>
        </View>
      </View>
    </View>
  );
};

export default ConnectionRequestNotificationCard;
