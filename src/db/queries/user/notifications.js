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
import { findUsersFromUserIdList } from '.';
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
    const usersAccountIdList = [];
    const querySnapshot = await getDocs(docQueryRef);

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

      usersAccountIdList.find((id) => data.ownerId === id) || usersAccountIdList.push(data.ownerId);
    });

    const [accounts, accountListError] = await findUsersFromUserIdList(usersAccountIdList);

    const fullList = userNotifications.map((singleNotification) => {
      return {
        ...singleNotification,
        __fullAccount: accounts.find((user) => user.id === singleNotification.data.ownerId),
      };
    });

    return [fullList, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
