import 'react-toastify/dist/ReactToastify.css';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice.js';

function* addRateCards(action) {
  try {
    let params = {
      api: `${config.Ip}/RateCard`,
      method: 'POST',
      successAction: actionType.addRateCardSuccess(),
      failAction: actionType.addRateCardFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload.rateCardData)
    };

    let res = yield call(auth.basicApi, params);

    yield call(() => toast.success('Rate Card Added Successfully', { autoClose: 3000 }));
    if (res) {
      yield put({ type: actionType.getRateCard().type });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addRateCardCompare(action) {
  try {
    let params = {
      api: `${config.Ip}/rateCardComparer`,
      method: 'POST',
      successAction: actionType.addRateCardCompareSuccess(),
      failAction: actionType.addRateCardCompareFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addRateCalc(action) {
  try {
    let params = {
      api: `${config.Ip}/rateCardComparer/rateCalc`,
      method: 'POST',
      successAction: actionType.addRateCalcSuccess(),
      failAction: actionType.addRateCalcFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchRateCard() {
  try {
    const userId = localStorage.getItem('user');
    if (userId) {
      const userObject = JSON.parse(userId);
      const orgId = userObject.user.orgId;

      let params = {
        api: `${config.Ip}/RateCard?orgId=${orgId}`,
        method: 'GET',
        successAction: actionType.getRateCardSuccess(),
        failAction: actionType.getRateCardFail(),
        authourization: 'token'
      };
      let RateCard = yield call(auth.basicApi, params);

      console.log(RateCard);
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchRateCardSpec() {
  try {
    let params = {
      api: `${config.Ip}/RateCard/specItems`,
      method: 'GET',
      successAction: actionType.getRateCardSpecSuccess(),
      failAction: actionType.getRateCardSpecFail(),
      authourization: 'token'
    };
    let RateCardSpec = yield call(auth.basicApi, params);

    console.log(RateCardSpec);
  } catch (error) {
    console.log(error);
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
function* getSubFilterCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/subCategory/subCatg/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSubFilterCategorySuccess(),
      failAction: actionType.getSubFilterCategoryFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* getSpecificationFiltered(action) {
  try {
    let params = {
      api: `${config.Ip}/specification?subCatgId=${action.payload}`,
      method: 'GET',
      successAction: actionType.getSpecificationFilteredSuccess(),
      failAction: actionType.getSpecificationFilteredFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchCurrency() {
  try {
    let params = {
      api: `${config.Ip}/RateCard`,
      method: 'GET',
      successAction: actionType.fetchCurrencySuccess(),
      failAction: actionType.fetchCurrencyFail(),
      authourization: 'token'
    };
    let RateCard = yield call(auth.basicApi, params);

    console.log(RateCard);
  } catch (error) {
    console.log(error);
  }
}

function* updateRateCard(action) {
  const id = action.payload.id;
  console.log('==id==', id);
  try {
    let params = {
      api: ` ${config.Ip}/rateCard/${id}`,
      method: 'PUT',
      successAction: actionType.updateRateCardSuccess(),
      failAction: actionType.updateRateCardFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload.updatedData)
    };

    let res = yield call(auth.basicApi, params);
    console.log('==res==', res);

    if (res) {
      yield put({ type: actionType.getRateCard(id).type });
    }

    yield call(() => toast.success('RateCard Updated Successfully', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

function* deleteRateCard(action) {
  try {
    let params = {
      api: `${config.Ip}/rateCard/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteRateCardSuccess(),
      failAction: actionType.deleteRateCardFail(),
      authourization: 'token',
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error('Rate Card Deleted Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      yield put({ type: actionType.getRateCard().type });
    }
  } catch (error) {
    console.log(error);
  }
}
export default function* RateCardActionWatcher() {
  yield takeEvery('rateCard/getRateCard', fetchRateCard);
  yield takeEvery('rateCard/addRateCardCompare', addRateCardCompare);
  yield takeEvery('rateCard/addRateCard', addRateCards);
  yield takeEvery('rateCard/getRateCardSpec', fetchRateCardSpec);
  yield takeEvery('rateCard/fetchCategoryByFilter', fetchCategoryByFilter);
  yield takeEvery('rateCard/getSubFilterCategory', getSubFilterCategory);
  yield takeEvery('rateCard/getSpecificationFiltered', getSpecificationFiltered);
  yield takeEvery('rateCard/fetchCurrency', fetchCurrency);
  yield takeEvery('rateCard/deleteRateCard', deleteRateCard);
  yield takeEvery('rateCard/updateRateCard', updateRateCard);
  yield takeEvery('rateCard/addRateCalc', addRateCalc);
}
