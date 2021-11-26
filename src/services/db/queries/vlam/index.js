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
  updateDoc,
  increment,
  arrayUnion,
} from 'firebase/firestore';
import firebaseApp from '../../../../utils/firebase';
import { formatTime } from '../../../../utils/timeManager';
import { Vlam } from '../../models/Vlam';
import { v4 as uuid } from 'uuid';
import { VlamLike } from '../../models/VlamLike';
import { getUserById } from '../user';

export const getVlamLikesFromVlamId = async (vlamId) => {
  const db = getFirestore(firebaseApp);
  const vlamRef = collection(db, 'vlams', vlamId, 'likes');

  try {
    let vlamLike;
    const querySnapshot = await getDocs(doc(vlamRef));
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

export const getVlamsByUserId = async (userId) => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = collection(db, 'vlams');
  const docRef = query(vlamsRef, where('author', '==', userId));

  try {
    let vlams = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      vlams.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
    });
    console.log();
    return [vlams[0], null];
  } catch (error) {
    return [null, error];
  }
};

export const likeVlamPost = async (currentUserId, vlamPostId) => {
  const db = getFirestore(firebaseApp);
  const vlamLikeRef = doc(db, 'vlams', vlamPostId, 'likes', currentUserId);

  try {
    let [parentVlam, parentVlamError] = await getVlamsByUserId(currentUserId);

    const vlamLike = await new VlamLike(
      VlamLike.GetDefaultVlamLikeValue(currentUserId, parentVlam)
    ).__validate();
    await setDoc(vlamLikeRef, vlamLike);

    const vlamRef = doc(db, 'vlams', vlamPostId);

    await updateDoc(vlamRef, {
      totalNumberOfLikes: increment(1),
    });
    return [vlamLike, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};

export const unlikeVlamPost = async (currentUserId, vlamPostId) => {
  const db = getFirestore(firebaseApp);
  const vlamLikeRef = doc(db, 'vlams', vlamPostId, 'likes', currentUserId);

  try {
    await deleteDoc(vlamLikeRef);
    const vlamRef = doc(db, 'vlams', vlamPostId);

    await updateDoc(vlamRef, {
      totalNumberOfLikes: increment(-1),
    });
    return [true, null];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};

export const addNewVlamPost = async (currentUserId, newVlamData) => {
  const db = getFirestore(firebaseApp);

  try {
    const [user, userError] = await getUserById(currentUserId);
    const { createdAt, ...restUser } = user;

    const vlamPostObj = {
      ...Vlam.GetDefaultVlamValue(restUser),
      ...newVlamData,
    };

    const vlamPost = await new Vlam(vlamPostObj).__validate();
    await setDoc(doc(db, 'vlams', vlamPost.id), vlamPost);
    return [vlamPost, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserVlamList = async (userId) => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = collection(db, 'vlams');
  const docRef = query(vlamsRef, where('author', '==', userId));

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

export const getUserVlamFeedList = async () => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = collection(db, 'vlams');
  // Currently showing only all vlams with onPlay state
  const docRef = query(vlamsRef, where('state', '==', 'onPlay'));

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
    console.log(error);
    return [null, error];
  }
};
