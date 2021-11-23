import * as React from 'react';
import { styles } from './styles';
import { Appbar, Avatar } from 'react-native-paper';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import theme from '../../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainLogoSlimRt } from '../../common/logos';

import { useAuth } from '../../../services/auth';
import { resetFocusedUser } from '../../../store/actors/focusedUser';
import { useDispatch } from 'react-redux';

const ProfileViewHeader = ({ current, navigation, route, ...restProps }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(resetFocusedUser());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.top}>
      <StatusBar animated={true} backgroundColor={theme.colors.common} barStyle="dark-content" />
      <Appbar style={styles.header}>
        <View style={styles.ctaContainer}>
          <TouchableWithoutFeedback onPress={goBackHandler}>
            <Ionicons name="arrow-back-circle-outline" size={23} color="black" />
          </TouchableWithoutFeedback>
          <Text style={styles.title}> {current ? user.firstName : route.params.userId} </Text>
        </View>

        <MainLogoSlimRt />
      </Appbar>
    </SafeAreaView>
  );
};

export default ProfileViewHeader;
