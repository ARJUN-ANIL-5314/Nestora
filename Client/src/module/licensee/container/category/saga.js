import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice.js';

function* fetchCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/category?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.getCategorySuccess(),
          failAction: actionType.getCategoryFail(),
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

function* vendorFetchCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const createdBy = userObject.user.createdBy;

      if (createdBy) {
        let params = {
          api: `${config.Ip}/category?createdBy=${createdBy}`,
          method: 'GET',
          successAction: actionType.vendorGetCategorySuccess(),
          failAction: actionType.vendorGetCategoryFail(),
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

function* fetchCategoryCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/category/count?where=${JSON.stringify(filter)}`,
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

function* fetchCategoryById(action) {
  try {
    let params = {
      api: `${config.Ip}/category/${action.payload}`,
      method: 'GET',
      successAction: actionType.getCategoryByIdSuccess(),
      failAction: actionType.getCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/category`,
      method: 'POST',
      successAction: actionType.addCategorySuccess(),
      failAction: actionType.addCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.getCategory().type });
      yield call(() => toast.success('Category Added  Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* addCategoryimg(action) {
  try {
    let params = {
      api: `${config.Ip}/images/img`,
      method: 'POST',
      successAction: actionType.addCategorySuccess(),
      failAction: actionType.addCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.getCategory().type });
      yield call(() => toast.success('Category Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCategoryById(action) {
  try {
    let params = {
      api: ` ${config.Ip}/category/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateCategorySuccess(),
      failAction: actionType.updateCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);

    yield call(() => toast.success('Category Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getCategory().type });
  } catch (error) {
    console.log(error);
  }
}

function* deleteCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/category/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCategorySuccess(),
      failAction: actionType.deleteCategoryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Category Deleted Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      yield put(actionType.getCategory());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* CategoryActionWatcher() {
  yield takeEvery('category/getCategory', fetchCategory);
  yield takeEvery('category/vendorGetcetCategory', vendorFetchCategory);
  yield takeEvery('category/totalCount', fetchCategoryCount);
  yield takeEvery('category/addCategory', addCategory);
  yield takeEvery('category/addCategory', addCategoryimg);
  yield takeEvery('category/getCategoryById', fetchCategoryById);
  yield takeEvery('category/updateCategory', updateCategoryById);
  yield takeEvery('category/deleteCategory', deleteCategory);
}
