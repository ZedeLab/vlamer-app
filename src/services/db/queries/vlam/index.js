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
import firebaseApp from '../../../../utils/firebase';
import { formatTime } from '../../../../utils/timeManager';
import { Vlam } from '../../models/Vlam';
import { getUserById } from '../user';

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
