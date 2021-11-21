import React from 'react';
import { Text, View } from 'react-native';
import { LottieIcon } from '../../../../common/animations';
import { styles } from './style';

export const FormStatus = (props) => {
  const {
    winningPrice,
    winningPriceReady,
    participatingPrice,
    participatingPriceReady,
    participants,
    participantsReady,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <LottieIcon
          loop={false}
          src={require('../../../../../../assets/lottie/winner.json')}
          style={styles.icon}
        />
        {winningPriceReady ? (
          <Text style={{ ...styles.text, ...styles.greyText }}>
            {'Price ' + winningPrice + ' coins'}
          </Text>
        ) : (
          <Text style={{ ...styles.text, ...styles.greyText }}>{'Not set'}</Text>
        )}
      </View>
      <View style={styles.sectionContainer}>
        <LottieIcon
          loop={false}
          src={require('../../../../../../assets/lottie/price.json')}
          style={styles.icon}
        />
        {participatingPriceReady ? (
          <Text style={{ ...styles.text, ...styles.greyText }}>
            {'To participate ' + participatingPrice + ' coins'}
          </Text>
        ) : (
          <Text style={{ ...styles.text, ...styles.greyText }}>{'Not set'}</Text>
        )}
      </View>
      <View style={styles.sectionContainer}>
        <LottieIcon
          loop={false}
          src={require('../../../../../../assets/lottie/group.json')}
          style={styles.icon}
        />
        {participantsReady ? (
          <Text style={{ ...styles.text, ...styles.greyText }}>
            {participants + ' participants'}
          </Text>
        ) : (
          <Text style={{ ...styles.text, ...styles.greyText }}>{'Not set'}</Text>
        )}
      </View>
    </View>
  );
};

export default FormStatus;
