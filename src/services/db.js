import {
  doc,
  setDoc,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../utils/firebase";

export const addNewUser = async ({ firstName, lastName, email }) => {
  const data = { firstName, lastName, email };
  const db = getFirestore(firebaseApp);

  try {
    const docRef = doc(collection(db, "users"));
    await setDoc(docRef, data);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserByEmail = async (email) => {
  const db = getFirestore(firebaseApp);
  const userRef = collection(db, "users");
  const docRef = query(userRef, where("email", "==", email));

  try {
    let account;
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      account = { id: doc.id, ...doc.data() };
    });

    return [account, null];
  } catch (error) {
    return [null, error];
  }
};
