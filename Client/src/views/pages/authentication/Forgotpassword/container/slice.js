import { createSlice } from '@reduxjs/toolkit';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    userData: {},
    data: {},
    changePass: {},
    loading: false,
    error: null
  },
  reducers: {
    SendOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendOtpRequestSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    sendOtpRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    checkOtpRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    checkOtpRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    changePasswordRequestSuccess: (state, action) => {
      state.loading = false;
      state.changePass = action.payload;
    },
    changePasswordRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  SendOtpRequest,
  sendOtpRequestSuccess,
  sendOtpRequestFail,
  checkOtpRequest,
  checkOtpRequestSuccess,
  checkOtpRequestFail,
  changePasswordRequest,
  changePasswordRequestSuccess,
  changePasswordRequestFail
} = otpSlice.actions;

export default otpSlice.reducer;
