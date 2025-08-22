import { createSlice, current } from '@reduxjs/toolkit';

const supportSlice = createSlice({
  name: 'commonSupport',
  initialState: {
    supportData: [],
    loading: false,
    error: null,
    supportCount: 0,
    supportByIdData: {},
    supportInternal: []
  },
  reducers: {
    addSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData = action.payload;
    },
    addSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData = action.payload.rows.filter(({ sprtType }) => sprtType !== 'internal');
    },
    getSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getInternalSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    getInternalSuccess: (state, action) => {
      state.loading = false;
      //  state.supportData = action.payload;
      state.supportInternal = action.payload.rows.filter(({ sprtType }) => sprtType == 'internal');
    },

    getInternalSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStatus: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateStatusSuccess: (state) => {
      state.loading = false;
      // state.supportData = action.payload;
    },
    updateStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSupportAll: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportAllSuccess: (state, action) => {
      state.loading = false;
      state.supportData = action.payload;
    },

    getSupportAllFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSupportById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSupportByIdSuccess: (state, action) => {
      state.loading = false;
      state.supportByIdData = action.payload;
    },
    getSupportByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.supportCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSupport: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSupportSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.supportData = state.supportData.map((data) => (data.id === action.payload.id ? action.payload : data));
      } else {
        console.error('Update Unsuccessful');
      }
    },

    updateSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSupport: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSupportSuccess: (state, action) => {
      state.loading = false;
      state.supportData =
        action.payload === undefined
          ? current(state.supportData)
          : current(state.supportData).filter((option) => option.id !== action.payload);
    },
    deleteSupportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getSupportAll,
  getSupportAllSuccess,
  getSupportAllFail,

  getSupport,
  getSupportSuccess,
  getSupportFail,

  updateStatus,
  updateStatusSuccess,
  updateStatusFail,

  getInternalSupport,
  getInternalSuccess,
  getInternalSupportFail,

  addSupport,
  addSupportSuccess,
  addSupportFail,

  getSupportById,
  getSupportByIdSuccess,
  getSupportByIdFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateSupport,
  updateSupportSuccess,
  updateSupportFail,

  deleteSupport,
  deleteSupportSuccess,
  deleteSupportFail
} = supportSlice.actions;

export default supportSlice.reducer;
