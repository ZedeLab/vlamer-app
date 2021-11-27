import { Timestamp } from '@firebase/firestore';
import React, { useContext, createContext, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectActors, setCurrentUserVlamList } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { useAuth } from './auth';
import { onNewVlamInUserProfile } from './db/queries/vlam';

const CurrentUserVlamListContext = createContext();

export function CurrentUserVlamListProvider({ children }) {
  const userVlamList = useProvideCurrentUserVlamList();

  return (
    <CurrentUserVlamListContext.Provider value={userVlamList}>
      {children}
    </CurrentUserVlamListContext.Provider>
  );
}

export const useCurrentUserVlamList = () => {
  return useContext(CurrentUserVlamListContext);
};

function useProvideCurrentUserVlamList() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentUserVlamList } = useSelector(selectActors);

  useEffect(async () => {
    if (currentUserVlamList) {
      const [{ eventHandler, docRef }, _] = await onNewVlamInUserProfile(user.id);

      const unsubscribe = eventHandler(docRef, (querySnapshot) => {
        let vlamList = currentUserVlamList ? [...currentUserVlamList] : [];

        querySnapshot.forEach((doc) => {
          const document = doc.data();
          const formattedCreatedAt = formatTime(
            new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
          );

          vlamList.push({ ...document, createdAt: formattedCreatedAt });
        });
        dispatch(setCurrentUserVlamList(vlamList));
      });

      return unsubscribe;
    }
  }, [user]);

  return {};
}
