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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fullConnectionList = followers.concat(following);
    dispatch(setCurrentUserConnections(fullConnectionList));

    return () => {
      dispatch(resetCurrentUserConnections());
    };
  }, [following, followers]);

  useEffect(async () => {
    let unsubscribeInUserConnections;
    let unsubscribeOutsideUserConnections;

    if (user) {
      const [{ eventHandler, inUserConnections, outsideUserConnections }, _] =
        await subscribeToCurrentUserConnection(user.id);

      try {
        unsubscribeInUserConnections = eventHandler(
          inUserConnections,
          (querySnapshot) => {
            const userConnectionsList = [];
            querySnapshot.forEach((doc) => {
              const document = doc.data();
              const formattedCreatedAt = formatTime(
                new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
              );
              userConnectionsList.push({ ...document, createdAt: formattedCreatedAt });
            });
            setFollowing(userConnectionsList);
          },
          (error) => {
            console.log(error);
          }
        );

        unsubscribeOutsideUserConnections = eventHandler(
          outsideUserConnections,
          (querySnapshot) => {
            const userConnectionsList = [];
            querySnapshot.forEach((doc) => {
              const document = doc.data();
              const formattedCreatedAt = formatTime(
                new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
              );

              userConnectionsList.push({ ...document, createdAt: formattedCreatedAt });
            });
            setFollowers(userConnectionsList);
          },
          (error) => {
            console.log(error);
          }
        );
        // dispatch(setCurrentUserConnections(userConnectionsList));
      } catch (err) {
        console.log(err);
        return;
      }

      return () => {
        unsubscribeOutsideUserConnections();
        unsubscribeInUserConnections();
      };
    }
  }, [user]);

  const isUserConnected = (currentUserId, targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          (userConnection.status === ConnectionTypes.status.ACCEPTED &&
            userConnection.__eventOwnerAccountSnapshot.id === currentUserId) ||
          userConnection.__parentAccountSnapshot.id === targetUserId
        );
      }) !== undefined
    );
  };

  const isUserFollowing = (currentUserId, targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.status === ConnectionTypes.status.ACCEPTED &&
          userConnection.__eventOwnerAccountSnapshot.id === targetUserId &&
          userConnection.__parentAccountSnapshot.id === currentUserId
        );
      }) !== undefined
    );
  };

  const getAcceptedConnections = () => {};

  const totalNumberOfUsersFollowing = (currentUserId) => {
    return currentUserConnections.filter((userConnection) => {
      return (
        userConnection.status === ConnectionTypes.status.ACCEPTED &&
        userConnection.__parentAccountSnapshot.id === currentUserId
      );
    }).length;
  };

  const isFollowingUser = (currentUserId, targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.status === ConnectionTypes.status.ACCEPTED &&
          userConnection.__parentAccountSnapshot.id === targetUserId &&
          userConnection.__eventOwnerAccountSnapshot.id === currentUserId
        );
      }) !== undefined
    );
  };

  const totalNumberOfFollowers = (currentUserId) => {
    return currentUserConnections.filter((userConnection) => {
      return (
        userConnection.status === ConnectionTypes.status.ACCEPTED &&
        userConnection.__eventOwnerAccountSnapshot.id === currentUserId
      );
    }).length;
  };

  const hasUserPendingUserConnection = (targetUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.__eventOwnerAccountSnapshot.id === targetUserId &&
          userConnection.status === ConnectionTypes.status.PENDING
        );
      }) !== undefined
    );
  };

  const hasUserPendingSentRequests = (currentUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.status === ConnectionTypes.status.PENDING &&
          userConnection.__parentAccountSnapshot.id === currentUserId
        );
      }) !== undefined
    );
  };

  const hasUserPendingReceivedRequests = (currentUserId) => {
    return (
      currentUserConnections.find((userConnection) => {
        return (
          userConnection.status === ConnectionTypes.status.PENDING &&
          userConnection.__eventOwnerAccountSnapshot.id === currentUserId
        );
      }) !== undefined
    );
  };
  return {
    isUserConnected,
    isUserFollowing,
    isFollowingUser,
    totalNumberOfFollowers,
    totalNumberOfUsersFollowing,
    hasUserPendingUserConnection,
    hasUserPendingSentRequests,
    hasUserPendingReceivedRequests,
    currentUserConnections,
  };
}
