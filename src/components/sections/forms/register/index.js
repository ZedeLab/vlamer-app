import React from "react";
import { Formik } from "formik";
import { Button, Divider, Subheading, Surface } from "react-native-paper";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  PrimaryButton,
} from "../../../common/buttons";
import { InputText } from "../../../common/inputs";
import * as formikHelpers from "./__formik-helper";
import { StyleSheet, View, Text } from "react-native";
import theme from "../../../../utils/theme";

export const RegisterForm = ({ navigation }) => {
  return (
    <Surface style={styles.container}>
      {/* <FacebookLoginButton
        style={styles.item}
        onPress={() => console.log("Facebook login")}
      ></FacebookLoginButton>
      <GoogleLoginButton
        style={styles.item}
        onPress={() => console.log("Google login")}
      >
        Login with Google
      </GoogleLoginButton>
      <View style={styles.dividersContainer}>
        <Divider style={styles.divider} />
        <Text> Or </Text>
        <Divider style={styles.divider} />
      </View> */}

      <Formik
        initialValues={formikHelpers.initialValues}
        onSubmit={(values, actions) => navigation.navigate("Home")}
        validationSchema={formikHelpers.validationSchema}
      >
        {({ handleChange, values, handleSubmit, errors }) => (
          <View>
            {errors[formikHelpers.fieldNames.name] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.name]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.name}
              placeholder='jone@doe.com'
              onChangeText={handleChange(formikHelpers.fieldNames.name)}
              value={values[formikHelpers.fieldNames.name]}
            />
            {errors[formikHelpers.fieldNames.email] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.email]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.email}
              placeholder='min 6 characters'
              secureTextEntry={true}
              onChangeText={handleChange(formikHelpers.fieldNames.email)}
              value={values[formikHelpers.fieldNames.email]}
            />
            {errors[formikHelpers.fieldNames.gender] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.gender]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.gender}
              placeholder='jone@doe.com'
              onChangeText={handleChange(formikHelpers.fieldNames.gender)}
              value={values[formikHelpers.fieldNames.gender]}
            />
            {errors[formikHelpers.fieldNames.password] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.password]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.password}
              placeholder='jone@doe.com'
              onChangeText={handleChange(formikHelpers.fieldNames.password)}
              value={values[formikHelpers.fieldNames.password]}
            />
            {errors[formikHelpers.fieldNames.confirmPassword] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.confirmPassword]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.confirmPassword}
              placeholder='jone@doe.com'
              onChangeText={handleChange(
                formikHelpers.fieldNames.confirmPassword
              )}
              value={values[formikHelpers.fieldNames.confirmPassword]}
            />
            <PrimaryButton
              icon='account'
              style={styles.item}
              onPress={handleSubmit}
            >
              Register
            </PrimaryButton>
            <View style={styles.footer}>
              <Text>Already have an account </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    width: theme.spacing(22),
  },
  dividersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  divider: {
    width: "35%",
    backgroundColor: theme.colors.divider,
    margin: theme.spacing(1),
  },
  link: {
    color: theme.colors.accent,
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  errorText: {
    fontSize: theme.spacing(0.8),
    color: theme.colors.error,
    alignSelf: "center",
  },
});
