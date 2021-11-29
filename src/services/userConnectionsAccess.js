import { Timestamp } from '@firebase/firestore';
import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActors,
  setCurrentUserConnections,
  resetCurrentUserConnections,
} from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { useAuth } from './auth';
import { subscribeToCurrentUserConnection } from '../db/queries/user/connections';
import { ConnectionTypes } from '../db/models/UserConnections';

const UserConnectionsContext = createContext();

export function UserConnectionProvider({ children }) {
  const userConnections = useProvideUserConnections();
  return (
    <UserConnectionsContext.Provider value={userConnections}>
      {children}
    </UserConnectionsContext.Provider>
  );
}

export const useUserConnections = () => {
  return useContext(UserConnectionsContext);
};

function useProvideUserConnections() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentUserConnections } = useSelector(selectActors);

  useMemo(async () => {
    if (user) {
      const [{ eventHandler, docRef }, _] = await subscribeToCurrentUserConnection(user.id);
      try {
        const unsubscribe = eventHandler(docRef, (querySnapshot) => {
          let userConnections = [];

          querySnapshot.forEach((doc) => {
            const document = doc.data();
            const formattedCreatedAt = formatTime(
              new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
            );

            userConnections.push({ ...document, createdAt: formattedCreatedAt });
          });

          dispatch(setCurrentUserConnections(userConnections));
        });

        return () => {
          return unsubscribe();
        };
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const isUserConnected = (targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        console.log(
          '__eventOwnerAccountSnapshotId: ',
          userConnection.__eventOwnerAccountSnapshot.id
        );
        return (
          userConnection.__eventOwnerAccountSnapshot.id === targetUserId &&
          userConnection.status === ConnectionTypes.status.ACCEPTED
        );
      }) !== undefined
    );
  };

  const hasPendingUserConnection = (targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.__eventOwnerAccountSnapshot.id === targetUserId &&
          userConnection.status === ConnectionTypes.status.PENDING
        );
      }) !== undefined
    );
  };

  return {
    isUserConnected,
    hasPendingUserConnection,
  };
}
