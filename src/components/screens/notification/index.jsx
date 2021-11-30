import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import NotificationTab from '../../sections/lists/NotificationList';
import { useSelector } from 'react-redux';
import { selectActors } from '../../../store/actors';

export default () => {
  const { currentUserConnections } = useSelector(selectActors);

  if (currentUserConnections.length === 0) {
    return <Text> Loading...</Text>;
  }

  return (
    <PageAux noGutter>
      <ScrollView style={styles.pagesWrapper}>
        <NotificationTab />
      </ScrollView>
    </PageAux>
  );
};
