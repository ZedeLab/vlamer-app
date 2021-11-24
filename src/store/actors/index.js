import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../services/db/models/user';
import { UserConnections } from '../../services/db/models/UserConnections';
import { UserVolt } from '../../services/db/models/UserVolt';

const initialState = {
  user: null,
  userVolt: null,
  focusedUser: null,
  currentUserConnections: null,
  focusedUserConnections: null,
  currentUserFeedList: null,
  currentUserVlamList: null,
  profileVlamList: null,
  focusedUserVolt: null,
};

export const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = new User(action.payload).getData();
    },

    resetCurrentUser: (state, action) => {
      state.user = null;
    },

    setCurrentUserVolt: (state, action) => {
      state.userVolt = new UserVolt(action.payload).getData();
    },

    resetCurrentUserVolt: (state, action) => {
      state.userVolt = null;
    },

    setFocusedUser: (state, action) => {
      state.focusedUser = new User(action.payload).getData();
    },

    resetFocusedUser: (state) => {
      state.focusedUser = null;
    },

    setCurrentUserConnections: (state, action) => {
      state.currentUserConnections = action.payload;
    },

    resetCurrentUserConnections: (state) => {
      state.currentUserConnections = null;
    },

    setFocusedUserConnections: (state, action) => {
      const accountConnections = new UserConnections(action.payload).getData();
      state.focusedUserConnections = accountConnections;
    },

    resetFocusedUserConnections: (state) => {
      state.currentUserConnections = null;
    },

    setCurrentUserFeedList: (state, action) => {
      state.currentUserFeedList = action.payload;
    },

    setCurrentUserVlamList: (state, action) => {
      state.currentUserVlamList = action.payload;
    },

    setProfileVlamList: (state, action) => {
      state.profileVlamList = action.payload;
    },

    setFocusedUserVolt: (state, action) => {
      state.focusedUserVolt = action.payload;
    },

    resetFocusedUserVolt: (state, action) => {
      state.focusedUserVolt = action.payload;
    },
  },
});

// Actions
export const {
  setFocusedUserVolt,
  resetFocusedUserVolt,
  setCurrentUserVolt,
  resetCurrentUserVolt,
  setCurrentUser,
  resetCurrentUser,
  setFocusedUser,
  resetFocusedUser,
  setCurrentUserConnections,
  resetCurrentUserConnections,
  setFocusedUserConnections,
  resetFocusedUserConnections,
  setCurrentUserFeedList,
  setCurrentUserVlamList,
  setProfileVlamList,
} = actorsSlice.actions;

// Selectors
export const selectActors = (state) => state.actors;

export default actorsSlice.reducer;
