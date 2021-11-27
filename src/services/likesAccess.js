import React, { useContext, createContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectActors } from '../store/actors';

import { useAuth } from './auth';

const LikesAccessContext = createContext();

export function LikesAccessProvider({ children }) {
  const likesAccess = useProvideLikesAccess();
  return <LikesAccessContext.Provider value={likesAccess}>{children}</LikesAccessContext.Provider>;
}

export const useLikesAccess = () => {
  return useContext(LikesAccessContext);
};

function useProvideLikesAccess() {
  const { currentUserLikes } = useSelector(selectActors);
  const { user } = useAuth();

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
