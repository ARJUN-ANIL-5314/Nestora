// import { Button, Grid, MenuItem, Select, Typography, Box, useMediaQuery } from '@mui/material';
// // import { Box, useMediaQuery } from '@mui/system';
// import React from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import styles from './style.js';
// import { useTheme } from '@mui/material/styles';
// import { Formik, Form, ErrorMessage } from 'formik';
// // import MenuItem from '@mui/material/MenuItem';
// // import Select from '@mui/material/Select';
// import FormLabel from '@mui/material/FormLabel';
// import Textfield from 'ui-component/common/TextField';
// import { getCustomer } from 'module/vendor/container/customerContainer/slice';
// // import DataTable from 'react-data-table-component';
// // import { Delete } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import PersonIcon from '@mui/icons-material/Person';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import CustomerModal from './customerModal.jsx';
// import formatLabel from 'utils/formatLabel';
// import { useNavigate } from 'react-router-dom';
// import OrderModal from './OrderDetails.jsx';
// import { addPayments } from 'module/vendor/container/paymentContainer/slice';
// import { getInvoice } from 'module/vendor/container/invoiceContainer/slice';

// const PaymentAddPage = () => {
//   const theme = useTheme();
//   const style = styles(theme);
//   const formikRef = React.useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const invoiceData = useSelector((state) => state.data.invoice.invoiceData.rows);
//   // const [payments, setPayments] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [openModalOrder, setOpenModalOrder] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [invoice, setInvoice] = useState(null);
//   console.log("selectedOrder", selectedOrder);
//   console.log("===invoiceData===", invoiceData);
//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };
//   const handleOpenModalOrder = () => {
//     setOpenModalOrder(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setOpenModalOrder(false);
//   };

//   const handleCustomerSelect = (customer) => {
//     setSelectedCustomer(customer);
//     setSelectedOrder(null);
//     handleCloseModal();
//   };

//   const handleOrderSelect = (order) => {
//     console.log("==order==", order);

//     setSelectedOrder(order);
//     handleCloseModal();
//   };
//   const backToPayments = () => {
//     navigate('/Payments');
//   };
//   useEffect(() => {
//     dispatch(getCustomer());
//     dispatch(getInvoice())
//   }, [dispatch]);

//   const initialValues = {
//     customer: '',
//     fName: '',
//     lName: '',
//     invoiceRefNo: '',
//     payMode: '',
//     razorPaymentId: '',
//     paidAmnt: '',
//     paidDate: new Date().toISOString().split('T')[0],
//     Reference: '',
//     status: '',
//     remarks: ''
//   };

//   const paymentModes = [
//     { value: '', label: 'Select Payment Mode', disabled: true },
//     { value: 'cash', label: 'Cash' },
//     { value: 'credit', label: 'Credit' },
//     { value: 'debit', label: 'Debit' },
//     { value: 'netBanking', label: 'NetBanking' },
//     { value: 'upi', label: 'Upi' },
//     { value: 'wallet', label: 'wallet' }
//   ];

//   const paymentStatuses = [
//     { value: '', label: 'Select Payment Status', disabled: true },
//     { value: 'completed', label: 'Completed' },
//     { value: 'created', label: 'Created' },
//     { value: 'paid', label: 'Paid' },
//     { value: 'partial', label: 'Partial' },
//     { value: 'full', label: 'Full' },
//     { value: 'cancelled', label: 'Cancelled' },
//     { value: 'refunded', label: 'Refunded' }
//   ];

//   const handleAddPayment = (values) => {
//     console.log("====values====", values);
//     const data = {
//       fName: selectedCustomer?.fName,
//       lName: selectedCustomer?.lName,
//       custEmail: selectedCustomer?.email,
//       orderNo: selectedOrder?.orderRefNo,
//       custContactNo: selectedCustomer?.contactMobile1,
//       orderId: selectedOrder?.id,
//       orderFrom: selectedCustomer ? selectedCustomer.id : '',
//       // orderTo: selectedOrder ? selectedOrder.orderTo.id : '',
//       invoiceId:invoice.id,
//       payMode: values.payMode,
//       razorPaymentId: values.razorPaymentId,
//       paidAmnt: values.paidAmnt,
//       paidDate: values.paidDate,
//       Reference: values.Reference,
//       status: values.status,
//       remarks: values.remarks
//     };
//     console.log("====data====", data);

//     dispatch(addPayments(data));
//     backToPayments();
//   };
//   useEffect(() => {
//     if (invoiceData && invoiceData.length > 0) {
//     const invoice = invoiceData.find((invoice) => invoice.orderId?.id === selectedOrder?.id);
//     setInvoice(invoice);
//     }
//   }, [invoice, selectedOrder]);

//   console.log("==invoice==", invoice);

//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   return (
//     <>
//       <MainCard>
//         <Grid container spacing={2} sx={style.modalBoxHeader}>
//           <Grid item xs={11}>
//             <Box sx={{ ...style.modalHeadContent, fontSize: isMobile ? '14px' : '20px' }}>Add Payment</Box>
//           </Grid>

//           <Grid item xs={1} sx={style.closeIconGrid}>
//             <CloseIcon sx={style.closeIcon} onClick={backToPayments} />
//           </Grid>
//           <Box sx={style.headerUnderLine}></Box>
//         </Grid>
//         <Box sx={style.modalboxComponet}>
//           <Formik
//             initialValues={initialValues}
//             //   validationSchema={validationSchema}
//             onSubmit={(values, { resetForm }) => {
//               handleAddPayment(values);
//               resetForm();
//             }}
//             enableReinitialize={true}
//             innerRef={formikRef}
//           >
//             {({ setFieldValue, values }) => (
//               <Form>
//                 <Box sx={{ paddingBottom: '10px' }}>
//                   <Grid container spacing={2}>
//                     <Grid
//                       item
//                       sm={6}
//                       xs={12}
//                       sx={{ display: 'flex', marginTop: '10px', marginBottom: '10px', justifyContent: 'flex-start' }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Grid
//                           item
//                           xs={2}
//                           // style={{
//                           //   marginRight: '15px'
//                           // }}
//                           style={{ backgroundColor:selectedCustomer ? '#edf7ed': '#fff4e5', border: selectedCustomer? '1px solid #418944':'1px solid #f1852d', borderRadius: '20px',marginRight:'10px' }}
//                         >

//                           <IconButton onClick={handleOpenModal} style={{padding:'5px'}}>
//                             <PersonIcon style={{ color: selectedCustomer ? '#418944' : '#f1852d' }} />
//                           </IconButton>
//                         </Grid>
//                         <Grid item xs={10}>

//                           {selectedCustomer ? (
//                             <Typography variant={isMobile ? 'h6' : 'h4'}>
//                               {formatLabel(selectedCustomer?.fName + ' ' + selectedCustomer?.lName)}{' '}
//                               <span style={{ fontWeight: '500', fontSize: isMobile ? '10px' : '12px', marginLeft: '5px' }}>
//                                 {selectedCustomer ? '( ' + selectedCustomer?.customerId + ' )' : ''}
//                               </span>
//                             </Typography>
//                           ) : (
//                             <>
//                               <Typography variant={isMobile ? 'h6' : 'h4'}>
//                                 {'No Customer Selected'} <span style={{ color: 'red' }}>*</span>
//                               </Typography>
//                             </>
//                           )}
//                           {selectedCustomer ? (
//                             <>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Customer Type:{' '}
//                                 <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{formatLabel(selectedCustomer?.custType)}</span>
//                               </Typography>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Mob: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedCustomer?.contactMobile1} </span>{' '}
//                               </Typography>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Email: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedCustomer?.email} </span>
//                               </Typography>
//                             </>
//                           ) : (
//                             ''
//                           )}
//                         </Grid>
//                       </Box>
//                     </Grid>
//                     <Grid
//                       item
//                       sm={6}
//                       xs={12}
//                       sx={{
//                         display: 'flex',
//                         marginTop: '10px',
//                         marginBottom: '10px',
//                         justifyContent: isMobile ? 'flex-start' : 'flex-end'
//                       }}
//                     >
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Grid
//                           item
//                           xs={2}
//                           style={{ backgroundColor:selectedOrder ? '#edf7ed': '#fff4e5',  border: selectedOrder? '1px solid #418944':'1px solid #f1852d', borderRadius: '20px', marginRight: '10px' }}
//                         >
//                           <IconButton onClick={handleOpenModalOrder} style={{padding:'5px'}}>
//                             <ReceiptIcon style={{ color: selectedOrder ? '#418944' : '#f1852d' }}/>
//                           </IconButton>
//                         </Grid>
//                         <Grid item xs={10}>
//                           {selectedOrder ? (
//                             <Typography variant={isMobile ? 'h6' : 'h4'}>{selectedOrder.orderRefNo}</Typography>
//                           ) : (
//                             <>
//                               <Typography variant={isMobile ? 'h6' : 'h4'}>
//                                 {'No Invoice Selected '} <span style={{ color: 'red' }}>*</span>
//                               </Typography>
//                             </>
//                           )}

//                           {selectedOrder ? (
//                             <>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Order Date: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.orderDate} </span>
//                               </Typography>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Amount: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.orderAmount} </span>
//                               </Typography>
//                               <Typography variant={isMobile ? 'body1' : 'h5'}>
//                                 Due Date: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.dueDate} </span>
//                               </Typography>
//                             </>
//                           ) : (
//                             ''
//                           )}
//                         </Grid>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                   <Grid container spacing={3} sx={{ borderTop: '1px solid #dedede', marginTop: '10px' }}>
//                     <Grid item md={3} xs={12}>
//                       <FormLabel>
//                         Payment Mode<span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="payMode"
//                         id="payMode"
//                         placeholder="Select Payment Mode"
//                         value={values.payMode}
//                         onChange={(e) => {
//                           setFieldValue('payMode', e.target.value);
//                         }}
//                         variant="outlined"
//                         fullWidth
//                         style={{
//                           height: '49px',
//                           width: '100%',
//                           border: 'none',
//                           backgroundColor: 'white',
//                           marginTop: '10px'
//                         }}
//                         displayEmpty
//                       >
//                         {paymentModes.map((mode) => (
//                           <MenuItem key={mode.value} value={mode.value}>
//                             {mode.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <ErrorMessage name="payMode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>

//                     <Grid item md={3} xs={12}>
//                       <FormLabel>
//                         Amount<span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Textfield name="paidAmnt" id="paidAmnt" placeholder="Paid Amount" component={Textfield} />
//                       <ErrorMessage name="paidAmnt" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>

//                     <Grid item md={3} xs={12}>
//                       <FormLabel>
//                         Paid Date<span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Textfield name="paidDate" id="paidDate" placeholder="Paid Date" type="date" component={Textfield} />
//                       <ErrorMessage name="paidDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>

//                     <Grid item md={3} xs={12}>
//                       <FormLabel>Reference ID</FormLabel>
//                       <Textfield name="Reference" id="Reference" placeholder="Reference ID" component={Textfield} />
//                       <ErrorMessage name="Reference" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     <Grid item md={3} xs={12}>
//                       <FormLabel>
//                         Payment Status<span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="status"
//                         id="status"
//                         placeholder="Payment Status"
//                         value={values.status}
//                         onChange={(e) => {
//                           setFieldValue('status', e.target.value);
//                         }}
//                         variant="outlined"
//                         fullWidth
//                         style={{
//                           height: '49px',
//                           width: '100%',
//                           border: 'none',
//                           backgroundColor: 'white',
//                           marginTop: '10px'
//                         }}
//                         displayEmpty
//                       >
//                         {paymentStatuses.map((status) => (
//                           <MenuItem key={status.value} value={status.value} disabled={status.disabled}>
//                             {status.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <ErrorMessage name="status" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     <Grid item md={3} xs={12}>
//                       <FormLabel>Remarks</FormLabel>

//                       <Textfield
//                         multiline
//                         // minRows={4}
//                         // maxRows={6}
//                         // aria-label="maximum height"
//                         name="remarks"
//                         id="remarks"
//                         placeholder="Remarks"
//                         component={Textfield}
//                       />
//                       <ErrorMessage name="remarks" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                   </Grid>
//                   <Grid container sm={12}>
//                     <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
//                       <Box>
//                         <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
//                           Submit
//                         </Button>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </Box>
//                 {/* <Grid
//                   container
//                   sm={12}
//                   style={{ borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede', paddingTop: '20px', paddingBottom: '20px' }}
//                 >
//                   <Grid sm={12}>
//                     <DataTable
//                       columns={columns}
//                       data={payments}
//                       // pagination
//                       highlightOnHover
//                       pointerOnHover
//                       customStyles={customStyles}
//                       responsive
//                     />
//                     <Box style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
//                       <Box>Total Paid Amount: {totalPaidAmnt}</Box>
//                     </Box>
//                   </Grid>
//                 </Grid> */}
//                 {/* <Grid container sm={12}>
//                   <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
//                     <Box>
//                       <Button color="info" variant="contained" sx={style.addBtnHead}>
//                         Submit
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid> */}
//               </Form>
//             )}
//           </Formik>
//         </Box>
//       </MainCard>

//       {openModal && <CustomerModal open={openModal} handleClose={handleCloseModal} onSelect={handleCustomerSelect} />}
//       {openModalOrder && (
//         <OrderModal open={openModalOrder} handleClose={handleCloseModal} id={selectedCustomer?.id} onSelect={handleOrderSelect} />
//       )}
//     </>
//   );
// };

// export default PaymentAddPage;

import { Button, Grid, MenuItem, Select, Typography, Box, useMediaQuery } from '@mui/material';
// import { Box, useMediaQuery } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.js';
import { useTheme } from '@mui/material/styles';
import { Formik, Form, ErrorMessage } from 'formik';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import Textfield from 'ui-component/common/TextField';
import { getCustomer } from 'module/vendor/container/customerContainer/slice';
// import DataTable from 'react-data-table-component';
// import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CustomerModal from './customerModal.jsx';
import formatLabel from 'utils/formatLabel';
import { useNavigate } from 'react-router-dom';
import OrderModal from './OrderDetails.jsx';
import { addPayments } from 'module/vendor/container/paymentContainer/slice';

const PaymentAddPage = () => {
  const theme = useTheme();
  const style = styles(theme);
  const formikRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [payments, setPayments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalOrder, setOpenModalOrder] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log('selectedCustomer', selectedCustomer);
  console.log('===selectedOrder===', selectedOrder);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenModalOrder = () => {
    setOpenModalOrder(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalOrder(false);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setSelectedOrder(null);
    handleCloseModal();
  };

  // function capitalizeFirstLetter(value) {
  //   return value?.charAt(0)?.toUpperCase() + value?.slice(1);
  // }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    handleCloseModal();
  };
  const backToPayments = () => {
    navigate('/Payments');
  };
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  const initialValues = {
    customer: '',
    fName: '',
    lName: '',
    invoiceRefNo: '',
    payMode: '',
    razorPaymentId: '',
    paidAmnt: '',
    paidDate: new Date().toISOString().split('T')[0],
    Reference: '',
    status: '',
    remarks: ''
  };

  const paymentModes = [
    { value: '', label: 'Select Payment Mode', disabled: true },
    { value: 'cash', label: 'Cash' },
    { value: 'credit', label: 'Credit' },
    { value: 'debit', label: 'Debit' },
    { value: 'netBanking', label: 'NetBanking' },
    { value: 'upi', label: 'Upi' },
    { value: 'wallet', label: 'wallet' }
  ];

  const paymentStatuses = [
    { value: '', label: 'Select Payment Status', disabled: true },
    { value: 'completed', label: 'Completed' },
    { value: 'created', label: 'Created' },
    { value: 'paid', label: 'Paid' },
    { value: 'partial', label: 'Partial' },
    { value: 'full', label: 'Full' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const handleAddPayment = (values) => {
    console.log('====values====', values);
    const data = {
      fName: selectedCustomer?.fName,
      lName: selectedCustomer?.lName,
      custEmail: selectedCustomer?.email,
      orderNo: selectedOrder?.orderRefNo,
      custContactNo: selectedCustomer?.contactMobile1,
      orderId: selectedOrder?.id,
      orderFrom: selectedCustomer ? selectedCustomer.id : '',
      // orderTo: selectedOrder ? selectedOrder.orderTo.id : '',
      payMode: values.payMode,
      razorPaymentId: values.razorPaymentId,
      paidAmnt: values.paidAmnt,
      paidDate: values.paidDate,
      Reference: values.Reference,
      status: values.status,
      remarks: values.remarks
    };
    console.log('====data====', data);

    dispatch(addPayments(data));
    backToPayments();
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <MainCard>
        <Grid container spacing={2} sx={style.modalBoxHeader}>
          <Grid item xs={11}>
            <Box sx={{ ...style.modalHeadContent, fontSize: isMobile ? '14px' : '20px' }}>Add Payment</Box>
          </Grid>

          <Grid item xs={1} sx={style.closeIconGrid}>
            <CloseIcon sx={style.closeIcon} onClick={backToPayments} />
          </Grid>
          <Box sx={style.headerUnderLine}></Box>
        </Grid>
        <Box sx={style.modalboxComponet}>
          <Formik
            initialValues={initialValues}
            //   validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleAddPayment(values);
              resetForm();
            }}
            enableReinitialize={true}
            innerRef={formikRef}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Box sx={{ paddingBottom: '10px' }}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{ display: 'flex', marginTop: '10px', marginBottom: '10px', justifyContent: 'flex-start' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid
                          item
                          xs={2}
                          style={{
                            marginRight: '15px'
                          }}
                        >
                          <IconButton onClick={handleOpenModal}>
                            <PersonIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={10}>
                          {/* <Typography variant={isMobile ? 'h6' : 'h4'} style={{ display: 'flex', alignItems: 'baseline' }}>
                            {formatLabel(
                              selectedCustomer ? selectedCustomer?.fName + ' ' + selectedCustomer?.lName : 'No Customer Selected'
                            )}
                            <span style={{ fontWeight: '500', fontSize: isMobile ? '10px' : '12px', marginLeft: '5px' }}>
                              {selectedCustomer ? '( ' + selectedCustomer?.customerId + ' )' : ''}
                            </span>
                          </Typography> */}

                          {selectedCustomer ? (
                            <Typography variant={isMobile ? 'h6' : 'h4'}>
                              {formatLabel(selectedCustomer?.fName + ' ' + selectedCustomer?.lName)}{' '}
                              <span style={{ fontWeight: '500', fontSize: isMobile ? '10px' : '12px', marginLeft: '5px' }}>
                                {selectedCustomer ? '( ' + selectedCustomer?.customerId + ' )' : ''}
                              </span>
                            </Typography>
                          ) : (
                            <>
                              <Typography variant={isMobile ? 'h6' : 'h4'}>
                                {'No Customer Selected'} <span style={{ color: 'red' }}>*</span>
                              </Typography>
                            </>
                          )}
                          {selectedCustomer ? (
                            <>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Customer Type:{' '}
                                <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{formatLabel(selectedCustomer?.custType)}</span>
                              </Typography>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Mob: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedCustomer?.contactMobile1} </span>{' '}
                              </Typography>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Email: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedCustomer?.email} </span>
                              </Typography>
                            </>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      sx={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '10px',
                        justifyContent: isMobile ? 'flex-start' : 'flex-end'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid
                          item
                          xs={2}
                          style={{
                            marginRight: '15px'
                          }}
                        >
                          <IconButton onClick={handleOpenModalOrder}>
                            <ReceiptIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={10}>
                          {selectedOrder ? (
                            <Typography variant={isMobile ? 'h6' : 'h4'}>{selectedOrder.orderRefNo}</Typography>
                          ) : (
                            <>
                              <Typography variant={isMobile ? 'h6' : 'h4'}>
                                {'No Invoice Selected '} <span style={{ color: 'red' }}>*</span>
                              </Typography>
                            </>
                          )}

                          {selectedOrder ? (
                            <>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Order Date: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.orderDate} </span>
                              </Typography>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Amount: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.orderAmount} </span>
                              </Typography>
                              <Typography variant={isMobile ? 'body1' : 'h5'}>
                                Due Date: <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{selectedOrder?.dueDate} </span>
                              </Typography>
                            </>
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ borderTop: '1px solid #dedede', marginTop: '10px' }}>
                    <Grid item md={3} xs={12}>
                      <FormLabel>
                        Payment Mode<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Select
                        name="payMode"
                        id="payMode"
                        placeholder="Select Payment Mode"
                        value={values.payMode}
                        onChange={(e) => {
                          setFieldValue('payMode', e.target.value);
                        }}
                        variant="outlined"
                        fullWidth
                        style={{
                          height: '49px',
                          width: '100%',
                          border: 'none',
                          backgroundColor: 'white',
                          marginTop: '10px'
                        }}
                        displayEmpty
                      >
                        {paymentModes.map((mode) => (
                          <MenuItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name="payMode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <FormLabel>
                        Amount<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Textfield name="paidAmnt" id="paidAmnt" placeholder="Paid Amount" component={Textfield} />
                      <ErrorMessage name="paidAmnt" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <FormLabel>
                        Paid Date<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Textfield name="paidDate" id="paidDate" placeholder="Paid Date" type="date" component={Textfield} />
                      <ErrorMessage name="paidDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <FormLabel>Reference ID</FormLabel>
                      <Textfield name="Reference" id="Reference" placeholder="Reference ID" component={Textfield} />
                      <ErrorMessage name="Reference" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormLabel>
                        Payment Status<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Select
                        name="status"
                        id="status"
                        placeholder="Payment Status"
                        value={values.status}
                        onChange={(e) => {
                          setFieldValue('status', e.target.value);
                        }}
                        variant="outlined"
                        fullWidth
                        style={{
                          height: '49px',
                          width: '100%',
                          border: 'none',
                          backgroundColor: 'white',
                          marginTop: '10px'
                        }}
                        displayEmpty
                      >
                        {paymentStatuses.map((status) => (
                          <MenuItem key={status.value} value={status.value} disabled={status.disabled}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name="status" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormLabel>Remarks</FormLabel>

                      <Textfield
                        multiline
                        // minRows={4}
                        // maxRows={6}
                        // aria-label="maximum height"
                        name="remarks"
                        id="remarks"
                        placeholder="Remarks"
                        component={Textfield}
                      />
                      <ErrorMessage name="remarks" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>
                  </Grid>
                  <Grid container sm={12}>
                    <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                      <Box>
                        <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {/* <Grid
                  container
                  sm={12}
                  style={{ borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede', paddingTop: '20px', paddingBottom: '20px' }}
                >
                  <Grid sm={12}>
                    <DataTable
                      columns={columns}
                      data={payments}
                      // pagination
                      highlightOnHover
                      pointerOnHover
                      customStyles={customStyles}
                      responsive
                    />
                    <Box style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                      <Box>Total Paid Amount: {totalPaidAmnt}</Box>
                    </Box>
                  </Grid>
                </Grid> */}
                {/* <Grid container sm={12}>
                  <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                    <Box>
                      <Button color="info" variant="contained" sx={style.addBtnHead}>
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid> */}
              </Form>
            )}
          </Formik>
        </Box>
      </MainCard>

      {openModal && <CustomerModal open={openModal} handleClose={handleCloseModal} onSelect={handleCustomerSelect} />}
      {openModalOrder && (
        <OrderModal open={openModalOrder} handleClose={handleCloseModal} id={selectedCustomer?.id} onSelect={handleOrderSelect} />
      )}
    </>
  );
};

export default PaymentAddPage;
