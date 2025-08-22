// import { createSlice } from '@reduxjs/toolkit';

// const orderSlice = createSlice({
//   name: 'order',
//   initialState: {
//     orderData: [],
//     loading: false,
//     error: null,
//     orderCount: 0,
//     orderByIdData: {},
//     retecardDetails:[],
//     // updateDetail:[]
//   },
//   reducers: {
//     addOrder: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     addOrderSuccess: (state, action) => {
//       state.loading = false;
//       state.orderData = action.payload;
//     },
//     addOrderFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     getOrder: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getOrderSuccess: (state, action) => {
//       state.loading = false;
//       state.orderData = action.payload;
//     },
//     getOrderFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     fetchOrder: (state , action) => {
//       console.log("=========specification=========", action.payload);
//       state.loading = true;
//       state.error = null;
//     },

//     fetchOrderSuccess: (state, action) => {
//       console.log("=========specification=========", action.payload);
//       state.loading = false;

//       state.retecardDetails = action.payload;

//     },

//     fetchOrderFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

// // updateSelectRate: (state, action) => {
// //       const newObject = action.payload;
// //       console.log("==newObject=", newObject);
// //       state.updateDetail = state.updateDetail.filter(rate => !Object.keys(rate).some(key => key in newObject));
// //       state.updateDetail = [...state.updateDetail, newObject];
// //       console.log("==state.updateDetail ==", state.updateDetail );
// //     }

//   }

// // updateSelectRate: (state, action) => {
// //   const newObject = action.payload;
// //   const key = Object.keys(newObject)[0];
// //   const existingObject = state.updateDetail.find(obj => Object.keys(obj)[0] === key);
// //   if (existingObject) {
// //     existingObject[key] = newObject[key];
// //   } else {
// //     state.updateDetail = [...state.updateDetail, newObject];
// //   }
// // }

// })

// export const {
//   addOrder,
//   addOrderSuccess,
//   addOrderFail,
//   getOrder,
//   getOrderSuccess,
//   getOrderFail,
//   fetchOrder,
//   fetchOrderSuccess,
//   fetchOrderFail,
//   // updateSelectRate

// } = orderSlice.actions;

// export default orderSlice.reducer;

//.......................................................................

import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: [],
    loading: false,
    error: null,
    orderCount: 0,
    orderByIdData: {},
    // orderSubmitObj:{},
    retecardDetails: [],
    updateDetail: []
  },
  reducers: {
    addOrder: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOrderSuccess: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },
    addOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addOrderDetails: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },
    addOrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getOrder: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderSuccess: (state, action) => {
      console.log('orderaction :', action);
      state.loading = false;
      state.orderData = action.payload;
    },
    getOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateOrder: (state, action) => {
      console.log('===stateupdate==', action);
      state.loading = true;
      state.error = null;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchOrder: (state, action) => {
      console.log('=========specification=========', action.payload);
      state.loading = true;
      state.error = null;
    },

    fetchOrderSuccess: (state, action) => {
      console.log('=========specification=========', action.payload);
      state.loading = false;

      state.retecardDetails = action.payload;
    },

    fetchOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSelectRate: (state, action) => {
      const newObject = action.payload;
      const keyToUpdate = Object.keys(newObject)[0]; // Assuming newObject has only one key-value pair

      // Filter out any existing rates with the same key
      state.updateDetail = state.updateDetail.filter((rate) => !(keyToUpdate in rate));

      // Add the new rate
      state.updateDetail = [...state.updateDetail, newObject];
    },

    getOrderCreatedBy: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderCreatedBySuccess: (state, action) => {
      state.loading = false;
      state.orderByIdData = action.payload;
    },
    getOrderCreatedByFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteOrder: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.userData =
        action.payload === undefined ? current(state.orderData) : current(state.orderData).filter((option) => option.id !== action.payload);
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  addOrder,
  addOrderSuccess,
  addOrderFail,
  addOrderDetails,
  addOrderDetailsSuccess,
  addOrderDetailsFail,
  getOrder,
  getOrderSuccess,
  getOrderFail,
  fetchOrder,
  fetchOrderSuccess,
  fetchOrderFail,
  getOrderCreatedBy,
  getOrderCreatedBySuccess,
  getOrderCreatedByFail,
  updateOrder,
  updateOrderSuccess,
  updateOrderFail,
  // fetchOrderSubmitObj,
  // fetchOrderSubmitObjSuccess,
  // fetchOrderSubmitObjFail,
  updateSelectRate,
  deleteOrder,
  deleteOrderSuccess,
  deleteOrderFail
} = orderSlice.actions;

export default orderSlice.reducer;
