import { doc, getDocs, setDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { UserConnections } from '../models/UserConnections';

export const addNewUserConnection = async (newUserData) => {
  const db = getFirestore(firebaseApp);

  try {
    const userConnections = new UserConnections(newUserData);
    await setDoc(doc(db, 'connections', userConnections.getData().id), userConnections.getData());
    return [newUserData, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserConnections = async (id) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'connections');
  const docRef = query(userRef, where('ownerAccountId', '==', id));

  try {
    let connections;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      connections = { id: doc.id, ...doc.data() };
    });

    return [connections, null];
  } catch (error) {
    return [null, error];
  }
};

export const createNewConnection = async (newUserData) => {
  const db = getFirestore(firebaseApp);

  try {
    const washingtonRef = doc(db, 'connections', 'DC');

    await updateDoc(washingtonRef, {
      capital: true,
    });
    return [newUserData, null];
  } catch (error) {
    return [null, error];
  }
};
