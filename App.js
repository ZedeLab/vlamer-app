import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PageProvider, Headline } from "react-native-paper";

export default function App() {
  return (
    <PageProvider>
      <View style={styles.container}>
        <Headline>Welcome to Vlamer</Headline>
        <StatusBar style='auto' />
      </View>
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
