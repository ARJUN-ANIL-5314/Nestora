// import React, { useState,useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { IconButton } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// // import TextareaAutosize from '@mui/material/TextareaAutosize';
// import { Visibility, Delete } from '@mui/icons-material';
// import OrderView from './orderView';
// import OpenModal from 'ui-component/common/OpenModal';
// import { Grid, FormLabel, TextField } from '@mui/material';
// import Textfield from 'ui-component/common/TextField';
// import '../../../../../assets/style/style.css';
// import { addOrder } from 'module/vendor/container/orderContainer/slice';
// import { Formik, Form } from 'formik';

// function OrderShowTable({ formData }) {
//   const dispatch = useDispatch();
//   console.log("==formData==", formData);
//   // const submitValue = useSelector((state) => state.data.order.orderSubmitObj);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalComponent, setModalComponent] = useState(null);
//   const [modalHeading, setModalHeading] = useState('');
//   const [totalSum, setTotalSum] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [discount, setDiscount] = useState(0);

// // console.log("==submitValue==", submitValue);

//   const calculateTotalSum = () => {
//     let sum = 0;
//     formData.forEach((item) => {
//       sum += item.totalRate;
//     });
//     setTotalSum(sum);
//   };

//   useEffect(() => {
//     calculateTotalSum();
//   }, [formData]);
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setShowDeleteModal(false);
//   };

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     switch (whichOpen) {

//       case 'viewform':
//         setModalHeading('View Order');
//         setModalComponent(<OrderView datas={item} />);
//         break;
//       default:
//         setModalComponent(null);
//     }
//   };
//   console.log("==formData==", formData);
//   const columns = [
//     {
//       name: 'Unit Qty',
//       selector: (row) => row.unitQuantity,
//     },
//     {
//       name: 'Product',
//       selector: (row) => row.subCategoryName,
//     },
//     {
//       name: 'Total Rate',
//       selector: (row) => row.totalRate,
//     },

//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div>
//           <IconButton>
//             <Visibility className="actn-icon1" onClick={() => handleOpenModal('viewform', row)} />
//           </IconButton>
//           <IconButton>
//             <Delete className="actn-icon3" />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const data = formData.map((formValue) => {
//     const obj = {};
//     Object.keys(formValue).forEach((key) => {
//       obj[key] = formValue[key];
//     });
//     obj.unitQuantity = 1;
//     return obj;

//   });

//   const concatenatedData = formData.map((item) => {
//     const concatenatedString = Object.keys(item).map((key) => `${key}-${item[key]}`).join(', ');
//     return concatenatedString;
//   });

//   const filteredData = concatenatedData.map((str) => {
//     const keyValuePairs = str.split(', ');
//     const filteredKeyValuePairs = keyValuePairs.filter((pair) => {
//       const [key] = pair.split('-');
//       return !['subCategoryName', 'totalRate'].includes(key);
//     }).map((pair) => {
//       const [key, value] = pair.split('-');
//       if (key === 'remarks') {
//         return `${key}-${value.split(' ').slice(0, 5).join(' ')}`;
//       }
//       return pair;
//     });
//     return filteredKeyValuePairs.join(', ');
//   });

//   console.log("==filteredData==",filteredData);
//   console.log("==concatenatedData==", concatenatedData);

//   console.log("==data==", data);
//   const customStyles = {
//     table: {
//       style: {
//         border: '1px solid #ccc',
//       },
//     },
//     headRow: {
//       style: {
//         fontWeight: '900',
//         fontSize: '14px',
//         backgroundColor: '#f5f5f5',
//       },
//     },
//     rows: {
//       style: {
//         borderBottom: '1px solid #ccc',
//       },
//     },
//   };

//   return (
//     <Grid container>
//       <Grid  item md={8} paddingRight={2}>
//       <DataTable
//         columns={columns}
//         data={data}
//         highlightOnHover
//         pointerOnHover
//         customStyles={customStyles}
//         responsive
//       />

//       <Formik
//           initialValues={{
//             dlryType: '',
//             orderNotes: '',
//           }}

//           // onSubmit={(values, { setSubmitting }) => {
//           //   console.log('Submit values:', values);
//           //   const { dlryType, orderNotes } = values;
//           //   console.log(`Dlry Type: ${dlryType}, Order Notes: ${orderNotes}`);
//           //   const itemDetails = formData.map((item) => {
//           //     return { spcfctnName: item.subCategoryName, displayAmt: item.totalRate };
//           //   });
//           //   const submitValues = {
//           //     ...values,
//           //     totalPrice: totalSum + (totalSum * gst) / 100 - (totalSum * discount) / 100,
//           //     itemDetails,
//           //   };
//           //   dispatch(fetchOrderSubmitObj(submitValues));
//           //   setSubmitting(false);
//           //   console.log('Submit values with additional data:', submitValues);
//           // }}

//           onSubmit={(values, { setSubmitting }) => {
//   console.log('Submit values:', values);
//   const { dlryType, orderNotes } = values;
//   console.log(`Dlry Type: ${dlryType}, Order Notes: ${orderNotes}`);
//   const itemDetails = formData.map((item, index) => {
//     return {
//       spcfctnName: item.subCategoryName,
//       displayAmt: item.totalRate,
//       concatenatedData: filteredData[index], // add this line
//     };
//   });
//   const submitValues = {
//     ...values,
//     totalPrice: totalSum + (totalSum * gst) / 100 - (totalSum * discount) / 100,
//     itemDetails,
//   };
//   dispatch(addOrder(submitValues));
//   setSubmitting(false);
//   console.log('Submit values with additional data:', submitValues);
// }}
//       >
//         {({ values, handleChange, handleSubmit }) => (
//           <Form onSubmit={handleSubmit}>
//             <Grid container spacing={2} style={{ marginTop: 20 }}>
//               <Grid item xs={12} sm={6}>
//                 <FormLabel>Due Date</FormLabel>
//                 <Textfield
//                   id="due-date"
//                   variant="outlined"
//                   fullWidth
//                   type="date"
//                   {...handleChange('dueDate')}
//                   value={values.dueDate}
//                 />
//               </Grid>

// <Grid item xs={12} sm={6}>
//   <FormLabel>Delivery Type</FormLabel>
//   <Select
//     id="dlryType"
//     variant="outlined"
//     fullWidth
//     onChange={handleChange('dlryType')}
//     value={values.dlryType}
//     style={{margin:'8px 0px '}}
//   >
//     <MenuItem value="" disabled>
//       Select Delivery Type
//     </MenuItem>
//     <MenuItem value="onSite">On Site </MenuItem>
//     <MenuItem value="crubSide">Crub Side</MenuItem>
//     <MenuItem value="selfService">Self Service</MenuItem>
//     <MenuItem value="onSite">Third Party </MenuItem>
//     <MenuItem value="crubSide">Local Pickup</MenuItem>
//     <MenuItem value="selfService">Courier Delivery </MenuItem>
//   </Select>
// </Grid>

// <Grid item xs={12}>
//   <FormLabel>Order Note</FormLabel>
//   <TextField
//     id="text-area"
//     variant="outlined"
//     fullWidth
//     multiline
//     rows={2}
//     onChange={handleChange('orderNotes')}
//     value={values.orderNotes}
//     style={{margin:'8px 0px '}}
//   />
// </Grid>
//             </Grid>

//             <button type="submit">Submit</button>
//           </Form>
//         )}
//       </Formik>

//       </Grid>
//       <Grid item md={4} >
//         <Grid
//           bgcolor="#eef2f6"
//           container
//           style={{
//             borderRadius: '5px',
//             border: '1px solid #cbcbcb',
//             padding:'20px'
//           }}
//         >
//             <Grid item xs={12}  style={{display:'flex', justifyContent:'space-between', alignItems:'center',paddingBottom:'10px'}}>
//             <Grid>
//             <FormLabel>Before Discount:</FormLabel>
//             </Grid>
//             <Grid xs={4}>
//             <TextField
//               id="total-sum"
//               variant="outlined"
//               fullWidth
//               value={totalSum}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//           </Grid>
//           </Grid>

//           <Grid item xs={12}  style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'10px'}}>
//           <Grid>
//             <FormLabel>GST (%):</FormLabel>
//             </Grid>
//             <Grid xs={4}>
//             <TextField
//               id="gst"
//               variant="outlined"
//               fullWidth
//               value={gst}
//               onChange={(e) => setGst(e.target.value)}
//             />
//             </Grid>
//           </Grid>
//           <Grid item xs={12}  style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'10px'}}>
//             <Grid>
//             <FormLabel>Discount (%):</FormLabel>
//             </Grid>
//             <Grid xs={4}>
//             <TextField
//               id="discount"
//               variant="outlined"
//               fullWidth
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//             />
//             </Grid>
//           </Grid>
//           <Grid item xs={12}  style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'10px'}}>
//           <Grid>
//             <FormLabel>Total Price:</FormLabel>
//             </Grid>
//             <Grid xs={4}>
//             <TextField
//               id="net-total"
//               variant="outlined"
//               fullWidth
//               value={totalSum + (totalSum * gst) / 100 - (totalSum * discount) / 100}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {openModal && (
//         <OpenModal
//           open={openModal}
//           handleClose={handleCloseModal}
//           component={modalComponent}
//           mdlwidth={'60%'}
//           mdlHeading={modalHeading}
//         />
//       )}
//     </Grid>
//   );
// }

// export default OrderShowTable;

// today
//.......................................................

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { IconButton, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Visibility, Delete } from '@mui/icons-material';
import OrderView from './orderView';
import OpenModal from 'ui-component/common/OpenModal';
import { Grid, FormLabel, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Textfield from 'ui-component/common/TextField';
import '../../../../../assets/style/style.css';
import { addOrder } from 'module/vendor/container/orderContainer/slice';
import { Formik, Form } from 'formik';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function OrderShowTable({ formData, selectedRow, handleDeleteRow }) {
  console.log('==formData===', formData);
  const dispatch = useDispatch();
  console.log('===selectedRow===', selectedRow);
  const theme = useTheme();
  const style = commonStyles(theme);
  // const submitValue = useSelector((state) => state.data.order.orderSubmitObj);
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const navigate = useNavigate();
  const [modalHeading, setModalHeading] = useState('');
  const [totalSum, setTotalSum] = useState(0);
  const [gst, setGst] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  console.log('==totalSum=', totalSum);

  const backToOrder = () => {
    navigate('/orders');
    window.location.reload();
  };

  const calculateTotalSum = () => {
    let sum = 0;
    formData.forEach((item) => {
      sum += item.totalPrice;
    });
    setTotalSum(sum);
  };

  useEffect(() => {
    calculateTotalSum();
  }, [formData]);
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
  };

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    switch (whichOpen) {
      case 'viewform':
        setModalHeading('View Order');
        setModalComponent(<OrderView datas={item} />);
        break;
      default:
        setModalComponent(null);
    }
  };

  const handleDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const index = formData.findIndex((formItem) => formItem.subCategoryName === itemToDelete.subCategoryName);

      if (index !== -1) {
        const updatedFormData = [...formData];
        updatedFormData.splice(index, 1);
        handleDeleteRow(updatedFormData);
      }

      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  // console.log("==formData==", formData);
  const columns = [
    {
      name: 'Unit Qty',
      selector: (row) => row.unitQuantity
    },
    {
      name: 'Product',
      selector: (row) => row.subCategoryName
    },
    {
      name: 'Total Rate',
      selector: (row) => row.totalPrice
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <IconButton>
            <Visibility className="actn-icon1" onClick={() => handleOpenModal('viewform', row)} />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];

  const data = formData.map((formValue) => {
    const obj = {};
    Object.keys(formValue).forEach((key) => {
      obj[key] = formValue[key];
    });
    obj.unitQuantity = 1;
    return obj;
  });

  const concatenatedData = formData.map((item) => {
    const concatenatedString = Object.keys(item)
      .map((key) => `${key}-${item[key]}`)
      .join(', ');
    return concatenatedString;
  });
  console.log('==concatenatedData==', concatenatedData);

  const filteredData = concatenatedData.map((str) => {
    const keyValuePairs = str.split(', ');
    const filteredKeyValuePairs = keyValuePairs
      .filter((pair) => {
        const [key] = pair.split('-');
        return !['subCategoryName', 'totalPrice', 'breadcrumbs', 'spcfctnId', 'rateCardSetupId'].includes(key);
      })
      .map((pair) => {
        const [key, value] = pair.split('-');
        if (key === 'remarks') {
          return `${key}-${value.split(' ').slice(0, 5).join(' ')}`;
        }
        return pair;
      });
    return filteredKeyValuePairs.join(', ');
  });

  console.log('==filteredData==', filteredData);
  console.log('==concatenatedData==', concatenatedData);

  console.log('==data==', data);
  const customStyles = {
    table: {
      style: {
        border: '1px solid #ccc'
      }
    },
    headRow: {
      style: {
        fontWeight: '900',
        fontSize: '14px',
        backgroundColor: '#f5f5f5'
      }
    },
    rows: {
      style: {
        borderBottom: '1px solid #ccc'
      }
    }
  };

  return (
    <Grid container>
      <Grid item md={8} paddingRight={2}>
        <DataTable columns={columns} data={data} highlightOnHover pointerOnHover customStyles={customStyles} responsive />

        <Formik
          initialValues={{
            dlryType: '',
            orderNotes: '',
            dueDate: ''
          }}
          // onSubmit={(values, { setSubmitting }) => {
          //   console.log('Submit values:', values);
          //   const { dlryType, orderNotes } = values;
          //   console.log(`Dlry Type: ${dlryType}, Order Notes: ${orderNotes}`);
          //   const itemDetails = formData.map((item) => {
          //     return { spcfctnName: item.subCategoryName, displayAmt: item.totalRate };
          //   });
          //   const submitValues = {
          //     ...values,
          //     totalPrice: totalSum + (totalSum * gst) / 100 - (totalSum * discount) / 100,
          //     itemDetails,
          //   };
          //   dispatch(fetchOrderSubmitObj(submitValues));
          //   setSubmitting(false);
          //   console.log('Submit values with additional data:', submitValues);
          // }}

          // onSubmit={(values,{ setSubmitting,resetForm }) => {
          onSubmit={(values, { setSubmitting }) => {
            console.log('Submit values:', values);
            const { dlryType, orderNotes, dueDate } = values;
            console.log(`Dlry Type: ${dlryType}, Order Notes: ${orderNotes}, Due date${dueDate}`);
            const itemDetails = formData.map((item, index) => {
              console.log('==item==', item);
              return {
                // spcfctnId: item.id,
                // spcfctnId:item.spcfctnId[0].id,
                mainCatgId: item.breadcrumbs.ids[0],
                mainCatgName: item.breadcrumbs.names[0],
                catgId: item.breadcrumbs.ids[1],
                catgName: item.breadcrumbs.names[1],
                subCatgId: item.breadcrumbs.ids[2],
                subCatgName: item.breadcrumbs.names[2],
                spcfctnName: item.subCategoryName,
                displayAmt: item.totalPrice,
                displayValue: filteredData[index],
                rateCardSetupId: item.rateCardSetupId,
                unitQty: 1,
                unitRate: item.totalPrice,
                unitPrice: 1 * item.totalPrice
              };
            });
            console.log('==values==', values);
            console.log('==itemDetails==', itemDetails);

            const submitValues = {
              ...values,
              totalPrice: totalSum + (totalSum * gst) / 100 - discount,
              itemDetails,
              orderFrom: selectedRow.id,
              orderFromName: selectedRow.fName,
              custContactNo: selectedRow.contactMobile1,
              custEmail: selectedRow.email,
              orderAmount: totalSum + (totalSum * gst) / 100 - discount
            };

            console.log('==submitValues', submitValues);

            dispatch(addOrder(submitValues));
            setSubmitting(false);
            // resetForm();
            backToOrder();

            // setTimeout(() => {
            //   document.body.classList.add('fade-out');
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 1000); // wait for the fade-out to complete
            // }, 2000);

            console.log('Submit values with additional data:', submitValues);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2} style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Due Date</FormLabel>
                  <Textfield id="dueDate" variant="outlined" fullWidth type="date" {...handleChange('dueDate')} value={values.dueDate} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormLabel>Delivery Type</FormLabel>
                  <Select
                    id="dlryType"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange('dlryType')}
                    value={values.dlryType}
                    style={{ margin: '8px 0px ' }}
                  >
                    <MenuItem value="" disabled>
                      Select Delivery Type
                    </MenuItem>
                    <MenuItem value="onSite">On Site </MenuItem>
                    <MenuItem value="crubSide">Crub Side</MenuItem>
                    <MenuItem value="selfService">Self Service</MenuItem>
                    <MenuItem value="thirdParty">Third Party </MenuItem>
                    <MenuItem value="localPickup">Local Pickup</MenuItem>
                    <MenuItem value="courierDelivery ">Courier Delivery </MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Order Note</FormLabel>
                  <TextField
                    id="text-area"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    onChange={handleChange('orderNotes')}
                    value={values.orderNotes}
                    style={{ margin: '8px 0px ' }}
                  />
                </Grid>
              </Grid>

              {/* <button type="submit">Submit</button> */}
              <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" sx={style.changeBtn}>
                  Submit
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item md={4}>
        <Grid
          bgcolor="#eef2f6"
          container
          style={{
            borderRadius: '5px',
            border: '1px solid #cbcbcb',
            padding: '20px'
          }}
        >
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <Grid>
              <FormLabel>Before Discount :</FormLabel>
            </Grid>
            <Grid xs={4}>
              <TextField
                id="total-sum"
                variant="outlined"
                fullWidth
                value={totalSum}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <Grid>
              <FormLabel>Tax :</FormLabel>
            </Grid>
            <Grid xs={4}>
              <TextField
                id="gst"
                variant="outlined"
                fullWidth
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <Grid>
              <FormLabel>Discount Amount :</FormLabel>
            </Grid>
            <Grid xs={4}>
              <TextField id="discount" variant="outlined" fullWidth value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <Grid>
              <FormLabel>Total Price :</FormLabel>
            </Grid>
            <Grid xs={4}>
              <TextField
                id="net-total"
                variant="outlined"
                fullWidth
                value={totalSum + (totalSum * gst) / 100 - discount}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {openModal && (
        <OpenModal open={openModal} handleClose={handleCloseModal} component={modalComponent} mdlwidth={'60%'} mdlHeading={modalHeading} />
      )}

      {showDeleteConfirmation && (
        <Dialog
          open={showDeleteConfirmation}
          onClose={cancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to delete this item?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
}
