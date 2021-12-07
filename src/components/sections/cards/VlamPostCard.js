import React, { useState } from 'react';
import { styles } from './styles';
import CardWrapper from '../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Divider, Paragraph } from 'react-native-paper';
import { ProfileScreen } from '../../screens';
import { setFocusedUser } from '../../../store/actors';
import { useDispatch } from 'react-redux';
import { LottieIcon } from '../../common/animations';
import { useAuth } from '../../../services/auth';
import { likeVlamPost, unlikeVlamPost } from '../../../db/queries/vlam/likes';
import { useLikesAccess } from '../../../services/likesAccess';
import { getUserById } from '../../../db/queries/user';
import { useNotificationsAccess } from '../../../services/notification';
import { Notification, NotificationTypes } from '../../../db/models/notification';

const VlamPostCard = (props) => {
  const {
    id,
    likes,
    authorAccount,
    createdAt,
    vlamType,
    totalLikes,
    message,
    navigation,
    numberOfParticipants,
    participatingPrice,
    winingPrice,
    likeIds,
    ...restProps
  } = props;

  const { user, expoPushToken } = useAuth();
  const dispatch = useDispatch();
  const { isVlamLiked } = useLikesAccess();
  const { sendPushNotification, dbQueryWithNotification, getVlamNotificationStarter } =
    useNotificationsAccess();

  const goToProfileHandler = async () => {
    const [focusedUser, focusedUserError] = await getUserById(authorAccount.id);

    if (focusedUser) {
      dispatch(setFocusedUser(focusedUser));

      if (user.id === authorAccount.id) {
        navigation.navigate('User');
      } else {
        navigation.push('Profile', { screen: ProfileScreen, userId: authorAccount?.firstName });
      }
    } else {
      console.log('Problem fetching user account');
    }
  };

  const likeVlamPostHandler = async () => {
    const [focusedUser, focusedUserError] = await getUserById(authorAccount.id);

    if (isVlamLiked(likeIds)) {
      const [reqSuccessful, reqError] = await unlikeVlamPost(user, focusedUser, id);
    } else {
      await dbQueryWithNotification(
        await likeVlamPost(user, focusedUser, id),
        (data) => console.log('success : '),
        (error) => console.log('failed: '),
        getVlamNotificationStarter(
          user.firstName,
          NotificationTypes.vlam.LIKE,
          focusedUser.deviceIds,
          user.id,
          focusedUser.id
        )
      );
    }
  };

  return (
    <CardWrapper>
      <View style={styles.headerContainer}>
        <Avatar.Image size={44} source={{ uri: authorAccount?.avatarURL }} />
        <View style={styles.innerHeaderContainer}>
          <TouchableWithoutFeedback style={styles.headerUserSection} onPress={goToProfileHandler}>
            <View>
              <Text style={{ ...styles.text, ...styles.title }}>{authorAccount?.firstName}</Text>
              <Text style={styles.highlight}>
                {'@'}
                {authorAccount?.username}
              </Text>
              <Text style={styles.greyText}>{createdAt}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerMainSection}>
            <TouchableWithoutFeedback>
              <Text style={{ ...styles.text, ...styles.status }}>{vlamType}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.messageContainer}>
        <Paragraph style={{ ...styles.text, ...styles.message }}>{message}</Paragraph>
      </View>
      <View style={styles.mainSection}>
        <TouchableWithoutFeedback>
          <View>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={true}
                loop={false}
                src={require('../../../../assets/lottie/gift.json')}
                style={styles.iconBig}
              />
              <Text style={{ ...styles.status, ...styles.greenText }}>{winingPrice} coins</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.text, ...styles.greyText, ...styles.redText }}>
              New starting
            </Text>
            <Text style={{ ...styles.text, ...styles.greyText, ...styles.redText }}>
              {numberOfParticipants} remaining
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.mainSection}>
        <TouchableWithoutFeedback>
          <View style={styles.section}>
            <View style={styles.row}>
              <LottieIcon
                loop={false}
                src={require('../../../../assets/lottie/price.json')}
                style={styles.icon_small}
              />
              <Text style={{ ...styles.text, ...styles.smallPrimaryText }}>
                Join for
                <Text style={{ ...styles.text, ...styles.redText }}>
                  {' ' + participatingPrice} coins
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <LottieIcon
                loop={false}
                src={require('../../../../assets/lottie/group.json')}
                style={styles.icon}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>
                0 of {numberOfParticipants}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.section}>
          <TouchableWithoutFeedback onPress={likeVlamPostHandler}>
            <View style={styles.row}>
              <LottieIcon
                withActive
                isActive={isVlamLiked(likeIds)}
                onNotActiveFrame={{ x: 7, y: 7 }}
                onActiveFrame={{ x: 41, y: 41 }}
                autoPlay={true}
                loop={false}
                src={require('../../../../assets/lottie/heart.json')}
                style={styles.iconHeart}
              />
              <Text style={{ ...styles.text, ...styles.greyText, ...styles.iconHeartText }}>
                {totalLikes} likes
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={true}
                loop={true}
                src={require('../../../../assets/lottie/comment.json')}
                style={styles.icon_small}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>0 comments</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </CardWrapper>
  );
};

export default VlamPostCard;
