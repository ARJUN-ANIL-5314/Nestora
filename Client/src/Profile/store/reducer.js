import { combineReducers } from 'redux';

import userProfReducer from '../container/profileContainer/slice';
import orgProfReducer from '../container/orgprofContainer/slice';
// ==============================|| COMBINE REDUCER ||============================== //

const profileReducer = combineReducers({
  profile: userProfReducer,
  orgprof: orgProfReducer
});

export default profileReducer;
