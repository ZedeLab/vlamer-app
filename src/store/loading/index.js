import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  value: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    notifyLoadingStart: (state, action) => {
      state.type = action.payload.type;
      state.value = true;
    },
    notifyLoadingFinish: (state) => {
      state.type = null;
      state.value = false;
    },
  },
});

// Actions
export const { notifyLoadingStart, notifyLoadingFinish } = loadingSlice.actions;

// Selectors
export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
