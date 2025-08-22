import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from 'container/auth';
import config from 'config';

import {
  loginSuccess,
  loginFail,
  loginUserSuccess,
  loginUser,
  loginUserFail,

} from './slice';



function* login(action) {
  console.log('======action======', action.payload);

  try {
    const response = yield fetch(`http://localhost:3002/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),

  

    });

    if (!response.ok) {
      const errorResponse = yield response.json(); 
      console.log("API Error Response:", errorResponse);

      yield toast.error(errorResponse.message || 'Invalid User', { autoClose: 5000 });
      throw new Error(errorResponse.message || "Invalid User"); 
    }

    const resJSON = yield response.json();
    console.log('===============resJSON=====================', resJSON);

    yield localStorage.setItem(process.env.REACT_APP_TOKEN, resJSON.token);
    yield put(loginSuccess(resJSON));
    yield put(loginUser(action.payload));

  } catch (error) {
    console.log("Caught Error:", error); 
    yield put(loginFail(error.message));

    yield toast.error(error.message, { autoClose: 3000 });
  }
}


function* loginUserDetail(action) {
  console.log('Action.playlodellll', action.payload);
  try {
    let params = {
      api: `${config.Ip}/user-details`,
      method: 'GET',
      successAction: loginUserSuccess(),
      failAction: loginUserFail('Login failed. Please try again.'),
      authourization: 'token'
    };

    let res = yield call(auth.basicApi, params);
    console.log("==res==", res);
    if (
      res &&
      [
        'admin',
        'vendor',

      ].includes(res.role)
    ) {

      let user = {
        user: res
      };
      console.log('======res.role==========', res.role);

      yield localStorage.setItem(process.env.REACT_APP_LOGINUSER, JSON.stringify(user));

      // Navigate to different dashboards based on user roles
      switch (res?.role) {
        case 'admin':
           console.log("role check :",res?.role);
           
          yield action.payload.navigate('/admin-dashboard');
        
          

          break;
        case 'vendor':

          yield action.payload.navigate('/dashboard');

      }
      yield put(loginUser({ role: res.role }));

      yield toast.success('Login Successfull', {
        autoClose: 3000
      });
    }
  } catch (error) {
    if (error.status && error.message) {
      yield toast.error(error.message, {
        autoClose: 3000
      });
    }
  }
}



export default function* LoginActionWatcher() {
  yield takeEvery('login/userLogin', login);
  yield takeEvery('login/loginUser', loginUserDetail);
 
}
