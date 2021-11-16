import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PageAux from '../../hoc/PageAux';
import { PrimaryButton } from '../../common/buttons';
import { useAuth } from '../../../services/auth';
import { styles } from './styles';

export default () => {
  const { user, signOut } = useAuth();

  return (
    <PageAux>
      <Text> Settings screen</Text>
      <PrimaryButton onPress={() => signOut()}> Logout </PrimaryButton>
    </PageAux>
  );
};
