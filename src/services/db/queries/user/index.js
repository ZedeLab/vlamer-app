import { getDocs, collection, getFirestore, query, where, setDoc, doc } from 'firebase/firestore';
import firebaseApp from '../../../../utils/firebase';
import { User } from '../../models/user';

export const findUsersFromUserIdList = async (userIdList) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'users');
  const docRef = query(userRef, where('id', 'in', userIdList));

  try {
    const userList = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      userList.push({ id: doc.id, ...document });
    });

    return [userList, null];
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
