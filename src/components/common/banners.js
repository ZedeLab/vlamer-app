import * as React from "react";
import slx from "classnames";
import { Image, StyleSheet, Text, View } from "react-native";
import { Banner, Headline, Subheading } from "react-native-paper";
import theme from "../../utils/theme";

export const CompleteRegistrationBanner = (props) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Banner
      visible={visible}
      style={
        (styles.container,
        visible ? styles.containerActive : styles.containerOff)
      }
      actions={[
        {
          label: "Send again",

          onPress: () => setVisible(false),
        },
        {
          label: "Dismiss",
          onPress: () => setVisible(false),
        },
      ]}
      icon={({ size }) => (
        <Image
          source={require("../../../assets/logo.png")}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    >
      <View style={styles.textContainer}>
        <Subheading style={styles.title}>welcome to Vlamer ❤️</Subheading>
        <Text style={styles.content}>Please verify your email to proceed</Text>
      </View>
    </Banner>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    marginTop: theme.spacing(3),
  },
  containerOff: {
    marginTop: theme.spacing(1),
  },
  container: {
    justifyContent: "flex-start",
    ...theme.shadows[2],
  },
  title: {
    fontFamily: "openSans-bold",

    fontSize: theme.spacing(1.1),
    color: theme.colors.textDisabled,
    letterSpacing: 2,
    alignSelf: "center",
    textTransform: "capitalize",
    marginBottom: theme.spacing(0.7),
  },
  textContainer: {},
  content: {
    fontSize: theme.spacing(0.9),
    color: theme.colors.textDisabled,
  },
});
