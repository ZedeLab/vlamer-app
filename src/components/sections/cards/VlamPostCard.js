import React from 'react';
import CardWrapper from '../../hoc/CardWrapper';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../../../utils/theme';
import { Avatar, Caption, Card, Divider, IconButton, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreen, UserProfileScreen } from '../../screens';
import { setFocusedUser, setFocusedUserConnections } from '../../../store/actors';
import { useDispatch } from 'react-redux';
import { getUserById, getUserConnections } from '../../../services/db';
import { ProfileStackScreen } from '../../../routes/cta/screens';
import { LottieIcon } from '../../common/animations';

const VlamPostCard = (props) => {
  const {
    firstName,
    userName,
    userAvatar,
    postedAt,
    vlamType,
    description,
    navigation,
    ...restProps
  } = props;
  const dispatch = useDispatch();

  const goToProfileHandler = async () => {
    const [userProfile, error] = await getUserById('Ni2VdynpZVTcpIfpOnOj9Y2gQJ83');

    if (userProfile) {
      const [userConnections, error] = await getUserConnections(userProfile.id);

      if (userConnections) {
        dispatch(setFocusedUser(userProfile));
        dispatch(setFocusedUserConnections(userConnections));
        navigation.push('Profile', { screen: ProfileScreen, userId: firstName });
      } else {
        console.log(error);
      }
    } else {
      console.log(error);
    }
  };

  return (
    <CardWrapper>
      <View style={styles.headerContainer}>
        <Avatar.Image size={44} source={{ uri: userAvatar }} />
        <View style={styles.innerHeaderContainer}>
          <TouchableWithoutFeedback style={styles.headerUserSection} onPress={goToProfileHandler}>
            <View>
              <Text style={{ ...styles.text, ...styles.title }}>{firstName}</Text>
              <Text style={styles.highlight}>
                {'@'}
                {userName}
              </Text>
              <Text style={styles.greyText}>{postedAt}</Text>
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
      <Paragraph style={{ ...styles.text, ...styles.description }}>{description}</Paragraph>
      <View style={styles.mainSection}>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.status, ...styles.greenText }}>15k$</Text>
            <Text style={{ ...styles.text, ...styles.greyText }}>winning chance 3%</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.text, ...styles.greyText, ...styles.redText }}>
              Ending soon
            </Text>
            <Text style={{ ...styles.text, ...styles.greyText, ...styles.redText }}>
              2 remaining
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
              <Text style={{ ...styles.text, ...styles.greyText }}>
                {Math.floor(Math.random() * 1000)} {'price'}
              </Text>
            </View>
            <View style={styles.row}>
              <LottieIcon
                loop={false}
                src={require('../../../../assets/lottie/winner.json')}
                style={styles.icon}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>
                {Math.floor(Math.random() * 1000)} {'winning'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.section}>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={false}
                src={require('../../../../assets/lottie/heart.json')}
                style={styles.icon}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>
                {Math.floor(Math.random() * 1000)} {'likes'}
              </Text>
            </View>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={false}
                src={require('../../../../assets/lottie/comment.json')}
                style={styles.icon_small}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>
                {Math.floor(Math.random() * 1000)} {'comments'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: theme.spacing(0.3),
  },
  mainSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing(0.2),
  },
  section: {
    width: '50%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    lineHeight: theme.spacing(1),
  },
  title: {
    fontSize: theme.spacing(1),
    textTransform: 'capitalize',
    color: theme.colors.textPrimary,
  },
  description: {
    paddingHorizontal: theme.spacing(0.5),
    fontSize: theme.spacing(0.8),
  },
  highlight: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.accent,
  },
  greyText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textDisabled,
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(0.5),
  },
  divider: {
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing(0.3),
    // marginHorizontal: theme.spacing(1),
    opacity: 0.7,
  },
  headerUserSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerMainSection: {
    width: '65%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  status: {
    fontFamily: 'openSans-bold',
    textTransform: 'lowercase',
    textAlign: 'center',
    color: theme.colors.accent,
    fontSize: theme.spacing(0.6),
    // width: theme.spacing(10),
  },
  greenText: {
    fontSize: theme.spacing(1.2),
    color: theme.colors.success,
  },
  redText: {
    color: theme.colors.error,
  },
  icon: {
    justifyContent: 'center',
    width: theme.spacing(1.8),
    height: theme.spacing(1.8),
  },
  icon_small: {
    justifyContent: 'center',
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VlamPostCard;
