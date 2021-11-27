import { useAuth } from './auth';
import { Timestamp } from '@firebase/firestore';
import React, { useContext, createContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActors, setCurrentUserLikes } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { onCurrentUserLikes } from './db/queries/vlam/likes';

const LikesAccessContext = createContext();

export function LikesAccessProvider({ children }) {
  const likesAccess = useProvideLikesAccess();
  return <LikesAccessContext.Provider value={likesAccess}>{children}</LikesAccessContext.Provider>;
}

export const useLikesAccess = () => {
  return useContext(LikesAccessContext);
};

function useProvideLikesAccess() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentUserLikes } = useSelector(selectActors);

  useMemo(async () => {
    const [{ eventHandler, docRef }, _] = await onCurrentUserLikes(user.id);

    const unsubscribe = eventHandler(docRef, (querySnapshot) => {
      let vlamLikes = currentUserLikes ? [...currentUserLikes] : [];

      querySnapshot.forEach((doc) => {
        const document = doc.data();

        const formattedCreatedAt = formatTime(
          new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
        );

        vlamLikes.push({ ...document, createdAt: formattedCreatedAt });
      });
      dispatch(setCurrentUserLikes(vlamLikes));
    });

    return () => {
      if (user) {
        return unsubscribe;
      } else {
        return unsubscribe();
      }
    };
  }, [user]);

  const isVlamLiked = (vlamId) => {
    return (
      currentUserLikes &&
      currentUserLikes.find((userLike) => {
        return userLike.__parentSnapShot.id === vlamId;
      })
    );
  };

  return {
    isVlamLiked,
  };
}
