import { getDocs, collection, getFirestore } from 'firebase/firestore';
import firebaseApp from '../../utils/firebase';

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
