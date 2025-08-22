import { combineReducers } from 'redux';

import mainCategoryReducer from '../container/mainCategoryContainer/slice';
import categoryReducer from '../container/category/slice';
import subCategoryReducer from '../container/subCategoryContainer/slice';
import userReducer from 'module/vendor/container/userContainer/slice';
import specificationReducer from '../container/specificationContainer/slice';
import RateCardReducer from '../container/RateCardContainer/slice';
import RateCardSetupReducer from '../container/RateCardSetupContainer/slice';

import images from '../container/imgcontainer/slice';
// import userReducer from '../container/userContainer/slice';

// ==============================|| COMBINE REDUCER ||============================== //

const licenseeReducer = combineReducers({
  mainCategory: mainCategoryReducer,
  specification: specificationReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  user: userReducer,
  ImageData: images,
  RateCard: RateCardReducer,
  RateCardSetup: RateCardSetupReducer
  // user:userReducer,
});

export default licenseeReducer;
