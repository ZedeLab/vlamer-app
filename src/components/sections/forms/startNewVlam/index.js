import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as formikHelpers from './__formik-helper';
import theme from '../../../../utils/theme';
import { selectError } from '../../../../store/errors';
import { selectCurrentUserActors } from '../../../../store/actors/currentUser';
import FormStatus from './FormStatusPreview';
import { InputText } from '../../../common/inputs';
import { PrimaryButton } from '../../../common/buttons';
import { useVoltAccess } from '../../../../services/voltAccess';
import { selectLoading } from '../../../../store/loading';
import { LottieAnimation } from '../../../common/animations';

export default StartNewVlamForm = ({ navigation }) => {
  const { startNewVlam } = useVoltAccess();
  const netErrors = useSelector(selectError);
  const loadingState = useSelector(selectLoading);
  const { userVolt } = useSelector(selectCurrentUserActors);

  const getParticipants = (winningPrice, participatingPrice) => {
    return Math.round(winningPrice / participatingPrice) * 2;
  };

  const onSubmitHandler = async (values) => {
    const newVlam = await startNewVlam(
      values[formikHelpers.fieldNames.description],
      values[formikHelpers.fieldNames.participatingPrice],
      values[formikHelpers.fieldNames.winningPrice],
      getParticipants(
        values[formikHelpers.fieldNames.winningPrice],
        values[formikHelpers.fieldNames.participatingPrice]
      )
    );

    if (newVlam) {
      navigation.goBack();
    }
  };

  return (
    <Surface style={styles.container}>
      {netErrors?.type === 'form/post' && (
        <Text style={styles.errorText}> {netErrors.message} </Text>
      )}
      <Formik
        onSubmit={onSubmitHandler}
        initialValues={formikHelpers.initialValues}
        validationSchema={formikHelpers.validationSchema(userVolt.volt.account.totalCoins)}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <View>
            <View>
              {loadingState.type === 'form/post' ? (
                <LottieAnimation
                  src={require('../../../../../assets/lottie/wave.json')}
                  style={styles.botAnim}
                />
              ) : (
                <FormStatus
                  winningPriceReady={errors[formikHelpers.fieldNames.winningPrice] === undefined}
                  winningPrice={values[formikHelpers.fieldNames.winningPrice]}
                  participatingPriceReady={
                    errors[formikHelpers.fieldNames.participatingPrice] === undefined
                  }
                  participatingPrice={values[formikHelpers.fieldNames.participatingPrice]}
                  participantsReady={
                    errors[formikHelpers.fieldNames.participatingPrice] === undefined
                  }
                  participants={getParticipants(
                    values[formikHelpers.fieldNames.winningPrice],
                    values[formikHelpers.fieldNames.participatingPrice]
                  )}
                />
              )}
            </View>
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
              label={formikHelpers.fieldNames.description}
              value={values[formikHelpers.fieldNames.description]}
              onChangeText={handleChange(formikHelpers.fieldNames.description)}
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
            <PrimaryButton icon="account" onPress={handleSubmit} style={styles.submitButton}>
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
    paddingVertical: theme.spacing(1),
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

  botAnim: {
    marginVertical: theme.spacing(1),
    width: '100%',
    alignSelf: 'center',
  },
});
