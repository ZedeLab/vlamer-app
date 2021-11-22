import {
  doc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import firebaseApp from '../../utils/firebase';
import { formatTime } from '../../utils/timeManager';
import { StaticData } from './models/staticData';
import { User } from './models/user';
import { UserConnections } from './models/UserConnections';
import { UserVolt } from './models/UserVolt';
import { Vlam } from './models/Vlam';

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

export const getUserFeedList = async () => {
  const db = getFirestore(firebaseApp);
  const vlamRef = collection(db, 'vlams');
  const docRef = query(vlamRef, where('state', '==', 'onPlay'));
  const accountIdList = [];

  try {
    const feedList = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();

      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      console.log('formattedCreatedAt: ', formattedCreatedAt);
      feedList.push({ ...document, createdAt: formattedCreatedAt });
      accountIdList.push(document.author);
    });

    if (feedList.length === 0) return [feedList, null];

    const [accounts, error] = await findUsersFromUserIdList(accountIdList);

    if (accounts) {
      const fullFeedList = feedList.map((feedPost, index) => ({
        ...feedPost,
        authorAccount: accounts.find((account) => account.id === feedPost.author),
      }));
      return [fullFeedList, null];
    } else {
      console.log(error);
    }
  } catch (error) {
    return [null, error];
  }
};

export const addNewVlamPost = async (newVlamData) => {
  const db = getFirestore(firebaseApp);

  try {
    const vlamPost = await new Vlam({
      ...Vlam.GetDefaultVlamValue(),
      createdAt: Timestamp.now(),
      ...newVlamData,
    }).__validate();
    await setDoc(doc(db, 'vlams', vlamPost.id), vlamPost);
    return [vlamPost, null];
  } catch (error) {
    return [null, error];
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
