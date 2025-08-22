import { all, call } from 'redux-saga/effects';
import UserActionWatcher from '../container/userContainer/saga';
import CustomerActionWatcher from '../container/customerContainer/saga';
//  import SupportActionWatcher from '../container/supportContainer/saga';
import SupportTypeActionWatcher from '../container/supportTypeContainer/saga';
import PaymentActionWatcher from '../container/paymentContainer/saga';
import OrderActionWatcher from '../container/orderContainer/saga';
import InvoiceActionWatcher from '../container/invoiceContainer/saga';

// import BankActionWatcher from '../container/bankContainer/saga';

function* vendorSaga() {
  yield all([
    call(CustomerActionWatcher),
    call(UserActionWatcher),
    call(InvoiceActionWatcher),
    // call(SupportActionWatcher),
    call(SupportTypeActionWatcher),
    call(PaymentActionWatcher),
    call(OrderActionWatcher)
  ]);
}

export default vendorSaga;
