import {
  doc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
import { Vlam } from '../models/Vlam';
import { findUsersFromUserIdList } from './user';
import { v4 as uuid } from 'uuid';

export const getVlamLikesFromVlamId = async (vlamId) => {
  const db = getFirestore(firebaseApp);
  const vlamRef = collection(db, 'likes');
  const docRef = query(vlamRef, where('vlamPostId', '==', vlamId));

  try {
    let vlamLike;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();

      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      vlamLike = { id: doc.id, ...document, createdAt: formattedCreatedAt };
    });

    return [vlamLike, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteVlamLikesByVlamId = async (vlamId) => {
  const db = getFirestore(firebaseApp);
  const [vlamLike, vlamLikeError] = await getVlamLikesFromVlamId(vlamId);

  try {
    await deleteDoc(doc(db, 'likes', vlamLike.id));

    return [true, null];
  } catch (error) {
    return [false, error];
  }
};

export const getVlamLikesByUserId = async (userId) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, 'likes');
  const docRef = query(userRef, where('userId', '==', userId));

  try {
    let likes = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      likes.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
    });

    return [likes, null];
  } catch (error) {
    return [null, error];
  }
};

export const toggleVlamPostLike = async (userId, vlamPostId) => {
  const db = getFirestore(firebaseApp);
  const [userLikes, likesError] = await getVlamLikesByUserId(userId);

  const hasNotBeenLikedBefore =
    userLikes.filter((item) => item.vlamPostId === vlamPostId).length === 0;

  if (userLikes && hasNotBeenLikedBefore) {
    try {
      const id = uuid();
      await setDoc(doc(db, 'likes', id), {
        id: id,
        createdAt: new Date(),
        vlamPostId: vlamPostId,
        userId: userId,
      });
      return [true, null];
    } catch (error) {
      return [false, error];
    }
  } else if (!hasNotBeenLikedBefore) {
    try {
      const [reqSuccessful, reqError] = await deleteVlamLikesByVlamId(vlamPostId);

      if (reqSuccessful) return [true, null];
      else return [false, reqError];
    } catch (error) {
      console.log(error);
      return [false, error];
    }
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
