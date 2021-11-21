import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PageAux from '../../hoc/PageAux';

import StartNewVlamForm from '../../sections/forms/startNewVlam';

export default AddVlamScreen = (props) => {
  const { navigation, ...restProps } = props;
  return (
    <PageAux noGutter style={styles.pageContainer}>
      <ScrollView style={styles.pagesWrapper}>
        <StartNewVlamForm navigation={navigation} />
      </ScrollView>
    </PageAux>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    // justifyContent: 'flex-start',
  },

  pagesWrapper: {
    height: '100%',
  },
});
