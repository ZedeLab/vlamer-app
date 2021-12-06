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

export const addNewNotification = async (targetUserId, newNotificationData) => {
  const db = getFirestore(firebaseApp);

  try {
    const userNotification = await new Notification(newNotificationData).__validate();

    await setDoc(
      doc(db, 'users', userNotification.data.targetId, 'notifications', userNotification.data.id),
      userNotification
    );

    return [true, null];
  } catch (error) {
    console.error('Notification error: ', error);
    return [null, error];
  }
};

export const getUserNotificationByUserId = async (currentUserId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnectionsRef = collectionGroup(db, 'notifications');
    const docQueryRef = query(userConnectionsRef, where('data.targetId', '==', currentUserId));

    let userNotifications = [];
    const querySnapshot = await getDocs(docQueryRef);

    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();

      userNotifications.push({ id: doc.id, ...document, createdAt });
    });

    return [userNotifications, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
