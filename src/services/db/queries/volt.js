import { doc, getDocs, setDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { UserVolt } from '../models/UserVolt';

export const transferFromVoltToInAction = async (userId, amount) => {
  const db = getFirestore(firebaseApp);
  const [userVolt, voltError] = await getUserVolt(userId);

  if (userVolt) {
    console.log('before: ', userVolt);
    userVolt.volt.account.totalCoins = parseInt(userVolt.volt.account.totalCoins) - amount;
    userVolt.volt.inAction.totalCoinsOnAction =
      parseInt(userVolt.volt.inAction.totalCoinsOnAction) + parseInt(amount);
    console.log('after: ', userVolt);
    await setDoc(doc(db, 'volts', userVolt.id), userVolt);
    return [true, null];
  } else {
    return [false, voltError];
  }
};

export const getUserVolt = async (id) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'volts');
  const docRef = query(userRef, where('ownerAccountId', '==', id));

  try {
    let volt;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      volt = { id: doc.id, ...doc.data() };
    });

    return [volt, null];
  } catch (error) {
    return [null, error];
  }
};

export const addNewUserVolt = async (newUserData) => {
  const db = getFirestore(firebaseApp);

  try {
    const userVolt = new UserVolt({ ...newUserData, volt: UserVolt.GetDefaultVoltValue() });

    await setDoc(doc(db, 'volts', userVolt.getData().id), userVolt.getData());
    return [userVolt, null];
  } catch (error) {
    return [null, error];
  }
};
