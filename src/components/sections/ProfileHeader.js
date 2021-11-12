import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../services/auth';
import theme from '../../utils/theme';
import { AnimatedNumberText, LottieIcon } from '../common/animations';
import { AvatarIcon } from '../common/icons';
import { PrimaryButton, SecondaryButton } from '../common/buttons';
import { User } from '../../services/db/models/user';
import { useNavigation } from '@react-navigation/core';
import AddVlamScreen from '../screens/UserProfile/AddVlam.screen';

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
  const { account, admin, currentUser, accountConnections, children, ...restProps } = props;
  const navigation = useNavigation();

  // console.log('navigation: ', navigation);
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
                src={require('../../../assets/lottie/coin_hand.json')}
                style={styles.lottieIcon}
              />
              <View style={styles.accountStatusContainerTitle}>
                <AnimatedNumberText
                  value={403}
                  textStyle={{ ...styles.accountStatus, ...styles.accountStatus_highlighted }}
                />
                <Text style={{ ...styles.greyText, ...styles.thinText }}>in volt</Text>
              </View>
            </View>
            <View style={styles.accountStatusContainer}>
              <LottieIcon
                // autoPlay={false}
                src={require('../../../assets/lottie/action_coin.json')}
                style={styles.lottieIcon}
              />
              <View style={styles.accountStatusContainerTitle}>
                <AnimatedNumberText
                  value={262}
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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: theme.colors.common,
    paddingHorizontal: 0,
  },

  coverImageContainer: {
    width: Dimensions.get('window').width,
    height: theme.spacing(11),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: theme.spacing(11),
    opacity: 0.7,
  },

  sectionContainer: {
    justifyContent: 'center',
    backgroundColor: theme.colors.backdrop_light,
    height: theme.spacing(4),
    paddingHorizontal: theme.spacing(0.4),
    borderRadius: theme.shapes.borderRadios,
    ...theme.shadows[4],
    alignSelf: 'center',
  },

  actionsContainer: {
    alignItems: 'flex-end',
  },

  sectionsWrapper: {
    flexDirection: 'row',
    height: theme.spacing(12),
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
  },

  userInfoSection: {
    paddingTop: theme.spacing(2.8),
  },

  accountCallToActions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    alignSelf: 'flex-end',
    position: 'relative',
    bottom: -theme.spacing(2.2),
    // left: theme.spacing(1),
  },

  editButton: {
    height: theme.spacing(2),
  },

  text: {
    fontFamily: 'openSans-bold',
    textAlign: 'center',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textPrimary,
  },
  stateText: {
    color: theme.colors.accent_dark,
    ...theme.shadows[4],
  },

  displayName: {
    textAlign: 'left',
    fontSize: theme.spacing(1.3),
    color: theme.colors.textPrimary,
  },
  userName: {
    textAlign: 'left',
    color: theme.colors.textDisabled,
  },

  bio: {
    textAlign: 'left',
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing(1),
  },

  lottieIcon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    margin: 0,
  },

  accountStatusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.textPrimary,

    padding: theme.spacing(0.1),
    borderRadius: theme.shapes.borderRadios,
    // marginLeft: theme.spacing(1),
  },
  accountStatusContainerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountStatus: {
    fontFamily: 'openSans-bold',
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(0.8),
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginRight: theme.spacing(0.5),
  },
  accountStatusText: {
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(0.9),
  },

  accountStatus_highlighted: {
    color: theme.colors.accent,
  },

  greyText: {
    color: theme.colors.textDisabled,
  },
  thinText: {
    fontFamily: 'openSans',
  },
});
