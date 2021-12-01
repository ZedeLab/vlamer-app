import React from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';

export default () => {
  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <Text>Notification screen</Text>
      </ScrollView>
    </PageAux>
  );
};
