import { createSlice, current } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countryData: [],
    loading: false,
    error: null,
    countryCount: 0,
    countryByIdData: {}
  },
  reducers: {
    addCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryData = action.payload;
    },
    addCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryData = action.payload;
    },

    getCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCountryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCountryByIdSuccess: (state, action) => {
      state.loading = false;
      state.countryByIdData = action.payload;
    },
    getCountryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.countryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.count;
    },
    updateCountry: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateCountrySuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.countryByIdData = state.countryByIdData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
      } else {
        console.error('Update unsuccessful');
      }
    },

    updateCountryFail: (state, action) => {
      alert('hey i am not here', action.payload);

      state.loading = false;
      state.error = action.payload;
    },

    deleteCountry: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCountrySuccess: (state, action) => {
      state.loading = false;
      state.countryByIdData =
        action.payload === undefined
          ? current(state.countryByIdData)
          : current(state.countryByIdData).filter((option) => option.id !== action.payload);
    },
    deleteCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getCountry,
  getCountrySuccess,
  getCountryFail,
  addCountry,
  addCountrySuccess,
  addCountryFail,
  getCountryById,
  getCountryByIdSuccess,
  getCountryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateCountry,
  updateCountrySuccess,
  updateCountryFail,
  deleteCountry,
  deleteCountrySuccess,
  deleteCountryFail
} = countrySlice.actions;

export default countrySlice.reducer;
