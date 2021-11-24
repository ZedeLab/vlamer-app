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
import { v4 as uuid } from 'uuid';

export const getVlamLikesByUserId = async (userId) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'likes');
  const docRef = query(userRef, where('userId', '==', userId));

  try {
    let likes = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      likes.push({ id: doc.id, ...doc.data() });
    });

    return [likes, null];
  } catch (error) {
    return [null, error];
  }
};

export const likeVlamPost = async (userId, vlamPostId) => {
  const db = getFirestore(firebaseApp);
  const [userLikes, likesError] = await getVlamLikesByUserId(userId);
  const hasNotBeenLikedBefore =
    userLikes.filter((item) => item.vlamPostId === vlamPostId).length === 0;
  console.log(hasNotBeenLikedBefore);
  if (userLikes && hasNotBeenLikedBefore) {
    try {
      console.log('hello');
      const id = uuid();
      await setDoc(doc(db, 'likes', `${id}`), {
        id: id,
        createdAt: new Date(),
        vlamPostId: vlamPostId,
        userId: userId,
      });
      return [true, null];
    } catch (error) {
      console.log(error);
      return [false, error];
    }
  } else {
    console.log('Already liked');
  }
};

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
