import { useAuth } from './auth';
import { Timestamp } from '@firebase/firestore';
import React, { useContext, createContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActors, setCurrentUserLikes } from '../store/actors';
import { formatTime } from '../utils/timeManager';
import { onCurrentUserLikes } from '../db/queries/vlam/likes';

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
