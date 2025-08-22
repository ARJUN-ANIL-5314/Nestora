import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'invoice',
  initialState: {
    invoiceData: [],
    loading: false,
    error: null
  },
  reducers: {
    addInvoice: (state, action) => {
      console.log('==action==', action);

      state.loading = true;
      state.error = null;
    },
    addInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoiceData = action.payload;
    },
    addInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getInvoice: (state) => {
      state.loading = true;
      state.error = null;
    },
    getInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.invoiceData = action.payload;
    },
    getInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addInvoice, addInvoiceSuccess, addInvoiceFail, getInvoice, getInvoiceSuccess, getInvoiceFail } = userSlice.actions;

export default userSlice.reducer;
