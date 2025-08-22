import { createSlice } from '@reduxjs/toolkit';

const RateCardSlice = createSlice({
  name: 'rateCard',
  initialState: {
    RateCardData: [],
    specList: [],
    loading: false,
    error: null,
    RateCardCount: 0,
    RateCardByIdData: {},
    CategoryDatas: [],
    subCategoryFilterData: [],
    specificationDataFilterd: [],
    CurrencyData: [],
    RateCardCompare: [],
    RateCalc: []
  },
  reducers: {
    addRateCard: (state) => {
      state.loading = true;
      state.error = null;
    },
    addRateCardSuccess: (state, action) => {
      state.loading = false;
      state.RateCardData = action.payload;
    },
    addRateCardFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRateCard: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRateCardSuccess: (state, action) => {
      state.loading = false;
      state.RateCardData = action.payload;
    },

    getRateCardFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getRateCardSpec: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRateCardSpecSuccess: (state, action) => {
      state.loading = false;
      state.specList = action.payload;
    },

    getRateCardSpecFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoryByFilter: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategoryByFilterSuccess: (state, action) => {
      state.loading = false;
      state.CategoryDatas = action.payload;
    },

    getCategoryByFilterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSubFilterCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubFilterCategorySuccess: (state, action) => {
      state.loading = false;
      state.subCategoryFilterData = action.payload;
    },

    getSubFilterCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSpecificationFiltered: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSpecificationFilteredSuccess: (state, action) => {
      console.log('==actionsuccess==', action.payload);

      state.loading = false;
      state.specificationDataFilterd = action.payload;
    },

    getSpecificationFilteredFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCurrency: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCurrencySuccess: (state, action) => {
      state.loading = false;
      state.CurrencyData = action.payload;
    },

    fetchCurrencyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRateCard: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRateCardSuccess: (state, action) => {
      state.loading = false;
      state.RateCardData = action.payload;
    },

    deleteRateCardFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRateCard: (state, action) => {
      console.log('rateaction', action.payload);
      state.loading = true;
      state.error = null;
    },
    updateRateCardSuccess: (state, action) => {
      state.loading = false;
      state.RateCardData = action.payload;
    },

    updateRateCardFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRateCardCompare: (state, action) => {
      console.log('=addRateCardCompareaction=', action);
      state.loading = true;
      state.error = null;
    },
    addRateCardCompareSuccess: (state, action) => {
      state.loading = false;
      state.RateCardCompare = action.payload;
    },
    addRateCardCompareFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRateCalc: (state, action) => {
      console.log('=addRateCalcaction=', action);
      state.loading = true;
      state.error = null;
    },
    clearRateCalc: (state) => {
      state.loading = true;
      state.RateCalc = {};
    },
    addRateCalcSuccess: (state, action) => {
      state.loading = false;
      state.RateCalc = action.payload;
    },
    addRateCalcFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  addRateCalc,
  addRateCalcSuccess,
  addRateCalcFail,
  clearRateCalc,
  addRateCardCompare,
  addRateCardCompareSuccess,
  addRateCardCompareFail,
  updateRateCard,
  updateRateCardSuccess,
  updateRateCardFail,
  deleteRateCard,
  deleteRateCardSuccess,
  deleteRateCardFail,
  getRateCard,
  getRateCardSuccess,
  getRateCardFail,
  addRateCard,
  addRateCardFail,
  addRateCardSuccess,
  getRateCardSpec,
  getRateCardSpecSuccess,
  getRateCardSpecFail,
  fetchCategoryByFilter,
  getCategoryByFilterSuccess,
  getCategoryByFilterFail,
  getSubFilterCategory,
  getSubFilterCategorySuccess,
  getSubFilterCategoryFail,
  getSpecificationFiltered,
  getSpecificationFilteredSuccess,
  getSpecificationFilteredFail,
  fetchCurrency,
  fetchCurrencySuccess,
  fetchCurrencyFail
} = RateCardSlice.actions;

export default RateCardSlice.reducer;
