import { createSlice } from '@reduxjs/toolkit';
import { current } from 'immer';

const orgProfSlice = createSlice({
  name: 'orgprof',
  initialState: {
    orgData: [],
    loading: false,
    error: null,
    orgByIdData: {},
    LocationData: {},
    StateData: [],
    DistrictData: []
  },
  reducers: {
    // Add
    addOrgProf: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOrgProfSuccess: (state, action) => {
      state.loading = false;
      state.orgData = action.payload;
    },
    addOrgProfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get
    getOrgProf: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrgProfSuccess: (state, action) => {
      state.loading = false;
      state.orgData = action.payload;
    },
    getOrgProfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get by id
    getOrgProfId: (state) => {
      state.loading = true;
      state.error = null;
      state.orgByIdData = {};
    },
    getOrgProfIdSuccess: (state, action) => {
      state.loading = false;
      state.orgByIdData = action.payload || {};
    },
    getOrgProfIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || {};
      state.orgByIdData = {};
    },

    // Update
    updateOrgProfId: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrgProfIdSuccess: (state, action) => {
      state.loading = false;
      state.orgData =
        action.payload === undefined
          ? current(state).orgData
          : current(state).orgData.map((data) => (data.id === action.payload.id ? action.payload : data));
    },
    updateOrgProfIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store only the error message
    },
    getLocation: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLocationSuccess: (state, action) => {
      state.loading = false;
      state.LocationData = action.payload;
    },
    getLocationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getState: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStateSuccess: (state, action) => {
      state.loading = false;
      state.StateData = action.payload;
    },
    getStateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDistrict: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDistrictSuccess: (state, action) => {
      state.loading = false;
      state.DistrictData = action.payload;
    },
    getDistrictFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getDistrict,
  getDistrictSuccess,
  getDistrictFail,
  getState,
  getStateSuccess,
  getStateFail,
  addOrgProf,
  addOrgProfSuccess,
  addOrgProfFail,
  getOrgProf,
  getOrgProfSuccess,
  getOrgProfFail,
  getOrgProfId,
  getOrgProfIdSuccess,
  getOrgProfIdFail,
  updateOrgProfId,
  updateOrgProfIdSuccess,
  updateOrgProfIdFail,
  getLocation,
  getLocationSuccess,
  getLocationFail
} = orgProfSlice.actions;

export default orgProfSlice.reducer;
