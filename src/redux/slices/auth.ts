/* eslint-disable import/no-extraneous-dependencies */
import type { Dispatch } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: any = {
  isLoading: false,
  error: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const {

// } = slice.actions;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getUser(name: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/users/user', {
        params: { name },
      });
      dispatch(slice.actions.getUserSuccess(response.data.user));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
