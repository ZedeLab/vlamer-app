import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../services/db/models/user';
import { UserConnections } from '../../../services/db/models/UserConnections';

const initialState = {
  focusedUser: null,
  focusedUserConnections: null,
  profileVlamList: null,
  focusedUserVolt: null,
};

export const focusedUserActorsSlice = createSlice({
  name: 'focusedUserActors',
  initialState,
  reducers: {
    setFocusedUser: (state, action) => {
      state.focusedUser = new User(action.payload).getData();
    },

    resetFocusedUser: (state) => {
      state.focusedUser = null;
    },

    setFocusedUserConnections: (state, action) => {
      const accountConnections = new UserConnections(action.payload).getData();
      state.focusedUserConnections = accountConnections;
    },

    resetFocusedUserConnections: (state) => {
      state.currentUserConnections = null;
    },

    setProfileVlamList: (state, action) => {
      state.profileVlamList = action.payload;
    },

    setFocusedUserVolt: (state, action) => {
      state.focusedUserVolt = action.payload;
    },
  },
});

// Actions
export const {
  setFocusedUser,
  resetFocusedUser,
  setFocusedUserConnections,
  resetFocusedUserConnections,
  setProfileVlamList,
  setFocusedUserVolt,
} = focusedUserActorsSlice.actions;

// Selectors
export const selectFocusedUserActors = (state) => state.focusedUserActors;

export default focusedUserActorsSlice.reducer;
