import {
  doc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { ConnectionTypes, UserConnections } from '../../models/UserConnections';
import { v4 as uuid } from 'uuid';

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

// export const getUserConnections = async () => {};
