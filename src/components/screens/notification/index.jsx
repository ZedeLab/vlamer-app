import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import { useNotificationsAccess } from '../../../services/notification';
import { useAuth } from '../../../services/auth';

export default () => {
  const { user } = useAuth();
  const { notification } = useNotificationsAccess();

  if (notification.length === 0) {
    <PageAux noGutter>
      <Text>No notification is found</Text>
    </PageAux>;
  }

  const renderVlams = ({ item }) => {
    return <Text> {item.body} </Text>;
  };

  return (
    <PageAux noGutter>
      <FlatList
        data={notification}
        renderItem={renderVlams}
        keyExtractor={(item) => item.data.id}
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        // onEndReachedThreshold={0.2}
        // onEndReached={(event) => setLoadMoreVlams(true)}
      />
    </PageAux>
  );
};
