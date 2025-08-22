import { combineReducers } from 'redux';
import customerReducer from '../container/customerContainer/slice';
import userReducer from '../container/userContainer/slice';
import supportTypeReducer from '../container/supportTypeContainer/slice';
import PaymentReducer from '../container/paymentContainer/slice';
import OrderReducer from '../container/orderContainer/slice';
import InvoiceReducer from '../container/invoiceContainer/slice';

// ==============================|| COMBINE REDUCER ||============================== //

const vendorReducer = combineReducers({
  invoice: InvoiceReducer,
  user: userReducer,
  customers: customerReducer,
  supportType: supportTypeReducer,
  payment: PaymentReducer,
  order: OrderReducer
});

export default vendorReducer;
