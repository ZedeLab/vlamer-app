import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PageProvider, Headline } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import * as Front from "expo-font";
import AppLoading from "expo-app-loading";
import RouteStack from "./src/routes";
import theme from "./src/utils/theme";

const fetchFonts = () => {
  return Front.loadAsync({
    "courier-prime": require("./assets/fonts/Courier_Prime/CourierPrime-Regular.ttf"),
    "courier-prime-bold": require("./assets/fonts/Courier_Prime/CourierPrime-Bold.ttf"),
    "playfair-display": require("./assets/fonts/Playfair_Display/PlayfairDisplaySC-Regular.ttf"),
    "playfair-display-bold": require("./assets/fonts/Courier_Prime/CourierPrime-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <PageProvider theme={theme}>
      <NavigationContainer>
        <RouteStack />
      </NavigationContainer>
    </PageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
