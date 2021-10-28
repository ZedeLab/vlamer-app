import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import { FullscreenAux } from "../hoc/FullscreenAux";
import { PageAux } from "../hoc/PageAux";
import { LogInForm } from "../sections/forms/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
    this.image = {
      uri: "https://images.unsplash.com/photo-1567201864585-6baec9110dac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
    };
  }

  render() {
    return (
      <FullscreenAux>
        <ImageBackground
          source={this.image}
          resizeMode='cover'
          style={styles.container}
        >
          <LogInForm navigation={this.props.navigation} />
        </ImageBackground>
      </FullscreenAux>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  image: {},
  text: {
    textAlign: "center",
    fontFamily: "playfair-display",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 25,
    fontSize: 25,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Login;
