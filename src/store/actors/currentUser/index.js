import { createSlice } from '@reduxjs/toolkit';
import { UserConnections } from '../../../services/db/models/UserConnections';
import { UserVolt } from '../../../services/db/models/UserVolt';

const initialState = {
  userVolt: null,
  currentUserConnections: null,
  currentUserFeedList: null,
  currentUserVlamList: null,
};

export const currentUserActorsSlice = createSlice({
  name: 'currentUserActors',
  initialState,
  reducers: {
    setCurrentUserVolt: (state, action) => {
      state.userVolt = new UserVolt(action.payload).getData();
    },

    resetCurrentUserVolt: (state, action) => {
      state.userVolt = null;
    },

    setCurrentUserConnections: (state, action) => {
      const accountConnections = new UserConnections(action.payload).getData();

      state.currentUserConnections = accountConnections;
    },

    resetCurrentUserConnections: (state) => {
      state.currentUserConnections = null;
    },

    setCurrentUserFeedList: (state, action) => {
      state.currentUserFeedList = action.payload;
    },

    setCurrentUserVlamList: (state, action) => {
      state.currentUserVlamList = action.payload;
    },
  },
});

// Actions
export const {
  setCurrentUserVolt,
  resetCurrentUserVolt,
  setCurrentUserConnections,
  resetCurrentUserConnections,
  setCurrentUserFeedList,
  setCurrentUserVlamList,
} = currentUserActorsSlice.actions;

// Selectors
export const selectCurrentUserActors = (state) => state.currentUserActors;

export default currentUserActorsSlice.reducer;
