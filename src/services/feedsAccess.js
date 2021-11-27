import React, { useState, useContext, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActors } from '../store/actors';
import { useAuth } from './auth';

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
  const { currentUserFeedList } = useSelector(selectActors);

  return {
    currentUserFeedList,
    // setFeedsList,
  };
}
