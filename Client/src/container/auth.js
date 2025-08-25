import { put } from 'redux-saga/effects';

import { Base64 } from 'js-base64';

function* basicApi(value) {

  
  console.log("==value==",value);
  
  const token = yield localStorage.getItem(process.env.REACT_APP_TOKEN);

  console.log(token, '====token====value=========');
  
  let authorization = value.authourization
    ? value.authourization === 'Basic'
      ? 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password)
      : `Bearer ${token}`
    : `Bearer ${token}`;

    console.log("==authorization==",authorization);
    

  const authHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: authorization
  };

  console.log("==authHeader==", authHeader);
  
  const noauthHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const responseCrud = yield fetch(`${value.api}`, {
      method: `${value.method}`,
      headers: value.authourization !== null ? authHeader : noauthHeader,
      body: value.body ? value.body : null
      // body: value.body ? JSON.stringify(value.body) : null
    });
console.log("==responseCrud==",responseCrud);


    if (!responseCrud.ok) {
      throw responseCrud;
    } else {
      if (responseCrud.status === 204) {
        yield put({
          type: `${value.successAction.type}`,
          payload: value.payload
        });
        return { status: 204, msg: 'Updated Successfully' };
      } else {
        const responseData = yield responseCrud.json();
        yield put({
          type: `${value.successAction.type}`,
          payload: responseData
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error('error', error);

    yield put({
      type: `${value.failAction.type}`,
      payload: error
    });
  }
}

export default { basicApi };
