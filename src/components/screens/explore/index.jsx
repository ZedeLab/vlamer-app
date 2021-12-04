import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PageAux from '../../hoc/PageAux';
import { useNotificationsAccess } from '../../../services/notification';

export default () => {
  const { expoPushToken, sendPushNotification } = useNotificationsAccess();

  return (
    <PageAux>
      <Text onPress={() => sendPushNotification(expoPushToken)}> Explore screen</Text>
    </PageAux>
  );
};
