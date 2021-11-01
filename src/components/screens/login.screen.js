import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { FullscreenAux } from '../hoc/FullscreenAux';
import { PageAux } from '../hoc/PageAux';
import { LogInForm } from '../sections/forms/login';
import theme from '../../utils/theme';
import { LottieAnimation } from '../common/animations';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FullscreenAux>
        <View style={styles.container}>
          <LottieAnimation
            src={require('../../../assets/lottie/bot.json')}
            loadFallBack={{
              type: 'auth',
              src: require('../../../assets/lottie/wave.json'),
            }}
            style={styles.botAnim}
          />

          <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <LogInForm navigation={this.props.navigation} />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </FullscreenAux>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  botAnim: {
    marginTop: theme.spacing(1),
    width: '55%',
    alignSelf: 'center',
  },
});

export default Login;
