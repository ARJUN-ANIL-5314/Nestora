import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  ImgData: [],
  loading: false,
  error: null,
  imgByIdData: {},
  filename: null,
  imageById: null
};

const imageSlice = createSlice({
  name: 'Images',
  initialState,
  reducers: {
    uploadImageRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadImageSuccess: (state, action) => {
      state.loading = false;
      state.ImgData = action.payload;
      state.filename = action.payload.filename;
    },

    uploadImageNull: (state) => {
      state.loading = false;
      state.ImgData = [];
    },
    uploadImageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getimgById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getimgByIdSuccess: (state, action) => {
      state.imageById = action.payload.imageData;
      state.filename = action.payload.filename;
      state.error = null;
    },
    getimgByIdFail: (state, action) => {
      state.imageById = null;
      state.filename = null;
      state.error = action.payload;
    },
    updateimgById: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateimgByIdSuccess: (state, action) => {
      state.loading = false;
      state.imgByIdData = action.payload;
    },
    updateimgByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteimg: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteimgSuccess: (state, action) => {
      state.loading = false;
      state.ImgData = current(state.ImgData).filter((option) => option.id !== action.payload);
    },
    deleteimgFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  uploadImageNull,
  uploadImageRequest,
  uploadImageSuccess,
  uploadImageFailure,
  getimgById,
  getimgByIdSuccess,
  getimgByIdFail,
  updateimgById,
  updateimgByIdSuccess,
  updateimgByIdFail,
  deleteimg,
  deleteimgSuccess,
  deleteimgFail
} = imageSlice.actions;

export default imageSlice.reducer;
