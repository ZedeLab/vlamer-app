import { doc, getDocs, setDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import firebaseApp from '../../../../utils/firebase';
import { UserConnections } from '../../models/UserConnections';
import { v4 as uuid } from 'uuid';

export const addNewUserConnection = async (currentUserId) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnections = await new UserConnections({
      ...UserConnections.getDefaultData(),
      targetAccount: uuid(),
    }).__validate();

    await setDoc(
      doc(db, 'users', currentUserId, 'connections', userConnections.id),
      userConnections
    );

    return [userConnections, null];
  } catch (error) {
    return [null, error];
  }
};

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
