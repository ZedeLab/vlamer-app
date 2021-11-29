import { useAuth } from './auth';
import React, { useContext, createContext } from 'react';

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

  const isVlamLiked = (likeUsersIds) => {
    if (typeof likeUsersIds === 'string') {
      return likeUsersIds === user.id;
    } else {
      return likeUsersIds.find((id) => user.id === id) !== undefined;
    }
  };

  return {
    isVlamLiked,
  };
}
