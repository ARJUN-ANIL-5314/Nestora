// final code all functinality done instead of display values----------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
// import MainCard from 'ui-component/cards/MainCard';
// import { capitalizeFirstLetter } from '../utilities/Capitallised';
// import {
//     FormLabel, FormControlLabel, Checkbox, Box, Grid, MenuItem, Select, TextField, Button, IconButton, Tooltip, InputAdornment
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useTheme } from '@mui/material/styles';
// import commonStyles from 'assets/style/Style';
// import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
// import { getSpecification, getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
// import { getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
// import { getCategory } from 'module/licensee/container/category/slice';
// import SpecificationTable from './SpecificationTable.jsx';
// import { getSpecificationById, getSingleSpec, updateSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { useLocation } from 'react-router-dom';
// import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SpecificationEditPage = () => {
//     const theme = useTheme();
//     const style = commonStyles(theme);
//     const dispatch = useDispatch();
//     // const mainCategories = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData || []);
//     // const categories = useSelector((state) => state.licenseeReducer.category.categoryData || []);
//     // const subCategories = useSelector((state) => state. licenseeReducer.subCategory.subCategoryData || []);
//     const [showFeild, setShowFeild] = useState(false)
//     console.log(showFeild, "feildssss")
//     const specifications = useSelector((state) => state.licenseeReducer.specification.specificationData);
//     const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
//     const specificationByIdData = useSelector((state) => state.licenseeReducer.specification.specificationByIdData);
//     console.log(specificationByIdData, "====specificationByIdData===")
//     // const speciddata = Array.isArray(specificationByIdData) ? specificationByIdData : [specificationByIdData];
//     const [datalist, setDataList] = useState([specificationByIdData]);
//     console.log(datalist, "===datalist==")
//     // console.log(speciddata, "===speciddata==")
//     // const singleSpecByIdData = useSelector((state) => state.licenseeReducer.specification.singleSpecByIdData);
//     const singleSpec = useSelector((state) => state.licenseeReducer.specification.singleSpec);
//     console.log(singleSpec, "===singleSpec==")
//     // const [filteredCategories, setFilteredCategories] = useState([]);
//     // const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//     const [dispValues, setDispValues] = useState([]);
//     const [controlType, setControlType] = useState('');
//     // const [addedSpecifications, setAddedSpecifications] = useState([]);
//     // console.log(addedSpecifications, "====addedSpecifications===")
//     const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
//     const location = useLocation();
//     // const { item } = location.state;
//     const data = location.state?.data;
//     const singleSpecData = location.state?.singleSpecData;
//     const SpecificationsList = location.state?.SpecificationsList;
//     const [singleSpecDataa, setSingleSpecDataa] = useState(singleSpecData);
//     console.log("==singleSpecDataa==", singleSpecDataa);
//     console.log("Received item1:", singleSpecData);
//     console.log("Received item2:", data);
//     console.log("==index==", singleSpecData?.itemIndex);
//     console.log(specifications, 'specifications');
//     console.log("====singleSpecByIdData==", specificationByIdData?.specItem);
//     console.log("====selectedSubCategoryName==", selectedSubCategoryName);
//     const [specItem, setSpecItem] = React.useState('');
//     console.log(specItem, "====specItem====")
//     console.log(controlType, "====specItem====")
//     const navigate = useNavigate();

//     const backToSpecification = () => {
//         navigate('/specification');
//       };
//     useEffect(() => {
//         setDataList([specificationByIdData])
//         setSingleSpecDataa(singleSpecData)
//     }, [specificationByIdData, singleSpecData])

//     useEffect(() => {
//         // if(specificationByIdData){
//         //     setDataList(specificationByIdData)
//         // }
//         dispatch(getSingleSpec(specificationByIdData?.specItem))
//         if (data && data.id) {
//             dispatch(getSpecificationById(data.id));
//         }
//         if (singleSpecData?.specificationItem) {
//             setSpecItem(singleSpecData.specificationItem);
//         }
//         if (singleSpecData?.controlType) {
//             setControlType(singleSpecData.controlType)
//         }
//     }, [dispatch, data, singleSpecData]);

//     useEffect(() => {
//         dispatch(getSpecification());
//         dispatch(getSpecificationSpec());
//         dispatch(getCategory());
//         dispatch(getMainCategory());
//         dispatch(getSubCategory());

//     }, [dispatch]);

//     const initialValues = useMemo(() => ({
//         mainCatgId: data?.mainCatgId || '',
//         catgId: data?.catgId || '',
//         subCatgId: data?.subCatgId || '',
//         // specItem:  singleSpecData?.specificationItem,
//         // lblText: singleSpecData?.displayName || '--',
//         ctrnlType: '',
//         // lblText: '',
//         dispValues: '',
//         isActive: data?.isActive === true,
//     }), [data]);

//     useEffect(() => {
//         if (data?.subCatgId?.subCatgName) {
//             setSelectedSubCategoryName(data.subCatgId.subCatgName);
//         }
//     }, [data]);

//     // const initialValues = useMemo(() => {
//     //     return {
//     //         mainCatgId: data?.mainCatgId?.grpCatgName || '',
//     //         catgId: data?.catgId?.catgName || '',
//     //         subCatgId: data?.subCatgId?.subCatgName || '',

//     //         // mainCatgName: data?.mainCatgId?.grpCatgName || '', // Initialize mainCatgName if it's editable
//     //     }
//     // }, [data]);

//     console.log("==initialValues==", initialValues);

//     const validationSchema = Yup.object({
//         // mainCatgId: Yup.string().required('Main Category is required'),
//         // catgId: Yup.string().required('Category is required'),
//         // subCatgId: Yup.string().required('Sub Category is required'),
//         // ctrnlType: Yup.string().required('Control Type is required'),
//         // lblText: Yup.string().required('Display Name is required')
//     });

//     const onSubmit = async (values) => {
//         console.log("Submitted values:", values);
//         try {
//             const newSpecObject = {
//                 // mainCatgId: values.mainCatgId.id,
//                 // catgId: values.catgId.id,
//                 // subCatgId: values.subCatgId.id,
//                 subCategory: values.subCatgId.subCatgName,
//                 specificationItem: values.specItem || singleSpecData.specificationItem,

//                 displayName: values.lblText || singleSpecData.displayName,
//                 controlType: values.ctrnlType || singleSpecData.controlType,
//                 isActive: values.isActive,
//                 dispValues: dispValues.length > 0 ? dispValues : ['']

//             };

//             console.log("==newSpecObject==", newSpecObject);
//             const updatedSpecificationsList = [...SpecificationsList];
//             // console.log("==updatedSpecificationsList==", updatedSpecificationsList);

//             updatedSpecificationsList[singleSpecData?.itemIndex] = newSpecObject;
//             console.log("==updatedSpecificationsList==", updatedSpecificationsList);

//             const transformedList = updatedSpecificationsList.reduce((acc, item) => {
//                 console.log("==item==", item);
//                 const { subCategory, specificationItem, displayName, controlType } = item;
//                 const subCatgId = values.subCatgId.id;
//                 const subCatgName = subCategory;
//                 const mainCatgId = values.mainCatgId.id;
//                 const catgId = values.catgId.id;

//                 if (!acc.specItem) {
//                     acc.specItem = {};
//                 }

//                 acc.specItem[specificationItem] = {
//                     lblText: displayName,
//                     ctrnlType: controlType,
//                     isDisplayed: true,
//                     //   dispValues: dispValues.map(dispValue => ({ value: dispValue })),
//                 };

//                 acc.subCatgId = subCatgId;
//                 acc.subCatgName = subCatgName;
//                 acc.mainCatgId = mainCatgId;
//                 acc.catgId = catgId;

//                 return acc;
//             }, {});

//             const finalList = [transformedList];

//             console.log("==finalList==", finalList);

//             setDataList(finalList);
//             //   if(data.subCatgName ){
//             //         alert("hello")
//             //   }
//             //   dispatch(updateSpecification(finalList));

//             // const updatedSpecificationsList = [...SpecificationsList];
//             // console.log("==updatedSpecifications===", updatedSpecificationsList);

//             // const previousSpecObject = updatedSpecificationsList[singleSpecData?.itemIndex];
//             //   console.log("==previousSpecObject==", previousSpecObject);

//             // updatedSpecificationsList[singleSpecData?.itemIndex] = newSpecObject;
//             // console.log("==updatedSpecificationsList==", updatedSpecificationsList);

//             // setAddedSpecifications(updatedSpecificationsList);
//             // setDataList(updatedSpecificationsList);

//             // dispatch(updateSpecification(updatedSpecificationsList));

//             // console.log("Updated Spec Object:", newSpecObject);
//             // console.log("Previous Spec Object:", previousSpecObject);

//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     const handleAddDispValue = (value, setFieldValue) => {
//         if (value !== '') {
//             const updatedDispValues = [...dispValues, value];
//             setDispValues(updatedDispValues);
//             setFieldValue('dispValues', '');
//         }
//     };

//     const handleDispValuesDelete = (index, setFieldValue) => {
//         const updatedDispValues = dispValues.filter((_, i) => i !== index);
//         setDispValues(updatedDispValues);
//         setFieldValue('dispValues', updatedDispValues);

//     };

//     // const handleIsActiveChange = (event) => {
//     //     setSingleSpecDataa((prevData) =>

//     //         ({...prevData, isActive: event.target.checked? "Yes" : "No" }));

//     //   };

//     const handleSubmitAllSpecifications = async () => {
//         dispatch(updateSpecification({ id: specificationByIdData.id, data: datalist[0] }));
//         backToSpecification();
//     };

//     return (
//         <MainCard>
//             <Box>
//                 <h1>Edit</h1>

//                 <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
//                     {({ values, setFieldValue }) => (
//                         <Form>

//                             <Grid container spacing={2}>

//                                 <Grid item sm={4}>
//                                     <FormLabel> Main Category</FormLabel>
//                                     <TextField
//                                         name="mainCatgId"
//                                         value={capitalizeFirstLetter(values.mainCatgId.grpCatgName)}
//                                         onChange={(e) => setFieldValue('mainCatgId', e.target.value)}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="mainCatgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>
//                                 <Grid item sm={4}>
//                                     <FormLabel> Category</FormLabel>
//                                     <TextField
//                                         name="catgId"
//                                         value={capitalizeFirstLetter(values.catgId.catgName)}
//                                         onChange={(e) => setFieldValue('catgId', e.target.value)}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="catgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>
//                                 <Grid item sm={4}>
//                                     <FormLabel> Sub Category</FormLabel>
//                                     <TextField
//                                         name="subCatgId"
//                                         id="subCatgId"
//                                         value={capitalizeFirstLetter(values.subCatgId.subCatgName)}
//                                         onChange={(e) => {
//                                             setFieldValue('subCatgId', e.target.value);
//                                             setSelectedSubCategoryName(filteredSubCategories.find(item => item.id === e.target.value)?.subCatgName || '');
//                                         }}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="subCatgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>

//                                 <Grid item sm={12}>
//                                     {selectedSubCategoryName && (
//                                         <h2 style={{ borderBottom: '1px solid #e4e4e4', paddingBottom: '10px', textTransform: 'capitalize', fontWeight: '500' }}>
//                                             {selectedSubCategoryName}
//                                         </h2>
//                                     )}
//                                 </Grid>
//                             </Grid>
//                             <Box mt={4} style={{ marginBottom: '100px' }}>
//                                 <SpecificationTable specifications={datalist} setShowFeild={setShowFeild} />
//                             </Box>

//                             <Grid container spacing={3}>
//                                 {showFeild && (
//                                     <>
//                                         <Grid item sm={4}>
//                                             <FormLabel>Select Specification Item</FormLabel>
//                                             <Select
//                                                 name="specItem"
//                                                 id="specItem"
//                                                 value={specItem}
//                                                 onChange={(e) => {
//                                                     setFieldValue('specItem', e.target.value);
//                                                     setSpecItem(e.target.value);
//                                                 }}
//                                                 fullWidth
//                                                 disabled={!values.subCatgId}
//                                                 style={{ padding: '8px', marginTop: '10px' }}
//                                             >
//                                                 <MenuItem value="" disabled>
//                                                     Select Specification Item
//                                                 </MenuItem>
//                                                 {specificationsSpec.keys && Object.keys(specificationsSpec.keys).map((key) => (
//                                                     <MenuItem key={key} value={specificationsSpec.keys[key]}>
//                                                         {specificationsSpec.keys[key]}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                             <ErrorMessage name="specItem" component="div" style={{ color: 'red' }} />
//                                         </Grid>

//                                         <Grid item sm={4}>
//                                             <FormLabel>Select Control Type</FormLabel>
//                                             <Select
//                                                 name="ctrnlType"
//                                                 id="ctrnlType"
//                                                 value={controlType}
//                                                 onChange={(e) => {
//                                                     setFieldValue('ctrnlType', e.target.value);
//                                                     setControlType(e.target.value);
//                                                 }}
//                                                 fullWidth
//                                                 style={{ padding: '8px', marginTop: '10px' }}
//                                             >
//                                                 <MenuItem value="" disabled>
//                                                     Select Control
//                                                 </MenuItem>
//                                                 <MenuItem value="CBX">Combo Box</MenuItem>
//                                                 <MenuItem value="TXT">Text Box</MenuItem>
//                                                 <MenuItem value="TXTAR">Text Area</MenuItem>
//                                                 <MenuItem value="CHKBX">Check Box</MenuItem>
//                                             </Select>
//                                             <ErrorMessage name="ctrnlType" component="div" style={{ color: 'red' }} />
//                                         </Grid>

//                                         <Grid item sm={4}>
//                                             <FormLabel>Display Name</FormLabel>
//                                             <TextField
//                                                 name="lblText"
//                                                 // defaultValue={singleSpecData?.displayName}
//                                                 // value={values.lblText}
//                                                 defaultValue={singleSpecData?.displayName ? singleSpecData?.displayName : values.lblText}
//                                                 onChange={(e) => setFieldValue('lblText', e.target.value)}
//                                                 fullWidth
//                                                 InputProps={{
//                                                     style: { padding: '7px' }
//                                                 }}
//                                                 style={{ marginTop: '10px' }}
//                                             />

//                                             <ErrorMessage name="lblText" component="div" style={{ color: 'red' }} />
//                                         </Grid>

//                                         {controlType === "CBX" && (
//                                             <Grid item sm={4}>
//                                                 <FormLabel>Display Value</FormLabel>
//                                                 <TextField
//                                                     name="dispValues"
//                                                     id="dispValues"
//                                                     value={singleSpecData?.displayValues || ''}
//                                                     onChange={(e) => setFieldValue('dispValues', e.target.value)}
//                                                     fullWidth
//                                                     InputProps={{
//                                                         style: { padding: '10px' },
//                                                         endAdornment: (
//                                                             <InputAdornment position="start">
//                                                                 <Tooltip title="Send Data">
//                                                                     <IconButton type="button" onClick={() => handleAddDispValue(values.dispValues, setFieldValue)}>
//                                                                         <SendIcon />
//                                                                     </IconButton>
//                                                                 </Tooltip>
//                                                             </InputAdornment>
//                                                         )
//                                                     }}
//                                                 />
//                                                 <ErrorMessage name="dispValues" component="div" style={{ color: 'red' }} />
//                                             </Grid>
//                                         )}
//                                                   <Grid item xs={12} sm={4}>
//                                     <FormControlLabel
//                                         control={
//                                             <Checkbox
//                                                 sx={style.ChecboxColor}
//                                                 name="isActive"
//                                                 value="isActive"
//                                                 checked={singleSpecData.isActive === "Yes"}
//                                                 // onChange={() => setFieldValue('isActive', !values.isActive)}
//                                                 onChange={(event) => {
//                                                     setSingleSpecDataa((prevData) => ({ ...prevData, isActive: event.target.checked ? "Yes" : "No" }));
//                                                   }}
//                                             />
//                                         }
//                                         label="Is Display"
//                                     />
//                                 </Grid>

//                                     </>
//                                 )}

//                                 {dispValues.length > 0 && (
//                                     <Box
//                                         sx={{
//                                             width: '23%',
//                                             maxHeight: '200px',
//                                             paddingTop: '12px',
//                                             boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
//                                             borderRadius: '12px',
//                                             position: 'absolute',
//                                             overflowY: 'auto'
//                                         }}
//                                     >
//                                         <ul style={{ margin: '0px' }}>
//                                             {dispValues.map((name, index) => (
//                                                 <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                                     {name}
//                                                     <IconButton onClick={() => handleDispValuesDelete(index)} style={{ padding: '0px 10px 10px 0px' }}>
//                                                         <DeleteIcon style={{ width: '20px' }} />
//                                                     </IconButton>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </Box>
//                                 )}
//                             </Grid>
//                             <Grid style={{ display: 'flex', justifyContent: 'end' }}>
//                                 <Button type="submit" sx={style.changeBtn}>
//                                     Update
//                                 </Button>
//                             </Grid>
//                         </Form>
//                     )}
//                 </Formik>

//                 <Box mt={2} display="flex" justifyContent="end">
//                     <Button variant="contained" color="primary" onClick={handleSubmitAllSpecifications}>
//                         Submit
//                     </Button>
//                 </Box>
//             </Box>
//         </MainCard>
//     );
// };

// export default SpecificationEditPage;

//=============================================================

// import React, { useEffect, useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
// import '../../../../assets/style/style.css'
// import MainCard from 'ui-component/cards/MainCard';
// import { capitalizeFirstLetter } from '../utilities/Capitallised';
// import {
//     FormLabel, Box, Grid, MenuItem, Select, TextField, Button, IconButton, Tooltip, InputAdornment
// } from '@mui/material';
// // FormControlLabel, Checkbox,
// import SendIcon from '@mui/icons-material/Send';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useTheme } from '@mui/material/styles';
// import commonStyles from 'assets/style/Style';
// import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
// import { getSpecification, getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
// import { getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
// import { getCategory } from 'module/licensee/container/category/slice';
// import SpecificationTable from './specificationEditTabel.jsx';
// import { getSpecificationById, getSingleSpec, updateSpecification } from 'module/licensee/container/specificationContainer/slice';
// import { useLocation } from 'react-router-dom';
// import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SpecificationEditPage = () => {
//     const theme = useTheme();
//     const style = commonStyles(theme);
//     const dispatch = useDispatch();
//     const [showFeild, setShowFeild] = useState(false)
//     console.log(showFeild, "feildssss")
//     const [hasUpdated, setHasUpdated] = useState(false);
//     console.log("==hasUpdated==", hasUpdated);
//     // const specifications = useSelector((state) => state.licenseeReducer.specification.specificationData);
//     const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
//     const specificationByIdData = useSelector((state) => state.licenseeReducer.specification.specificationByIdData);
//     console.log(specificationByIdData, "====specificationByIdData===")
//     const [datalist, setDataList] = useState([specificationByIdData]);
//     console.log(datalist, "===datalist==")
//     const singleSpec = useSelector((state) => state.licenseeReducer.specification.singleSpec);
//     console.log(singleSpec, "===singleSpec==")
//     const [dispValues, setDispValues] = useState([]);
//     const [controlType, setControlType] = useState('');
//     const [displayName, setDisplayName] = useState('');
//     const [addData, setAddData] = useState(false);
//     const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
//     const location = useLocation();
//     const data = location.state?.data;
//     console.log("==data==",data);

//     const singleSpecData = location.state?.singleSpecData;
//     const SpecificationsList = location.state?.SpecificationsList;
//     const [singleSpecDataa, setSingleSpecDataa] = useState(singleSpecData);

//     const [specItem, setSpecItem] = React.useState('');
//     const [display, setDisplay] = useState([]);
//     const navigate = useNavigate();
//     const [displayValues, setDisplayValues] = useState(singleSpecData?.displayValues ? singleSpecData.displayValues.split(', ').map(value => value.trim()) : []);

//     console.log("==singleSpecDataa==", singleSpecDataa);
//     console.log("===SpecificationsList===", SpecificationsList);
//     const backToSpecification = () => {
//         navigate('/specification');
//     };

//     let transformedSpecificationsList = [];
//     if (SpecificationsList && Array.isArray(SpecificationsList)) {
//         transformedSpecificationsList = SpecificationsList.map((specification) => {
//             const displayValuesArray = specification.displayValues.split(', ');
//             const transformedDisplayValues = displayValuesArray.map((value) => (value));
//             return {
//                 ...specification,
//                 displayValues: transformedDisplayValues,
//             };
//         });
//     }
//     console.log('==transformedSpecificationsList==', transformedSpecificationsList);

//     useEffect(() => {
//         setSingleSpecDataa(singleSpecData)
//     }, [singleSpecData])

//     useEffect(() => {
//         if (!hasUpdated && specificationByIdData?.subCatgName !== undefined) {
//             // alert("hello")
//             setDataList([specificationByIdData]);
//             setHasUpdated(true);
//         }
//     }, [specificationByIdData, hasUpdated]);

//     useEffect(() => {

//         dispatch(getSingleSpec(specificationByIdData?.specItem))
//         if (data && data.id) {
//             dispatch(getSpecificationById(data.id));
//         }
//         if (singleSpecData?.specificationItem) {
//             setSpecItem(singleSpecData.specificationItem);
//         }
//         if (singleSpecData?.controlType) {
//             setControlType(singleSpecData.controlType)
//         }
//         if (singleSpecData?.displayName) {
//             setDisplayName(singleSpecData.displayName)
//         }
//     }, [dispatch, data, singleSpecData]);

//     useEffect(() => {
//         dispatch(getSpecification());
//         dispatch(getSpecificationSpec());
//         dispatch(getCategory());
//         dispatch(getMainCategory());
//         dispatch(getSubCategory());

//     }, [dispatch]);

//     const initialValues = useMemo(() => ({
//         mainCatgId: data?.mainCatgId || '',
//         catgId: data?.catgId || '',
//         subCatgId: data?.subCatgId || '',
//         ctrnlType: '',
//         dispValues: '',
//         isActive: data?.isActive === true,
//     }), [data]);

//     useEffect(() => {
//         if (data?.subCatgId?.subCatgName) {
//             setSelectedSubCategoryName(data.subCatgId.subCatgName);
//         }
//     }, [data]);

//     console.log("==initialValues==", initialValues);

//     const validationSchema = Yup.object({

//     });

//     const onSubmit = async (values) => {
//         console.log("Submitted values:", values);
//         if (addData) {
//             let newSpecItem = values.specItem;
//             const newSpecObject = {
//                 lblText: values.lblText,
//                 ctrnlType: values.ctrnlType,
//                 dispValues:dispValues,
//                 isDisplayed: true

//             };
//             setDataList((prevDataList) =>{
//                return( prevDataList.map((item) => {
//                   console.log("==newItem", item);

//                   return {
//                     mainCatgId: item.mainCatgId.id,
//                     catgId: item.catgId.id,
//                     subCatgId: item.subCatgId.id,
//                     subCatgName: item.subCatgId.subCatgName,
//                     specItem: {
//                       ...(item.specItem || {}),
//                       [newSpecItem]: newSpecObject,
//                       ...Object.fromEntries(
//                         Object.entries(item.specItem || {}).map(([key, value]) => [
//                           key,
//                           {
//                             ...value,
//                             dispValues: value.dispValues.map((dispValue) => dispValue.value),
//                           },
//                         ])
//                       ),
//                     },
//                   };
//                 }))
//             }

//               );
//               setAddData(false)
//         }
//         try {

//             const newSpecObject = {
//                 subCategory: values.subCatgId.subCatgName,
//                 specificationItem: values.specItem || singleSpecData.specificationItem,

//                 displayName: values.lblText || singleSpecData.displayName,
//                 controlType: values.ctrnlType || singleSpecData.controlType,
//                 isActive: values.isActive,
//                 dispValues: singleSpecData.displayValues || displayValues.length > 0 ? displayValues : ''

//             };

//             console.log("==newSpecObject==", newSpecObject);
//             const updatedSpecificationsList = [...transformedSpecificationsList];
//             console.log("==updatedSpecificationsList==", updatedSpecificationsList);

//             updatedSpecificationsList[singleSpecData?.itemIndex] = newSpecObject;
//             const transformedList = updatedSpecificationsList.reduce((acc, item) => {

//                 console.log("==item==", item);
//                 const { subCategory, specificationItem, displayName, controlType, dispValues, displayValues
//                 } = item;
//                 console.log("==1==", dispValues);
//                 const subCatgId = values.subCatgId.id;
//                 const subCatgName = subCategory;
//                 const mainCatgId = values.mainCatgId.id;
//                 const catgId = values.catgId.id;

//                 if (!acc.specItem) {
//                     acc.specItem = {};
//                 }

//                 acc.specItem[specificationItem] = {
//                     lblText: displayName,
//                     ctrnlType: controlType,
//                     isDisplayed: true,
//                     dispValues: dispValues || displayValues,

//                 };

//                 acc.subCatgId = subCatgId;
//                 acc.subCatgName = subCatgName;
//                 acc.mainCatgId = mainCatgId;
//                 acc.catgId = catgId;

//                 return acc;
//             }, {});

//             const finalList = [transformedList];

//             console.log("==finalList==", finalList);

//             setDataList(finalList);
//             // setValues({
//             //     specItem: '',
//             //     lblText: '',
//             //     ctrnlType: '',
//             //     subCatgId: '',
//             //     mainCatgId: '',
//             //     catgId: '',
//             //     isActive: false,
//             //   });
//             setDispValues([]);
//             setSpecItem(null)
//             setControlType(null)
//             setDisplayName(null)
//             // setDataList([specificationByIdData])
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     const handleAddDispValue = (value, setFieldValue) => {
//         if (value !== '') {
//             const updatedDispValues = [...dispValues, value];
//             console.log("==updatedDispValues=", updatedDispValues);
//             setDispValues(updatedDispValues);
//             setFieldValue('dispValues', '');
//         }
//     };

//     const handleDispValuesDelete = (index) => {
//         setDisplayValues((prevValues) => prevValues.filter((_, i) => i !== index));
//     };

//     const handleSubmitAllSpecifications = async () => {
//         dispatch(updateSpecification({ id: specificationByIdData.id, data: datalist[0] }));
//         backToSpecification();
//     };

//     const addNewSpecifications = (() => {
//         setShowFeild(true);
//         setAddData(true)
//     })

//     useEffect(() => {
//         setDisplay(singleSpecData?.displayValues ? singleSpecData.displayValues.split(', ').map(value => value.trim()) : []
//         )
//     }, [singleSpecData?.displayValues])

//     useEffect(() => {
//         setDisplayValues([...display, ...dispValues]);
//     }, [dispValues, display]);

//     return (
//         <MainCard>
//             <Box>
//                 <h1>Edit Specification</h1>

//                 <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
//                     {({ values, setFieldValue }) => (
//                         <Form>

//                             <Grid container spacing={2}>

//                                 <Grid item sm={4}>
//                                     <FormLabel> Main Category</FormLabel>
//                                     <TextField
//                                         name="mainCatgId"
//                                         value={capitalizeFirstLetter(values.mainCatgId.grpCatgName)}
//                                         // onChange={(e) => setFieldValue('mainCatgId', e.target.value)}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="mainCatgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>
//                                 <Grid item sm={4}>
//                                     <FormLabel> Category</FormLabel>
//                                     <TextField
//                                         name="catgId"
//                                         value={capitalizeFirstLetter(values.catgId.catgName)}
//                                         // onChange={(e) => setFieldValue('catgId', e.target.value)}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="catgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>
//                                 <Grid item sm={4}>
//                                     <FormLabel> Sub Category</FormLabel>
//                                     <TextField
//                                         // name="subCatgId"
//                                         // id="subCatgId"
//                                         value={capitalizeFirstLetter(values.subCatgId.subCatgName)}
//                                         // onChange={(e) => {
//                                         //     setFieldValue('subCatgId', e.target.value);
//                                         //     setSelectedSubCategoryName(filteredSubCategories.find(item => item.id === e.target.value)?.subCatgName || '');
//                                         // }}
//                                         fullWidth
//                                         InputProps={{ style: { padding: '7px' } }}
//                                         style={{ marginTop: '10px' }}
//                                         disabled
//                                     />

//                                     <ErrorMessage name="subCatgId" component="div" style={{ color: 'red' }} />
//                                 </Grid>

//                                 <Grid item sm={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e4e4', }}>
//                                     {selectedSubCategoryName && (
//                                         <h2 style={{ paddingBottom: '10px', textTransform: 'capitalize', fontWeight: '500' }}>
//                                             {selectedSubCategoryName}
//                                         </h2>
//                                     )}
//                                     <Button variant="contained" color="primary" onClick={addNewSpecifications} style={{ height: '35px' }}>
//                                         new
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                             <Box mt={4} >
//                                 <SpecificationTable specifications={datalist} setShowFeild={setShowFeild} />
//                             </Box>

//                             <Grid container style={{ marginTop: '50px' }} >
//                                 {showFeild && (
//                                     <>
//                                         <Grid container spacing={3} >
//                                             <Grid item sm={4}>
//                                                 <FormLabel>Select Specification Item</FormLabel>
//                                                 <Select
//                                                     name="specItem"
//                                                     id="specItem"
//                                                     value={specItem}
//                                                     onChange={(e) => {
//                                                         setFieldValue('specItem', e.target.value);
//                                                         setSpecItem(e.target.value);
//                                                     }}
//                                                     fullWidth
//                                                     disabled={!values.subCatgId}
//                                                     style={{ padding: '8px', marginTop: '10px' }}
//                                                 >
//                                                     <MenuItem value="" disabled>
//                                                         Select Specification Item
//                                                     </MenuItem>
//                                                     {specificationsSpec.keys && Object.keys(specificationsSpec.keys).map((key) => (
//                                                         <MenuItem key={key} value={specificationsSpec.keys[key]}>
//                                                             {specificationsSpec.keys[key]}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                                 <ErrorMessage name="specItem" component="div" style={{ color: 'red' }} />
//                                             </Grid>

//                                             <Grid item sm={4}>
//                                                 <FormLabel>Select Control Type</FormLabel>
//                                                 <Select
//                                                     name="ctrnlType"
//                                                     id="ctrnlType"
//                                                     value={controlType}
//                                                     onChange={(e) => {
//                                                         setFieldValue('ctrnlType', e.target.value);
//                                                         setControlType(e.target.value);
//                                                     }}
//                                                     fullWidth
//                                                     style={{ padding: '8px', marginTop: '10px' }}
//                                                 >
//                                                     <MenuItem value="" disabled>
//                                                         Select Control
//                                                     </MenuItem>
//                                                     <MenuItem value="CBX">Combo Box</MenuItem>
//                                                     <MenuItem value="TXT">Text Box</MenuItem>
//                                                     <MenuItem value="TXTAR">Text Area</MenuItem>
//                                                     <MenuItem value="CHKBX">Check Box</MenuItem>
//                                                 </Select>
//                                                 <ErrorMessage name="ctrnlType" component="div" style={{ color: 'red' }} />
//                                             </Grid>

//                                             <Grid item sm={4}>
//                                                 <FormLabel>Display Name</FormLabel>

//                                                 <TextField
//                                                     name="lblText"
//                                                     value={displayName}
//                                                     onChange={(e) => {
//                                                         setFieldValue('lblText', e.target.value);
//                                                         setDisplayName(e.target.value);
//                                                     }}
//                                                     fullWidth
//                                                     InputProps={{
//                                                         style: { padding: '7px' }
//                                                     }}
//                                                     style={{ marginTop: '10px' }}
//                                                 />
//                                                 <ErrorMessage name="lblText" component="div" style={{ color: 'red' }} />
//                                             </Grid>

//                                             {controlType === "CBX" && (
//                                                 <Grid item sm={4}>
//                                                     <FormLabel>Display Value</FormLabel>
//                                                     <TextField
//                                                         name="dispValues"
//                                                         id="dispValues"
//                                                         value={values.dispValues}
//                                                         onChange={(e) => setFieldValue('dispValues', e.target.value)}
//                                                         fullWidth
//                                                         InputProps={{
//                                                             style: { padding: '10px' },
//                                                             endAdornment: (
//                                                                 <InputAdornment position="start">
//                                                                     <Tooltip title="Send Data">
//                                                                         <IconButton type="button" onClick={() => handleAddDispValue(values.dispValues, setFieldValue)}>
//                                                                             <SendIcon />
//                                                                         </IconButton>
//                                                                     </Tooltip>
//                                                                 </InputAdornment>
//                                                             )
//                                                         }}
//                                                     />
//                                                     <ErrorMessage name="dispValues" component="div" style={{ color: 'red' }} />
//                                                 </Grid>
//                                             )}
//                                             {/* <Grid item xs={12} sm={4}>
//                                             <FormControlLabel
//                                                 control={
//                                                     <Checkbox
//                                                         sx={style.ChecboxColor}
//                                                         name="isActive"
//                                                         value="isActive"
//                                                         checked={singleSpecData?.isActive === "Yes" ||false}
//                                                         onChange={(event) => {
//                                                             setSingleSpecDataa((prevData) => ({ ...prevData, isActive: event.target.checked ? "Yes" : "No" }));
//                                                         }}
//                                                     />
//                                                 }
//                                                 label="Is Display"
//                                             />
//                                         </Grid> */}

//                                         </Grid>
//                                         {controlType === "CBX" && displayValues.length > 0 && (
//                                             <Box
//                                                 sx={{
//                                                     width: '31%',
//                                                     maxHeight: '280px',
//                                                     paddingTop: '12px',
//                                                     boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
//                                                     borderRadius: '12px',
//                                                     // position: 'absolute',
//                                                     overflowY: 'auto',
//                                                     zIndex: '1000'
//                                                 }}
//                                             >
//                                                 <ul style={{ margin: '0px' }}>
//                                                     {displayValues.map((name, index) => (
//                                                         <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                                             {name}
//                                                             <IconButton onClick={() => handleDispValuesDelete(index)} style={{ padding: '0px 10px 10px 0px' }}>
//                                                                 <DeleteIcon style={{ width: '20px' }} />
//                                                             </IconButton>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </Box>
//                                         )}
//                                     </>
//                                 )}

//                             </Grid>
//                             <Grid style={{ display: 'flex', justifyContent: 'end' }}>
//                                 <Button type="submit" sx={style.changeBtn} onClick={() => setShowFeild(false)}>
//                                     Update
//                                 </Button>
//                             </Grid>
//                         </Form>
//                     )}
//                 </Formik>

//                 <Box mt={2} display="flex" justifyContent="end">
//                     <Button variant="contained" color="primary" onClick={handleSubmitAllSpecifications}>
//                         Submit
//                     </Button>

//                 </Box>

//             </Box>
//         </MainCard>
//     );
// };

// export default SpecificationEditPage;

import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import '../../../../assets/style/style.css';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import CloseIcon from '@mui/icons-material/Close';
import { FormLabel, Box, Grid, MenuItem, Select, TextField, Button, IconButton, Tooltip, InputAdornment } from '@mui/material';
// FormControlLabel, Checkbox,
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import commonStyles from 'assets/style/Style';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { getSpecification, getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
import { getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
import { getCategory } from 'module/licensee/container/category/slice';
import SpecificationEditTabel from './specificationEditTabel.jsx';
import { getSpecificationById, getSingleSpec, updateSpecification } from 'module/licensee/container/specificationContainer/slice';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useFormikContext } from 'formik';

const SpecificationEditPage = () => {
  // const { resetForm } = useFormikContext();
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const [showFeild, setShowFeild] = useState(false);
  console.log(showFeild, 'feildssss');
  const [hasUpdated, setHasUpdated] = useState(false);
  console.log('==hasUpdated==', hasUpdated);
  // const specifications = useSelector((state) => state.licenseeReducer.specification.specificationData);
  const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
  const specificationByIdData = useSelector((state) => state.licenseeReducer.specification.specificationByIdData);
  console.log(specificationsSpec, '====specificationsSpec===');
  const [datalist, setDataList] = useState([specificationByIdData]);
  console.log(datalist, '===datalist==');
  const singleSpec = useSelector((state) => state.licenseeReducer.specification.singleSpec);
  console.log(singleSpec, '===singleSpec==');
  const [dispValues, setDispValues] = useState([]);
  const [controlType, setControlType] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [addData, setAddData] = useState(false);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
  const location = useLocation();
  const data = location.state?.data;
  console.log('==data==', data);
  const singleSpecData = location.state?.singleSpecData;
  const SpecificationsList = location.state?.SpecificationsList;
  const [singleSpecDataa, setSingleSpecDataa] = useState(singleSpecData);

  const [specItem, setSpecItem] = React.useState('');
  const [display, setDisplay] = useState([]);
  const navigate = useNavigate();
  const [displayValues, setDisplayValues] = useState(
    singleSpecData?.displayValues ? singleSpecData.displayValues.split(', ').map((value) => value.trim()) : []
  );

  console.log('===SpecificationsList===', SpecificationsList);
  console.log('==singleSpecDataa==', singleSpecDataa);

  let transformedSpecificationsList = [];
  if (SpecificationsList && Array.isArray(SpecificationsList)) {
    transformedSpecificationsList = SpecificationsList.map((specification) => {
      const displayValuesArray = specification.displayValues.split(', ');
      const transformedDisplayValues = displayValuesArray.map((value) => value);
      return {
        ...specification,
        displayValues: transformedDisplayValues
      };
    });
  }
  console.log('==transformedSpecificationsList==', transformedSpecificationsList);
  const backToSpecification = () => {
    navigate('/specification');
  };

  useEffect(() => {
    setSingleSpecDataa(singleSpecData);
  }, [singleSpecData]);

  useEffect(() => {
    if (!hasUpdated && specificationByIdData?.subCatgName !== undefined) {
      // alert("hello")
      setDataList([specificationByIdData]);
      setHasUpdated(true);
    }
  }, [specificationByIdData, hasUpdated]);

  useEffect(() => {
    dispatch(getSingleSpec(specificationByIdData?.specItem));
    if (data && data.id) {
      dispatch(getSpecificationById(data.id));
    }
    if (singleSpecData?.specificationItem) {
      setSpecItem(singleSpecData.specificationItem);
    }
    if (singleSpecData?.controlType) {
      setControlType(singleSpecData.controlType);
    }
    if (singleSpecData?.displayName) {
      setDisplayName(singleSpecData.displayName);
    }
  }, [dispatch, data, singleSpecData]);

  useEffect(() => {
    dispatch(getSpecification());
    dispatch(getSpecificationSpec());
    dispatch(getCategory());
    dispatch(getMainCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const initialValues = useMemo(
    () => ({
      mainCatgId: data?.mainCatgId || '',
      catgId: data?.catgId || '',
      subCatgId: data?.subCatgId || '',
      ctrnlType: '',
      dispValues: '',
      isActive: data?.isActive === true
    }),
    [data]
  );

  useEffect(() => {
    if (data?.subCatgId?.subCatgName) {
      setSelectedSubCategoryName(data.subCatgId.subCatgName);
    }
  }, [data]);

  console.log('==initialValues==', initialValues);

  const validationSchema = Yup.object({});

  const onSubmit = async (values) => {
    console.log('Submitted values:', values);
    if (addData) {
      let newSpecItem = values.specItem;
      const newSpecObject = {
        lblText: values.lblText,
        ctrnlType: values.ctrnlType,
        dispValues: dispValues,
        isDisplayed: true
      };
      console.log('++newSpecObject++', newSpecObject);
      console.log('++newSpecItem++', newSpecItem);

      setDataList((prevDataList) => {
        return prevDataList.map((item) => {
          console.log('==newItem', item);

          return {
            mainCatgId: item.mainCatgId.id,
            catgId: item.catgId.id,
            subCatgId: item.subCatgId.id,
            subCatgName: item.subCatgId.subCatgName,
            specItem: {
              ...(item.specItem || {}),
              [newSpecItem]: newSpecObject,
              ...Object.fromEntries(
                Object.entries(item.specItem || {}).map(([key, value]) => [
                  key,
                  {
                    ...value,
                    dispValues: value.dispValues.map((dispValue) => dispValue.value)
                  }
                ])
              )
            }
          };
        });
      });
      setAddData(false);
    }
    try {
      const newSpecObject = {
        subCategory: values.subCatgId.subCatgName,
        specificationItem: values.specItem || singleSpecData.specificationItem,

        displayName: values.lblText || singleSpecData.displayName,
        controlType: values.ctrnlType || singleSpecData.controlType,
        isActive: values.isActive,
        dispValues: singleSpecData.displayValues || displayValues.length > 0 ? displayValues : ''
      };

      console.log('==newSpecObject==', newSpecObject);
      const updatedSpecificationsList = [...transformedSpecificationsList];
      console.log('==updatedSpecificationsList==', updatedSpecificationsList);

      updatedSpecificationsList[singleSpecData?.itemIndex] = newSpecObject;
      const transformedList = updatedSpecificationsList.reduce((acc, item) => {
        console.log('==item==', item);
        const { subCategory, specificationItem, displayName, controlType, dispValues, displayValues } = item;
        console.log('==1==', dispValues);
        const subCatgId = values.subCatgId.id;
        const subCatgName = subCategory;
        const mainCatgId = values.mainCatgId.id;
        const catgId = values.catgId.id;

        if (!acc.specItem) {
          acc.specItem = {};
        }

        acc.specItem[specificationItem] = {
          lblText: displayName,
          ctrnlType: controlType,
          isDisplayed: true,
          dispValues: dispValues || displayValues
        };

        acc.subCatgId = subCatgId;
        acc.subCatgName = subCatgName;
        acc.mainCatgId = mainCatgId;
        acc.catgId = catgId;

        return acc;
      }, {});

      const finalList = [transformedList];

      console.log('==finalList==', finalList);

      setDataList(finalList);

      // resetForm();
      setDispValues([]);
      setSpecItem(null);
      setControlType(null);
      setDisplayName(null);
      // setDataList([specificationByIdData])
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddDispValue = (value, setFieldValue) => {
    if (value !== '') {
      const updatedDispValues = [...dispValues, value];
      console.log('==updatedDispValues=', updatedDispValues);
      setDispValues(updatedDispValues);
      setFieldValue('dispValues', '');
    }
  };

  const handleDispValuesDelete = (index) => {
    setDisplayValues((prevValues) => prevValues.filter((_, i) => i !== index));
  };

  const handleSubmitAllSpecifications = async () => {
    dispatch(updateSpecification({ id: specificationByIdData.id, data: datalist[0] }));
    backToSpecification();
  };

  const addNewSpecifications = () => {
    setShowFeild(true);
    setAddData(true);
  };

  useEffect(() => {
    setDisplay(singleSpecData?.displayValues ? singleSpecData.displayValues.split(', ').map((value) => value.trim()) : []);
  }, [singleSpecData?.displayValues]);

  useEffect(() => {
    setDisplayValues([...display, ...dispValues]);
  }, [dispValues, display]);

  return (
    <MainCard>
      <Box>
        <Grid container spacing={2} sx={style.modalBoxHeader}>
          <Grid item xs={11}>
            <h2>Edit Specification</h2>
          </Grid>

          <Grid item xs={1} sx={style.closeIconGrid} style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon sx={style.closeIcon} onClick={backToSpecification} />
          </Grid>
          <div
            style={{
              marginLeft: '16px',
              height: '2px',
              width: '100%',
              background: ' linear-gradient(to right, rgb(0, 0, 0) 198px, rgba(112, 112, 112, 0.18) 198px)'
            }}
          ></div>
        </Grid>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item sm={4}>
                  <FormLabel> Main Category</FormLabel>
                  <TextField
                    name="mainCatgId"
                    value={capitalizeFirstLetter(values.mainCatgId.grpCatgName)}
                    // onChange={(e) => setFieldValue('mainCatgId', e.target.value)}
                    fullWidth
                    style={{ marginTop: '10px' }}
                    disabled
                  />

                  <ErrorMessage name="mainCatgId" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid item sm={4}>
                  <FormLabel> Category</FormLabel>
                  <TextField
                    name="catgId"
                    value={capitalizeFirstLetter(values.catgId.catgName)}
                    // onChange={(e) => setFieldValue('catgId', e.target.value)}
                    fullWidth
                    style={{ marginTop: '10px' }}
                    disabled
                  />

                  <ErrorMessage name="catgId" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid item sm={4}>
                  <FormLabel> Sub Category</FormLabel>
                  <TextField
                    // name="subCatgId"
                    // id="subCatgId"
                    value={capitalizeFirstLetter(values.subCatgId.subCatgName)}
                    // onChange={(e) => {
                    //     setFieldValue('subCatgId', e.target.value);
                    //     setSelectedSubCategoryName(filteredSubCategories.find(item => item.id === e.target.value)?.subCatgName || '');
                    // }}
                    fullWidth
                    style={{ marginTop: '10px' }}
                    disabled
                  />

                  <ErrorMessage name="subCatgId" component="div" style={{ color: 'red' }} />
                </Grid>

                <Grid
                  item
                  sm={12}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e4e4' }}
                >
                  {selectedSubCategoryName && (
                    <h2 style={{ paddingBottom: '10px', textTransform: 'capitalize', fontWeight: '500' }}>{selectedSubCategoryName}</h2>
                  )}
                  <Button variant="contained" color="primary" onClick={addNewSpecifications} style={{ height: '35px' }}>
                    new
                  </Button>
                </Grid>
              </Grid>
              <Box mt={4}>
                <SpecificationEditTabel specifications={datalist} setShowFeild={setShowFeild} />
              </Box>

              <Grid container style={{ marginTop: '50px' }}>
                {showFeild && (
                  <>
                    <Grid container spacing={3}>
                      <Grid item sm={4}>
                        <FormLabel>Select Specification Item</FormLabel>
                        <Select
                          name="specItem"
                          id="specItem"
                          value={specItem}
                          onChange={(e) => {
                            setFieldValue('specItem', e.target.value);
                            setSpecItem(e.target.value);
                          }}
                          fullWidth
                          disabled={!values.subCatgId}
                          style={{ padding: '8px', marginTop: '10px' }}
                        >
                          <MenuItem value="" disabled>
                            Select Specification Item
                          </MenuItem>
                          {specificationsSpec.keys &&
                            Object.keys(specificationsSpec.keys).map((key) => (
                              <MenuItem key={key} value={specificationsSpec.keys[key]}>
                                {specificationsSpec.keys[key]}
                              </MenuItem>
                            ))}
                        </Select>
                        <ErrorMessage name="specItem" component="div" style={{ color: 'red' }} />
                      </Grid>

                      <Grid item sm={4}>
                        <FormLabel>Select Control Type</FormLabel>
                        <Select
                          name="ctrnlType"
                          id="ctrnlType"
                          value={controlType}
                          onChange={(e) => {
                            setFieldValue('ctrnlType', e.target.value);
                            setControlType(e.target.value);
                          }}
                          fullWidth
                          style={{ padding: '8px', marginTop: '10px' }}
                        >
                          <MenuItem value="" disabled>
                            Select Control
                          </MenuItem>
                          <MenuItem value="CBX">Combo Box</MenuItem>
                          <MenuItem value="TXT">Text Box</MenuItem>
                          <MenuItem value="TXTAR">Text Area</MenuItem>
                          <MenuItem value="CHKBX">Check Box</MenuItem>
                        </Select>
                        <ErrorMessage name="ctrnlType" component="div" style={{ color: 'red' }} />
                      </Grid>

                      <Grid item sm={4}>
                        <FormLabel>Display Name</FormLabel>

                        <TextField
                          name="lblText"
                          value={displayName}
                          onChange={(e) => {
                            setFieldValue('lblText', e.target.value);
                            setDisplayName(e.target.value);
                          }}
                          fullWidth
                          InputProps={{
                            style: { padding: '7px' }
                          }}
                          style={{ marginTop: '10px' }}
                        />
                        <ErrorMessage name="lblText" component="div" style={{ color: 'red' }} />
                      </Grid>

                      {controlType === 'CBX' && (
                        <Grid item sm={4}>
                          <FormLabel>Display Value</FormLabel>
                          <TextField
                            name="dispValues"
                            id="dispValues"
                            value={values.dispValues}
                            onChange={(e) => setFieldValue('dispValues', e.target.value)}
                            fullWidth
                            InputProps={{
                              style: { padding: '10px' },
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Tooltip title="Send Data">
                                    <IconButton type="button" onClick={() => handleAddDispValue(values.dispValues, setFieldValue)}>
                                      <SendIcon />
                                    </IconButton>
                                  </Tooltip>
                                </InputAdornment>
                              )
                            }}
                          />
                          <ErrorMessage name="dispValues" component="div" style={{ color: 'red' }} />
                        </Grid>
                      )}
                      {/* <Grid item xs={12} sm={4}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        sx={style.ChecboxColor}
                                                        name="isActive"
                                                        value="isActive"
                                                        checked={singleSpecData?.isActive === "Yes" ||false}
                                                        onChange={(event) => {
                                                            setSingleSpecDataa((prevData) => ({ ...prevData, isActive: event.target.checked ? "Yes" : "No" }));
                                                        }}
                                                    />
                                                }
                                                label="Is Display"
                                            />
                                        </Grid> */}
                    </Grid>
                    {controlType === 'CBX' && displayValues.length > 0 && (
                      <Box
                        sx={{
                          width: '31%',
                          maxHeight: '280px',
                          paddingTop: '12px',
                          boxShadow:
                            '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
                          borderRadius: '12px',
                          // position: 'absolute',
                          overflowY: 'auto',
                          zIndex: '1000'
                        }}
                      >
                        <ul style={{ margin: '0px' }}>
                          {displayValues.map((name, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                              {name}
                              <IconButton onClick={() => handleDispValuesDelete(index)} style={{ padding: '0px 10px 10px 0px' }}>
                                <DeleteIcon style={{ width: '20px' }} />
                              </IconButton>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </>
                )}
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="submit" sx={style.changeBtn} onClick={() => setShowFeild(false)}>
                  Update
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>

        <Box mt={2} display="flex" justifyContent="end">
          <Button variant="contained" color="primary" onClick={handleSubmitAllSpecifications}>
            Submit
          </Button>
        </Box>
      </Box>
    </MainCard>
  );
};

export default SpecificationEditPage;
