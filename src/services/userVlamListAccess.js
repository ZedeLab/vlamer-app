import { Timestamp } from '@firebase/firestore';
import React, { useContext, createContext, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentUserVlamList, selectActors, setCurrentUserVlamList } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { useAuth } from './auth';
import { onNewVlamInUserProfile } from '../db/queries/vlam';

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

  useMemo(async () => {
    let unsubscribe;

    if (user) {
      const [{ eventHandler, docRef }, _] = await onNewVlamInUserProfile(user.id);

      unsubscribe = eventHandler(docRef, (querySnapshot) => {
        let vlamList = [];

        querySnapshot.forEach((doc) => {
          const document = doc.data();
          const formattedCreatedAt = formatTime(
            new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
          );

          if (!vlamList.find((item) => item.id === document.id)) {
            vlamList.push({ ...document, createdAt: formattedCreatedAt });
          }
        });
        dispatch(setCurrentUserVlamList(vlamList));
      });
    }

    return () => {
      dispatch(resetCurrentUserVlamList());
      unsubscribe();
    };
  }, [user]);

  return {};
}
