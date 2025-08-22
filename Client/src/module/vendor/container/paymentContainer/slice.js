import { createSlice } from '@reduxjs/toolkit';

const PaymentSlice = createSlice({
  name: 'payment',
  initialState: {
    addPayment: [],
    loading: false,
    error: null,
    UpdatePayment: {},
    mainDelete: [],
    OrderByIdData: {},
    InvoiceByIdData: {},
    PaymentData: []
  },
  reducers: {
    addPayments: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPaymentsSuccess: (state, action) => {
      alert('suc');
      state.loading = false;
      state.addPayment = action.payload;
    },
    addPaymentsFail: (state, action) => {
      alert('fail');
      state.loading = false;
      state.error = action.payload;
    },
    getPayments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentsSuccess: (state, action) => {
      state.loading = false;
      state.PaymentData = action.payload;
    },

    getPaymentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getOrderById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderByIdSuccess: (state, action) => {
      state.loading = false;
      state.OrderByIdData = action.payload;
    },
    getOrderByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getInvoiceById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getInvoiceByIdSuccess: (state, action) => {
      state.loading = false;
      state.InvoiceByIdData = action.payload;
    },
    getInvoiceByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePaymentId: (state) => {
      state.loading = true;
      state.error = null;
    },

    updatePaymentIdSuccess: (state, action) => {
      state.loading = false;
      state.UpdatePayment = action.payload;
    },
    updatePaymentIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePayment: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePaymentSuccess: (state, action) => {
      state.loading = false;
      state.mainDelete = action.payload;
    },
    deletePaymentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getPayments,
  getPaymentsSuccess,
  getPaymentsFail,
  addPayments,
  addPaymentsSuccess,
  addPaymentsFail,
  getOrderById,
  getOrderByIdSuccess,
  getOrderByIdFail,
  getInvoiceById,
  getInvoiceByIdSuccess,
  getInvoiceByIdFail,
  updatePaymentId,
  updatePaymentIdSuccess,
  updatePaymentIdFail,
  deletePayment,
  deletePaymentSuccess,
  deletePaymentFail
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
