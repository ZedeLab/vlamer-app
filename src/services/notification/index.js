import React, { useContext, createContext, useState, useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';
import { v4 as uuid } from 'uuid';
import { AxiosExpoInstance } from '../../utils/AxiosExpoInstance';
import { useAuth } from '../auth';
import {
  getUserNotificationByUserId,
  onUserNotificationChangeSnapshot,
} from '../../db/queries/user/notifications';
import { addNewNotification } from '../../db/queries/user/notifications';
import { NotificationTypes } from '../../db/models/notification';
import { Timestamp } from '@firebase/firestore';
import { formatTime } from '../../utils/timeManager';
import { findUsersFromUserIdList } from '../../db/queries/user';

const NotificationsAccessContext = createContext();

export function NotificationsAccessProvider({ children }) {
  const notificationsAccess = useProvideNotificationsAccess();
  return (
    <NotificationsAccessContext.Provider value={notificationsAccess}>
      {children}
    </NotificationsAccessContext.Provider>
  );
}

export const useNotificationsAccess = () => {
  return useContext(NotificationsAccessContext);
};

export const useProvideNotificationsAccess = () => {
  const { user, expoPushToken } = useAuth();
  const notificationListener = useRef();
  const responseListener = useRef();

  const [notification, setNotification] = useState([]);

  useEffect(async () => {
    let unsubscribe;
    if (user) {
      let notificationsList = [];
      const [{ eventHandler, docRef }, _] = await onUserNotificationChangeSnapshot(user.id);

      unsubscribe = eventHandler(docRef, async (querySnapshot) => {
        let userNotifications = [];
        const usersAccountIdList = [];

        querySnapshot.forEach((doc) => {
          const { data, ...document } = doc.data();

          userNotifications.push({
            id: doc.id,
            ...document,
            data: {
              ...data,
              createdAt: formatTime(
                new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate()
              ),
            },
          });

          usersAccountIdList.find((id) => data.ownerId === id) ||
            usersAccountIdList.push(data.ownerId);
        });

        const [accounts, accountListError] = await findUsersFromUserIdList(usersAccountIdList);

        const fullList = userNotifications.map((singleNotification) => {
          return {
            ...singleNotification,
            __fullAccount: accounts.find((user) => user.id === singleNotification.data.ownerId),
          };
        });

        setNotification(fullList);
      });
    }
    return () => {
      unsubscribe();
      setNotification([]);
    };
  }, [user]);

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  const sendPushNotification = async (expoPushToken, notificationProps) => {
    const { sound, title, body, data } = notificationProps;

    const message = {
      to: [...expoPushToken],
      sound: sound ? sound : 'default',
      title: title,
      body: body,
      data: { ...data },
    };

    const expoResp = await AxiosExpoInstance.post('push/send', message);

    return expoResp.data;
  };

  const dbQueryWithNotification = async (
    query,
    onSuccessAction,
    onErrorAction,
    notificationProps
  ) => {
    const [queryResult, queryError] = query;

    if (queryResult) {
      onSuccessAction(queryResult);

      const [isAdded, notificationError] = await addNewNotification(
        notificationProps.data.targetId,
        notificationProps
      );
      await sendPushNotification(notificationProps.to, notificationProps);
    } else {
      onErrorAction(queryError);
    }
  };

  const getVlamNotificationStarter = (
    currentUserFirstName,
    type,
    targetDevices,
    ownerId,
    targetUserId
  ) => {
    return {
      title: 'Vlam notifications',
      sound: 'default',
      body: `${currentUserFirstName} liked you vlam post.`,
      to: targetDevices,
      data: {
        id: uuid(),
        type: NotificationTypes.vlam.LIKE,
        ownerId: ownerId,
        targetId: targetUserId,
        seen: false,
        createdAt: new Date(),
      },
    };
  };

  const getConnectionNotificationStarter = (
    currentUserFirstName,
    type,
    targetDevices,
    ownerId,
    targetUserId
  ) => {
    return {
      title: 'Connection notifications',
      sound: 'default',
      body: `${currentUserFirstName} wants to connect with you.`,
      to: targetDevices,
      data: {
        id: uuid(),
        type: NotificationTypes.connection.follow,
        ownerId: ownerId,
        targetId: targetUserId,
        seen: false,
        createdAt: new Date(),
      },
    };
  };
  return {
    expoPushToken,
    notification,
    sendPushNotification,
    dbQueryWithNotification,
    getVlamNotificationStarter,
    getConnectionNotificationStarter,
  };
};
