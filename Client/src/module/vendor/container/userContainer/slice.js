import { createSlice, current } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    userMeData: {},
    getAllTeam: [],
    loading: false,
    error: null,
    licenseeOptions: [],
    userCount: 0,
    userByIdData: {}
  },
  reducers: {
    addUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    addUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllmyteam: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllmyteamSuccess: (state, action) => {
      state.loading = false;
      state.getAllTeam = action.payload;
    },
    getAllmyteamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserCreatedBy: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserCreatedBySuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    getUserCreatedByFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    filterLicenseeByTeam: (state) => {
      state.loading = true;
      state.error = null;
    },
    filterLicenseeByTeamSuccess: (state, action) => {
      state.loading = false;
      state.licenseeOptions = action.payload;
    },
    filterLicenseeByTeamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getLicenseeTeam: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLicenseeTeamSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    getLicenseeTeamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -----------------------------------
    changeStatus: (state) => {
      state.loading = true;
      state.error = null;
    },
    changeStatusSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    changeStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // -----------------------------------------

    // -----------------------------------
    getUserMe: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserMeSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },

    getUserMeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // -----------------------------------------

    getUserById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess: (state, action) => {
      state.loading = false;
      state.userByIdData = action.payload;
    },
    getUserByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },

    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.userCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUser: (state, action) => {
      console.log('userAction==', action);

      state.loading = true;
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUser: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.userData =
        action.payload === undefined ? current(state.userData) : current(state.userData).filter((option) => option.id !== action.payload);
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

    // deleteUser: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // deleteUserSuccess: (state, action) => {
    //   state.loading = false;
    //    state.userData = state.userData.filter(user => user.id !== action.payload);
    // },
    // deleteUserFail: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  }
});

export const {
  addUser,
  addUserSuccess,
  addUserFail,

  getUser,
  getUserSuccess,
  getUserFail,

  getUserCreatedBy,
  getUserCreatedBySuccess,
  getUserCreatedByFail,

  getAllmyteam,
  getAllmyteamSuccess,
  getAllmyteamFail,

  filterLicenseeByTeam,
  filterLicenseeByTeamSuccess,
  filterLicenseeByTeamFail,

  getLicenseeTeam,
  getLicenseeTeamSuccess,
  getLicenseeTeamFail,

  getUserById,
  getUserByIdSuccess,
  getUserByIdFail,

  changeStatus,
  changeStatusSuccess,
  changeStatusFail,

  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,

  getUserMe,
  getUserMeSuccess,
  getUserMeFail
} = userSlice.actions;

export default userSlice.reducer;
