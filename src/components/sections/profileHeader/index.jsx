import React, { useState } from 'react';
import { styles } from './styles';
import { ImageBackground, Text, View } from 'react-native';
import { useAuth } from '../../../services/auth';
import theme from '../../../utils/theme';
import { AnimatedNumberText, LottieIcon } from '../../common/animations';
import { AvatarIcon } from '../../common/icons';
import { DangerButton, PrimaryButton, SecondaryButton, SuccessButton } from '../../common/buttons';
import { useNavigation } from '@react-navigation/core';
import { sendConnectionRequest } from '../../../db/queries/user/connections';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';
import { useUserConnections } from '../../../services/userConnectionsAccess';

export const AnimatedCoverImage = ({ avatarURL, coverImageURL, followers, following }) => {
  const coverImage = { uri: coverImageURL };
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
      <View style={styles.sectionContainer}>
        <AnimatedNumberText value={followers} textStyle={{ ...styles.text, ...styles.stateText }} />

        <Text style={styles.text}>followers</Text>
      </View>
      <View style={styles.sectionContainer}>
        <AnimatedNumberText value={following} textStyle={{ ...styles.text, ...styles.stateText }} />
        <Text style={styles.text}>following</Text>
      </View>
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
  // const { focusedAccount } = props;
  const { user } = useAuth();
  const { focusedUser } = useSelector(selectActors);
  const { isUserConnected, hasPendingUserConnection } = useUserConnections();

  const connectHandler = async () => {
    if (isUserConnected(focusedUser.id)) {
    } else {
      // const [reqSuccessful, reqError] = await unlikeVlamPost(user.id, id, authorAccount.id);
      const [reqSuccessful, reqError] = await sendConnectionRequest(user, focusedUser);
      console.log(reqError);
    }
  };

  return (
    <View style={styles.actionsContainer}>
      {isUserConnected(focusedUser.id) ? (
        <View>
          <DangerButton style={styles.editButton}> unsubscribe </DangerButton>
          <SecondaryButton outlined style={styles.editButton}>
            Message
          </SecondaryButton>
        </View>
      ) : (
        <View>
          <SuccessButton style={styles.editButton} onPress={connectHandler}>
            {hasPendingUserConnection(focusedUser.id) ? 'pending' : 'connect'}
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

  return (
    <View style={styles.container}>
      <AnimatedCoverImage
        avatarURL={account.avatarURL}
        coverImageURL={account.coverImageURL}
        followers={accountConnections.length}
        following={accountConnections.length}
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
