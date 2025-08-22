import { takeEvery, call } from 'redux-saga/effects';
import config from 'config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as actionType from './slice';

function* sendOtpRequest(action) {
  const data = action.payload;
  try {
    let params = {
      api: `${config.Ip}/passwordReset/sendotp`,
      method: 'POST',
      successAction: actionType.sendOtpRequestSuccess(),
      failAction: actionType.sendOtpRequestFail(),
      authourization: 'token',
      body: JSON.stringify(data)
    };
    let res = yield call(api.commonApi, params);
    if (res) {
      yield call(() => toast.success('An OTP has been sent to the registered mobile number', { autoClose: 3000 }));
    }
  } catch (error) {
    yield toast.error('User not found!! Try again with the registered mobile number', {
      autoClose: 3000,
      transition: Flip
    });
    return error;
  }
}

function* checkOtpRequest(action) {
  const data = action.payload.data;
  try {
    let params = {
      api: `${config.Ip}/passwordReset/checkpin`,
      method: 'POST',
      successAction: actionType.checkOtpRequestSuccess(),
      failAction: actionType.checkOtpRequestFail(),
      authourization: 'token',
      body: JSON.stringify(data)
    };
    let res = yield call(api.commonApi, params);
    if (res) {
      yield toast.success('OTP Verified', {
        autoClose: 3000,
        transition: Flip
      });
    }
  } catch (error) {
    if (err.status === 404) {
      yield toast.error('Redirecting to login page, since you have used your maximum attempts', {
        autoClose: 5000,
        transition: Flip
      });
    }
    return error;
  }
}

function* changePasswordRequest(action) {
  try {
    let params = {
      api: `${config.Ip}/passwordReset/change`,
      method: 'PUT',
      successAction: actionType.changePasswordRequestSuccess(),
      failAction: actionType.changePasswordRequestFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success('Password Updated Successfully', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchOtpRequests() {
  yield takeEvery('otp/SendOtpRequest', sendOtpRequest);
  yield takeEvery('otp/checkOtpRequest', checkOtpRequest);
  yield takeEvery('otp/changePasswordRequest', changePasswordRequest);
}
