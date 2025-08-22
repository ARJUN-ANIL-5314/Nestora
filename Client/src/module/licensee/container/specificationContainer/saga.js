import 'react-toastify/dist/ReactToastify.css';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* addSpecifications(action) {
  console.log('=========action.payload specification===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/specification`,
      method: 'POST',
      successAction: actionType.addSpecificationSuccess(),
      failAction: actionType.addSpecificationFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);
    console.log('=======res params =====', params);
    console.log('=======res spec =====', res);
    if (res) {
      yield put({ type: actionType.getSpecification().type });
      yield call(() => toast.success('Specification Added Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchSpecification(action) {
  console.log('===specotem====', action.payload);
  try {
    const userId = localStorage.getItem('user');

    if (userId) {
      const userObject = JSON.parse(userId);
      const orgId = userObject.user.orgId;

      let params = {
        api: `${config.Ip}/specification?orgId=${orgId}`,
        method: 'GET',
        successAction: actionType.getSpecificationSuccess(),
        failAction: actionType.getSpecificationFail(),
        authourization: 'token'
      };

      let specification = yield call(auth.basicApi, params);
      console.log('=========specificationss=========', specification);
      yield put(actionType.getSpecificationSuccess(specification));
    }
  } catch (error) {
    console.log(error);
  }
}

// function* fetchSpecification(action) {
//   console.log("===specotem====", action.payload);
//   try {
//     const userId = localStorage.getItem('user');

//    if (userId) {
//     const userObject = JSON.parse(userId);
//     const orgId = userObject.user.orgId;

//     let params = {
//       api: `${config.Ip}/specification?orgId=${orgId}`,
//       method: 'GET',
//       authourization: 'token'
//     };

//     let specification = yield call(auth.basicApi, params);
//     console.log("=========specificationss=========",specification);
//     yield put(actionType.getSpecificationSuccess(specification)); // Dispatch the success action
//   }

//   } catch (error) {
//     console.log(error);
//     yield put(actionType.getSpecificationFail(error)); // Dispatch the fail action
//   }
// }

function* fetchSingleSpecification(action) {
  try {
    const filter = action.payload;
    console.log('========filterSub=======', filter);

    let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    let limit = (filter?.limit && filter?.limit) || 10;

    console.log('++++++++++++++limit++++++++++++', searchVal);
    let params = {
      api: `${config.Ip}/specification?&limit=${limit}&subCatgName=${searchVal}`,
      method: 'GET',
      successAction: actionType.fetchSingleSpecificationSuccess(),
      failAction: actionType.fetchSingleSpecificationFail(),
      authourization: 'token'
    };
    res = yield call(auth.basicApi, params);
    console.log('==res==', res);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSpecificationById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/specification/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSpecificationByIdSuccess(),
      failAction: actionType.getSpecificationByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSingleSpecById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/specification/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSingleSpecByIdSuccess(),
      failAction: actionType.getSingleSpecByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSpecificationSpec() {
  try {
    let params = {
      api: ` ${config.Ip}/specification/specItems`,
      method: 'GET',
      successAction: actionType.getSpecificationSpecSuccess(),
      failAction: actionType.getSpecificationSpecFail(),
      authourization: 'token'
    };
    let SpecificationSpec = yield call(auth.basicApi, params);

    console.log('=========SpecificationSpec=========', SpecificationSpec);
  } catch (error) {
    console.log(error);
  }
}

function* updateSpecificationById(action) {
  const id = action.payload.id;
  const data = action.payload.data;
  console.log('==id==', action.payload);
  console.log('==data==', data);

  try {
    let params = {
      api: `${config.Ip}/specification/${id}`,
      method: 'PUT',
      successAction: actionType.updateSpecificationSuccess(),
      failAction: actionType.updateSpecificationFail(),
      authourization: 'token',
      body: JSON.stringify({ ...data, id: undefined }),
      payload: action.payload
    };

    const res = yield call(auth.basicApi, params);
    console.log('==res==', res);
    yield call(() => toast.success('Specification Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getSpecification().type });
  } catch (error) {
    console.log(error);
  }
}

function* deleteSpecification(action) {
  try {
    let params = {
      api: `${config.Ip}/specification/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSpecificationSuccess(),
      failAction: actionType.deleteSpecificationFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Specification Deleted Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      console.log('Dispatching actionss:', actionType.getSpecification().type);
      yield put({ type: actionType.getSpecification().type });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* SpecificationActionWatcher() {
  yield takeEvery('specification/getSpecification', fetchSpecification);
  yield takeEvery('specification/fetchSingleSpecification', fetchSingleSpecification);
  yield takeEvery('specification/addSpecification', addSpecifications);
  yield takeEvery('specification/getSpecificationSpec', fetchSpecificationSpec);
  yield takeEvery('specification/updateSpecification', updateSpecificationById);
  yield takeEvery('specification/getSpecificationById', fetchSpecificationById);
  yield takeEvery('specification/getSingleSpecById', fetchSingleSpecById);
  yield takeEvery('specification/deleteSpecification', deleteSpecification);
}
