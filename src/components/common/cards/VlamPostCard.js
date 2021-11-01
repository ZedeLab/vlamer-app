import React from "react";
import CardWrapper from "../../hoc/CardWrapper";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import theme from "../../../utils/theme";
import {
  Avatar,
  Caption,
  Card,
  Divider,
  IconButton,
  Paragraph,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const VlamPostCard = (props) => {
  const {
    firstName,
    userName,
    userAvatar,
    postedAt,
    vlamType,
    description,
    ...restProps
  } = props;

  return (
    <CardWrapper>
      <View style={styles.headerContainer}>
        <Avatar.Image size={44} source={{ uri: userAvatar }} />
        <View style={styles.innerHeaderContainer}>
          <TouchableWithoutFeedback
            style={styles.headerUserSection}
            onPress={() => console.log(userName, " profile")}
          >
            <View>
              <Text style={{ ...styles.text, ...styles.title }}>
                {firstName}
              </Text>
              <Caption style={styles.highlight}>
                {"@"}
                {userName}
              </Caption>
              <Caption style={styles.time}>{postedAt}</Caption>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerMainSection}>
            <TouchableWithoutFeedback>
              <Text style={{ ...styles.text, ...styles.status }}>
                {vlamType}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Paragraph style={{ ...styles.text, ...styles.description }}>
        {description}
      </Paragraph>
      <View style={styles.mainSection}>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.status, ...styles.greenText }}>15k$</Text>
            <Text style={{ ...styles.text, ...styles.time }}>
              winning chance 3%
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <Text style={{ ...styles.text, ...styles.time, ...styles.redText }}>
              Ending soon
            </Text>
            <Text style={{ ...styles.text, ...styles.time, ...styles.redText }}>
              2 remaining
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.mainSection}>
        <TouchableWithoutFeedback>
          <View style={styles.section}>
            <Ionicons size={20} style={styles.icon} name='heart-outline' />
            <Ionicons size={20} style={styles.icon} name='chatbox-outline' />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.section}>
            <Ionicons size={20} style={styles.icon} name='flame-outline' />
            <Ionicons size={20} style={styles.icon} name='fitness-outline' />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: theme.spacing(0.5),
  },
  mainSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: theme.spacing(0.5),
  },
  section: {
    width: "50%",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontFamily: "openSans",
    color: theme.colors.textPrimary,
    lineHeight: theme.spacing(1),
    letterSpacing: 1.2,
  },
  title: {
    fontSize: theme.spacing(1),
    textTransform: "capitalize",
    color: theme.colors.textPrimary,
  },
  description: {
    paddingHorizontal: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.spacing(0.8),
  },
  highlight: {
    fontFamily: "openSans",
    fontSize: theme.spacing(0.7),
    color: theme.colors.accent,
  },
  time: {
    fontFamily: "openSans",
    fontSize: theme.spacing(0.7),
    color: theme.colors.disabled,

    // marginTop: theme.spacing(0.5),
  },
  innerHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: theme.spacing(0.7),
  },
  divider: {
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing(0.5),
    marginHorizontal: theme.spacing(1),
    opacity: 0.7,
  },
  headerUserSection: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerMainSection: {
    width: "65%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  status: {
    fontFamily: "openSans-bold",
    textTransform: "lowercase",
    textAlign: "center",
    color: theme.colors.accent,
    fontSize: theme.spacing(0.6),
    width: theme.spacing(10),
  },
  greenText: {
    fontSize: theme.spacing(1.2),
    color: theme.colors.success,
  },
  redText: {
    color: theme.colors.error,
  },
});

export default VlamPostCard;
