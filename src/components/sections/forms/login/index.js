import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Divider, Snackbar, Subheading, Surface } from 'react-native-paper';
import { FacebookLoginButton, GoogleLoginButton, PrimaryButton } from '../../../common/buttons';
import { InputText } from '../../../common/inputs';
import * as formikHelpers from './__formik-helper';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../../../../utils/theme';
import { useAuth } from '../../../../services/auth';
import { notifyErrorResolved, selectError } from '../../../../store/errors';
import { useNavigation } from '@react-navigation/core';
import { notifyLoadingFinish, notifyLoadingStart } from '../../../../store/loading';

export const LogInForm = (props) => {
  const netError = useSelector(selectError);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { signInWithFacebook, signInWithEmail, signInWithGoogle } = useAuth();

  // Close error message after 5 sec of showing (if available)
  useEffect(() => {
    if (netError.type !== null) {
      setTimeout(() => {
        dispatch(notifyErrorResolved());
      }, 5000);
    }
  }, [netError]);

  const googleAuthHandler = async () => {
    dispatch(notifyLoadingStart({ type: 'auth' }));
    const account = await signInWithGoogle();

    if (account) {
      navigation.navigate('App', { screen: 'Home' });
    }
    dispatch(notifyLoadingFinish());
  };

  const facebookAuthHandler = () => {
    signInWithFacebook();
  };

  const onSubmitHandler = async (values, actions) => {
    dispatch(notifyLoadingStart({ type: 'auth' }));
    const {
      [formikHelpers.fieldNames.email]: email,
      [formikHelpers.fieldNames.password]: password,
    } = values;
    const account = await signInWithEmail(email, password);

    if (account) {
      navigation.navigate('App', { screen: 'Home' });
    }
    dispatch(notifyLoadingFinish());
  };

  return (
    <Surface style={styles.container}>
      <Formik
        initialValues={formikHelpers.initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={formikHelpers.validationSchema}
      >
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <View style={styles.formContentContainer}>
            {netError && <Text style={styles.errorText}> {netError.message} </Text>}
            <InputText
              name={formikHelpers.fieldNames.email}
              label={formikHelpers.fieldNames.email}
              placeholder="jone@doe.com"
            />

            <InputText
              name={formikHelpers.fieldNames.password}
              label={formikHelpers.fieldNames.password}
              placeholder="min 6 characters"
              secureTextEntry={true}
            />

            <PrimaryButton icon="account" style={styles.submitButton} onPress={handleSubmit}>
              Login
            </PrimaryButton>
            <View style={styles.footer}>
              <Text>Don't have an account </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </View>

            <View style={styles.dividersContainer}>
              <Divider style={styles.divider} />
              <Text> Or </Text>
              <Divider style={styles.divider} />
            </View>
            {errors?.type !== null && <Text style={styles.errorText}> {errors.message} </Text>}
            <FacebookLoginButton
              style={styles.button}
              onPress={facebookAuthHandler}
            ></FacebookLoginButton>
            <GoogleLoginButton style={styles.button} onPress={googleAuthHandler}>
              Login with Google
            </GoogleLoginButton>
          </View>
        )}
      </Formik>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing(1),
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  submitButton: {
    paddingVertical: theme.spacing(0.8),
  },
  button: {
    width: '90%',
  },
  dividersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: theme.spacing(1),
  },
  divider: {
    width: '35%',
    backgroundColor: theme.colors.divider,
    margin: theme.spacing(1),
  },
  link: {
    color: theme.colors.accent,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
  errorText: {
    fontSize: theme.spacing(0.8),
    color: theme.colors.error,
    alignSelf: 'center',
  },
  formContentContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: theme.spacing(1),
    height: '200%',
  },
});
