import { configureStore } from "@reduxjs/toolkit";

// Feature store slices
import errorReducer from "./errors";

export const store = configureStore({
  reducer: {
    errors: errorReducer,
  },
});
