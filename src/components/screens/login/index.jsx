import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { FullscreenAux } from '../../hoc/FullscreenAux';
import { PageAux } from '../../hoc/PageAux';
import { LogInForm } from '../../sections/forms/login';
import theme from '../../../utils/theme';
import { LottieAnimation } from '../../common/animations';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullscreenAux>
        <View style={styles.animContainer}>
          <LottieAnimation
            src={require('../../../../assets/lottie/bot.json')}
            loadFallBack={{
              type: 'auth',
              src: require('../../../../assets/lottie/wave.json'),
            }}
            style={styles.botAnim}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <LogInForm navigation={this.props.navigation} />
        </ScrollView>
      </FullscreenAux>
    );
  }
}

export default Login;
