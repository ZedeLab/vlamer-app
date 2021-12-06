import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { styles } from './styles';
import PageAux from '../../hoc/PageAux';
import { useNotificationsAccess } from '../../../services/notification';
import { useAuth } from '../../../services/auth';
import ConnectionRequestNotificationCard from '../../sections/cards/notifications/ConnectionRequest';
import { NotificationTypes } from '../../../db/models/notification';
import VlamLikeNotificationCard from '../../sections/cards/notifications/VlamLike';

export default () => {
  const { user } = useAuth();
  const { notification } = useNotificationsAccess();

  if (notification.length === 0) {
    <PageAux noGutter>
      <Text>No notification is found</Text>
    </PageAux>;
  }

  const renderVlams = ({ item }) => {
    if (item.data.type === NotificationTypes.connection.follow) {
      return (
        <ConnectionRequestNotificationCard
          id={item.data.id}
          avatar={item.__fullAccount.avatarURL}
          firstName={item.__fullAccount.firstName}
          lastName={item.__fullAccount.lastName}
          username={item.__fullAccount.username}
          createdAt={item.data.createdAt}
          notificationMessage={item.body}
        />
      );
    } else if (item.data.type === NotificationTypes.vlam.LIKE) {
      return (
        <VlamLikeNotificationCard
          id={item.data.id}
          avatar={item.__fullAccount.avatarURL}
          firstName={item.__fullAccount.firstName}
          lastName={item.__fullAccount.lastName}
          username={item.__fullAccount.username}
          createdAt={item.data.createdAt}
          notificationMessage={item.body}
        />
      );
    } else {
      return <Text> {item.body} </Text>;
    }
  };

  return (
    <PageAux noGutter>
      <FlatList
        data={notification}
        renderItem={renderVlams}
        keyExtractor={(item) => item.data.id}
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        // onEndReachedThreshold={0.2}
        // onEndReached={(event) => setLoadMoreVlams(true)}
      />
    </PageAux>
  );
};
