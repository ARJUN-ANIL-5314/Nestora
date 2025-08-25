import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice.js';

function* fetchState() {
  try {
    let params = {
      api: `${config.Ip}/state`,
      method: 'GET',
      successAction: actionType.getStateSuccess(),
      failAction: actionType.getStateFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchStateCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/state/count?where=${JSON.stringify(filter)}`,
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

function* fetchStateById(action) {
  try {
    let params = {
      api: `${config.Ip}/state/${action.payload}`,
      method: 'GET',
      successAction: actionType.getStateByIdSuccess(),
      failAction: actionType.getStateByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addState(action) {
  try {
    let params = {
      api: `${config.Ip}/state`,
      method: 'POST',
      successAction: actionType.addStateSuccess(),
      failAction: actionType.addStateFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.getState().type });
      yield call(() => toast.success('State Added Successfully', { autoClose: 2000 }));

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateStateById(action) {
  try {
    let params = {
      api: `${config.Ip}/state/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateStateSuccess(),
      failAction: actionType.updateStateFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.success('State Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getState().type });

    if (res && res.status === 200) {
      //
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteState(action) {
  try {
    let params = {
      api: `${config.Ip}/state/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteStateSuccess(),
      failAction: actionType.deleteStateFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield put({ type: actionType.getState().type });
    yield call(() => toast.error('State Deleted Successfully', { autoClose: 2000 }));

    if (res && res.status === 204) {
      //  yield put({ type: actionType.getState().type });
      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchStateByFilter(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/state?countryId=${filter}`,
      method: 'GET',
      successAction: actionType.StateByFilterSuccess(),
      failAction: actionType.StateByFilterFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* StateActionWatcher() {
  yield takeEvery('state/getState', fetchState);
  yield takeEvery('state/totalCount', fetchStateCount);
  yield takeEvery('state/addState', addState);
  yield takeEvery('state/getStateById', fetchStateById);
  yield takeEvery('state/updateState', updateStateById);
  yield takeEvery('state/deleteState', deleteState);
  yield takeEvery('state/getStateByFilter', fetchStateByFilter);
}
