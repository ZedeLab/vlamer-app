import {
  doc,
  getDocs,
  setDoc,
  getFirestore,
  collectionGroup,
  deleteDoc,
  updateDoc,
  increment,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { getVlamsByUserId } from '.';
import firebaseApp from '../../../../utils/firebase';
import { formatTime } from '../../../../utils/timeManager';
import { VlamLike } from '../../models/VlamLike';

export const getVlamLikesByUserId = async (userId) => {
  const db = getFirestore(firebaseApp);
  const vlamLikeRef = collectionGroup(db, 'likes');
  const docRef = query(vlamLikeRef, where('id', '==', userId));

  try {
    let vlamLike = [];
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const { createdAt, ...document } = doc.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      vlamLike.push({ id: doc.id, ...document, createdAt: formattedCreatedAt });
    });
    console.log('vlamLike: ', vlamLike);
    return [vlamLike, null];
  } catch (error) {
    console.log(error);
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
