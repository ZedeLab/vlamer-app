import { configureStore } from '@reduxjs/toolkit';

// Feature store slices
import errorReducer from './errors';
import loadingReducer from './loading';
import focusedUserActorsSlice from './actors/focusedUser';
import currentUserActorsSlice from './actors/currentUser';

export const store = configureStore({
  reducer: {
    errors: errorReducer,
    loading: loadingReducer,
    focusedUserActors: focusedUserActorsSlice,
    currentUserActors: currentUserActorsSlice,
  },
});
