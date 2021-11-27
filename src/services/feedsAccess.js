import { Timestamp } from '@firebase/firestore';
import React, { useState, useContext, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActors, setCurrentUserFeedList } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { useAuth } from './auth';
import { onNewVlamInUserVlamFeedList } from './db/queries/vlam';

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

  useEffect(async () => {
    if (currentUserFeedList) {
      const [{ eventHandler, docRef }, _] = await onNewVlamInUserVlamFeedList();

      const unsubscribe = eventHandler(docRef, (querySnapshot) => {
        let feedList = [...currentUserFeedList];
        let index = 0;

        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            const document = change.doc.data();

            const formattedCreatedAt = formatTime(
              new Timestamp(document.createdAt.seconds, document.createdAt.nanoseconds).toDate()
            );
            feedList[index++] = { ...document, createdAt: formattedCreatedAt };
          }

          if (change.type === 'removed') {
            console.log('Removed city: ', change.doc.data());
          }
        });
        dispatch(setCurrentUserFeedList(feedList));
      });

      return unsubscribe;
    }
  }, []);

  return {
    currentUserFeedList,
    // setFeedsList,
  };
}
