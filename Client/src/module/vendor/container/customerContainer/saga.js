import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice.js';

function* fetchCustomer(action) {
  try {
    const userString = localStorage.getItem('user');
    const filter = action.payload;
    let page = (filter && filter.page) || 1;
    let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    let limit = (filter?.limit && filter?.limit) || 1000;
    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;
      if (orgId) {
        let params = {
          api: `${config.Ip}/customerProf?orgId=${orgId}&limit=${limit}&page=${page}&q=${searchVal}`,
          method: 'GET',
          successAction: actionType.getCustomerSuccess(),
          failAction: actionType.getCustomerFail(),
          authorization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        console.error('orgId not found in user object');
        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

function* fetchLicenseeCustomer(action) {
  const filter = action.payload;
  let page = (filter && filter.page) || 1;
  let searchVal = (filter?.searchVal && filter?.searchVal) || '';
  let limit = (filter?.limit && filter?.limit) || 1000;
  try {
    let params = {
      api: `${config.Ip}/customerProf/licensee/vendors/customers?limit=${limit}&page=${page}&q=${searchVal}`,
      method: 'GET',
      successAction: actionType.licensegetCustomerSuccess(),
      failAction: actionType.licensegetCustomerFail(),
      authorization: 'token'
    };
    let res = yield call(auth.basicApi, params);
    console.log('res++', res);
  } catch (error) {
    console.error(error);
  }
}

// function* fetchVendorCustomer() {
//   try {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       const userObject = JSON.parse(userString);
//       const userid = userObject.user.id;
//       const orgName = userObject.user.orgName;
//       if (userid) {
//         let params = {
//           api: `${config.Ip}/customerProf?customerOf=${userid}&orgName=${orgName}`,
//           method: 'GET',
//           successAction: actionType.getVendorCustomerSuccess(),
//           failAction: actionType.getVendorCustomerFail(),
//           authorization: 'token'
//         };
//         yield call(auth.basicApi, params);
//       } else {
//         console.error('orgId not found in user object');
//         throw new Error('orgId not found in user object');
//       }
//     } else {
//       throw new Error('User object not found in localStorage');
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//   }
// }

function* fetchCustomerById(action) {
  try {
    let params = {
      api: `${config.Ip}/customerProf/${action.payload}`,
      method: 'GET',
      successAction: actionType.getCustomerByIdSuccess(),
      failAction: actionType.getCustomerByIdFail(),
      authorization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.error(error);
  }
}

function* addCustomer(action) {
  try {
    let params = {
      api: `${config.Ip}/customerProf`,
      method: 'POST',
      successAction: actionType.addCustomerSuccess(),
      failAction: actionType.addCustomerFail(),
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield put({ type: actionType.addCustomerSuccess().type, payload: res });
      yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Customer Added Successfully', { autoClose: 3000 }));
    } else {
      yield call(() => toast.error('Customer already exists', { autoClose: 3000 }));
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
      yield call(() => toast.error('Customer credentials invalid', { autoClose: 3000 }));
    } else {
      console.error('Error in User creation:', error);
    }
  }
}

function* updateCustomerById(action) {
  try {
    let params = {
      api: `${config.Ip}/customerProf/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateCustomerSuccess(),
      failAction: actionType.updateCustomerFail(),
      authorization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    yield call(auth.basicApi, params);
    yield call(() => toast.success('Customer Updated Successfully', { autoClose: 3000 }));
    yield put({ type: actionType.getCustomer().type });
    console.log('getCustomer123', actionType.getCustomer());
  } catch (error) {
    console.log(error);
  }
}

function* fetchCustomerCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.ip}/customerProf/count?where=${JSON.stringify(filter)}`,
      method: 'GET',
      successAction: actionType.custCountSuccess(),
      failAction: actionType.custCountFail(),
      authorization: 'token'
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.error(error);
  }
}

function* deleteCustomer(action) {
  try {
    let params = {
      api: `${config.Ip}/customerProf/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCustomerSuccess(),
      failAction: actionType.deleteCustomerFail(),
      authorization: 'token',
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getCustomer().type });
    yield call(() => toast.error('Customer Deleted Successfully', { autoClose: 3000 }));
  } catch (error) {
    yield call(() => toast.error('Customer deletion error', { autoClose: 3000 }));
    console.error(error);
  }
}

export default function* CustomerActionWatcher() {
  yield takeEvery('customer/getCustomer', fetchCustomer);
  yield takeEvery('customer/licensegetCustomer', fetchLicenseeCustomer);
  // yield takeEvery('customer/getVendorCustomer', fetchVendorCustomer);
  yield takeEvery('customer/addCustomer', addCustomer);
  yield takeEvery('customer/getCustomerById', fetchCustomerById);
  yield takeEvery('customer/updateCustomer', updateCustomerById);
  yield takeEvery('customer/custCount', fetchCustomerCount);
  yield takeEvery('customer/deleteCustomer', deleteCustomer);
}
