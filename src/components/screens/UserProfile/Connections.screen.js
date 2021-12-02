import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import ConnectionsTab from '../../sections/lists/ConnectionsList';

export default () => {
  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <ConnectionsTab />
      </ScrollView>
    </PageAux>
  );
};
