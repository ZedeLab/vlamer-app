import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { PrimaryButton } from '../../../common/buttons';
import { InputText } from '../../../common/inputs';
import * as formikHelpers from './__formik-helper';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../../../../utils/theme';
import { useAuth } from '../../../../services/auth';
import { notifyErrorResolved, selectError } from '../../../../store/errors';
import { notifyLoadingFinish, notifyLoadingStart } from '../../../../store/loading';

export const RegisterForm = ({ navigation }) => {
  const { signUpWithEmail } = useAuth();
  const errors = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.type !== null) {
      setTimeout(() => {
        dispatch(notifyErrorResolved());
      }, 5000);
    }
  }, [errors]);

  const onSubmitHandler = async (values, actions) => {
    dispatch(notifyLoadingStart({ type: 'auth' }));
    const {
      [formikHelpers.fieldNames.firstName]: firstName,
      [formikHelpers.fieldNames.lastName]: lastName,
      [formikHelpers.fieldNames.email]: email,
      [formikHelpers.fieldNames.password]: password,
    } = values;

    const account = await signUpWithEmail(firstName, lastName, email, password);

    if (account) {
      // navigation.navigate('App', { screen: 'Home' });
      console.log('Submitted');
    }
    dispatch(notifyLoadingFinish());
  };

  return (
    <Surface style={styles.container}>
      {errors?.type !== null && <Text style={styles.errorText}> {errors.message} </Text>}
      <Formik
        initialValues={formikHelpers.initialValues}
        onSubmit={async (values, actions) => onSubmitHandler(values, actions)}
        validationSchema={formikHelpers.validationSchema}
      >
        {({ handleChange, values, handleSubmit, errors }) => (
          <View style={styles.formContentContainer}>
            <InputText
              name={formikHelpers.fieldNames.firstName}
              label={formikHelpers.fieldNames.firstName}
              placeholder="Jon"
              autoComplete="name"
            />

            <InputText
              name={formikHelpers.fieldNames.lastName}
              label={formikHelpers.fieldNames.lastName}
              placeholder="Doe"
              autoComplete="name"
            />

            <InputText
              name={formikHelpers.fieldNames.email}
              label={formikHelpers.fieldNames.email}
              placeholder="jon@doe.com"
              autoComplete="email"
            />

            <InputText
              name={formikHelpers.fieldNames.password}
              label={formikHelpers.fieldNames.password}
              placeholder="min 6 character"
              secureTextEntry={true}
            />

            <InputText
              name={formikHelpers.fieldNames.confirmPassword}
              label={formikHelpers.fieldNames.confirmPassword}
              placeholder="min 6 characterAbel"
              secureTextEntry={true}
            />
            <PrimaryButton icon="account" style={styles.submitButton} onPress={handleSubmit}>
              Register
            </PrimaryButton>
            <View style={styles.footer}>
              <Text>Already have an account </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    paddingVertical: theme.spacing(0.8),
  },
  dividersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
