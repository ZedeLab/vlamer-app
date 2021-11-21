import React, { useEffect, useState } from 'react';
import { Form, Formik, useFormik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as formikHelpers from './__formik-helper';
import theme from '../../../../utils/theme';
import { selectError } from '../../../../store/errors';
import { notifyLoadingFinish, notifyLoadingStart } from '../../../../store/loading';
import { selectActors } from '../../../../store/actors';
import FormStatus from './FormStatusPreview';
import { InputText } from '../../../common/inputs';
import { PrimaryButton } from '../../../common/buttons';

export default StartNewVlamForm = ({ navigation }) => {
  const [values, setValues] = useState();
  const netErrors = useSelector(selectError);
  const { userVolt } = useSelector(selectActors);
  const dispatch = useDispatch();

  const getParticipants = (winningPrice, participatingPrice) => {
    return Math.round(winningPrice / participatingPrice);
  };

  const onSubmitHandler = (values) => {
    dispatch(notifyLoadingStart({ type: 'auth' }));
    dispatch(notifyLoadingFinish());
  };

  return (
    <Surface style={styles.container}>
      {netErrors?.type !== null && <Text style={styles.errorText}> {netErrors.message} </Text>}
      <Formik
        onSubmit={onSubmitHandler}
        initialValues={formikHelpers.initialValues}
        validationSchema={formikHelpers.validationSchema(userVolt.volt.account.totalCoins)}
      >
        {({ values, errors, handleChange }) => (
          <View>
            <FormStatus
              winningPriceReady={errors[formikHelpers.fieldNames.winningPrice] === undefined}
              winningPrice={values[formikHelpers.fieldNames.winningPrice]}
              participatingPriceReady={
                errors[formikHelpers.fieldNames.participatingPrice] === undefined
              }
              participatingPrice={values[formikHelpers.fieldNames.participatingPrice]}
              participantsReady={errors[formikHelpers.fieldNames.participatingPrice] === undefined}
              participants={getParticipants(
                values[formikHelpers.fieldNames.winningPrice],
                values[formikHelpers.fieldNames.participatingPrice]
              )}
            />
            <View style={styles.dividersContainer}>
              <Divider style={styles.divider} />
              <Text> New vlam </Text>
              <Divider style={styles.divider} />
            </View>

            <InputText
              label={formikHelpers.fieldNames.winningPrice}
              onChangeText={handleChange(formikHelpers.fieldNames.winningPrice)}
              value={values[formikHelpers.fieldNames.winningPrice]}
            />
            {errors[formikHelpers.fieldNames.winningPrice] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.winningPrice]}</Text>
            )}

            <InputText
              label={formikHelpers.fieldNames.participatingPrice}
              onChangeText={handleChange(formikHelpers.fieldNames.participatingPrice)}
              value={values[formikHelpers.fieldNames.participatingPrice]}
            />
            {errors[formikHelpers.fieldNames.participatingPrice] && (
              <Text style={styles.errorText}>
                {errors[formikHelpers.fieldNames.participatingPrice]}
              </Text>
            )}

            <InputText
              editable={false}
              label={formikHelpers.fieldNames.profitMargin}
              // onChangeText={handleChange}
              value={values[formikHelpers.fieldNames.profitMargin]}
            />
            {errors[formikHelpers.fieldNames.profitMargin] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.profitMargin]}</Text>
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
            {errors[formikHelpers.fieldNames.description] && (
              <Text style={styles.errorText}>{errors[formikHelpers.fieldNames.description]}</Text>
            )}

            <View style={styles.header}>
              <Text>Create a new vlam and start earing </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                learn more
              </Text>
            </View>
            <PrimaryButton icon="account" style={styles.submitButton}>
              post
            </PrimaryButton>
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
