import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';
import { loginUser } from 'container/LoginContainer/slice';

function* addOrgProf(action) {
  try {
    const params = {
      api: `${config.Ip}/orgProf`,
      method: 'POST',
      successAction: actionType.addOrgProfSuccess(),
      failAction: actionType.addOrgProfFail(),
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };
    const res = yield call(auth.basicApi, params);
    if (res) {
      yield toast.success('User Details Added Successfully', { autoClose: 3000 });
      yield put(actionType.getOrgProf(action.payload.id));
      yield put(loginUser(action.payload.id));
    }
  } catch (error) {
    console.error('Error adding organization profile:', error);
    yield put(actionType.addOrgProfFail(error.message));
  }
}

function* fetchOrgProf() {
  try {
    const params = {
      api: `${config.Ip}/orgProf`,
      method: 'GET',
      successAction: actionType.getOrgProfSuccess(),
      failAction: actionType.getOrgProfFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error('Error fetching organization profiles:', error);
    yield put(actionType.getOrgProfFail(error.message));
  }
}

function* fetchOrgProfById(action) {
  const userId = action.payload;
  try {
    const params = {
      api: `${config.Ip}/orgProf/${userId}`,
      method: 'GET',
      successAction: actionType.getOrgProfIdSuccess(),
      failAction: actionType.getOrgProfIdFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
    yield put(loginUser(action.payload));
  } catch (error) {
    console.error('Error fetching organization profile by ID:', error);
    yield put(actionType.getOrgProfIdFail(error.message));
  }
}

function* updateOrgProfById(action) {
  const { userId, ...restPayload } = action.payload;
  try {
    const params = {
      api: `${config.Ip}/orgProf/${userId}`,
      method: 'PUT',
      successAction: actionType.updateOrgProfIdSuccess(),
      failAction: actionType.updateOrgProfIdFail(),
      authorization: 'token',
      body: JSON.stringify({ ...restPayload, id: undefined })
    };
    yield call(auth.basicApi, params);
    yield toast.success('Profile Updated Successfully', { autoClose: 2000 });
    yield put(actionType.getOrgProfId(userId));
    yield put(loginUser(userId));
  } catch (error) {
    console.error('Error updating organization profile by ID:', error);
    yield put(actionType.updateOrgProfIdFail(error.message));
  }
}

function* fetchLocation() {
  try {
    const params = {
      api: `${config.Ip}/location`,
      method: 'GET',
      successAction: actionType.getLocationSuccess(),
      failAction: actionType.getLocationFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error('Error fetching locations:', error);
    yield put(actionType.getLocationFail(error.message));
  }
}

function* fetchLocationState(action) {
  try {
    const params = {
      api: `${config.Ip}/location/${action.payload}`,
      method: 'GET',
      successAction: actionType.getStateSuccess(),
      failAction: actionType.getStateFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error('Error fetching location state:', error);
    yield put(actionType.getStateFail(error.message));
  }
}

function* fetchLocationDistrict(action) {
  try {
    const params = {
      api: `${config.Ip}/location/${action.payload}`,
      method: 'GET',
      successAction: actionType.getDistrictSuccess(),
      failAction: actionType.getDistrictFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error('Error fetching location district:', error);
    yield put(actionType.getDistrictFail(error.message));
  }
}

export default function* orgProfActionWatcher() {
  yield takeEvery('orgprof/addOrgProf', addOrgProf);
  yield takeEvery('orgprof/getOrgProf', fetchOrgProf);
  yield takeEvery('orgprof/getOrgProfId', fetchOrgProfById);
  yield takeEvery('orgprof/updateOrgProfId', updateOrgProfById);
  yield takeEvery('orgprof/getLocation', fetchLocation);
  yield takeEvery('orgprof/getState', fetchLocationState);
  yield takeEvery('orgprof/getDistrict', fetchLocationDistrict);
}
