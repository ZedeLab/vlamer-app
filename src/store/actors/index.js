import { createSlice } from '@reduxjs/toolkit';
import { getUserConnections } from '../../services/db';
import { User } from '../../services/db/models/user';
import { UserConnections } from '../../services/db/models/UserConnections';

const initialState = {
  user: null,
  focusedUser: null,
  currentUserConnections: null,
  focusedUserConnections: null,
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

    setFocusedUser: (state, action) => {
      state.focusedUser = new User(action.payload).getData();
    },

    resetFocusedUser: (state) => {
      state.focusedUser = null;
    },

    setCurrentUserConnections: (state, action) => {
      const accountConnections = new UserConnections(action.payload).getData();

      state.currentUserConnections = accountConnections;
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
  },
});

// Actions
export const {
  setCurrentUser,
  resetCurrentUser,
  setFocusedUser,
  resetFocusedUser,
  setCurrentUserConnections,
  resetCurrentUserConnections,
  setFocusedUserConnections,
  resetFocusedUserConnections,
} = actorsSlice.actions;

// Selectors
export const selectActors = (state) => state.actors;

export default actorsSlice.reducer;
