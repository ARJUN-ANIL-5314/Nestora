import { createSlice } from '@reduxjs/toolkit';

const RateCardSetupSlice = createSlice({
  name: 'rateCardSetup',
  initialState: {
    RateCardSetupData: [],
    loading: false,
    fetchSingleRatecardSetup: [],
    fetchDisplayValue: [],
    rateSetupByIdData: [],
    patterValue: [],
    error: null
  },

  reducers: {
    addRateCardSetup: (state, action) => {
      console.log('==setupAction', action.payload);
      state.loading = true;
      state.error = null;
    },
    addRateCardSetupSuccess: (state, action) => {
      console.log('==success==', action.payload);
      state.loading = false;
      state.RateCardSetupData = action.payload;
    },
    addRateCardSetupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRateCardSetup: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRateCardSetupSuccess: (state, action) => {
      state.loading = false;
      state.RateCardSetupData = action.payload;
    },

    getRateCardSetupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleRatecardSetUp: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleRatecardSetUpSuccess: (state, action) => {
      console.log('=========rate=========', action.payload);
      state.loading = false;
      state.fetchSingleRatecardSetup = action.payload;
    },

    fetchSingleRatecardSetUpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteRateCardSetup: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRateCardSetupSuccess: (state, action) => {
      state.loading = false;
      state.RateCardSetupData = action.payload;
    },

    deleteRateCardSetupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchDispValue: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDispValueSuccess: (state, action) => {
      state.loading = false;
      state.fetchDisplayValue = action.payload;
    },
    fetchDispValueFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRateSetupById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRateSetupByIdSuccess: (state, action) => {
      state.loading = false;
      state.rateSetupByIdData = action.payload;
    },
    getRateSetupByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getPatternValue: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPatternValueSuccess: (state, action) => {
      state.loading = false;
      state.patterValue = action.payload;
    },
    getPatternValueFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  fetchSingleRatecardSetUp,
  fetchSingleRatecardSetUpSuccess,
  fetchSingleRatecardSetUpFail,
  addRateCardSetup,
  addRateCardSetupSuccess,
  addRateCardSetupFail,
  getRateCardSetup,
  getRateCardSetupSuccess,
  getRateCardSetupFail,
  deleteRateCardSetup,
  deleteRateCardSetupSuccess,
  deleteRateCardSetupFail,
  anotherApi,
  fetchDispValueSuccess,
  fetchDispValueFail,
  getRateSetupByIdSuccess,
  getRateSetupByIdFail,
  getRateSetupById,
  getPatternValue,
  getPatternValueSuccess,
  getPatternValueFail
} = RateCardSetupSlice.actions;

export default RateCardSetupSlice.reducer;
