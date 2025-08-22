import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    subCategoryData: [],
    vendorSubCategoryData: [],
    loading: false,
    error: null,
    subCategoryCount: 0,
    subCategoryByIdData: {},
    categoryData: []
  },
  reducers: {
    addSubCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSubCategorySuccess: (state, action) => {
      console.log('=========addsub=========', action.payload);
      state.loading = false;
      state.subCategoryData = action.payload;
    },
    addSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoryByFilter: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategoryByFilterSuccess: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },

    getCategoryByFilterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSubCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubCategorySuccess: (state, action) => {
      console.log('=========sub=========', action.payload);
      state.loading = false;
      state.subCategoryData = action.payload;
    },

    getSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    vendorGetSubCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    vendorGetSubCategorySuccess: (state, action) => {
      console.log('=========sub=========', action.payload);
      state.loading = false;
      state.vendorSubCategoryData = action.payload;
    },

    vendorGetSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSubCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.subCategoryByIdData = action.payload;
    },
    getSubCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      console.log('===============action.payload=====================', action.payload);

      state.loading = false;
      state.subCategoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSubCategory: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSubCategorySuccess: (state, action) => {
      console.log('================action.payload====================', action.payload);
      // alert('hey i am here');
      state.loading = false;
      state.subCategoryData =
        action.payload === undefined
          ? current(state).subCategoryData
          : current(state).subCategoryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    },
    updateSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSubCategory: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteSubCategorySuccess: (state, action) => {
      state.loading = false;
      state.subCategoryData =
        action.payload === undefined
          ? current(state.subCategoryData)
          : current(state.subCategoryData).filter((option) => option.id !== action.payload);
    },
    deleteSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getSubCategory,
  getSubCategorySuccess,
  getSubCategoryFail,

  vendorGetSubCategory,
  vendorGetSubCategorySuccess,
  vendorGetSubCategoryFail,

  fetchCategoryByFilter,
  getCategoryByFilterSuccess,
  getCategoryByFilterFail,

  addSubCategory,
  addSubCategorySuccess,
  addSubCategoryFail,

  getSubCategoryById,
  getSubCategoryByIdSuccess,
  getSubCategoryByIdFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,

  updateSubCategory,
  updateSubCategorySuccess,
  updateSubCategoryFail,

  deleteSubCategory,
  deleteSubCategorySuccess,
  deleteSubCategoryFail
} = subCategorySlice.actions;

export default subCategorySlice.reducer;
