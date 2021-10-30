import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  message: "",
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    notifyError: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    notifyErrorResolved: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

// Actions
export const { notifyError, notifyErrorResolved } = errorsSlice.actions;

// Selectors
export const selectError = (state) => state.errors;

export default errorsSlice.reducer;
