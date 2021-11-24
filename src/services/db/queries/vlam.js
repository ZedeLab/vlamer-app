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
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
import { Vlam } from '../models/Vlam';
import { findUsersFromUserIdList } from './user';

export const getUserVlamList = async (userId) => {
  const db = getFirestore(firebaseApp);
  const vlamRef = collection(db, 'vlams');
  const docRef = query(vlamRef, where('author', '==', userId));

  try {
    const vlamList = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();

      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      vlamList.push({ ...document, createdAt: formattedCreatedAt });
    });

    return [vlamList, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserFeedList = async (startIndex = 0, limit = 10) => {
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
      feedList.push({ ...document, createdAt: formattedCreatedAt });
      accountIdList.push(document.author);
    });

    if (feedList.length === 0) return [feedList, null];

    const [accounts, error] = await findUsersFromUserIdList(accountIdList.slice(startIndex, limit));

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
    console.log('Error: ', error);
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
