import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import PageAux from "../hoc/PageAux";

class SettingsScreen extends Component {
  render() {
    return (
      <PageAux>
        <Text> Setting screen</Text>
      </PageAux>
    );
  }
}

const styles = StyleSheet.create({});

export default SettingsScreen;
