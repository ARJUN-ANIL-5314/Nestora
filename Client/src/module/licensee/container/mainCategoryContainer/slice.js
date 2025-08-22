import { createSlice } from '@reduxjs/toolkit';

const mainCategorySlice = createSlice({
  name: 'mainCategory',
  initialState: {
    mainCategoryData: [],
    vendorGetmainCategoryData: [],
    loading: false,
    error: null,
    mainCategoryCount: 0,
    mainCategoryByIdData: {},
    mainDelete: []
  },
  reducers: {
    addMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryData = action.payload;
    },
    addMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryData = action.payload;
    },

    getMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    vendorGetMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    vendorGetMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.vendorGetmainCategoryData = action.payload;
    },

    vendorGetMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getMainCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMainCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryByIdData = action.payload;
    },
    getMainCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.mainCategoryData = action.payload;
    },
    updateMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMainCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMainCategorySuccess: (state, action) => {
      state.loading = false;
      state.mainDelete = action.payload;
    },
    deleteMainCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getMainCategory,
  getMainCategorySuccess,
  getMainCategoryFail,

  vendorGetMainCategory,
  vendorGetMainCategorySuccess,
  vendorGetMainCategoryFail,

  addMainCategory,
  addMainCategorySuccess,
  addMainCategoryFail,

  getMainCategoryById,
  getMainCategoryByIdSuccess,
  getMainCategoryByIdFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,

  updateMainCategory,
  updateMainCategorySuccess,
  updateMainCategoryFail,

  deleteMainCategory,
  deleteMainCategorySuccess,
  deleteMainCategoryFail
} = mainCategorySlice.actions;

export default mainCategorySlice.reducer;
