import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Subheading } from "react-native-paper";
import theme from "../../utils/theme";
import { PrimaryButton } from "../common/buttons";
import PageAux from "../hoc/PageAux";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Section 1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Section 2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Section 3",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abbsfsa",
    title: "Section 4",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91afsdf63",
    title: "Section 5",
  },
  {
    id: "58694a0f-3da1-471f-bd96-156571e29d72",
    title: "Section 6",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class Home extends Component {
  renderItem({ item }) {
    return <Item title={item.title} />;
  }
  render() {
    return (
      <PageAux>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </PageAux>
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

  text: {
    textAlign: "center",
    fontFamily: "playfair-display",
    letterSpacing: 2,
    color: "#fff",
    marginBottom: 25,
    fontSize: 25,
  },
  item: {
    width: "90%",
    height: theme.spacing(8),
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
});

export default Home;
