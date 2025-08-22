import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';
import { loginUser } from 'container/LoginContainer/slice';

function* addUserProf(action) {
  try {
    const params = {
      api: `${config.Ip}/userProf`,
      method: 'POST',
      successAction: actionType.addUserProfSuccess(),
      failAction: actionType.addUserProfFail(),
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };
    const res = yield call(auth.basicApi, params);
    if (res) {
      yield toast.success('Profile Details Added Successfully', { autoClose: 3000 });
      yield put(actionType.getUserProf());
      yield put(loginUser(action.payload.id));
    }
  } catch (error) {
    console.error('Error adding user profile:', error);
    yield put(actionType.addUserProfFail(error.message));
  }
}

function* fetchUserProf() {
  try {
    const params = {
      api: `${config.Ip}/userProf`,
      method: 'GET',
      successAction: actionType.getUserProfSuccess(),
      failAction: actionType.getUserProfFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    yield put(actionType.getUserProfFail(error.message));
  }
}

function* fetchProfById(action) {
  const userId = action.payload;
  try {
    const params = {
      api: `${config.Ip}/userProf/${userId}`,
      method: 'GET',
      successAction: actionType.getUserProfIdSuccess(),
      failAction: actionType.getUserProfIdFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    const errorMessage = error.message || 'An error occurred';
    console.error('Error fetching user profile by ID:', error);
    yield put(actionType.getUserProfIdFail(errorMessage));
  }
}

function* updateProfById(action) {
  const { userId, ...restPayload } = action.payload;
  try {
    const params = {
      api: `${config.Ip}/userProf/${userId}`,
      method: 'PUT',
      successAction: actionType.updateProfIdSuccess(),
      failAction: actionType.updateProfIdFail(),
      authorization: 'token',
      body: JSON.stringify({ ...restPayload, id: undefined })
    };
    yield call(auth.basicApi, params);
    yield toast.success('Profile Updated Successfully', { autoClose: 2000 });
    yield put(actionType.getUserProf());
    yield put(loginUser(userId));
  } catch (error) {
    const errorMessage = error.message || 'An error occurred';
    console.error('Error updating user profile by ID:', error);
    yield put(actionType.updateProfIdFail(errorMessage));
  }
}

export default function* UserProfActionWatcher() {
  yield takeEvery('profile/addUserProf', addUserProf);
  yield takeEvery('profile/getUserProf', fetchUserProf);
  yield takeEvery('profile/getUserProfId', fetchProfById);
  yield takeEvery('profile/updateUserProfId', updateProfById);
}
