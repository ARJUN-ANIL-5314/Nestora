import { takeEvery, call, put } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';
import { toast } from 'react-toastify';

function* fetchUser() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;
      if (orgId) {
        let params = {
          api: ` ${config.Ip}/users?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.getUserSuccess(),
          failAction: actionType.getUserFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => console.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* fetchAllMyteam(action) {
  try {
    const userString = localStorage.getItem('user');
    const filter = action.payload;
    let page = (filter && filter.page) || 1;
    let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    let limit = (filter?.limit && filter?.limit) || 1000;
    if (userString) {
      const userObject = JSON.parse(userString);
      const ownerId = userObject.user.orgId;

      if (ownerId) {
        let params = {
          api: ` ${config.Ip}/users?ownerId=${ownerId}&limit=${limit}&page=${page}&q=${searchVal}`,
          method: 'GET',
          successAction: actionType.getAllmyteamSuccess(),
          failAction: actionType.getAllmyteamFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => console.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* fetchUserbycreatedbyId(action) {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const createdBy = userObject.user.id;
      console.log('=====createBy====', createdBy);
      const filter = action.payload;
      console.log('========filter=======', filter);

      let page = (filter && filter.page) || 1;
      console.log('page', page);
      let searchVal = (filter?.searchVal && filter?.searchVal) || '';
      let limit = (filter?.limit && filter?.limit) || 100;

      if (createdBy) {
        let params = {
          api: `${config.Ip}/users?createdBy=${createdBy}&limit=${limit}&page=${page}&q=${searchVal}`,
          method: 'GET',
          successAction: actionType.getUserCreatedBySuccess(),
          failAction: actionType.getUserCreatedByFail(),
          authorization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => console.error('createdBy not found in user object', { autoClose: 3000 }));
        throw new Error('createdBy not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* fetchUserCount() {
  try {
    let params = {
      api: `${config.Ip}/users/count`,
      method: 'GET',
      successAction: actionType.totalCountSuccess(),
      failAction: actionType.totalCountFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchUserById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/users/${action.payload}`,
      method: 'GET',
      successAction: actionType.getUserByIdSuccess(),
      failAction: actionType.getUserByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addUser(action) {
  try {
    let params = {
      api: `${config.Ip}/users/createUser`,
      method: 'POST',
      successAction: actionType.addUserSuccess(),
      failAction: actionType.addUserFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.addUserSuccess().type, payload: res });
      yield put({ type: actionType.getUser().type });
      yield put({ type: actionType.getUserCreatedBy().type });
      yield call(() => toast.success('User Added Successfully', { autoClose: 3000 }));
    } else {
      yield call(() => toast.error('User already exists', { autoClose: 3000 }));
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || 'An error occurred';

      if (status === 400) {
        yield call(() => toast.error(`Validation Error: ${message}`, { autoClose: 3000 }));
      } else if (status === 409) {
        yield call(() => toast.error('User with this information already exists', { autoClose: 3000 }));
      } else if (status === 500) {
        yield call(() => toast.error('Internal Server Error', { autoClose: 3000 }));
      } else {
        yield call(() => toast.error(message, { autoClose: 3000 }));
      }
    } else {
      yield call(() => toast.error('Error in User creation', { autoClose: 3000 }));
      console.error('Error in User creation:', error);
    }
  }
}

function* updateUserById(action) {
  console.log('==updateaction==', action);

  try {
    let params = {
      api: `${config.Ip}/users/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateUserSuccess(),
      failAction: actionType.updateUserFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success('User Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getUser().type });
    yield put({ type: actionType.getUserCreatedBy().type });
  } catch (error) {
    console.log(error);
  }
}

function* changeuserByStatus(action) {
  const isSuspended = action.payload.status.toLowerCase() === 'suspended';

  try {
    let params = {
      api: `${config.Ip}/users/changeStatus/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.changeStatusSuccess(),
      failAction: actionType.changeStatusFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);

    yield put({ type: actionType.getAllmyteam().type });
    if (isSuspended) {
      yield call(() => toast.error('User Suspended Successfully', { autoClose: 3000 }));
    } else {
      yield call(() => toast.success('Activated Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    toast.error(error);
  }
}
function* deleteUser(action) {
  try {
    let params = {
      api: ` ${config.Ip}/users/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteUserSuccess(action.payload),
      failAction: actionType.deleteUserFail(action.payload.message),
      authourization: 'token',
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield call(auth.basicApi, params);
    } else {
      yield call(() => toast.error('User Deleted Successfully', { autoClose: 3000 }));
      yield put({ type: actionType.getUserCreatedBy().type });
    }
  } catch (error) {
    yield call(() => toast.error('Deleted invalid', { autoClose: 3000 }));

    console.log(error);
  }
}

function* fetchLicenseeTeam() {
  try {
    let params = {
      api: `${config.Ip}/users/licensee/vendors`,
      method: 'GET',
      successAction: actionType.getLicenseeTeamSuccess(),
      failAction: actionType.getLicenseeTeamFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchLicenseeByTeam(action) {
  const teamId = action.payload;
  try {
    const params = {
      api: `${config.Ip}/users/licensee/team/${teamId}`,
      method: 'GET',
      successAction: actionType.filterLicenseeByTeamSuccess(),
      failAction: actionType.filterLicenseeByTeamFail(),
      authorization: 'token'
    };
    const response = yield call(auth.basicApi, params);
    yield put(filterLicenseeByTeamSuccess(response));
  } catch (error) {
    yield put(actionType.filterLicenseeByTeamFail());
  }
}

function* fetchUserMe() {
  try {
    let params = {
      api: `${config.Ip}/users/me`,
      method: 'GET',
      successAction: actionType.getUserMeSuccess(),
      failAction: actionType.getUserMeFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* UserActionWatcher() {
  yield takeEvery('user/getUser', fetchUser);
  yield takeEvery('user/changeStatus', changeuserByStatus);
  yield takeEvery('user/getAllmyteam', fetchAllMyteam);
  yield takeEvery('user/filterLicenseeByTeam', fetchLicenseeByTeam);
  yield takeEvery('user/getUserCreatedBy', fetchUserbycreatedbyId);
  yield takeEvery('user/addUser', addUser);
  yield takeEvery('user/getLicenseeTeam', fetchLicenseeTeam);
  yield takeEvery('user/totalCount', fetchUserCount);
  yield takeEvery('user/getUserById', fetchUserById);
  yield takeEvery('user/updateUser', updateUserById);
  yield takeEvery('user/deleteUser', deleteUser);
  yield takeEvery('user/getUserMe', fetchUserMe);
}
