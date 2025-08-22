import { createSlice } from '@reduxjs/toolkit';
import { current } from 'immer';

const userProfSlice = createSlice({
  name: 'profile',
  initialState: {
    profData: [],
    loading: false,
    error: null,
    profByIdData: {}
  },
  reducers: {
    // Add
    addUserProf: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserProfSuccess: (state, action) => {
      state.loading = false;
      state.profData = action.payload;
    },
    addUserProfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get
    getUserProf: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserProfSuccess: (state, action) => {
      state.loading = false;
      state.profData = action.payload;
    },
    getUserProfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get By Id
    getUserProfId: (state) => {
      state.loading = true;
      state.error = null;
      state.profByIdData = {};
    },
    getUserProfIdSuccess: (state, action) => {
      state.loading = false;
      state.profByIdData = action.payload || {};
    },
    getUserProfIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profByIdData = {};
    },

    // Update By Id
    updateUserProfId: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfIdSuccess: (state, action) => {
      state.loading = false;
      state.profData = action.payload
        ? current(state).profData.map((data) => (data.id === action.payload.id ? action.payload : data))
        : current(state).profData;
    },
    updateProfIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  addUserProf,
  addUserProfSuccess,
  addUserProfFail,
  getUserProf,
  getUserProfSuccess,
  getUserProfFail,
  getUserProfId,
  getUserProfIdSuccess,
  getUserProfIdFail,
  updateUserProfId,
  updateProfIdSuccess,
  updateProfIdFail
} = userProfSlice.actions;

export default userProfSlice.reducer;
