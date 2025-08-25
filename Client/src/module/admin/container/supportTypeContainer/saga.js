import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice.js';

// Fetch support types
function* fetchSupportType() {
  try {
    let params = {
      api: `${config.Ip}/supportType`,
      method: 'GET',
      successAction: actionType.getSupportTypeSuccess(),
      failAction: actionType.getSupportTypeFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
    yield put(actionType.getSupportTypeFail(error));
  }
}

// Fetch support type count
function* fetchSupportTypeCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/supportType/count?where=${JSON.stringify(filter)}`,
      method: 'GET',
      successAction: actionType.totalCountSuccess(),
      failAction: actionType.totalCountFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
    yield put(actionType.totalCountFail(error));
  }
}

// Fetch support type by ID
function* fetchSupportTypeById(action) {
  const id = action.payload;

  try {
    let params = {
      api: `${config.Ip}/supportType/${id}`,
      method: 'GET',
      successAction: actionType.getSupportTypeByIdSuccess(),
      failAction: actionType.getSupportTypeByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
    yield put(actionType.getSupportTypeByIdFail(error));
  }
}

// Add support type
function* addSupportType(action) {
  try {
    let params = {
      api: `${config.Ip}/supportType`,
      method: 'POST',
      successAction: actionType.addSupportTypeSuccess(),
      failAction: actionType.addSupportTypeFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put(actionType.getSupportType());
      yield call(() => toast.success('Support Type Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
    yield put(actionType.addSupportTypeFail(error));
  }
}

function* updateSupportTypeById(action) {
  try {
    let params = {
      api: `${config.Ip}/supportType/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateSupportTypeSuccess(),
      failAction: actionType.updateSupportTypeFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.success('Support Type Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSupportType().type });

    if (res && res.status === 200) {
      //
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete support type
function* deleteSupportType(action) {
  try {
    let params = {
      api: `${config.Ip}/supportType/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSupportTypeSuccess(),
      failAction: actionType.deleteSupportTypeFail(),
      authourization: 'token'
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Support Type Deleted Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSupportType().type });

    if (res && res.status === 200) {
      //
    }
  } catch (error) {
    console.log(error);
  }
}

// Watcher saga
export default function* SupportTypeActionWatcher() {
  yield takeEvery('supportType/getSupportType', fetchSupportType);
  yield takeEvery('supportType/totalCount', fetchSupportTypeCount);
  yield takeEvery('supportType/addSupportType', addSupportType);
  yield takeEvery('supportType/getSupportTypeById', fetchSupportTypeById);
  yield takeEvery('supportType/updateSupportType', updateSupportTypeById);
  yield takeEvery('supportType/deleteSupportType', deleteSupportType);
}
