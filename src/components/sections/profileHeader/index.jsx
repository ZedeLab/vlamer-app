import React, { useState } from 'react';
import { styles } from './styles';
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../../../services/auth';
import theme from '../../../utils/theme';
import { AnimatedNumberText, LottieIcon } from '../../common/animations';
import { AvatarIcon } from '../../common/icons';
import { DangerButton, PrimaryButton, SecondaryButton, SuccessButton } from '../../common/buttons';
import { useNavigation } from '@react-navigation/core';
import {
  deleteConnectionRequest,
  getConnectionByInvolvedUsers,
  sendConnectionRequest,
} from '../../../db/queries/user/connections';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';
import { useUserConnections } from '../../../services/userConnectionsAccess';
import { ConnectionTypes } from '../../../db/models/UserConnections';
import { Badge } from 'react-native-paper';

export const AnimatedCoverImage = ({
  navigation,
  avatarURL,
  coverImageURL,
  followers,
  following,
}) => {
  const coverImage = { uri: coverImageURL };
  const { user } = useAuth();
  const { hasUserPendingSentRequests, hasUserPendingReceivedRequests } = useUserConnections();

  const gotToConnectionsScreen = () => {
    navigation.push('Connections');
  };

  return (
    <ImageBackground
      source={coverImage}
      resizeMode="cover"
      blurRadius={3}
      imageStyle={styles.coverImage}
      style={styles.coverImageContainer}
    >
      <View style={styles.avatarContainer}>
        <AvatarIcon imgSrc={avatarURL} style={styles.avatar} size={theme.spacing(5)} />
      </View>
      <TouchableWithoutFeedback onPress={gotToConnectionsScreen}>
        <View style={styles.sectionContainer}>
          {hasUserPendingSentRequests(user.id) && <Badge size={7}></Badge>}
          <AnimatedNumberText
            value={parseInt(followers)}
            textStyle={{ ...styles.text, ...styles.stateText }}
          />

          <Text style={styles.text}>followers</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={gotToConnectionsScreen}>
        <View style={styles.sectionContainer}>
          {hasUserPendingReceivedRequests(user.id) && <Badge size={7}></Badge>}
          <AnimatedNumberText
            value={parseInt(following)}
            textStyle={{ ...styles.text, ...styles.stateText }}
          />
          <Text style={styles.text}>following</Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export const AdminViewActionButtons = (props) => {
  const { navigation, ...restProps } = props;

  const startNewVlamHandler = () => {
    navigation.push('AddVlam');
  };

  return (
    <View style={styles.actionsContainer}>
      <PrimaryButton outlined style={styles.editButton}>
        Edit
      </PrimaryButton>
      <SecondaryButton style={styles.editButton} onPress={startNewVlamHandler}>
        New
      </SecondaryButton>
    </View>
  );
};

export const UserViewActionButtons = (props) => {
  const { user } = useAuth();
  const { focusedUser } = useSelector(selectActors);
  const { isUserConnected, hasUserPendingUserConnection, isUserFollowing, isFollowingUser } =
    useUserConnections();

  const connectHandler = async () => {
    if (hasUserPendingUserConnection(focusedUser.id)) {
      unsubscribeHandler();
    } else {
      const [reqSuccessful, reqError] = await sendConnectionRequest(user, focusedUser);
      reqError && console.log(reqError);
    }
  };

  const unsubscribeHandler = async () => {
    const [connection, fetchError] = await getConnectionByInvolvedUsers(user.id, focusedUser.id);
    fetchError && console.log('fetchConnectionError: ', fetchError);

    if (
      connection &&
      connection[0].status ===
        (ConnectionTypes.status.PENDING || connection[0].status === ConnectionTypes.status.ACCEPTED)
    ) {
      const [isDeleted, deleteError] = await deleteConnectionRequest(user.id, connection[0].id);
      deleteError && console.log('deletedError: ', deleteError);
    }
  };

  return (
    <View style={styles.actionsContainer}>
      {isUserFollowing(user.id, focusedUser.id) ? (
        <View>
          <DangerButton style={styles.editButton} onPress={unsubscribeHandler}>
            unsubscribe
          </DangerButton>
          <SecondaryButton
            outlined
            style={styles.editButton}
            onPress={() => navigate('Chat Room', { data: { receiver: focusedAccount } })}
          >
            Message
          </SecondaryButton>
        </View>
      ) : (
        <View>
          <SuccessButton style={styles.editButton} onPress={connectHandler}>
            {hasUserPendingUserConnection(focusedUser.id) ? 'pending' : 'connect'}
          </SuccessButton>
        </View>
      )}
    </View>
  );
};

export default ProfileUserCard = (props) => {
  const { user } = useAuth();
  const { account, admin, currentUser, userVolt, accountConnections, children, ...restProps } =
    props;
  const navigation = useNavigation();
  const { totalNumberOfFollowers, totalNumberOfUsersFollowing } = useUserConnections();

  return (
    <View style={styles.container}>
      <AnimatedCoverImage
        navigation={navigation}
        avatarURL={account.avatarURL}
        coverImageURL={account.coverImageURL}
        followers={totalNumberOfFollowers(user.id)}
        following={totalNumberOfUsersFollowing(user.id)}
      />
      <View style={styles.sectionsWrapper}>
        <View style={styles.userInfoSection}>
          <Text style={{ ...styles.text, ...styles.displayName }}>
            {account.firstName + ' ' + account.lastName}
          </Text>
          <Text style={{ ...styles.text, ...styles.userName }}>@{account.username}</Text>
          <Text style={{ ...styles.text, ...styles.bio }}>
            Before you begin, promise to finish❤️
          </Text>
          <View style={styles.accountCallToActions}>
            <View style={styles.accountStatusContainer}>
              <LottieIcon
                // autoPlay={false}
                src={require('../../../../assets/lottie/coin_hand.json')}
                style={styles.lottieIcon}
              />
              <View style={styles.accountStatusContainerTitle}>
                <AnimatedNumberText
                  value={userVolt.account.inVoltCoins}
                  textStyle={{ ...styles.accountStatus, ...styles.accountStatus_highlighted }}
                />
                <Text style={{ ...styles.greyText, ...styles.thinText }}>in volt</Text>
              </View>
            </View>
            <View style={styles.accountStatusContainer}>
              <LottieIcon
                // autoPlay={false}
                src={require('../../../../assets/lottie/action_coin.json')}
                style={styles.lottieIcon}
              />
              <View style={styles.accountStatusContainerTitle}>
                <AnimatedNumberText
                  value={userVolt.inAction.coinsOnAction}
                  textStyle={{ ...styles.accountStatus, ...styles.accountStatus_highlighted }}
                />
                <Text style={{ ...styles.greyText, ...styles.thinText }}>in action</Text>
              </View>
            </View>
          </View>
        </View>
        {user.id === account.id ? (
          <AdminViewActionButtons navigation={navigation} />
        ) : (
          <UserViewActionButtons focusedAccount={account} navigation={navigation} />
        )}
      </View>
    </View>
  );
};
