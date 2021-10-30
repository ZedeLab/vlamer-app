import React, { useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Divider,
  Snackbar,
  Subheading,
  Surface,
} from "react-native-paper";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  PrimaryButton,
} from "../../../common/buttons";
import { InputText } from "../../../common/inputs";
import * as formikHelpers from "./__formik-helper";
import { StyleSheet, View, Text } from "react-native";
import theme from "../../../../utils/theme";
import { useAuth } from "../../../../services/auth";
import { notifyErrorResolved, selectError } from "../../../../store/errors";

export const LogInForm = ({ navigation }) => {
  const errors = useSelector(selectError);
  const dispatch = useDispatch();

  const { signInWithFacebook, signInWithEmail, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (errors.type !== null) {
      setTimeout(() => {
        dispatch(notifyErrorResolved());
      }, 5000);
    }
  }, [errors]);

  const googleAuthHandler = async () => {
    const user = await signInWithGoogle();
  };

  const facebookAuthHandler = () => {
    signInWithFacebook();
  };

  const onSubmitHandler = async (values, actions) => {
    const {
      [formikHelpers.fieldNames.email]: email,
      [formikHelpers.fieldNames.password]: password,
    } = values;
    const account = await signInWithEmail(email, password);

    if (account) {
      navigation.navigate("Home");
    }
  };

  return (
    <Surface style={styles.container}>
      {errors?.type !== null && (
        <Text style={styles.errorText}> {errors.message} </Text>
      )}
      <FacebookLoginButton
        style={styles.item}
        onPress={facebookAuthHandler}
      ></FacebookLoginButton>
      <GoogleLoginButton style={styles.item} onPress={googleAuthHandler}>
        Login with Google
      </GoogleLoginButton>
      <View style={styles.dividersContainer}>
        <Divider style={styles.divider} />
        <Text> Or </Text>
        <Divider style={styles.divider} />
      </View>

      <Formik
        initialValues={formikHelpers.initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={formikHelpers.validationSchema}
      >
        {({ handleChange, values, handleSubmit, errors }) => (
          <View>
            {errors[formikHelpers.fieldNames.email] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.email]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.email}
              placeholder='jone@doe.com'
              onChangeText={handleChange(formikHelpers.fieldNames.email)}
              value={values[formikHelpers.fieldNames.email]}
            />
            {errors[formikHelpers.fieldNames.password] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.password]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.password}
              placeholder='min 6 characters'
              secureTextEntry={true}
              onChangeText={handleChange(formikHelpers.fieldNames.password)}
              value={values[formikHelpers.fieldNames.password]}
            />

            <PrimaryButton
              icon='account'
              style={styles.item}
              onPress={handleSubmit}
            >
              Login
            </PrimaryButton>
            <View style={styles.footer}>
              <Text>Dont have an account </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Register")}
              >
                Register
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
