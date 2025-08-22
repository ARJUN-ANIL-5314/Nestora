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
//     const concatenatedString = Object.keys(item).map((key) => ${key}-${item[key]}).join(', ');
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
//         return ${key}-${value.split(' ').slice(0, 5).join(' ')};
//       }
//       return pair;
//     });
//     return filteredKeyValuePairs.join(', ');
//   });

//   console.log("==filteredData==",fil…

// import React, { useEffect, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { fetchOrder } from 'module/vendor/container/orderContainer/slice';
// import { getSpecification,fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';

// function OrderSpecification({ selectedSubCategory }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//   const specData = useSelector((state) => state.data.order.retecardDetails);
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [selectRate, setSelectRate] = useState([]);
//   const [specValRate, setSpecValRate] = useState(null);

// console.log("==specValRate==", specValRate);
// console.log("==specData==", specData);

//   const handleSelectChange = (e, field) => {
//     console.log("==field==", field);
//     formik.handleChange(e);
//     dispatch(fetchOrder({ dispValue: e.target.value, item: field.key, subCatg: selectedSubCategory.id }));

//     setSelectedValues((prevValues) => {
//       const newValues = {...prevValues, [field.key]: e.target.value };
//       console.log("newValues==", newValues);
//       return newValues;
//     });
//     console.log("selectedValues==", selectedValues);
//   };

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     if (specData?.rows?.length > 0) {
//       const rate = specData.rows[0].rate;
//       setSpecValRate(rate);
//     }
//   }, [specData]);

//   console.log(specValRate, "===rate===");

//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),
//     onSubmit: (values) => {
//       console.log('===Form values===', values);
//       // values.selectRate = selectRate;
//       console.log('===Updated Form values===', values);
//     }
//   });

//   // useEffect(() => {
//   //   if (specValRate!== null) {
//   //     const lastFieldKey = Object.keys(selectedValues).pop();

//   //     console.log("==lastFieldKey==", lastFieldKey);

//   //     const specObject = { [lastFieldKey]: specValRate };

//   //     console.log("==specObject==", specObject);
//   //   }
//   // }, [specValRate, selectedValues, dispatch]);

//   useEffect(() => {
//     if (specValRate!== null) {
//       const lastFieldKey = Object.keys(selectedValues).pop();
//       console.log('===lastFieldKey===', lastFieldKey);
//       setSelectRate((prevSelectRate) => [...prevSelectRate, { [lastFieldKey]: specValRate }]);
//     }
//   }, [specValRate, selectedValues]);

//   console.log('===Selected rates===', selectRate);

//   const renderField = (field, key) => {
//     switch (field.ctrnlType) {
//       case 'CBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <Select
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={(e) => handleSelectChange(e, { lblText: field.lblText, key })}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               displayEmpty
//             >
//               <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//               {field.dispValues.map((value, i) => (
//                 <MenuItem value={value} key={i}>
//                   {capitalize(value)}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;
//     }
//   };

//   const fields = SingleSpecification?.rows?.[0]?.specItem
//     ? Object.keys(SingleSpecification.rows[0].specItem).map((key) => {
//       const field = SingleSpecification.rows[0].specItem[key];
//       return renderField(field, key);
//     })
//     : null;

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>
//         {fields}
//       </Grid>
//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit" style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>
//   );
// }

// export default OrderSpecification;

//yesterday update

// import React, { useEffect, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { fetchOrder } from 'module/vendor/container/orderContainer/slice';
// import { getSpecification, fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';

// function OrderSpecification({ selectedSubCategory }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//    const specData = useSelector((state) => state.data.order.retecardDetails);
//   const [selectedValues, setSelectedValues] = useState([]);
//   // const [selectRate, setSelectRate] = useState([]);
//   const [specValRate, setSpecValRate] = useState(null);

//   console.log(specData.rows, "===specData==")

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     if (specData?.rows?.length > 0) {
//       const rate = specData.rows[0].rate;
//       setSpecValRate(rate);
//     }
//   }, [specData]);

//   console.log(specValRate, "===rate===");
//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),
//     onSubmit: (values) => {
//       console.log('===Form values===', values);
//       console.log('===Selected values===', selectedValues);
//     }
//   });

//   const handleSelectChange = (e, field) => {
//     formik.handleChange(e);
//     handleFunctionCall(e.target.value, field.lblText);
//     setSelectedValues((prevValues) => {
//       const newValues = [...prevValues];
//       newValues[field.key] = e.target.value;
//       return newValues;
//     });
//   };

//   const handleFunctionCall = (val1, val2) => {

//     console.log(val1, "====val1====");
//     console.log(val2, "====val2====");

//     dispatch(fetchOrder({ dispValue: val1, item: val2, subCatg: selectedSubCategory.id }));

//     if (specValRate !== null) {
//     const specObject = { [val2]: specValRate };
//     console.log(specObject, "====specObject====");
//  } else {
//       console.log("specValRate is null");
//     }
//   };

//   const renderField = (field, key) => {
//     switch (field.ctrnlType) {
//       case 'CBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <Select
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={(e) => handleSelectChange(e, { lblText: field.lblText, key })}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               displayEmpty
//             >
//               <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//               {field.dispValues.map((value, i) => (
//                 <MenuItem value={value} key={i}>
//                   {capitalize(value)}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;
//     }
//   };

//   const fields = SingleSpecification?.rows?.[0]?.specItem
//     ? Object.keys(SingleSpecification.rows[0].specItem).map((key) => {
//       const field = SingleSpecification.rows[0].specItem[key];
//       return renderField(field, key);
//     })
//     : null;

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>
//         {fields}
//       </Grid>
//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit" style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>
//   );
// }

// export default OrderSpecification;

// import React, { useEffect, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { fetchOrder , updateSelectRate} from 'module/vendor/container/orderContainer/slice';
// import { getSpecification,fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';

// function OrderSpecification({ selectedSubCategory }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//   const specData = useSelector((state) => state.data.order.retecardDetails);
//   const updateDetail = useSelector((state) => state.data.order.updateDetail);
//   const [selectedValues, setSelectedValues] = useState([]);
//   // const [selectRate, setSelectRate] = useState([]);
//   const [specValRate, setSpecValRate] = useState(null);

//   console.log(updateDetail, "===updateDetail==");

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     if (specData?.rows?.length > 0) {
//       const rate = specData.rows[0].rate;
//       setSpecValRate(rate);
//     }
//   }, [specData]);

//   console.log(specValRate, "===rate===");

//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),
//     onSubmit: (values) => {
//       console.log('===Form values===', values);
//       console.log('===Selected values===', selectedValues);
//       // values.selectRate = selectRate;
//       console.log('===Updated Form values===', values);
//     }
//   });

//   useEffect(() => {
//     if (specValRate !== null) {
//       const lastFieldKey = Object.keys(selectedValues).pop();

//       console.log("==lastFieldKey==", lastFieldKey);
//       if (lastFieldKey) {
//         const specObject = { [lastFieldKey]: specValRate };
//         dispatch(updateSelectRate(specObject));
//         console.log("==selectedValues==",selectedValues);
//       }
//     }
//   }, [specValRate, selectedValues, dispatch]);

//   const handleSelectChange = (e, field) => {
//     console.log("==field==",field);
//     formik.handleChange(e);
//     setSelectedValues((prevValues) => ({
//       ...prevValues,
//       [field.lblText]: e.target.value
//     }));
//     dispatch(fetchOrder({ dispValue: e.target.value, item: field.key , subCatg: selectedSubCategory.id }));

//     console.log("selectedValues==", selectedValues);
//   };

//   // const handleFunctionCall = (val1, val2) => {
//   //   console.log(val1, "====val1====");
//   //   console.log(val2, "====val2====");

//   //   dispatch(fetchOrder({ dispValue: val1, item: val2 }));

//   //   const specObject = { [val2]: specValRate };
//   //   console.log(specObject, "====specObject====");

//   //   updateSelectRate(specObject);
//   // };

//   // const updateSelectRate = (newObject) => {
//   //   setSelectRate((prevRates) => {
//   //     const updatedRates = prevRates.filter(rate => !Object.keys(rate).some(key => key in newObject));
//   //     return [...updatedRates, newObject];
//   //   });
//   // };

//   // const handleFunctionCall = (val1, val2) => {
//   //   console.log(val1, "====val1====");
//   //   console.log(val2, "====val2====");

//   //   dispatch(fetchOrder({ dispValue: val1, item: val2 }));

//   //   const specObject = { [val2]: specValRate };
//   //   console.log(specObject, "====specObject====");
//   // dispatch(updateSelectRate(specObject))

//   // };

//   // console.log('===Selected rates===', selectRate);
//   const renderField = (field, key) => {
//     switch (field.ctrnlType) {
//       case 'CBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <Select
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={(e) => handleSelectChange(e, { lblText: field.lblText, key })}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               displayEmpty
//             >
//               <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//               {field.dispValues.map((value, i) => (
//                 <MenuItem value={value} key={i}>
//                   {capitalize(value)}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;
//     }
//   };

//   const fields = SingleSpecification?.rows?.[0]?.specItem
//     ? Object.keys(SingleSpecification.rows[0].specItem).map((key) => {
//       const field = SingleSpecification.rows[0].specItem[key];
//       return renderField(field, key);
//     })
//     : null;

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>
//         {fields}
//       </Grid>
//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit" style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>
//   );
// }

// export default OrderSpecification

// develop code ------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { fetchOrder } from 'module/vendor/container/orderContainer/slice';
// import { getSpecification, fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';
// import NoDataComponent from 'module/utlities/NoDataComponent'
// function OrderSpecification({ selectedSubCategory, onSubmit, breadcrumbs }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//   const specData = useSelector((state) => state.data.order.retecardDetails);
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [selectRate, setSelectRate] = useState([]);
//   const [specValRate, setSpecValRate] = useState(null);

//   console.log('===Selected values===', selectedValues);
//   console.log("===selectRate===", selectRate);
//   console.log(selectedSubCategory, "===selectedSubCategory==")
//   console.log(SingleSpecification, "===SingleSpecification==")

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     if (specData?.rows?.length > 0) {
//       const rate = specData.rows[0].rate;
//       setSpecValRate(rate);
//     }
//   }, [specData]);

//   console.log(specValRate, "===rate===");
//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),

//     onSubmit: (values, { resetForm }) => {

//       if (breadcrumbs.ids[2] === selectedSubCategory.id) {
//         values.breadcrumbs = breadcrumbs;
//       }
//       values.spcfctnId = SingleSpecification.rows
//       values.totalPrice = totalPrice;
//       values.subCategoryName = selectedSubCategory.subCatgName;
//       console.log('===Form values===', values);

//       onSubmit(values);
//       resetForm();
//       setSelectRate([]);

//     }

//   });

//   const handleSelectChange = (e, field) => {
//     formik.handleChange(e);
//     const val1 = e.target.value;
//     const val3 = field.key;
//     dispatch(fetchOrder({ dispValue: val1, item: val3, subCatg: selectedSubCategory.id }));
//     setSelectedValues((prevValues) => {
//       const existingIndex = prevValues.findIndex((obj) => Object.keys(obj)[0] === field.key);
//       if (existingIndex !== -1) {
//         prevValues[existingIndex] = { [field.key]: e.target.value };
//       } else {
//         prevValues.push({ [field.key]: e.target.value });
//       }
//       return prevValues;
//     });
//   };

//   const handleBlur = (val1, val2, key) => {
//     if (specValRate !== null) {
//       const existingIndex = selectRate.findIndex((obj) => Object.keys(obj)[0] === key);
//       console.log("==existingIndex==",existingIndex);

//       if (existingIndex !== -1) {
//         selectRate[existingIndex] = { [key]: specValRate };
//       } else {
//         setSelectRate([...selectRate, { [key]: specValRate }]);
//       }
//     } else {
//       console.log("specValRate is null");
//     }
//   };

//   console.log("===selectRate===", selectRate);

//   let totalRate = selectRate.reduce((acc, current) => {
//     return acc + Object.values(current)[0];
//   }, 0);
//   console.log("==totalRate==", totalRate);

//   const {qty}  = selectedValues.find((obj) => Object.keys(obj)[0] === 'qty') || {};
//   console.log("==qty==", qty);

//   const xtraChgsValue = formik.values.xtraChgs;
// console.log("==xtraChgsValue", xtraChgsValue);

// let totalPrice = totalRate * qty;

// if (xtraChgsValue && !isNaN(Number(xtraChgsValue))) {
//   totalPrice += Number(xtraChgsValue);
// }

// console.log("==totalPrice",totalPrice);

//   const renderField = (field, key) => {
//     console.log("==fields--", field);
//     switch (field.ctrnlType) {
//       case 'CBX':
//         if (key === 'qty') {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>
//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => handleSelectChange(e, { lblText: field.lblText, key })}
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >

//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>

//                 {field.dispValues.map((option, i) => {

//                   console.log("==option", option)
//                   return (
//                     <MenuItem value={option.value} key={i}>
//                       {capitalize(option.value)}
//                     </MenuItem>
//                   )
//                 })}
//               </Select>
//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         } else {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>

//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => handleSelectChange(e, { lblText: field.lblText, key })}
//                 onBlur={(e) => handleBlur(e.target.value, field.lblText, key)}
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >
//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//                 {field.dispValues.map((value, i) => (
//                   <MenuItem value={value} key={i}>
//                     {capitalize(value.value)}
//                   </MenuItem>
//               ))}
//               </Select>

//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         }

//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               // value={formik.values[key] || ''}
//               value={formik.values.xtraChgs}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;

//     }
//   };

//   const fields = SingleSpecification?.rows?.[0]?.specItem
//     ? Object.keys(SingleSpecification.rows[0].specItem).map((key) => {
//       const field = SingleSpecification.rows[0].specItem[key];
//       console.log(field, "===field")
//       return renderField(field, key);
//     })
//     : null;
//   console.log(fields, "===fields==")

//   return (

//     <form onSubmit={formik.handleSubmit}>
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>
//         {/* {fields} */}
//         {fields ? fields : <NoDataComponent />}
//       </Grid>

//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit" style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>

//   );
// }

// export default OrderSpecification;

// feature code ===========================================================================

// import React, { useEffect, useCallback, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { getSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { fetchSingleRatecardSetUp } from 'module/licensee/container/RateCardSetupContainer/slice';
// import { addRateCardCompare, addRateCalc } from 'module/licensee/container/RateCardContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';
// // import NoDataComponent from 'module/utlities/NoDataComponent'

// function OrderSpecification({ selectedSubCategory, onSubmit, breadcrumbs }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//   const fetchDisplayValue = useSelector((state) => state.licenseeReducer.RateCardSetup.fetchDisplayValue);
//   const Rate = useSelector((state) => state.licenseeReducer.RateCard.RateCardCompare[0]);
//   const finalRate = useSelector((state) => state.licenseeReducer.RateCard.RateCalc);
//   const [rateComparing, setRateComparing] = useState({});
//   const [val1Array, setVal1Array] = useState([]);
//   const [val3Array, setVal3Array] = useState([]);
//   const [indRateCompare, setIndRateCompare] = useState({});
//   const [rateObjects, setRateObjects] = useState([]);
//   const [validExtrChrg, setValidExtrChrg] = useState(null);

//   const finalPrice = finalRate.calculatedRates
//   console.log("==Rate", Rate);

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleRatecardSetUp({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     dispatch(addRateCardCompare(rateComparing));
//   }, [dispatch, rateComparing])

//   useEffect(() => {
//     dispatch(addRateCardCompare(indRateCompare));
//   }, [dispatch, indRateCompare])

//   const handleDataAdd = () => {
//     dispatch(addRateCalc(resultArray))
//     // alert("dis")
//   }

//   const handleBlurExtrRate = (e, key) => {
//     console.log("==eeee==",key);

//     const extrChrg = e.target.value;
//     const floatRegex = /^-?\d+(?:\.\d+)?$/;

//     if (floatRegex.test(extrChrg)) {
//       console.log("==e==", extrChrg);
//       setValidExtrChrg({ item: [key], rate: extrChrg });

//     }
//   }

//   const handleBlur = (e, key) => {
//     const val1 = { [key]: e.target.value._id };
//     const val3 = { [e.target.name]: e.target.name };
//     setVal1Array((prevValues) => [...prevValues, val1]);
//     setVal3Array((prevValues) => [...prevValues, val3]);
//   };

//   const uniqueVal1Array = val1Array.reduce((acc, current) => {
//     const key = Object.keys(current)[0];
//     acc[key] = current[key];
//     return acc;
//   }, {});

//   const result = Object.keys(uniqueVal1Array).map(key => ({ [key]: uniqueVal1Array[key] }));
//   const valuesArray = result.map(obj => Object.values(obj)[0]);
//   const uniqueKeys = Object.keys(val3Array.reduce((acc, current) => ({ ...acc, ...current }), {}));

//   const handleSetRate = () => {
//     const rateCompare = {
//       item: uniqueKeys,
//       dispValue: valuesArray,
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       combType:'COMB'
//     }
//     setRateComparing(rateCompare);
//   }

//   const handleSelectChange = (e, field) => {
//     formik.handleChange(e);
//     const val4 = e.target.value._id || e.target.value;
//     const val5 = field.key;
//     const indRateCompare = {
//       item: [val5],
//       dispValue: [val4],
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       combType:'INDV'
//     }
//     setIndRateCompare(indRateCompare);
//   };

//   const rateObject = useCallback(() => {
//     const result = {};
//     Rate?.dispValue.forEach((current) => {
//       const value = Rate.rate;
//       if (!result[value]) {
//         result[value] = [current];
//       } else {
//         result[value].push(current);
//       }
//     });
//     console.log("==result==", result);
//     const transformedResult = {};
//     Rate?.item.forEach((item) => {
//       transformedResult[item] = result;

//     });
//     console.log("==transformedResult==", transformedResult);

//     return transformedResult;
//   }, [Rate]);

//   useEffect(() => {
//     const rateObjectsArray = [rateObject()];
//     const filteredRateObjects = rateObjectsArray.filter(obj => Object.keys(obj).length > 0);
//     const mergedRateObjects = filteredRateObjects.reduce((acc, current) => {
//       const keys = Object.keys(current);
//       const values = Object.values(current);
//       const mergedKey = keys.join(',');
//       const mergedValue = values[0];
//       return { [mergedKey]: mergedValue };
//     }, {});

//     console.log("==filteredRateObjects==", filteredRateObjects);

//     const result = [mergedRateObjects];
//     setRateObjects((prevRateObjects) => [...prevRateObjects, ...result]);
//   }, [rateObject]);

//   const uniqueRateObjects = rateObjects.filter(obj => Object.keys(obj).length > 0).reduce((acc, current) => {
//     const key = Object.keys(current)[0];
//     if (!acc[key]) {
//       acc[key] = current;
//     } else {
//       acc[key] = Object.assign(acc[key], current);
//     }
//     return acc;
//   }, {});

//   console.log("==uniqueRateObjects==", uniqueRateObjects);

//   const resultObj = {};
//   Object.entries(uniqueRateObjects).forEach(([key, value]) => {
//     resultObj[key] = value[key];
//   });

// console.log("==resultObj==", resultObj);

//   const resultArray = Object.entries(resultObj).map(([key, value]) => {
//     console.log("==key==", key);

//     const item = key.split(",");
//     const rate = Object.keys(value)[0];
//     const dispValue = value[rate];
//     return {
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       item,
//       dispValue,
//       rate
//     };
//   });

//   console.log('validExtrChrg:', validExtrChrg);
//   if (validExtrChrg) {
//     resultArray.push({
//       ...validExtrChrg,
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//     });
//   }

// console.log("==resultArray",resultArray);

//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),

//     onSubmit: (values, { resetForm }) => {
//       if (finalPrice) {
//       console.log("==valuesss===", values);
//       if (breadcrumbs.ids[2] === selectedSubCategory.id) {
//         values.breadcrumbs = breadcrumbs;
//       }
//       values.spcfctnId = SingleSpecification.rows
//       values.totalPrice = finalRate.calculatedRates;
//       values.subCategoryName = selectedSubCategory.subCatgName;
//       values.rateCardSetupId = fetchDisplayValue.rows[0].id
//       onSubmit(values);
//       resetForm();
//       setSelectRate([]);
//     }
//     }
//   });

//   const renderField = (field, key, combType) => {
//     console.log("==field", field);

//     switch (field.ctrnlType) {
//       case 'CBX':
//         if (combType.combType == 'COMB') {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key} >
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>

//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => {
//                   formik.setFieldValue(key, e.target.value);
//                 }}
//                 onBlur={(e) => handleBlur(e, field.lblText, key)}
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >
//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//                 {field.dispValues.map((value, i) => (
//                   <MenuItem value={value} key={i}>
//                     {capitalize(value.value)}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         } else if (combType.combType !== 'COMB') {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>

//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => {
//                   console.log("==sele==", e);

//                   handleSelectChange(e, { lblText: field.lblText, key })
//                 }
//                 }
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >
//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//                 {field.dispValues.map((value, i) => (
//                   <MenuItem value={value} key={i}>
//                     {capitalize(value.value)}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         }
//         break;

//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               // value={formik.values[key] || ''}
//               value={formik.values.xtraChgs}
//               // value={''/}
//               // onChange={formik.handleChange}
//               // onBlur={formik.handleBlur}
//               onChange={(e) =>{
//                 console.log("==vale==", e);

//                 //  handleSelectChange(e, { lblText: field.lblText, key })
//                  handleBlurExtrRate(e, key )
//                 }
//                 }
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );

//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );

//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;
//        }
//   };

//   const combinationSpecItems = [];
//   const individualSpecItems = [];

//   const combinationFields = (
//     <Grid sm={12}>
//       <Grid item sm={12} style={{ display: 'flex' }}>
//         {combinationSpecItems}
//       </Grid>
//       <Grid item sm={12} style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}>
//         {/* <p>Rate: {Rate?.rate}</p> */}
//         <Button size="small" variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={handleSetRate}>  + </Button>
//       </Grid>
//     </Grid>
//   );

//   const individualFields = (
//     <Grid sm={12}>
//       <Grid item sm={12} style={{ display: 'flex' }}>
//         {individualSpecItems}
//       </Grid>
//     </Grid>
//   );

//   Object.keys(fetchDisplayValue?.rows?.[0]?.specificationId?.specItem || {}).forEach((key) => {
//     const field = fetchDisplayValue?.rows?.[0]?.specificationId?.specItem?.[key];
//     const combType = fetchDisplayValue?.rows?.[0]?.dispSpecItems?.find((item) => item.specItem === key);

//     if (combType?.combType === 'COMB') {
//       combinationSpecItems.push(renderField(field, key, combType));
//     } else if (combType?.combType === 'INDV') {
//       individualSpecItems.push(renderField(field, key, combType));
//     }

//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       {/* <h1>Rate: {Rate?.rate}</h1> */}
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>

//         {combinationFields}
//         {individualFields}

//         {/* {fields} */}
//         {/* {fields ? fields : <NoDataComponent />} */}
//       </Grid>

//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit"  onClick={handleDataAdd} style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>
//   );
// }

// export default OrderSpecification;

//=================================================================================

// import React, { useEffect, useCallback, useState } from 'react';
// import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { getSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { fetchSingleRatecardSetUp } from 'module/licensee/container/RateCardSetupContainer/slice';
// import { addRateCardCompare, addRateCalc } from 'module/licensee/container/RateCardContainer/slice';
// import { capitalize } from '../../utilities/Capitallised';
// // import NoDataComponent from 'module/utlities/NoDataComponent'

// function OrderSpecification({ selectedSubCategory, onSubmit, breadcrumbs }) {
//   const dispatch = useDispatch();
//   const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
//   const fetchDisplayValue = useSelector((state) => state.licenseeReducer.RateCardSetup.fetchDisplayValue);
//   const Rate = useSelector((state) => state.licenseeReducer.RateCard.RateCardCompare[0]);
//   const finalRate = useSelector((state) => state.licenseeReducer.RateCard.RateCalc);
//   const [rateComparing, setRateComparing] = useState({});
//   const [val1Array, setVal1Array] = useState([]);
//   const [val3Array, setVal3Array] = useState([]);
//   const [indRateCompare, setIndRateCompare] = useState({});
//   const [rateObjects, setRateObjects] = useState([]);
//   const [validExtrChrg, setValidExtrChrg] = useState(null);

//   const finalPrice = finalRate.calculatedRates
//   console.log("===rateObjects===", rateObjects);

//   useEffect(() => {
//     dispatch(getSpecification());
//     if (selectedSubCategory?.subCatgName) {
//       dispatch(fetchSingleRatecardSetUp({ searchVal: selectedSubCategory.subCatgName }));
//     }
//   }, [dispatch, selectedSubCategory?.subCatgName]);

//   useEffect(() => {
//     dispatch(addRateCardCompare(rateComparing));
//   }, [dispatch, rateComparing])

//   useEffect(() => {
//     dispatch(addRateCardCompare(indRateCompare));
//   }, [dispatch, indRateCompare])

//   const handleDataAdd = () => {
//     dispatch(addRateCalc(resultArray))
//     // alert("dis")
//   }

//   const handleBlurExtrRate = (e, key) => {
//     console.log("==eeee==",key);

//     const extrChrg = e.target.value;
//     const floatRegex = /^-?\d+(?:\.\d+)?$/;

//     if (floatRegex.test(extrChrg)) {
//       console.log("==e==", extrChrg);
//       setValidExtrChrg({ item: [key], rate: +extrChrg });

//     }
//   }

//   const handleBlur = (e, key) => {
//     const val1 = { [key]: e.target.value._id };
//     const val3 = { [e.target.name]: e.target.name };
//     setVal1Array((prevValues) => [...prevValues, val1]);
//     setVal3Array((prevValues) => [...prevValues, val3]);
//   };

//   const uniqueVal1Array = val1Array.reduce((acc, current) => {
//     const key = Object.keys(current)[0];
//     acc[key] = current[key];
//     return acc;
//   }, {});

//   const result = Object.keys(uniqueVal1Array).map(key => ({ [key]: uniqueVal1Array[key] }));
//   const valuesArray = result.map(obj => Object.values(obj)[0]);
//   const uniqueKeys = Object.keys(val3Array.reduce((acc, current) => ({ ...acc, ...current }), {}));

//   const handleSetRate = () => {
//     const rateCompare = {
//       item: uniqueKeys,
//       dispValue: valuesArray,
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       combType:'COMB'
//     }
//     setRateComparing(rateCompare);
//   }

//   const handleSelectChange = (e, field) => {
//     formik.handleChange(e);
//     const val4 = e.target.value._id || e.target.value;
//     const val5 = field.key;
//     const indRateCompare = {
//       item: [val5],
//       dispValue: [val4],
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       combType:'INDV'
//     }
//     setIndRateCompare(indRateCompare);
//   };

//   // const rateObject = useCallback(() => {
//   //   const result = {};
//   //   Rate?.dispValue.forEach((current) => {
//   //     const value = Rate.rate;
//   //     if (!result[value]) {
//   //       result[value] = [current];
//   //     } else {
//   //       result[value].push(current);
//   //     }
//   //   });
//   //   console.log("==result==", result);

//   //   const transformedResult = {};
//   //   Rate?.item.forEach((item) => {
//   //     transformedResult[item] = result;
//   //   });
//   //   console.log("==transformedResult==", transformedResult);
//   //   return transformedResult;

//   // }, [Rate]);

//   const rateObject = useCallback(() => {
//     const result = {};
//     Rate?.dispValue.forEach((current) => {
//       const value = Rate.rate;
//       if (!result[value]) {
//         result[value] = [current];
//       } else {
//         result[value].push(current);
//       }
//     });
//     console.log("==result==", result);

//     // Add "combType" property to the result object
//     const transformedResult = Rate ?{ combType: Rate.combType,item: Rate.item, ...result }: result;
//     console.log("==transformedResult==", transformedResult);
//     return transformedResult;
//   }, [Rate]);

//   console.log("==rateObject==", rateObject);

//   useEffect(() => {
//     const rateObjectsArray = [rateObject()];
//     const filteredRateObjects = rateObjectsArray.filter(obj => Object.keys(obj).length > 0);
//     // const mergedRateObjects = filteredRateObjects.reduce((acc, current) => {
//     //   const keys = Object.keys(current);
//     //   const values = Object.values(current);
//     //   const mergedKey = keys.join(',');
//     //   const mergedValue = values[0];
//     //   return { [mergedKey]: mergedValue };
//     // }, {});
//     const results = [filteredRateObjects];
//     console.log("==filteredRateObjects==", filteredRateObjects);
//     console.log("=results==", results);

//     setRateObjects((prevRateObjects) => [...prevRateObjects, ...results]);
//   }, [rateObject]);

//   const uniqueRateObjects = rateObjects.filter(obj => Object.keys(obj).length > 0).reduce((acc, current) => {
//     const key = Object.keys(current)[0];
//     if (!acc[key]) {
//       acc[key] = current;
//     } else {
//       acc[key] = Object.assign(acc[key], current);
//     }
//     return acc;
//   }, {});

//   console.log("==uniqueRateObjects",uniqueRateObjects);

//   const resultObj = {};
//   Object.entries(uniqueRateObjects).forEach(([key, value]) => {
//     resultObj[key] = value[key];
//   });

//   console.log("==resultObj",resultObj);

//   const resultArray = Object.entries(resultObj).map(([key, value]) =>
//      {
//       console.log("==key==", key);

//     const item =value.item;
//     const rate = +Object.keys(value)[0];
//     const dispValue = value[rate];
//     const combType = value.combType

//     console.log("==rate==", rate);
//     return {
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       item,
//       dispValue,
//       rate,
//       combType
//     };
//   });

//   console.log('validExtrChrg:', validExtrChrg);
//   if (validExtrChrg) {
//     resultArray.push({
//       ...validExtrChrg,
//       mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
//       catgId: fetchDisplayValue.rows[0].specificationId.catgId,
//       subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
//       specificationId: fetchDisplayValue.rows[0].specificationId.id,
//       rateCardSetupId: fetchDisplayValue.rows[0].id,
//       pattern:fetchDisplayValue.rows[0].pattern,
//       combType: 'INDV'
//     });
//   }

// console.log("==resultArray",resultArray);

//   const formik = useFormik({
//     initialValues: {},
//     validationSchema: Yup.object({}),

//     onSubmit: (values, { resetForm }) => {
//       if (finalPrice) {
//       console.log("==valuesss===", values);
//       if (breadcrumbs.ids[2] === selectedSubCategory.id) {
//         values.breadcrumbs = breadcrumbs;
//       }
//       values.spcfctnId = SingleSpecification.rows
//       values.totalPrice = finalRate.calculatedRates;
//       values.subCategoryName = selectedSubCategory.subCatgName;
//       values.rateCardSetupId = fetchDisplayValue.rows[0].id
//       onSubmit(values);
//       resetForm();
//       setSelectRate([]);
//     }
//     }
//   });

//   const renderField = (field, key, combType) => {
//     console.log("==field", field);

//     switch (field.ctrnlType) {
//       case 'CBX':
//         if (combType.combType == 'COMB') {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key} >
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>

//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => {
//                   formik.setFieldValue(key, e.target.value);
//                 }}
//                 onBlur={(e) => handleBlur(e, field.lblText, key)}
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >
//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//                 {field.dispValues.map((value, i) => (
//                   <MenuItem value={value} key={i}>
//                     {capitalize(value.value)}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         } else if (combType.combType !== 'COMB') {
//           return (
//             <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//               <FormLabel>{capitalize(field.lblText)}</FormLabel>

//               <Select
//                 name={key}
//                 value={formik.values[key] || ''}
//                 onChange={(e) => {
//                   console.log("==sele==", e);

//                   handleSelectChange(e, { lblText: field.lblText, key })
//                 }
//                 }
//                 variant="outlined"
//                 fullWidth
//                 displayEmpty
//               >
//                 <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
//                 {field.dispValues.map((value, i) => (
//                   <MenuItem value={value} key={i}>
//                     {capitalize(value.value)}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//             </Grid>
//           );
//         }
//         break;

//       case 'TXT':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               placeholder={capitalize(field.lblText)}
//               // value={formik.values[key] || ''}
//               value={formik.values.xtraChgs}
//               // value={''/}
//               // onChange={formik.handleChange}
//               // onBlur={formik.handleBlur}
//               onChange={(e) =>{
//                 console.log("==vale==", e);

//                 //  handleSelectChange(e, { lblText: field.lblText, key })
//                  handleBlurExtrRate(e, key )
//                 }
//                 }
//               variant="outlined"
//               fullWidth
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );

//       case 'TXTAR':
//         return (
//           <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
//             <FormLabel>{capitalize(field.lblText)}</FormLabel>
//             <TextField
//               name={key}
//               value={formik.values[key] || ''}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );

//       case 'CHKBX':
//         return (
//           <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
//             <FormControlLabel
//               control={
//                 <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               }
//               label={capitalize(field.lblText)}
//             />
//             {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
//           </Grid>
//         );
//       default:
//         return null;
//        }
//   };

//   const combinationSpecItems = [];
//   const individualSpecItems = [];

//   const combinationFields = (
//     <Grid sm={12}>
//       <Grid item sm={12} style={{ display: 'flex' }}>
//         {combinationSpecItems}
//       </Grid>
//       <Grid item sm={12} style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}>
//         {/* <p>Rate: {Rate?.rate}</p> */}
//         <Button size="small" variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={handleSetRate}>  + </Button>
//       </Grid>
//     </Grid>
//   );

//   const individualFields = (
//     <Grid sm={12}>
//       <Grid item sm={12} style={{ display: 'flex' }}>
//         {individualSpecItems}
//       </Grid>
//     </Grid>
//   );

//   Object.keys(fetchDisplayValue?.rows?.[0]?.specificationId?.specItem || {}).forEach((key) => {
//     const field = fetchDisplayValue?.rows?.[0]?.specificationId?.specItem?.[key];
//     const combType = fetchDisplayValue?.rows?.[0]?.dispSpecItems?.find((item) => item.specItem === key);

//     if (combType?.combType === 'COMB') {
//       combinationSpecItems.push(renderField(field, key, combType));
//     } else if (combType?.combType === 'INDV') {
//       individualSpecItems.push(renderField(field, key, combType));
//     }

//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       {/* <h1>Rate: {Rate?.rate}</h1> */}
//       <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
//         <Grid item xs={12}>
//           <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
//           <h3>Specification</h3>
//         </Grid>

//         {combinationFields}
//         {individualFields}

//         {/* {fields} */}
//         {/* {fields ? fields : <NoDataComponent />} */}
//       </Grid>

//       <Grid container justifyContent="flex-end" padding={2}>
//         <Button type="submit"  onClick={handleDataAdd} style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
//           +ADD
//         </Button>
//       </Grid>
//     </form>
//   );
// }

// export default OrderSpecification;

//=================================================

import React, { useEffect, useCallback, useState } from 'react';
import { Grid, Select, Button, MenuItem, FormLabel, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getSpecification } from 'module/licensee/container/specificationContainer/slice';
import { fetchSingleRatecardSetUp } from 'module/licensee/container/RateCardSetupContainer/slice';
import { addRateCardCompare, addRateCalc, clearRateCalc } from 'module/licensee/container/RateCardContainer/slice';
import { capitalize } from '../../utilities/Capitallised';
import NoDataComponent from 'module/utlities/NoDataComponent';

function OrderSpecification({ selectedSubCategory, onSubmit, breadcrumbs }) {
  const dispatch = useDispatch();
  // const SingleSpecification = useSelector((state) => state.licenseeReducer.specification.fetchSingleSpecification);
  const fetchDisplayValue = useSelector((state) => state.licenseeReducer.RateCardSetup.fetchDisplayValue);
  const Rate = useSelector((state) => state.licenseeReducer.RateCard.RateCardCompare[0]);
  const finalRate = useSelector((state) => state.licenseeReducer.RateCard.RateCalc);
  const [rateComparing, setRateComparing] = useState({});
  const [val1Array, setVal1Array] = useState([]);
  const [val3Array, setVal3Array] = useState([]);
  const [indRateCompare, setIndRateCompare] = useState({});
  const [rateObjects, setRateObjects] = useState([]);
  const [validExtrChrg, setValidExtrChrg] = useState(null);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [manageAdd, setManageAdd] = useState(false);
  // const [combinationFields, setCombinationFields] = useState(null);
  // const [individualFields, setIndividualFields] = useState(null);
  let finalPrice = finalRate.calculatedRate;
  console.log('==finalPrice==', finalPrice);
  console.log('==finalRate==', finalRate);

  const formik = useFormik({
    initialValues: {
      xtraChgs: ''
    },

    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      if (finalPrice) {
        if (breadcrumbs.ids[2] === selectedSubCategory.id) {
          values.breadcrumbs = breadcrumbs;
          values.totalPrice = finalPrice;
          values.subCategoryName = selectedSubCategory.subCatgName;
          values.rateCardSetupId = fetchDisplayValue.rows[0].id;
          onSubmit(values);
          formik.resetForm();
          setSelectRate([]);
        }
      }
      //   dispatch(clearRateCalc());
      //   finalPrice = undefined
    }
  });
  useEffect(() => {
    if (manageAdd) {
      dispatch(clearRateCalc());
      setManageAdd(false);
      finalPrice = undefined;
    }
  }, [manageAdd]);

  useEffect(() => {
    if (submitClicked && finalPrice) {
      formik.handleSubmit();
      setSubmitClicked(false);
      setManageAdd(true);
    }
  }, [finalPrice, submitClicked]);

  // useEffect(() => {
  //   if (submitClicked && finalPrice) {
  //     formik.handleSubmit();
  //     setSubmitClicked(false);

  //   }
  // }, [finalPrice, submitClicked]);

  // useEffect(() => {
  //   if (finalPrice && !isSubmitted) {
  //     const values = {
  //       breadcrumbs,
  //       totalPrice: finalPrice,
  //       subCategoryName: selectedSubCategory.subCatgName,
  //       rateCardSetupId: fetchDisplayValue.rows[0].id
  //     };
  //     onSubmit(values);
  //     formik.resetForm();
  //     setIsSubmitted(true);
  //   }
  // }, [finalPrice, breadcrumbs, selectedSubCategory, fetchDisplayValue, onSubmit]);

  useEffect(() => {
    dispatch(getSpecification());
    if (selectedSubCategory?.subCatgName) {
      dispatch(fetchSingleRatecardSetUp({ searchVal: selectedSubCategory.subCatgName }));
    }
  }, [dispatch, selectedSubCategory?.subCatgName]);

  useEffect(() => {
    dispatch(addRateCardCompare(rateComparing));
  }, [dispatch, rateComparing]);

  useEffect(() => {
    dispatch(addRateCardCompare(indRateCompare));
  }, [dispatch, indRateCompare]);

  // const handleDataAdd = () => {
  //   dispatch(addRateCalc(resultArray))
  //   // setTimeout(() => {
  //   //   formik.submitForm();
  //   // }, 5000);
  // }

  // const handleDataAdd = () => {
  //   return new Promise((resolve) => {
  //     dispatch(addRateCalc(resultArray));
  //     const intervalId = setInterval(() => {
  //       if (finalPrice) {
  //         clearInterval(intervalId);
  //         resolve();
  //       }
  //     }, 100);
  //   });
  // };

  const handleDataAdd = () => {
    dispatch(addRateCalc(resultArray));
    setSubmitClicked(true);
  };

  const handleBlurExtrRate = (e, key) => {
    console.log('==eeee==', key);

    const extrChrg = e.target.value;
    const floatRegex = /^-?\d+(?:\.\d+)?$/;

    if (floatRegex.test(extrChrg)) {
      console.log('==e==', extrChrg);
      setValidExtrChrg({ item: [key], rate: +extrChrg });
      formik.setFieldValue(key, extrChrg);
    }
  };

  const handleBlur = (e, key) => {
    console.log('==key==', key);
    console.log('==e==', e);

    const val1 = { [key]: e.target.value._id };
    const val3 = { [e.target.name]: e.target.name };
    console.log('==val1==', val1);
    console.log('==val3==', val3);

    setVal1Array((prevValues) => [...prevValues, val1]);
    setVal3Array((prevValues) => [...prevValues, val3]);
  };

  const uniqueVal1Array = val1Array.reduce((acc, current) => {
    const key = Object.keys(current)[0];
    acc[key] = current[key];
    return acc;
  }, {});

  const result = Object.keys(uniqueVal1Array).map((key) => ({ [key]: uniqueVal1Array[key] }));
  const valuesArray = result.map((obj) => Object.values(obj)[0]);
  const uniqueKeys = Object.keys(val3Array.reduce((acc, current) => ({ ...acc, ...current }), {}));

  const handleSetRate = () => {
    const rateCompare = {
      item: uniqueKeys,
      dispValue: valuesArray,
      mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
      catgId: fetchDisplayValue.rows[0].specificationId.catgId,
      subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
      specificationId: fetchDisplayValue.rows[0].specificationId.id,
      rateCardSetupId: fetchDisplayValue.rows[0].id,
      pattern: fetchDisplayValue.rows[0].pattern,
      combType: 'COMB'
    };
    setRateComparing(rateCompare);
  };

  const handleSelectChange = (e, field) => {
    formik.handleChange(e);
    const val4 = e.target.value._id || e.target.value;
    const val5 = field.key;
    const indRateCompare = {
      item: [val5],
      dispValue: [val4],
      mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
      catgId: fetchDisplayValue.rows[0].specificationId.catgId,
      subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
      specificationId: fetchDisplayValue.rows[0].specificationId.id,
      rateCardSetupId: fetchDisplayValue.rows[0].id,
      pattern: fetchDisplayValue.rows[0].pattern,
      combType: 'INDV'
    };
    setIndRateCompare(indRateCompare);
  };

  const rateObject = useCallback(() => {
    const result = {};
    Rate?.dispValue.forEach((current) => {
      const value = Rate.rate;
      if (!result[value]) {
        result[value] = [current];
      } else {
        result[value].push(current);
      }
    });
    console.log('==result==', result);

    const transformedResult = {};
    Rate?.item.forEach((item) => {
      transformedResult[item] = { ...result, combType: Rate?.combType };
    });
    console.log('==transformedResult==', transformedResult);

    return transformedResult;
  }, [Rate]);

  useEffect(() => {
    const rateObjectsArray = [rateObject()];
    const filteredRateObjects = rateObjectsArray.filter((obj) => Object.keys(obj).length > 0);
    const mergedRateObjects = filteredRateObjects.reduce((acc, current) => {
      const keys = Object.keys(current);
      const values = Object.values(current);
      const mergedKey = keys.join(',');
      const mergedValue = values[0];
      return { [mergedKey]: mergedValue };
    }, {});

    console.log('==filteredRateObjects==', filteredRateObjects);
    console.log('==mergedRateObjects==', mergedRateObjects);

    const result = [mergedRateObjects];
    setRateObjects((prevRateObjects) => [...prevRateObjects, ...result]);
  }, [rateObject]);

  const uniqueRateObjects = rateObjects
    .filter((obj) => Object.keys(obj).length > 0)
    .reduce((acc, current) => {
      const key = Object.keys(current)[0];
      if (!acc[key]) {
        acc[key] = current;
      } else {
        acc[key] = Object.assign(acc[key], current);
      }
      return acc;
    }, {});

  console.log('==uniqueRateObjects==', uniqueRateObjects);

  const resultObj = {};
  Object.entries(uniqueRateObjects).forEach(([key, value]) => {
    resultObj[key] = value[key];
  });

  console.log('==resultObj==', resultObj);

  const resultArray = Object.entries(resultObj).map(([key, value]) => {
    console.log('==key==', value);

    const item = key.split(',');
    const rate = +Object.keys(value)[0];
    const dispValue = value[rate];
    const combType = value.combType;

    return {
      mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
      catgId: fetchDisplayValue.rows[0].specificationId.catgId,
      subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
      specificationId: fetchDisplayValue.rows[0].specificationId.id,
      rateCardSetupId: fetchDisplayValue.rows[0].id,
      pattern: fetchDisplayValue.rows[0].pattern,
      item,
      dispValue,
      rate,
      combType
    };
  });

  console.log('validExtrChrg:', validExtrChrg);
  if (validExtrChrg) {
    resultArray.push({
      ...validExtrChrg,
      mainCatgId: fetchDisplayValue.rows[0].specificationId.mainCatgId,
      catgId: fetchDisplayValue.rows[0].specificationId.catgId,
      subCatgId: fetchDisplayValue.rows[0].specificationId.subCatgId,
      specificationId: fetchDisplayValue.rows[0].specificationId.id,
      rateCardSetupId: fetchDisplayValue.rows[0].id,
      pattern: fetchDisplayValue.rows[0].pattern,
      combType: 'INDV'
    });
  }

  console.log('==resultArray', resultArray);

  // const formik = useFormik({
  //   initialValues: {
  //     xtraChgs: '',
  //   },
  //   validationSchema: Yup.object({}),

  //   onSubmit: (values) => {

  //     // if (finalPrice) {
  //       console.log("==valuesss===", values);
  //       if (breadcrumbs.ids[2] === selectedSubCategory.id) {
  //         values.breadcrumbs = breadcrumbs;
  //       // }
  //       values.totalPrice = finalPrice;
  //       values.subCategoryName = selectedSubCategory.subCatgName;
  //       values.rateCardSetupId = fetchDisplayValue.rows[0].id

  //       onSubmit(values);
  //       formik.resetForm()
  //       setSelectRate([]);
  //     }
  //   }
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     xtraChgs: '',
  //   },
  //   validationSchema: Yup.object({}),

  //   onSubmit: (values) => {

  //     // setTimeout(() => {
  //       // if(finalPrice){
  //         console.log("==valuesss===", values);
  //         if (breadcrumbs.ids[2] === selectedSubCategory.id) {
  //           values.breadcrumbs = breadcrumbs;

  //         values.totalPrice = finalPrice;
  //         values.subCategoryName = selectedSubCategory.subCatgName;
  //         values.rateCardSetupId = fetchDisplayValue.rows[0].id
  //         console.log("==values", values);

  //         onSubmit(values);
  //         formik.resetForm()
  //         setSelectRate([]);
  //       }
  //     // }
  //     // }, 3000);
  //   }
  // });

  const renderField = (field, key, combType) => {
    console.log('==field', field);

    switch (field.ctrnlType) {
      case 'CBX':
        if (combType.combType == 'COMB') {
          return (
            <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
              <FormLabel>{capitalize(field.lblText)}</FormLabel>

              <Select
                name={key}
                value={formik.values[key] || ''}
                onChange={(e) => {
                  formik.setFieldValue(key, e.target.value);
                }}
                onBlur={(e) => handleBlur(e, field.lblText, key)}
                variant="outlined"
                fullWidth
                displayEmpty
              >
                <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
                {field.dispValues.map((value, i) => (
                  <MenuItem value={value} key={i}>
                    {capitalize(value.value)}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
            </Grid>
          );
        } else if (combType.combType !== 'COMB') {
          return (
            <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
              <FormLabel>{capitalize(field.lblText)}</FormLabel>

              <Select
                name={key}
                value={formik.values[key] || ''}
                onChange={(e) => {
                  console.log('==sele==', e);

                  handleSelectChange(e, { lblText: field.lblText, key });
                }}
                variant="outlined"
                fullWidth
                displayEmpty
              >
                <MenuItem value="">Select {capitalize(field.lblText)}</MenuItem>
                {field.dispValues.map((value, i) => (
                  <MenuItem value={value} key={i}>
                    {capitalize(value.value)}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
            </Grid>
          );
        }
        break;

      case 'TXT':
        return (
          <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
            <FormLabel>{capitalize(field.lblText)}</FormLabel>
            <TextField
              name={key}
              placeholder={capitalize(field.lblText)}
              // value={formik.values[key] || ''}
              value={formik.values.xtraChgs}
              // value={''/}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              onChange={(e) => {
                console.log('==vale==', e);

                //  handleSelectChange(e, { lblText: field.lblText, key })
                handleBlurExtrRate(e, key);
              }}
              variant="outlined"
              fullWidth
            />
            {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
          </Grid>
        );

      case 'TXTAR':
        return (
          <Grid item xs={12} padding={1} paddingLeft={0} key={key}>
            <FormLabel>{capitalize(field.lblText)}</FormLabel>
            <TextField
              name={key}
              value={formik.values[key] || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
          </Grid>
        );

      case 'CHKBX':
        return (
          <Grid item xs={12} sm={4} padding={1} paddingLeft={0} key={key}>
            <FormControlLabel
              control={
                <Checkbox name={key} checked={formik.values[key] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              }
              label={capitalize(field.lblText)}
            />
            {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
          </Grid>
        );
      default:
        return null;
    }
  };

  const combinationSpecItems = [];
  const individualSpecItems = [];

  const combinationFields = (
    <Grid sm={12}>
      <Grid item sm={12} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {combinationSpecItems}
      </Grid>
      <Grid item sm={12} style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px' }}>
        {/* <p>Rate: {Rate?.rate}</p> */}
        <Button size="small" variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={handleSetRate}>
          {' '}
          +{' '}
        </Button>
      </Grid>
    </Grid>
  );
  console.log('==combinationSpecItems==', combinationSpecItems);

  const individualFields = (
    <Grid sm={12}>
      <Grid item sm={12} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {individualSpecItems}
      </Grid>
    </Grid>
  );

  Object.keys(fetchDisplayValue?.rows?.[0]?.specificationId?.specItem || {}).forEach((key) => {
    const field = fetchDisplayValue?.rows?.[0]?.specificationId?.specItem?.[key];
    const combType = fetchDisplayValue?.rows?.[0]?.dispSpecItems?.find((item) => item.specItem === key);
    console.log('==field==', field);

    if (combType?.combType === 'COMB') {
      combinationSpecItems.push(renderField(field, key, combType));
    } else if (combType?.combType === 'INDV') {
      individualSpecItems.push(renderField(field, key, combType));
    }
  });

  console.log('==combinationSpecItems==', combinationSpecItems);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* <h1>Rate: {Rate?.rate}</h1> */}
      <Grid container xs={12} style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: '0px' }}>{selectedSubCategory ? capitalize(selectedSubCategory.subCatgName) : ''}</h1>
          <h3>Specification</h3>
        </Grid>
        {/* 
        {combinationFields}
        {individualFields}
        */}
        {combinationSpecItems.length === 0 && individualSpecItems.length === 0 ? (
          <NoDataComponent />
        ) : (
          <>
            {combinationFields}
            {individualFields}
          </>
        )}
        {/* {fields} */}
        {/* {fields ? fields : <NoDataComponent />} */}
      </Grid>

      <Grid container justifyContent="flex-end" padding={2}>
        <Button type="button" onClick={handleDataAdd} style={{ background: 'black', color: 'white', padding: '8px 25px' }}>
          +ADD
        </Button>
      </Grid>
    </form>
  );
}

export default OrderSpecification;
