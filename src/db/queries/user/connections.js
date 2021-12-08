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
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { ConnectionTypes, UserConnections } from '../../models/UserConnections';
import { formatTime } from '../../../utils/timeManager';
import { NotificationTypes } from '../../models/notification';
import { useNotificationsAccess } from '../../../services/notification';

export const getUserConnections = async (id) => {
  const db = getFirestore(firebaseApp);
  const userConnectionsRef = collection(db, 'users', id, 'connections');
  const docRef = query(userConnectionsRef, where('account.status', '==', 'pending'));

  try {
    const connections = [];
    const collections = await getDocs(docRef);
    collections.forEach((collectionDoc) => {
      connections.push({ id: collectionDoc.id, ...collectionDoc.data() });
    });

    return [connections, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};

export const sendConnectionRequest = async (currentUserAccount, eventOwnerAccount) => {
  const db = getFirestore(firebaseApp);

  try {
    const newConnectionObj = await UserConnections.getDefaultData(
      ConnectionTypes.type.REQUESTING,
      currentUserAccount,
      eventOwnerAccount
    );

    const newConnection = await new UserConnections(newConnectionObj).__validate();

    const connectionsRef = doc(db, 'users', currentUserAccount.id, 'connections', newConnection.id);
    await setDoc(connectionsRef, newConnection);

    return [true, null];
  } catch (error) {
    console.log({ ...error });
    return [false, error];
  }
};

export const getUserConnectionsByUserId = async (currentUserId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnectionsRef = collectionGroup(db, 'connections');
    const docQueryRef = query(
      userConnectionsRef,
      where('__parentAccountSnapshot.id', '==', currentUserId)
    );

    let userConnections = [];
    const querySnapshot = await getDocs(docQueryRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      userConnections.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
    });

    return [userConnections, null];
  } catch (error) {
    console.log({ ...error });
    return [false, error];
  }
};

export const subscribeToCurrentUserConnection = async (userId) => {
  const db = getFirestore(firebaseApp);

  try {
    const vlamLikeRef = collectionGroup(db, 'connections');
    const inUserConnections = query(vlamLikeRef, where('__parentAccountSnapshot.id', '==', userId));
    const outsideUserConnections = query(
      vlamLikeRef,
      where('__eventOwnerAccountSnapshot.id', '==', userId)
    );

    const snapShotObj = {
      inUserConnections: inUserConnections,
      outsideUserConnections: outsideUserConnections,
      eventHandler: onSnapshot,
    };
    return [snapShotObj, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};

export const acceptConnectionRequest = async (userId, connectionId) => {
  const db = getFirestore(firebaseApp);

  const connectionRef = doc(db, 'users', userId, 'connections', connectionId);

  try {
    updateDoc(connectionRef, {
      status: ConnectionTypes.status.ACCEPTED,
    });
    return [true, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};

export const ignoreConnectionRequest = async (userId, connectionId) => {
  const db = getFirestore(firebaseApp);
  const connectionRef = doc(db, 'users', userId, 'connections', connectionId);

  try {
    await updateDoc(connectionRef, {
      status: ConnectionTypes.status.DECLINED,
    });

    return [true, null];
  } catch (error) {
    console.log({ ...error });
    return [false, error];
  }
};

export const getConnectionByInvolvedUsers = async (currentUserId, eventOwnerId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnectionsRef = collectionGroup(db, 'connections');
    const docQueryRef = query(
      userConnectionsRef,
      where('__parentAccountSnapshot.id', '==', currentUserId),
      where('__eventOwnerAccountSnapshot.id', '==', eventOwnerId)
    );

    let userConnections = [];
    const querySnapshot = await getDocs(docQueryRef);
    querySnapshot.forEach(
      (doc) => {
        const { createdAt, ...document } = doc.data();
        const formattedCreatedAt = formatTime(
          new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
        );
        userConnections.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
      },
      (error) => {
        console.log(error);
      }
    );

    return [userConnections, null];
  } catch (error) {
    console.log({ ...error });
    return [false, error];
  }
};

export const deleteConnectionRequest = async (userId, connectionId) => {
  const db = getFirestore(firebaseApp);

  try {
    const connectionRef = doc(db, 'users', userId, 'connections', connectionId);
    await deleteDoc(connectionRef);

    return [true, null];
  } catch (error) {
    console.log('error: ', error);
    return [false, error];
  }
};
