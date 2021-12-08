import React from 'react';
import { styles } from './styles';
import CardWrapper from '../../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../../services/auth';
import { DangerButton, SuccessButton } from '../../../common/buttons';
import { setFocusedUser } from '../../../../store/actors';
import { getUserById } from '../../../../db/queries/user';
import { useNavigation } from '@react-navigation/core';
import { ProfileScreen } from '../../../screens';

const ConnectionRequestNotificationCard = (props) => {
  const {
    id,
    accountId,
    avatar,
    firstName,
    lastName,
    username,
    createdAt,
    notificationMessage,
    ...restProps
  } = props;

  const { user } = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToProfileHandler = async () => {
    const [focusedUser, focusedUserError] = await getUserById(accountId);

    if (focusedUser) {
      dispatch(setFocusedUser(focusedUser));

      if (user.id === accountId) {
        navigation.navigate('User');
      } else {
        navigation.push('Profile', { screen: ProfileScreen, userId: firstName });
      }
    } else {
      console.log('Problem fetching user account');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Avatar.Image size={44} source={{ uri: avatar }} />
        <View style={styles.userInfoContainer}>
          <TouchableWithoutFeedback onPress={goToProfileHandler}>
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
