import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchEnqsource() {
  try {
    let params = {
      api: `${config.Ip}/enqSource`,
      method: 'GET',
      successAction: actionType.getEnqSourceSuccess(),
      failAction: actionType.getEnqSourceFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchEnqSourceCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/enqSource/count?where=${JSON.stringify(filter)}`,
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

function* addEnqSource(action) {
  try {
    let params = {
      api: `${config.Ip}/enqSource`,
      method: 'POST',
      successAction: actionType.addEnqSourceSuccess(),
      failAction: actionType.addEnqSourceFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    yield put({ type: actionType.getEnqSource().type });
    yield call(() => toast.success('Enquiry Source Added Successfully', { autoClose: 3000 }));

    if (res) {
      //   yield put ({
      //     type: actionType.custCount().type,
      //     payload: {'where':{}}
      //   })
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchEnqsourceById(action) {
  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload}`,
      method: 'GET',
      successAction: actionType.getEnqSourceByIdSuccess(),
      failAction: actionType.getEnqSourceByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* updateEnqSourceById(action) {
  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateEnqSourceSuccess(),
      failAction: actionType.updateEnqSourceFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getEnqSource().type });
    yield call(() => toast.success('Enquiry Source Updated Successfully', { autoClose: 2000 }));
    // yield put(getEnqSource());
  } catch (error) {
    console.log(error);
  }
}

function* deleteEnqSource(action) {
  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteEnqSourceSuccess(),
      failAction: actionType.deleteEnqSourceFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Enquiry Source Deleted Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getEnqSource().type });

    if (res && res.status === 204) {
      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* EnqsourceActionWatcher() {
  yield takeEvery('/enqSource/getEnqSource', fetchEnqsource);
  yield takeEvery('/enqSource/addEnqSource', addEnqSource);
  yield takeEvery('/enqSource/totalCount', fetchEnqSourceCount);
  yield takeEvery('/enqSource/getEnqSourceById', fetchEnqsourceById);
  yield takeEvery('/enqSource/updateEnqSource', updateEnqSourceById);
  yield takeEvery('/enqSource/deleteEnqSource', deleteEnqSource);
}
