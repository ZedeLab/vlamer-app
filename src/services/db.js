import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
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
