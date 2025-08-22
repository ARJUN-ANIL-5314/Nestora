import { all, call } from 'redux-saga/effects';

import SpecificationActionWatcher from '../container/specificationContainer/saga';
import mainCategoryActionWatcher from '../container/mainCategoryContainer/saga';
import categoryActionWatcher from '../container/category/saga';
import subCategoryActionWatcher from '../container/subCategoryContainer/saga';
import ImageActionWatcher from '../container/imgcontainer/saga';
import RateCardActionWatcher from '../container/RateCardContainer/saga';
import RateCardSetupActionWatcher from '../container/RateCardSetupContainer/saga';

function* licenseeSaga() {
  yield all([
    call(SpecificationActionWatcher),
    call(mainCategoryActionWatcher),
    call(categoryActionWatcher),
    call(ImageActionWatcher),
    call(subCategoryActionWatcher),
    call(RateCardActionWatcher),
    call(RateCardSetupActionWatcher)
  ]);
}

export default licenseeSaga;
