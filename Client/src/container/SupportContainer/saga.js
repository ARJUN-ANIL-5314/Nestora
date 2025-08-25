import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice.js';

function* fetchSupport() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const userId = userObject.id;

      let apiUrl = `${config.Ip}/support?supportTo=${userId}&supportFrom=${userId}`;

      let params = {
        api: apiUrl,
        method: 'GET',
        successAction: actionType.getSupportSuccess(),
        failAction: actionType.getSupportFail(),
        authorization: 'token'
      };
      yield call(auth.basicApi, params);
    }
  } catch (error) {
    console.log('Error fetching support:', error);
    toast.error(error.message, { autoClose: 3000 });
  }
}

function* fetchSupportinternal() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const userId = userObject.id;

      let apiUrl = `${config.Ip}/support?supportTo=${userId}&supportFrom=${userId}`;

      let params = {
        api: apiUrl,
        method: 'GET',
        successAction: actionType.getInternalSuccess(),
        failAction: actionType.getInternalSupportFail(),
        authorization: 'token'
      };

      yield call(auth.basicApi, params);
    }
  } catch (error) {
    console.log('Error fetching support:', error);
    toast.error(error.message, { autoClose: 3000 });
  }
}

function* fetchSupportCount() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.orgId;
      if (orgId) {
        let params = {
          api: `${config.Ip}/support/count?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.totalCountSuccess(),
          failAction: actionType.totalCountFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('Support object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* updatedStatus(action) {
  try {
    const Id = action.payload.id;

    let apiUrl = `${config.Ip}/support/changeStatus/${Id}`;
    let params = {
      api: apiUrl,
      method: 'PUT',
      successAction: actionType.updateStatusSuccess(),
      failAction: actionType.updateStatusFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload.status),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.getSupport().type });
      yield put({ type: actionType.getInternalSupport().type });
      yield call(() => toast.success('Status Updated Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchsupportAll() {
  try {
    let apiUrl = `${config.Ip}/support`;

    let params = {
      api: apiUrl,
      method: 'GET',
      successAction: actionType.getSupportAllSuccess(),
      failAction: actionType.getSupportAllFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSupportById(action) {
  try {
    let params = {
      api: `${config.Ip}/support/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSupportByIdSuccess(),
      failAction: actionType.getSupportByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addSupport(action) {
  try {
    const supportString = localStorage.getItem('user');
    if (!supportString) {
      throw new Error('No user data found in localStorage');
    }

    const userObject = JSON.parse(supportString);

    const userId = userObject?.id;
    const supportTo = userObject?.ownerId;

    if (!userId || !supportTo) {
      throw new Error('Required user data (id or ownerId) is missing');
    }

    const payloadWithSupportFrom = {
      ...action.payload,
      supportFrom: userId,
      supportTo: supportTo
    };

    const params = {
      api: `${config.Ip}/support`,
      method: 'POST',
      successAction: actionType.addSupportSuccess(),
      failAction: actionType.addSupportFail(),
      authorization: 'token',
      body: JSON.stringify(payloadWithSupportFrom)
    };

    const res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.getSupport().type });
      yield put({ type: actionType.getInternalSupport().type });

      yield put({ type: actionType.totalCount().type });
      yield call(() => toast.success('Support Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.error('Error adding support:', error);
  }
}

function* updateSupportById(action) {
  try {
    const id = action.payload.id;

    let params = {
      api: `${config.Ip}/support/${id}`,
      method: 'PUT',
      successAction: actionType.updateSupportSuccess(),
      failAction: actionType.updateSupportFail(),
      authorization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getSupport().type });
    yield put({ type: actionType.getInternalSupport().type });

    yield call(() => toast.success('Support Updated Successfully', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

function* deleteSupport(action) {
  try {
    let params = {
      api: `${config.Ip}/support/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSupportSuccess(),
      failAction: actionType.deleteSupportFail(),
      authourization: 'token',
      payload: action.payload
    };

    yield call(auth.basicApi, params);

    yield call(() => toast.error('Support Deleted Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSupport().type });
    yield put({ type: actionType.totalCount().type });
  } catch (error) {
    yield call(() => toast.error('Support Delete Error', { autoClose: 3000 }));
    console.log(error);
  }
}

export default function* SupportActionWatcher() {
  yield takeEvery('commonSupport/getSupport', fetchSupport);
  yield takeEvery('commonSupport/getInternalSupport', fetchSupportinternal);
  yield takeEvery('commonSupport/updateStatus', updatedStatus);
  yield takeEvery('commonSupport/getSupportAll', fetchsupportAll);
  yield takeEvery('commonSupport/totalCount', fetchSupportCount);
  yield takeEvery('commonSupport/addSupport', addSupport);
  yield takeEvery('commonSupport/getSupportById', fetchSupportById);
  yield takeEvery('commonSupport/updateSupport', updateSupportById);
  yield takeEvery('commonSupport/deleteSupport', deleteSupport);
}
