import {
  doc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  updateDoc,
  increment,
} from 'firebase/firestore';
import firebaseApp from '../../../../utils/firebase';
import { UserVolt } from '../../models/UserVolt';

export const transferFromVoltToInAction = async (userId, voltId, amount) => {
  const db = getFirestore(firebaseApp);

  try {
    await updateDoc(doc(db, 'users', userId, 'volts', voltId), {
      'account.inVoltCoins': increment(-amount),
      'inAction.coinsOnAction': increment(amount),
    });
    return [true, null];
  } catch (error) {
    return [null, 'Unable to deduct coin from volt'];
  }
};

export const getUserVolt = async (id) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'users', id, 'volts');
  const docRef = query(userRef, where('account.status', '==', 'active'));

  try {
    let volt;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      volt = { id: doc.id, ...doc.data() };
    });

    return [volt, null];
  } catch (error) {
    console.log('volt db error: ', error);
    return [null, error];
  }
};

export const addNewUserVolt = async (currentUserId, newUserData) => {
  const db = getFirestore(firebaseApp);

  try {
    const userVolt = await new UserVolt(UserVolt.GetDefaultVoltValue()).__validate();

    await setDoc(doc(db, 'users', currentUserId, 'volts', userVolt.id), userVolt);

    return [userVolt, null];
  } catch (error) {
    console.log('volt db error: ', error);
    return [null, error];
  }
};
