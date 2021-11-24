import React from 'react';
import { styles } from './styles';
import CardWrapper from '../../hoc/CardWrapper';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Divider, Paragraph } from 'react-native-paper';
import { ProfileScreen } from '../../screens';
import { setFocusedUser } from '../../../store/actors';
import { useDispatch } from 'react-redux';
import { LottieIcon } from '../../common/animations';

const VlamPostCard = (props) => {
  const {
    authorAccount,
    createdAt,
    vlamType,
    message,
    navigation,
    numberOfParticipants,
    participatingPrice,
    winingPrice,
    ...restProps
  } = props;

  const dispatch = useDispatch();

  const goToProfileHandler = async () => {
    dispatch(setFocusedUser(authorAccount));

    navigation.push('Profile', { screen: ProfileScreen, userId: authorAccount?.firstName });
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
        <TouchableWithoutFeedback>
          <View style={styles.section}>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={false}
                src={require('../../../../assets/lottie/heart.json')}
                style={styles.icon}
              />
              <Text style={{ ...styles.text, ...styles.greyText, ...styles.iconHeartText }}>
                0 likes
              </Text>
            </View>
            <View style={styles.row}>
              <LottieIcon
                autoPlay={false}
                src={require('../../../../assets/lottie/comment.json')}
                style={styles.icon_small}
              />
              <Text style={{ ...styles.text, ...styles.greyText }}>0 comments</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </CardWrapper>
  );
};

export default VlamPostCard;
