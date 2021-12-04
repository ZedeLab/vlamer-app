import {
  doc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  collectionGroup,
  Timestamp,
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
import { Notification } from '../../models/notification';
import { UserVolt } from '../../models/UserVolt';

export const addNewNotification = async (currentUser, expoPushTokens, newNotificationData) => {
  const db = getFirestore(firebaseApp);

  try {
    const userVolt = await new Notification(
      Notification.GetDefaultVlamValue({
        to: [...expoPushTokens],
        ownerId: currentUser.id,
        sound: 'default',
        title: newNotificationData.title,
        body: newNotificationData.body,
        data: { ...newNotificationData.data },
      })
    ).__validate();

    await setDoc(doc(db, 'users', currentUser.id, 'notifications', userVolt.id), userVolt);

    return [userVolt, null];
  } catch (error) {
    console.log('Notification validation error: ', error);
    return [null, error];
  }
};

export const getUserNotificationByUserId = async (currentUserId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnectionsRef = collectionGroup(db, 'notifications');
    const docQueryRef = query(userConnectionsRef, where('ownerId', '==', currentUserId));

    let userNotifications = [];
    const querySnapshot = await getDocs(docQueryRef);

    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      userNotifications.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
    });

    return [userNotifications, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
