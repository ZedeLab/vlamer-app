import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Comment } from '../../models/comment';
import firebaseApp from '../../../utils/firebase';

export const createComment = async (vlam, comment, user) => {
  try {
    const db = getFirestore(firebaseApp);
    const commentData = await new Comment({
      ...Comment.getDefaultCommentValues(user),
      comment,
      vlamId: vlam.id,
    }).__validate();

    const commentRef = doc(db, 'vlams', vlam.id, 'comments', commentData.id);
    await setDoc(commentRef, commentData);
    await updateDoc(doc(db, 'vlams', vlam.id), {
      totalNumberOfComments: vlam.totalNumberOfComments + 1,
    });
    return { data: commentData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
