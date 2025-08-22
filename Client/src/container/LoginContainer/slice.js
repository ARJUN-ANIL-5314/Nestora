import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userData: {},
    data: {},
    user: {},
    userDatas: {},
    datas: {},
    changePass: {},
    loading: false,
    error: null,
    role: null // ✅ Add role to track user role for navigation
  },
  reducers: {
    userLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.role = action.payload?.role || null; // Store role from user payload
    },
    loginUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  userLogin,
  loginSuccess,
  loginFail,
  loginUser,
  loginUserSuccess,
  loginUserFail
} = loginSlice.actions;

export const selectError = (state) => state.login.error;
export const selectRole = (state) => state.login.role; //  Add role selector

export default loginSlice.reducer;
