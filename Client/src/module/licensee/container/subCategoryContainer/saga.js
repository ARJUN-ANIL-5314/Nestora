import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice.js';

function* fetchSubCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/subCategory?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.getSubCategorySuccess(),
          failAction: actionType.getSubCategoryFail(),
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

function* vendorFetchSubCategory() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const createdBy = userObject.user.createdBy;

      if (createdBy) {
        let params = {
          api: `${config.Ip}/subCategory?createdBy=${createdBy}`,
          method: 'GET',
          successAction: actionType.vendorGetSubCategorySuccess(),
          failAction: actionType.vendorGetSubCategoryFail(),
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

function* fetchCategoryByFilter(action) {
  const id = action.payload;

  try {
    let params = {
      api: `${config.Ip}/category/catg/${id}`,

      method: 'GET',
      successAction: actionType.getCategoryByFilterSuccess(),
      failAction: actionType.getCategoryByFilterFail(),
      authourization: 'token'
    };
    let cat = yield call(auth.basicApi, params);

    console.log(cat);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSubCategoryCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/subCategory/count?where=${JSON.stringify(filter)}`,
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

function* fetchSubCategoryById(action) {
  try {
    let params = {
      api: `${config.Ip}/subCategory/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSubCategoryByIdSuccess(),
      failAction: actionType.getSubCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addSubCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/subCategory`,
      method: 'POST',
      successAction: actionType.addSubCategorySuccess(),
      failAction: actionType.addSubCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.getSubCategory().type });
      yield call(() => toast.success('Sub Category Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateSubCategoryById(action) {
  try {
    let params = {
      api: ` ${config.Ip}/subCategory/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateSubCategorySuccess(),
      failAction: actionType.updateSubCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success('Sub Category Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSubCategory().type });
  } catch (error) {
    console.log(error);
  }
}

function* deleteSubCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/subCategory/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSubCategorySuccess(),
      failAction: actionType.deleteSubCategoryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.error('Sub Category Deleted  Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSubCategory().type });
  } catch (error) {
    console.log(error);
  }
}

export default function* SubCategoryActionWatcher() {
  yield takeEvery('subCategory/getSubCategory', fetchSubCategory);
  yield takeEvery('subCategory/vendorGetSubCategory', vendorFetchSubCategory);
  yield takeEvery('subCategory/fetchCategoryByFilter', fetchCategoryByFilter);
  yield takeEvery('subCategory/totalCount', fetchSubCategoryCount);
  yield takeEvery('subCategory/addSubCategory', addSubCategory);
  yield takeEvery('subCategory/getSubCategoryById', fetchSubCategoryById);
  yield takeEvery('subCategory/updateSubCategory', updateSubCategoryById);
  yield takeEvery('subCategory/deleteSubCategory', deleteSubCategory);
}
