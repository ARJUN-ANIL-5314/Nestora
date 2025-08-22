import { createSlice } from '@reduxjs/toolkit';

const specificationSlice = createSlice({
  name: 'specification',
  initialState: {
    specificationData: [],
    specList: [],
    loading: false,
    error: null,
    specificationCount: 0,
    specificationByIdData: {},
    singleSpecByIdData: {},
    fetchSingleSpecification: [],

    singleSpec: []
  },
  reducers: {
    addSpecification: (state, action) => {
      console.log('====spec slice ====', action.payload);
      state.loading = true;
      state.error = null;
    },
    addSpecificationSuccess: (state, action) => {
      console.log('==actionSpec==', action);
      state.loading = false;
      state.specificationData = action.payload;
    },
    addSpecificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSpecification: (state, action) => {
      console.log('=========specification=========', action.payload);

      state.loading = true;
      state.error = null;
    },

    getSpecificationSuccess: (state, action) => {
      state.loading = false;
      state.specificationData = action.payload;
    },

    getSpecificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSpecificationById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSpecificationByIdSuccess: (state, action) => {
      state.loading = false;
      state.specificationByIdData = action.payload;
    },
    getSpecificationByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSingleSpecById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleSpecByIdSuccess: (state, action) => {
      state.loading = false;
      state.singleSpecByIdData = action.payload;
    },
    getSingleSpecByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSingleSpec: (state, action) => {
      console.log(action.payload, '====action.payload===');
      state.loading = true;
      state.singleSpec = action.payload;
      console.log(state.singleSpec, '====state.singleSpec===');
    },

    fetchSingleSpecification: (state, action) => {
      console.log('=========specification=========', action.payload);
      state.loading = true;
      state.error = null;
    },
    fetchSingleSpecificationSuccess: (state, action) => {
      console.log('=========specification=========', action.payload);
      state.loading = false;

      state.fetchSingleSpecification = action.payload;
    },

    fetchSingleSpecificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSpecificationSpec: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSpecificationSpecSuccess: (state, action) => {
      console.log('=========specificationSpec=========', action.payload);
      state.loading = false;
      state.specList = action.payload;
    },

    getSpecificationSpecFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSpecification: (state, action) => {
      console.log('===specaction==', action.payload);
      state.loading = true;
      state.error = null;
    },
    updateSpecificationSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success) {
        state.specificationData = state.specificationData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
        console.log('==state.specificationData==', state.specificationData);
      } else {
        console.error('Update unsuccessful');
      }
    },

    updateSpecificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSpecification: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSpecificationSuccess: (state, action) => {
      state.loading = false;
      state.specificationData = action.payload;
    },

    deleteSpecificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getSpecification,
  getSpecificationSuccess,
  getSpecificationFail,
  addSpecification,
  addSpecificationFail,
  addSpecificationSuccess,
  getSpecificationSpec,
  getSpecificationSpecSuccess,
  getSpecificationSpecFail,
  fetchSingleSpecification,
  fetchSingleSpecificationSuccess,
  fetchSingleSpecificationFail,
  updateSpecification,
  updateSpecificationSuccess,
  updateSpecificationFail,
  getSpecificationById,
  getSpecificationByIdSuccess,
  getSpecificationByIdFail,
  getSingleSpecById,
  getSingleSpecByIdSuccess,
  getSingleSpecByIdFail,
  getSingleSpec,
  deleteSpecification,
  deleteSpecificationSuccess,
  deleteSpecificationFail
} = specificationSlice.actions;

export default specificationSlice.reducer;
