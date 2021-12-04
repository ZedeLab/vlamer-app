import React, { useContext, createContext, useState, useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';

import { AxiosExpoInstance } from '../../utils/AxiosExpoInstance';
import { useAuth } from '../auth';
import { getUserNotificationByUserId } from '../../db/queries/user/notifications';

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
      const [userNotifications, notificationError] = await getUserNotificationByUserId(user.id);

      notificationError && console.log('notificationError: ', notificationError);

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log('New notification response: ', response);
        }
      );

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

  return {
    expoPushToken,
    notification,
    sendPushNotification,
  };
};
