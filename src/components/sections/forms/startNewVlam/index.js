import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as formikHelpers from './__formik-helper';
import theme from '../../../../utils/theme';
import { selectError } from '../../../../store/errors';
import { selectActors } from '../../../../store/actors';
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
  const { userVolt } = useSelector(selectActors);

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
        validationSchema={formikHelpers.validationSchema(userVolt.account.inVoltCoins)}
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
            <View style={styles.formContentContainer}>
              <InputText
                name={formikHelpers.fieldNames.winningPrice}
                label={formikHelpers.fieldNames.winningPrice}
              />

              <InputText
                name={formikHelpers.fieldNames.participatingPrice}
                label={formikHelpers.fieldNames.participatingPrice}
              />

              <InputText
                editable={false}
                name={formikHelpers.fieldNames.profitMargin}
                label={formikHelpers.fieldNames.profitMargin}
              />

              <InputText
                multiline
                numberOfLines={5}
                name={formikHelpers.fieldNames.description}
                label={formikHelpers.fieldNames.description}
                style={styles.multilineText}
              />

              <PrimaryButton icon="account" onPress={handleSubmit} style={styles.submitButton}>
                post
              </PrimaryButton>
            </View>
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
  submitButton: {
    paddingVertical: theme.spacing(0.8),
  },
  multilineText: {
    textAlign: 'justify',
    paddingHorizontal: theme.spacing(0.5),
    marginVertical: theme.spacing(0.5),
    height: theme.spacing(10),
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

  formContentContainer: {
    flexDirection: 'column',
    paddingHorizontal: theme.spacing(1),
    minHeight: '100%',
  },
});
