import { getDocs, collection, getFirestore, query, where, Timestamp } from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
import { findUsersFromUserIdList } from './user';
import { getVlamLikesByUserId, getVlamLikesCount } from './vlam';

export const getUserVlamList = async (userId, currentUserId) => {
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

    if (vlamList.length === 0) return [vlamList, null];

    const [userVlamLikes, vlamLikeError] = await getVlamLikesByUserId(currentUserId);

    if (userVlamLikes) {
      const fullFeedList = vlamList.map((vlamPost, index) => ({
        ...vlamPost,
        likes: userVlamLikes.find((likes) => likes.vlamPostId === vlamPost.id),
      }));
      return [fullFeedList, null];
    } else {
      console.log(error);
      return [null, error];
    }
  } catch (error) {
    return [null, error];
  }
};

export const getUserFeedList = async (currentUserId, startIndex = 0, limit = 10) => {
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
    const [userVlamLikes, vlamLikeError] = await getVlamLikesByUserId(currentUserId);
    const [accounts, error] = await findUsersFromUserIdList(accountIdList.slice(startIndex, limit));

    if (accounts) {
      const fullFeedList = feedList.map((feedPost, index) => ({
        ...feedPost,
        authorAccount: accounts.find((account) => account.id === feedPost.author),
        likes: userVlamLikes.find((likes) => likes.vlamPostId === feedPost.id),
      }));
      return [fullFeedList, null];
    } else {
      console.log(error);
      return [null, error];
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
