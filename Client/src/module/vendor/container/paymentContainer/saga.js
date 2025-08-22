import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchPayments() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/payment?ownerId=${orgId}`,
          method: 'GET',
          successAction: actionType.getPaymentsSuccess(),
          failAction: actionType.getPaymentsFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => console.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}

function* fetchOrderById(action) {
  console.log('fetchOrderById==', action);
  try {
    let params = {
      api: `${config.Ip}/orders?orderFrom=${action.payload}`,
      method: 'GET',
      successAction: actionType.getOrderByIdSuccess(),
      failAction: actionType.getOrderByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchInvoiceById(action) {
  console.log('fetchInvoiceById==', action);
  try {
    let params = {
      api: `${config.Ip}/invoice?invoiceFrom=${action.payload}`,
      method: 'GET',
      successAction: actionType.getInvoiceByIdSuccess(),
      failAction: actionType.getInvoiceByIdFail(),
      authourization: 'token'
    };
    const res = yield call(auth.basicApi, params);

    console.log('==resInvoice==', res);
  } catch (error) {
    console.log(error);
  }
}

function* addPayments(action) {
  console.log('==+action+==', action);
  try {
    alert('2');
    let params = {
      api: `${config.Ip}/payment`,
      method: 'POST',
      successAction: actionType.addPaymentsSuccess(),
      failAction: actionType.addPaymentsFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    alert('3');
    let res = yield call(auth.basicApi, params);
    console.log('====res====', res);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getPayments().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Added Payments Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePaymentId(action) {
  try {
    let params = {
      api: ` ${config.Ip}/mainCategory/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updatePaymentIdSuccess(),
      failAction: actionType.updatePaymentIdFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success(' Updated Payments Successfully', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

function* deletePayment(action) {
  try {
    let params = {
      api: `${config.Ip}/payment/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deletePaymentSuccess(),
      failAction: actionType.deletePaymentFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error(' Deleted Payments Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      yield put(actionType.getPayments());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* PaymentActionWatcher() {
  yield takeEvery('payment/getPayments', fetchPayments);
  yield takeEvery('payment/addPayments', addPayments);
  yield takeEvery('payment/getOrderById', fetchOrderById);
  yield takeEvery('payment/getInvoiceById', fetchInvoiceById);
  yield takeEvery('payment/updatePaymentId', updatePaymentId);
  yield takeEvery('payment/deletePayment', deletePayment);
}
