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
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { ConnectionTypes, UserConnections } from '../../models/UserConnections';
import { v4 as uuid } from 'uuid';
import { formatTime } from '../../../utils/timeManager';

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
    console.log('eventOwnerAccount: ', currentUserAccount);
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

export const getUserConnectionsByUserId = async (currentUserAccountId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnectionsRef = collectionGroup(db, 'connections');
    const docQueryRef = query(
      userConnectionsRef,
      where('__parentAccountSnapshot.id', '==', currentUserAccountId)
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
    const docRef = query(vlamLikeRef, where('__parentAccountSnapshot.id', '==', userId));

    const snapShotObj = {
      docRef: docRef,
      eventHandler: onSnapshot,
    };
    return [snapShotObj, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};
// export const getUserConnections = async () => {};
