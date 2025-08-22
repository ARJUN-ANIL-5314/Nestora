import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

function* fetchMainCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/mainCategory?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.getMainCategorySuccess(),
          failAction: actionType.getMainCategoryFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => toast.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* VendorfetchMainCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const createdBy = userObject.user.createdBy;

      if (createdBy) {
        let params = {
          api: `${config.Ip}/mainCategory?createdBy=${createdBy}`,
          method: 'GET',
          successAction: actionType.vendorGetMainCategorySuccess(),
          failAction: actionType.vendorGetMainCategoryFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => toast.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* fetchMainCategoryCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/mainCategory/count?where=${JSON.stringify(filter)}`,
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

function* fetchMainCategoryById(action) {
  try {
    let params = {
      api: `${config.Ip}/mainCategory/${action.payload}`,
      method: 'GET',
      successAction: actionType.getMainCategoryByIdSuccess(),
      failAction: actionType.getMainCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addMainCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/mainCategory`,
      method: 'POST',
      successAction: actionType.addMainCategorySuccess(),
      failAction: actionType.addMainCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getMainCategory().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Main Category Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateMainCategoryById(action) {
  try {
    let params = {
      api: ` ${config.Ip}/mainCategory/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateMainCategorySuccess(),
      failAction: actionType.updateMainCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success('Main Category Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getMainCategory().type });
  } catch (error) {
    console.log(error);
  }
}

function* deleteMainCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/mainCategory/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteMainCategorySuccess(),
      failAction: actionType.deleteMainCategoryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Main Category Deleted  Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      yield put(actionType.getMainCategory());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* MainCategoryActionWatcher() {
  yield takeEvery('mainCategory/getMainCategory', fetchMainCategory);
  yield takeEvery('mainCategory/vendorGetMainCategory', VendorfetchMainCategory);
  yield takeEvery('mainCategory/totalCount', fetchMainCategoryCount);
  yield takeEvery('mainCategory/addMainCategory', addMainCategory);
  yield takeEvery('mainCategory/getMainCategoryById', fetchMainCategoryById);
  yield takeEvery('mainCategory/updateMainCategory', updateMainCategoryById);
  yield takeEvery('mainCategory/deleteMainCategory', deleteMainCategory);
}
