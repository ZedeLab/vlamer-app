import { doc, getDocs, setDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import firebaseApp from '../../utils/firebase';
import { StaticData } from './models/staticData';
import { User } from './models/user';
import { UserConnections } from './models/UserConnections';

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

export const addNewUser = async (newUserData) => {
  const db = getFirestore(firebaseApp);

  try {
    const user = new User(newUserData);
    await setDoc(doc(db, 'users', user.getData().id), user.getData());
    return [newUserData, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserByEmail = async (email) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'users');
  const docRef = query(userRef, where('email', '==', email));

  try {
    let account;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      account = { id: doc.id, ...doc.data() };
    });

    return [account, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserById = async (id) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'users');
  const docRef = query(userRef, where('id', '==', id));

  try {
    let account;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      account = { id: doc.id, ...doc.data() };
    });

    return [account, null];
  } catch (error) {
    return [null, error];
  }
};

export const getStaticData = async () => {
  try {
    const db = getFirestore(firebaseApp);
    const querySnapshot = await getDocs(collection(db, 'static'));
    const data = {};

    querySnapshot.forEach((doc) => {
      data[`${doc.id}`] = doc.data();
    });

    // const staticData = new StaticData();
    return [data, null];
  } catch (error) {
    console.log(error);
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