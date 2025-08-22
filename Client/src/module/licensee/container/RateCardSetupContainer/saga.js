// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { call, takeEvery } from 'redux-saga/effects';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* addRateCardSetup(action) {
  // alert("saga")
  console.log('==setupaction==', action.payload);
  try {
    let params = {
      api: `${config.Ip}/rateCardSetup`,
      method: 'POST',
      successAction: actionType.addRateCardSetupSuccess(),
      failAction: actionType.addRateCardSetupFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);
    console.log('ratesetupres==', res);
    if (res) {
      yield put({ type: actionType.getRateCardSetup().type });
    }

    yield call(() => toast.success('RateCard Set Up Added Successfully', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

function* getPatternValue(action) {
  const pattern = action.payload;
  try {
    let params = {
      api: `${config.Ip}/rateCardSetup/pattern/${pattern}`,
      method: 'GET',
      successAction: actionType.getPatternValueSuccess(),
      failAction: actionType.getPatternValueFail(),
      authourization: 'token'
    };

    let patterns = yield call(auth.basicApi, params);
    console.log('==RateCardSetup==', patterns);
  } catch (error) {
    console.log(error);
  }
}

function* fetchRateCardSetup() {
  try {
    const userId = localStorage.getItem('user');
    if (userId) {
      const userObject = JSON.parse(userId);
      const orgId = userObject.user.orgId;
      console.log('===orgId===', orgId);
      let params = {
        api: `${config.Ip}/rateCardSetup?orgId=${orgId}`,
        method: 'GET',
        successAction: actionType.getRateCardSetupSuccess(),
        failAction: actionType.getRateCardSetupFail(),
        authourization: 'token'
      };
      let RateCardSetup = yield call(auth.basicApi, params);

      console.log('==RateCardSetup==', RateCardSetup);
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchSingleRatecardSetUp(action) {
  console.log('==actionaction==', action.payload);
  try {
    const filter = action.payload;
    console.log('========filterSub=======', filter);
    let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    console.log('++++++++++++++limit++++++++++++', searchVal);
    let params = {
      api: `${config.Ip}/rateCardSetup?subCatgName=${searchVal}`,
      method: 'GET',
      successAction: actionType.fetchSingleRatecardSetUpSuccess(),
      failAction: actionType.fetchSingleRatecardSetUpFail(),
      authourization: 'token'
    };

    const res = yield call(auth.basicApi, params);
    console.log('==resrate==', res);

    if (res.count == 1) {
      const specificationId = res.rows[0].specificationId.id;
      console.log('==specificationId==', specificationId);

      const fetchDispValue = {
        api: `${config.Ip}/rateCardSetup?specificationId=${specificationId}`,
        method: 'GET',
        successAction: actionType.fetchDispValueSuccess(),
        failAction: actionType.fetchDispValueFail(),
        authourization: 'token'
      };
      const anotherRes = yield call(auth.basicApi, fetchDispValue);
      console.log('==anotherRes==', anotherRes);
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchRateSetupById(action) {
  const filter = action.payload;
  console.log('=========filterId=========', filter);
  try {
    let params = {
      api: `${config.Ip}/rateCardSetup/${action.payload}`,
      method: 'GET',
      successAction: actionType.getRateSetupByIdSuccess(),
      failAction: actionType.getRateSetupByIdFail(),
      authourization: 'token'
    };
    const res = yield call(auth.basicApi, params);
    console.log('==res==', res);
  } catch (error) {
    console.log(error);
  }
}

function* deleteRateCardSetup(action) {
  console.log('==rateaction==', action.payload);

  try {
    let params = {
      api: `${config.Ip}/rateCardSetup/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteRateCardSetupSuccess(),
      failAction: actionType.deleteRateCardSetupFail(),
      authourization: 'token',
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    toast.error('Rate Card Setup Deleted Successfully', { autoClose: 3000 });

    if (res) {
      alert('lksdh');
      console.log('Dispatching action:', actionType.getRateCardSetup().type);
      yield put({ type: actionType.getRateCardSetup().type });
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

// function* deleteRateCardSetup(action) {
//   console.log("==rateaction==", action.payload);

//   try {
//     let params = {
//       api: `${config.Ip}/rateCardSetup/${action.payload}`,
//       method: 'DELETE',
//       successAction: actionType.deleteRateCardSetupSuccess(),
//       failAction: actionType.deleteRateCardSetupFail(),
//       authourization: 'token',
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);
//     alert("1")
//     toast.error('Rate Card Setup Deleted Successfully', { autoClose: 3000 });
//     alert("3")
//     yield call(() => toast.error('Rate Card Setup Deleted Successfully', { autoClose: 3000 }));

//     alert("2")
//     if (res && res.status === 204) {
//       yield put({ type: actionType.getRateCardSetup().type });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function* RateCardSetupActionWatcher() {
  yield takeEvery('rateCardSetup/getRateCardSetup', fetchRateCardSetup);
  yield takeEvery('rateCardSetup/addRateCardSetup', addRateCardSetup);
  yield takeEvery('rateCardSetup/getPatternValue', getPatternValue);
  yield takeEvery('rateCardSetup/fetchSingleRatecardSetUp', fetchSingleRatecardSetUp);
  yield takeEvery('rateCardSetup/deleteRateCardSetup', deleteRateCardSetup);
  yield takeEvery('rateCardSetup/getRateSetupById', fetchRateSetupById);
}
