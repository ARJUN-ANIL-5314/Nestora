import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer.js';
import loginReducer from 'container/LoginContainer/slice';
import supportReducer from 'container/SupportContainer/slice';
import countryReducer from 'module/admin/store/reducer';
import vendorReducer from 'module/vendor/store/reducer';
import adminReducer from 'module/admin/store/reducer';
import licenseeReducer from 'module/licensee/store/reducer';
import profileReducer from 'Profile/store/reducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  login: loginReducer,
  support: supportReducer,
  country: countryReducer,
  data: vendorReducer,
  adminReducer: adminReducer,
  licenseeReducer: licenseeReducer,
  profile: profileReducer
});

export default reducer;
