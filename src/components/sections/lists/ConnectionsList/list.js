import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ConnectionTypes } from '../../../../db/models/UserConnections';
import { useAuth } from '../../../../services/auth';
import { selectActors } from '../../../../store/actors';
import ConnectionRequestCard from '../../cards/ConnectionRequestCard';
import ConnectionsUserCard from '../../cards/ConnectionsUserCard';

export const renderPendingConnectionList = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const actors = useSelector(selectActors);

  return (
    <View>
      {actors.currentUserConnections
        .filter(
          (userConnection) =>
            userConnection.status === ConnectionTypes.status.PENDING &&
            userConnection.__eventOwnerAccountSnapshot.id === user.id
        )
        .map((item) => {
          return (
            <ConnectionRequestCard
              key={item.id}
              id={item.id}
              parentId={item.__parentAccountSnapshot.id}
              firstName={item.__parentAccountSnapshot.firstName}
              lastName={item.__parentAccountSnapshot.lastName}
              username={item.__parentAccountSnapshot.username}
              createdAt={item.__parentAccountSnapshot.createdAt}
            />
          );
        })}
    </View>
  );
};

export const renderFollowingConnectionList = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const actors = useSelector(selectActors);

  return (
    <View>
      {actors.currentUserConnections
        .filter(
          (userConnection) =>
            userConnection.status === ConnectionTypes.status.ACCEPTED &&
            userConnection.__parentAccountSnapshot.id === user.id
        )
        .map((item) => {
          return (
            <ConnectionsUserCard
              key={item.id}
              id={item.id}
              parentId={item.__parentAccountSnapshot.id}
              eventOwnerId={item.__eventOwnerAccountSnapshot.id}
              firstName={item.__parentAccountSnapshot.firstName}
              lastName={item.__parentAccountSnapshot.lastName}
              username={item.__parentAccountSnapshot.username}
              createdAt={item.__parentAccountSnapshot.createdAt}
            />
          );
        })}
    </View>
  );
};

export const renderFollowersConnectionList = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const actors = useSelector(selectActors);

  return (
    <View>
      {actors.currentUserConnections
        .filter(
          (userConnection) =>
            userConnection.status === ConnectionTypes.status.ACCEPTED &&
            userConnection.__eventOwnerAccountSnapshot.id === user.id
        )
        .map((item) => {
          return (
            <ConnectionsUserCard
              key={item.id}
              id={item.id}
              parentId={item.__parentAccountSnapshot.id}
              eventOwnerId={item.__eventOwnerAccountSnapshot.id}
              firstName={item.__parentAccountSnapshot.firstName}
              lastName={item.__parentAccountSnapshot.lastName}
              username={item.__parentAccountSnapshot.username}
              createdAt={item.__parentAccountSnapshot.createdAt}
            />
          );
        })}
    </View>
  );
};
