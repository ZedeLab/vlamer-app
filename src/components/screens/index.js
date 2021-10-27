import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import { PrimaryButton } from "../common/buttons";
import { InputText } from "../common/inputs";

const Login = (params) => {
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState("");

  return (
    <View style={styles.container}>
      <Subheading style={styles.text}> Welcome back </Subheading>
      <InputText
        style={styles.item}
        placeholder='User'
        value={user}
        onChangeText={(newValue) => setUser(newValue)}
      />
      <InputText
        style={styles.item}
        placeholder='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
      />

      <PrimaryButton
        icon='account'
        style={styles.item}
        onPress={() => console.log("Login Pressed")}
      >
        Login
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  text: {
    textAlign: "center",
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
