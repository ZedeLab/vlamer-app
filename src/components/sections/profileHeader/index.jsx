import React from 'react';
import { styles } from './styles';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../services/auth';
import theme from '../../../utils/theme';
import { AnimatedNumberText, LottieIcon } from '../../common/animations';
import { AvatarIcon } from '../../common/icons';
import { PrimaryButton, SecondaryButton } from '../../common/buttons';
import { User } from '../../../services/db/models/user';
import { useNavigation } from '@react-navigation/core';
import AddVlamScreen from '../../screens/UserProfile/AddVlam.screen';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';

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
  const { focusedAccount } = props;
  const { user } = useAuth();

  const followUserHandler = async () => {};

  return (
    <View style={styles.actionsContainer}>
      <SecondaryButton style={styles.editButton}> follow</SecondaryButton>
      <PrimaryButton outlined style={styles.editButton}>
        Message
      </PrimaryButton>
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
        followers={accountConnections.connections.length}
        following={accountConnections.connections.length}
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
                  value={userVolt.volt.account.totalCoins}
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
                  value={userVolt.volt.inAction.totalCoinsOnAction}
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
