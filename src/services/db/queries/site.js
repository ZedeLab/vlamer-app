import { getDocs, collection, getFirestore, query, where, Timestamp } from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
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
