import React, { useContext, createContext, useState, useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';
import { v4 as uuid } from 'uuid';
import { AxiosExpoInstance } from '../../utils/AxiosExpoInstance';
import { useAuth } from '../auth';
import { getUserNotificationByUserId } from '../../db/queries/user/notifications';
import { addNewNotification } from '../../db/queries/user/notifications';
import { NotificationTypes } from '../../db/models/notification';

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

  const [notification, setNotification] = useState(false);

  useEffect(async () => {
    if (user) {
      let notificationsList = [];
      const [userNotifications, notificationError] = await getUserNotificationByUserId(user.id);

      console.log(notificationError);
      if (userNotifications) {
        notificationsList = userNotifications.filter((item) => item.data.seen === false);
      }

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          const { body, data, sound, subtitle, title } = notification.request.content;
          notificationsList.push({ body, data, sound, subtitle, title });
        }
      );
      setNotification(notificationsList);
      // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      // responseListener.current = Notifications.addNotificationResponseReceivedListener(
      //   (response) => {
      //     // console.log('New notification response: ', response);
      //   }
      // );

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
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
