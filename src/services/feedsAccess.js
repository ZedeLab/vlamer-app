import React, { useState, useContext, createContext, useEffect } from 'react';
import { FeedsList } from './db/models/FeedsList';

const FeedsListContext = createContext();

export function FeedsVlamListProvider({ children }) {
  const feedsList = useProvideFeedsList();
  return <FeedsListContext.Provider value={feedsList}>{children}</FeedsListContext.Provider>;
}

export const useFeedsList = () => {
  return useContext(FeedsListContext);
};

function useProvideFeedsList() {
  const [feedsList, setFeedsList] = useState(null);

  // useEffect(() => {
  //   initializeFeedsList();
  // }, []);

  // const initializeFeedsList = async () => {};

  return {
    // FeedsList: FeedsList && new FeedsList(FeedsList),
    // setFeedsList,
  };
}
