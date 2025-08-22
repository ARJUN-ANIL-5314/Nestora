import { takeEvery, call } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';
import { toast } from 'react-toastify';

function* addInvoice(action) {
  try {
    let params = {
      api: `${config.Ip}/invoice`,
      method: 'POST',
      successAction: actionType.addInvoiceSuccess(),
      failAction: actionType.addInvoiceFail(),
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);
    console.log('==res==', res);

    if (res) {
      yield put({ type: actionType.addInvoiceSuccess().type, payload: res });
    } else {
      // yield call(() => toast.error('Customer already exists', { autoClose: 3000 }));
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      yield call(() => toast.error('invoice credentials invalid', { autoClose: 3000 }));
    } else {
      console.error('Error in invoice creation:', error);
    }
  }
}

function* fetchInvoice() {
  try {
    let params = {
      api: `${config.Ip}/invoice`,
      method: 'GET',
      successAction: actionType.getInvoiceSuccess(),
      failAction: actionType.getInvoiceFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* InvoiceActionWatcher() {
  yield takeEvery('invoice/addInvoice', addInvoice);
  yield takeEvery('invoice/getInvoice', fetchInvoice);
}
