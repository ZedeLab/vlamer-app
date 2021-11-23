import React, { useState, useContext, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserActors } from '../store/actors/currentUser';
import { useAuth } from './auth';
import { getUserFeedList } from './db';

const FeedsListContext = createContext();

export function FeedsVlamListProvider({ children }) {
  const feedsList = useProvideFeedsList();
  return <FeedsListContext.Provider value={feedsList}>{children}</FeedsListContext.Provider>;
}

export const useFeedsList = () => {
  return useContext(FeedsListContext);
};

function useProvideFeedsList() {
  const dispatch = useDispatch();
  const { currentUserFeedList } = useSelector(selectCurrentUserActors);

  return {
    currentUserFeedList,
    // setFeedsList,
  };
}
