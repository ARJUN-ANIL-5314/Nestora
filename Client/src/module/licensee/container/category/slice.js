import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryData: [],
    vendorCategory: [],
    loading: false,
    error: null,
    categoryCount: 0,
    categoryByIdData: {}
  },
  reducers: {
    addCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },
    addCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // fetchCategoryByFilter: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // getCategoryByFilterSuccess: (state, action) => {
    //   state.loading = false;
    //   state.categoryData = action.payload;
    // },

    // getCategoryByFilterFail: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    getCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },

    getCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    vendorGetcetCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    vendorGetCategorySuccess: (state, action) => {
      state.loading = false;
      state.vendorCategory = action.payload;
    },

    vendorGetCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getCategoryById: (state) => {
      state.loading = true;
      state.error = null;
    },

    getCategoryByIdSuccess: (state, action) => {
      state.loading = false;
      state.categoryByIdData = action.payload;
    },
    getCategoryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.categoryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCategory: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData =
        action.payload === undefined
          ? current(state).categoryData
          : current(state).categoryData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
    },
    updateCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCategory: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },
    deleteCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getCategory,
  getCategorySuccess,
  getCategoryFail,

  addCategory,
  addCategorySuccess,
  addCategoryFail,

  vendorGetcetCategory,
  vendorGetCategorySuccess,
  vendorGetCategoryFail,

  getCategoryById,
  getCategoryByIdSuccess,
  getCategoryByIdFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,

  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,

  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail
} = categorySlice.actions;

export default categorySlice.reducer;
