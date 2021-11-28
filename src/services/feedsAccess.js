import { Timestamp } from '@firebase/firestore';
import { id } from 'date-fns/locale';
import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActors, setCurrentUserFeedList } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { useAuth } from './auth';
import { onNewVlamInUserVlamFeedList } from '../db/queries/vlam';

const FeedsListContext = createContext();

export function FeedsVlamListProvider({ children }) {
  const feedsList = useProvideFeedsList();
  return <FeedsListContext.Provider value={feedsList}>{children}</FeedsListContext.Provider>;
}

export const useFeedsList = () => {
  return useContext(FeedsListContext);
};

function useProvideFeedsList() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentUserFeedList } = useSelector(selectActors);

  useMemo(async () => {
    if (user) {
      const [{ eventHandler, docRef }, _] = await onNewVlamInUserVlamFeedList();

      const unsubscribe = eventHandler(docRef, (querySnapshot) => {
        let feedList = currentUserFeedList ? [...currentUserFeedList] : [];

        querySnapshot.forEach((doc) => {
          const document = doc.data();
          const formattedCreatedAt = formatTime(
            new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
          );

          feedList.push({ ...document, createdAt: formattedCreatedAt });
        });

        dispatch(setCurrentUserFeedList(feedList));
      });

      return () => {
        if (user) {
          return unsubscribe;
        } else {
          return unsubscribe();
        }
      };
    }
  }, [user]);

  return {};
}
