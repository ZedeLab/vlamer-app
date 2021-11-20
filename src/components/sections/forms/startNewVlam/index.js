import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Divider, Subheading, Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { FacebookLoginButton, GoogleLoginButton, PrimaryButton } from '../../../common/buttons';
import { InputText } from '../../../common/inputs';
import * as formikHelpers from './__formik-helper';
import theme from '../../../../utils/theme';
import { notifyErrorResolved, selectError } from '../../../../store/errors';
import { notifyLoadingFinish, notifyLoadingStart } from '../../../../store/loading';

export default StartNewVlamForm = ({ navigation }) => {
  const errors = useSelector(selectError);
  const dispatch = useDispatch();

  const onSubmitHandler = async (values) => {
    dispatch(notifyLoadingStart({ type: 'auth' }));
    console.log(values);
    dispatch(notifyLoadingFinish());
  };

  const getProfitMargin = (profit, winningPrice, participatingPrice) => {
    return Number.parseInt((winningPrice / participatingPrice) * 2);
  };

  return (
    <Surface style={styles.container}>
      {errors?.type !== null && <Text style={styles.errorText}> {errors.message} </Text>}
      <Formik
        initialValues={formikHelpers.initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={formikHelpers.validationSchema}
      >
        {({ handleChange, values, handleSubmit, errors }) => (
          <View>
            <View style={styles.header}>
              <Text>Create a new vlam and start earing </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                learn more
              </Text>
            </View>
            <PrimaryButton icon="account" style={styles.submitButton} onPress={handleSubmit}>
              post
            </PrimaryButton>

            <View style={styles.dividersContainer}>
              <Divider style={styles.divider} />
              <Text> New vlam </Text>
              <Divider style={styles.divider} />
            </View>
            {errors[formikHelpers.fieldNames.winningPrice] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.winningPrice]}</Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.winningPrice}
              // onChangeText={handleChange(formikHelpers.fieldNames.winningPrice)}
              value={values[formikHelpers.fieldNames.winningPrice]}
            />

            {errors[formikHelpers.fieldNames.participatingPrice] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.participatingPrice]}
              </Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.participatingPrice}
              // onChangeText={handleChange(formikHelpers.fieldNames.winningPrice)}
              value={values[formikHelpers.fieldNames.participatingPrice]}
            />

            {errors[formikHelpers.fieldNames.profitMargin] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.profitMargin]}</Text>
            )}
            <InputText
              label={formikHelpers.fieldNames.profitMargin}
              // onChangeText={handleChange(formikHelpers.fieldNames.winningPrice)}
              value={values[formikHelpers.fieldNames.profitMargin]}
            />

            {errors[formikHelpers.fieldNames.description] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.description]}</Text>
            )}
            <InputText
              multiline
              editable
              numberOfLines={theme.spacing(1)}
              label={formikHelpers.fieldNames.description}
              placeholder={formikHelpers.fieldNames.description_placeholder}
              value={values[formikHelpers.fieldNames.description]}
              style={styles.multilineText}
            />
          </View>
        )}
      </Formik>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    paddingVertical: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: theme.spacing(22),
  },

  multilineText: {
    textAlign: 'justify',
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
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: theme.spacing(0.8),
    color: theme.colors.error,
    alignSelf: 'center',
  },
});
