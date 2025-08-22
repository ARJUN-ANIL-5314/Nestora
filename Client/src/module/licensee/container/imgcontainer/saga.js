import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from 'config';
import * as actionType from './slice';

const getToken = () => localStorage.getItem('Token');

function* uploadImageSaga(action) {
  try {
    const formData = new FormData();
    formData.append('myImage', action.payload);

    const token = getToken();
    const response = yield call(axios.post, `${config.Ip}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      yield put(actionType.uploadImageSuccess(response.data.file));
      yield call(console.log, 'Image Uploaded Successfully', { autoClose: 3000 });
    } else {
      yield put(actionType.uploadImageFailure(response.data.message));
      yield call(console.error, 'Failed to upload image', { autoClose: 3000 });
    }
  } catch (error) {
    yield put(actionType.uploadImageFailure(error.message));
    yield call(console.error, 'An error occurred while uploading the image', { autoClose: 3000 });
  }
}

function* updateimgById(action) {
  const { filename, formData } = action.payload;
  try {
    const token = getToken();

    const response = yield call(axios.put, `${config.Ip}/images/${filename}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      yield put(actionType.updateimgByIdSuccess(response.data));
      yield call(console.log, 'Image Updated Successfully', { autoClose: 3000 });
    } else {
      yield put(actionType.updateimgByIdFail('Bad request'));
      yield call(console.error, 'Failed to update image', { autoClose: 3000 });
    }
  } catch (error) {
    yield put(actionType.updateimgByIdFail(error.message));
    yield call(console.error, 'An error occurred while updating the image', { autoClose: 3000 });
  }
}

function* deleteImg(action) {
  try {
    const token = getToken();
    const response = yield call(axios.delete, `${config.Ip}/images/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      yield put(actionType.deleteimgSuccess(action.payload));
      yield call(console.log, 'Image Deleted Successfully', { autoClose: 3000 });
    } else {
      yield put(actionType.deleteimgFail('Failed to delete image'));
      yield call(console.error, 'Failed to delete image', { autoClose: 3000 });
    }
  } catch (error) {
    yield put(actionType.deleteimgFail(error.message));
    yield call(console.error, 'An error occurred while deleting the image', { autoClose: 3000 });
  }
}

export default function* ImageActionWatcher() {
  yield takeEvery('Images/uploadImageRequest', uploadImageSaga);
  yield takeEvery('Images/updateimgById', updateimgById);
  yield takeEvery('Images/deleteimg', deleteImg);
}
