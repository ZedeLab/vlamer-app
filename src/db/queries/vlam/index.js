import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
  Timestamp,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseApp from '../../../utils/firebase';
import { formatTime } from '../../../utils/timeManager';
import { Vlam } from '../../models/Vlam';
import { getUserById } from '../user';

export const getVlamById = async (vlamId) => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = doc(db, 'vlams', vlamId);

  try {
    let vlam;
    const vlamSnapshot = await getDoc(vlamsRef);

    if (vlamSnapshot.exists()) {
      const { createdAt, ...document } = vlamSnapshot.data();
      const formattedCreatedAt = formatTime(
        new Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate()
      );
      vlam = { id: doc.id, ...document, createdAt: formattedCreatedAt };

      return [vlam, null];
    } else {
      return [null, null];
    }
  } catch (error) {
    return [null, error];
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

export const onNewVlamInUserVlamFeedList = async () => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = collection(db, 'vlams');
  // Currently showing only all vlams with onPlay state
  const docRef = query(
    vlamsRef,
    where('state', '==', 'onPlay'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  const snapShotObj = {
    docRef: docRef,
    eventHandler: onSnapshot,
  };
  try {
    return [snapShotObj, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};

export const onNewVlamInUserProfile = async (userId) => {
  const db = getFirestore(firebaseApp);
  const vlamsRef = collection(db, 'vlams');
  // Currently showing only all vlams with onPlay state
  const docRef = query(
    vlamsRef,
    where('author', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  const snapShotObj = {
    docRef: docRef,
    eventHandler: onSnapshot,
  };
  try {
    return [snapShotObj, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
};
