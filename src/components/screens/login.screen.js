import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import { FullscreenAux } from "../hoc/FullscreenAux";
import { PageAux } from "../hoc/PageAux";
import { LogInForm } from "../sections/forms/login";
import theme from "../../utils/theme";

class Login extends Component {
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
            source={require("../../../assets/lottie/bot.json")}
            autoPlay
            loop
            style={styles.botAnim}
          />
          <LogInForm navigation={this.props.navigation} />
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
  botAnim: {
    marginTop: theme.spacing(1),
    width: "55%",
    alignSelf: "center",
  },
});

export default Login;
