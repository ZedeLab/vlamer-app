import React from 'react';
import { styles } from './styles';
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
            <View style={styles.row}>
              <LottieIcon
                autoPlay={true}
                loop={false}
                src={require('../../../../assets/lottie/gift.json')}
                style={styles.iconBig}
              />
              <Text style={{ ...styles.status, ...styles.greenText }}>15k coins</Text>
            </View>
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
                Buy-in {Math.floor(Math.random() * 1000)} coins
              </Text>
            </View>
            <View style={styles.row}>
              <LottieIcon
                loop={false}
                src={require('../../../../assets/lottie/group.json')}
                style={styles.icon}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>
                {Math.floor(Math.random() * 10)} of {Math.floor(Math.random() * 1) + 20}
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
              <Text style={{ ...styles.text, ...styles.greyText, ...styles.iconHeartText }}>
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

export default VlamPostCard;
