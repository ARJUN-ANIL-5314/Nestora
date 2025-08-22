import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import SupportActionWatcher from 'container/SupportContainer/saga';
import CountryActionWatcher from 'module/admin/store/saga';
import vendorSaga from 'module/vendor/store/saga';
import licenseeSaga from 'module/licensee/store/saga';
import profileSaga from 'Profile/store/saga';

function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    call(SupportActionWatcher),
    call(CountryActionWatcher),
    call(vendorSaga),
    call(licenseeSaga),
    call(profileSaga)
  ]);
}

export default rootSaga;
