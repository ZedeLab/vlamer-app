import { configureStore } from '@reduxjs/toolkit';

// Feature store slices
import errorReducer from './errors';
import loadingReducer from './loading';
import actorsReducer from './actors';

export const store = configureStore({
  reducer: {
    errors: errorReducer,
    loading: loadingReducer,
    actors: actorsReducer,
  },
});
