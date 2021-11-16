import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { FullscreenAux } from '../../hoc/FullscreenAux';
import { PageAux } from '../../hoc/PageAux';
import { LogInForm } from '../../sections/forms/login';
import theme from '../../../utils/theme';
import { RegisterForm } from '../../sections/forms/register';
import { LottieAnimation } from '../../common/animations';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  render() {
    return (
      <FullscreenAux>
        <View style={styles.container}>
          <LottieAnimation
            src={require('../../../../assets/lottie/bot2.json')}
            loadFallBack={{
              type: 'auth',
              src: require('../../../../assets/lottie/wave.json'),
            }}
            style={styles.botAnim}
          />
          <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <RegisterForm navigation={this.props.navigation} />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </FullscreenAux>
    );
  }
}

export default Register;
