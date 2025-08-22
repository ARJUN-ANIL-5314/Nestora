import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* getOrder() {
  try {
    let params = {
      api: `${config.Ip}/orders`,
      method: 'GET',
      successAction: actionType.getOrderSuccess(),
      failAction: actionType.getOrderFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addOrder(action) {
  // alert("saga")
  console.log('===action:', action);
  const datas = action.payload;
  console.log('==datas==', datas);
  const orderApiData = {
    dlryType: datas.dlryType,
    dueDate: datas.dueDate,
    orderNotes: datas.orderNotes,
    payAmt: datas.totalPrice,
    orderFrom: datas.orderFrom,
    custContactNo: datas.custContactNo,
    orderFromName: datas.orderFromName,
    custEmail: datas.custEmail,
    orderAmount: datas.orderAmount
  };

  console.log('==orderApiData==', orderApiData);

  const orderDetailsApiData = {
    itemDetails: datas.itemDetails
  };
  console.log('==orderDetailsApiData==', orderDetailsApiData);

  try {
    let params = {
      api: `${config.Ip}/orders`,
      method: 'POST',
      successAction: actionType.addOrderSuccess(),
      failAction: actionType.addOrderFail(),
      authourization: 'token',
      body: JSON.stringify(orderApiData)
    };

    let res = yield call(auth.basicApi, params);

    console.log('==res==', res);

    if (res) {
      // yield put({ type: actionType.addOrderDetails({ orderId : res.id,...orderDetailsApiData}) }).type;
      yield put({
        // type: actionType.addOrderDetails(),
        type: actionType.addOrderDetails.type,
        payload: { orderId: res.id, ...orderDetailsApiData }
      });
      yield call(() => toast.success(' Order Added Successfully', { autoClose: 1000 }));

      console.log('==orderetails==', { orderId: res.id, ...orderDetailsApiData });
    }
  } catch (error) {
    yield call(() => toast.error(' Order Invalid Datas', { autoClose: 1000 }));

    console.log(error);
  }
}

function* addOrderDetails(action) {
  const details = action.payload;
  const detailItems = action.payload.itemDetails;
  console.log('===details:====', details);
  console.log('===detailItems:====', detailItems);

  for (let i = 0; i < detailItems.length; i++) {
    const OrderDetails = {
      orderId: details.orderId,
      mainCatgId: detailItems[i].mainCatgId,
      mainCatgName: detailItems[i].mainCatgName,
      catgId: detailItems[i].catgId,
      catgName: detailItems[i].catgName,
      subCatgId: detailItems[i].subCatgId,
      subCatgName: detailItems[i].subCatgName,
      itemDetails: {
        rateCardSetupId: detailItems[i].rateCardSetupId,
        spcfctnId: detailItems[i].spcfctnId,
        spcfctnName: detailItems[i].spcfctnName,
        displayValue: detailItems[i].displayValue,
        displayAmt: detailItems[i].displayAmt,
        unitRate: detailItems[i].unitRate,
        unitQty: detailItems[i].unitQty,
        unitPrice: detailItems[i].unitPrice
      },
      dlryDetails: {
        remarks: 'wdsd'
      }
    };

    console.log('==OrderDetailsObj==', OrderDetails);

    try {
      let params = {
        api: `${config.Ip}/orderDetails`,
        method: 'POST',
        successAction: actionType.addOrderDetailsSuccess(),
        failAction: actionType.addOrderDetailsFail(),
        authourization: 'token',
        body: JSON.stringify(OrderDetails)
      };

      const res = yield call(auth.basicApi, params);
      console.log('===responseOrd===', res);

      // if(res){
      //   yield call(() => toast.success(' Order details Added Successfully', { autoClose: 3000 }));
      // }
    } catch (error) {
      console.log(error);
    }
  }
}

function* fetchOrder(action) {
  console.log('orderaction====', action.payload);
  try {
    const filter = action.payload;
    console.log('========filter=======', filter);

    let dispValue = (filter?.dispValue._id && filter?.dispValue._id) || '';
    let item = (filter?.item && filter?.item) || '';
    let subCatg = (filter?.subCatg && filter?.subCatg) || '';

    console.log('====subCatg====', subCatg);
    console.log('====dispValue====', dispValue);
    let params = {
      api: `${config.Ip}/rateCard?subCatgId=${subCatg}&dispValue=${dispValue}&item=${item}`,
      // api: ${config.Ip}/rateCard?&dispValue=1 side&item=side,
      method: 'GET',
      successAction: actionType.fetchOrderSuccess(),
      failAction: actionType.fetchOrderFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);

    let res = yield call(auth.basicApi, params);
    console.log(res, '==yield==');
  } catch (error) {
    console.log(error);
  }
}

function* fetchOrderById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/orders/${action.payload}`,
      method: 'GET',
      successAction: actionType.getOrderCreatedBySuccess(),
      failAction: actionType.getOrderCreatedByFail(),
      authourization: 'token'
    };
    const res = yield call(auth.basicApi, params);
    console.log('==res==', res);
  } catch (error) {
    console.log(error);
  }
}

function* updateOrderById(action) {
  try {
    let params = {
      api: `${config.Ip}/orders/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateOrderSuccess(),
      failAction: actionType.updateOrderFail(),
      authorization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    yield call(auth.basicApi, params);
    yield call(() => toast.success('Order Confirmed', { autoClose: 3000 }));
    yield put({ type: actionType.getOrder().type });
  } catch (error) {
    console.log(error);
  }
}

function* deleteOrder(action) {
  try {
    let params = {
      api: ` ${config.Ip}/orders/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteOrderSuccess(action.payload),
      failAction: actionType.deleteOrderFail(action.payload.message),
      authourization: 'token',
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      yield call(auth.basicApi, params);
      yield put({ type: actionType.getOrder().type });
      yield put({ type: actionType.getOrderCreatedBy().type });
      yield call(() => toast.error('Deleted Successfully', { autoClose: 3000 }));
    } else {
      yield call(() => toast.error('Deleted Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    // Handle error if deletion fails
    console.log(error);
  }
}

export default function* OrderActionWatcher() {
  yield takeEvery('order/addOrder', addOrder);
  yield takeEvery('order/addOrderDetails', addOrderDetails);
  yield takeEvery('order/fetchOrder', fetchOrder);
  yield takeEvery('order/getOrder', getOrder);
  yield takeEvery('order/deleteOrder', deleteOrder);
  yield takeEvery('order/getOrderCreatedBy', fetchOrderById);
  yield takeEvery('order/updateOrder', updateOrderById);
}
