import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import { FullscreenAux } from "../hoc/FullscreenAux";
import { PageAux } from "../hoc/PageAux";
import { LogInForm } from "../sections/forms/login";
import theme from "../../utils/theme";
import { RegisterForm } from "../sections/forms/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }

  render() {
    return (
      <FullscreenAux>
        <View style={styles.container}>
          <LottieView
            source={require("../../../assets/lottie/wave.json")}
            autoPlay
            loop
            style={styles.waveAnim}
          />
          <RegisterForm navigation={this.props.navigation} />
        </View>
      </FullscreenAux>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  waveAnim: {
    marginTop: theme.spacing(1),
    width: "70%",
    alignSelf: "center",
  },
});

export default Register;
