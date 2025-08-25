import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { FormLabel, Box, Grid, MenuItem, Select, TextField, Button, IconButton, Tooltip, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import commonStyles from 'assets/style/Style';
import '../../../../assets/style/style.css';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { getSpecification, getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
import { getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
import { getCategory } from 'module/licensee/container/category/slice';
import SpecificationTable from './SpecificationTable.jsx';
import { getSpecificationById } from 'module/licensee/container/specificationContainer/slice';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const SpecificationAdd = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainCategories = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData || []);
  const categories = useSelector((state) => state.licenseeReducer.category.categoryData || []);
  const subCategories = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData || []);
  const specifications = useSelector((state) => state.licenseeReducer.specification.specificationData.rows);
  // const specificationByIdData = useSelector((state) => state.licenseeReducer.specification.specificationByIdData);
  const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
  // const keys = Array.isArray(specificationsSpec?.keys) ? specificationsSpec.keys : [];

  console.log(specifications, '=specifications=');
  console.log(subCategories, '=subCategories=');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
  const [dispValues, setDispValues] = useState('');
  const [controlType, setControlType] = useState('');
  const [addedSpecifications, setAddedSpecifications] = useState([]);
  const [isSubCategoryExist, setIsSubCategoryExist] = useState(false);

  console.log('==addedSpecifications==', addedSpecifications);

  useEffect(() => {
    if (specifications && specifications.length > 0) {
      const exist = specifications.some((spec) => spec.subCatgName === selectedSubCategoryName);
      setIsSubCategoryExist(exist);
    }
  }, [specifications, selectedSubCategoryName]);

  if (isSubCategoryExist) {
    toast.warning('This subcategory exists, so use the edit option to make changes instead of adding it again.!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }
  const backToRateCard = () => {
    navigate('/specification');
  };

  useEffect(() => {
    if (data && data.id) {
      dispatch(getSpecificationById(data.id));
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(getSpecification());
    dispatch(getSpecificationSpec({}));
    dispatch(getCategory());
    dispatch(getMainCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const initialValues = {
    ctrnlType: '',
    specItem: '',
    isActive: true
  };

  console.log('===initialValues===', initialValues);

  const validationSchema = Yup.object({
    mainCatgId: Yup.string().required('Main Category is required'),
    catgId: Yup.string().required('Category is required'),
    subCatgId: Yup.string().required('Sub Category is required'),
    ctrnlType: Yup.string().required('Control Type is required'),
    lblText: Yup.string().required('Display Name is required')
  });

  const onSubmit = async (values, { resetForm }) => {
    const existingSpecItem = addedSpecifications.some((spec) => {
      return Object.keys(spec.specItem).includes(values.specItem);
    });

    if (existingSpecItem) {
      toast.warning('The spec item is already added.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      resetForm();
      setDispValues('');
      return;
    }
    try {
      const subCategoryName = filteredSubCategories.find((item) => item.id === values.subCatgId)?.subCatgName || '';

      const newSpecObject = {
        mainCatgId: values.mainCatgId,
        catgId: values.catgId,
        subCatgId: values.subCatgId,
        subCatgName: subCategoryName,
        specItem: {
          [values.specItem]: {
            lblText: values.lblText,
            ctrnlType: values.ctrnlType,
            isDisplayed: true,
            dispValues: dispValues || ''
            // dispValues: controlType === 'CHKBX' ? [true] : dispValues.length > 0 ? dispValues : ['']
          }
        }
      };
      // console.log("specItems====", specItems);
      console.log('newSpecObject====', newSpecObject);

      setAddedSpecifications((prevSpecs) => {
        const existingIndex = prevSpecs.findIndex(
          (spec) => spec.subCatgId === newSpecObject.subCatgId && spec.subCatgName === newSpecObject.subCatgName
        );
        console.log('==existingIndex==', existingIndex);
        console.log('==prevSpecs==', prevSpecs);
        if (existingIndex !== -1) {
          const updatedSpecs = [...prevSpecs];
          updatedSpecs[existingIndex].specItem[values.specItem] = {
            lblText: values.lblText,
            ctrnlType: values.ctrnlType,
            isDisplayed: true,
            dispValues: dispValues || ''
            // dispValues: controlType === 'CHKBX' ? [true] : dispValues.length > 0 ? dispValues : ['']
          };
          console.log(updatedSpecs, '==updatedSpecs==');
          return updatedSpecs;
        } else {
          return [...prevSpecs, newSpecObject];
        }
      });

      resetForm({
        values: {
          mainCatgId: values.mainCatgId,
          catgId: values.catgId,
          subCatgId: values.subCatgId,
          specItem: '',
          ctrnlType: '',
          lblText: '',
          isActive: true,
          dispValues: ''
        }
      });

      setDispValues('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  console.log('addedSpecifications=====-', addedSpecifications);

  const handleMainCategoryChange = (mainCatgId, setFieldValue) => {
    setFieldValue('mainCatgId', mainCatgId);
    const filtered = categories.rows.filter((category) => category.grpCatgId.id === mainCatgId);
    setFilteredCategories(filtered);
    setFieldValue('catgId', '');
    setFilteredSubCategories([]);
    setFieldValue('subCatgId', '');
    setSelectedSubCategoryName('');
  };

  const handleCategoryChange = (catgId, setFieldValue) => {
    setFieldValue('catgId', catgId);
    const filtered = subCategories.rows.filter((subCategory) => subCategory.catgId.id === catgId);
    setFilteredSubCategories(filtered);
    setFieldValue('subCatgId', '');
    setSelectedSubCategoryName('');
  };

  const handleSubCategoryChange = (subCatgId, setFieldValue) => {
    setFieldValue('subCatgId', subCatgId);
    const selectedSubCategory = subCategories.rows.find((subCategory) => subCategory.id === subCatgId);
    setSelectedSubCategoryName(selectedSubCategory ? selectedSubCategory.subCatgName : '');
  };

  const handleAddDispValue = (value, setFieldValue) => {
    if (value !== '') {
      const updatedDispValues = [...dispValues, value];
      setDispValues(updatedDispValues);
      setFieldValue('dispValues', '');
    }
  };

  const handleDispValuesDelete = (index) => {
    const updatedDispValues = dispValues.filter((_, i) => i !== index);
    setDispValues(updatedDispValues);
  };

  return (
    <MainCard>
      <Grid container spacing={2} sx={style.modalBoxHeader}>
        <Grid item xs={11}>
          <h2>Add Specification</h2>
        </Grid>

        <Grid item xs={1} sx={style.closeIconGrid} style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon sx={style.closeIcon} onClick={backToRateCard} />
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
            <Grid container spacing={2} style={{ marginTop: '15px' }}>
              <Grid item sm={4}>
                <FormLabel>
                  Select Main Category <span style={{ color: 'red' }}>*</span>
                </FormLabel>

                <Select
                  name="mainCatgId"
                  id="mainCatgId"
                  value={values.mainCatgId}
                  onChange={(e) => handleMainCategoryChange(e.target.value, setFieldValue)}
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select Main Category
                  </MenuItem>
                  {Array.isArray(mainCategories.rows) &&
                    mainCategories.rows.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {capitalizeFirstLetter(item.grpCatgName)}
                      </MenuItem>
                    ))}
                </Select>
                <ErrorMessage name="mainCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item sm={4}>
                <FormLabel>
                  Select Category <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="catgId"
                  id="catgId"
                  value={values.catgId}
                  onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                  fullWidth
                  disabled={!values.mainCatgId}
                  style={{ marginTop: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {Array.isArray(filteredCategories) &&
                    filteredCategories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {capitalizeFirstLetter(item.catgName)}
                      </MenuItem>
                    ))}
                </Select>
                <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item sm={4}>
                <FormLabel>
                  Select Sub Category <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="subCatgId"
                  id="subCatgId"
                  value={values.subCatgId}
                  onChange={(e) => handleSubCategoryChange(e.target.value, setFieldValue)}
                  fullWidth
                  disabled={!values.catgId}
                  style={{ marginTop: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select Sub Category
                  </MenuItem>
                  {Array.isArray(filteredSubCategories) &&
                    filteredSubCategories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {capitalizeFirstLetter(item.subCatgName)}
                      </MenuItem>
                    ))}
                </Select>
                <ErrorMessage name="subCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item sm={12}>
                {selectedSubCategoryName && (
                  <h3 style={{ borderBottom: '1px solid #e4e4e4', paddingBottom: '10px', fontWeight: '500' }}>
                    {capitalizeFirstLetter(selectedSubCategoryName)}
                  </h3>
                )}
              </Grid>
              <Grid item sm={4}>
                <FormLabel>
                  Select Specification Item <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="specItem"
                  id="specItem"
                  value={values.specItem}
                  onChange={(e) => setFieldValue('specItem', e.target.value)}
                  fullWidth
                  disabled={!values.subCatgId}
                  style={{ marginTop: '10px' }}
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
                <ErrorMessage name="specItem" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item sm={4}>
                <FormLabel>
                  Select Control Type <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="ctrnlType"
                  id="ctrnlType"
                  value={values.ctrnlType}
                  onChange={(e) => {
                    setFieldValue('ctrnlType', e.target.value);
                    setControlType(e.target.value);
                  }}
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  <MenuItem value="" disabled>
                    Select Control
                  </MenuItem>
                  <MenuItem value="CBX">Combo Box</MenuItem>
                  <MenuItem value="TXT">Text Box</MenuItem>
                  <MenuItem value="TXTAR">Text Area</MenuItem>
                  <MenuItem value="CHKBX">Check Box</MenuItem>
                </Select>
                <ErrorMessage name="ctrnlType" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item sm={4}>
                <FormLabel>
                  Display Name <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="lblText"
                  value={values.lblText}
                  onChange={(e) => setFieldValue('lblText', e.target.value)}
                  fullWidth
                  style={{ marginTop: '10px' }}
                />
                <ErrorMessage name="lblText" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>

              {controlType === 'CBX' && (
                <Grid item sm={4}>
                  <FormLabel>
                    Display Value <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
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
                  <ErrorMessage name="dispValues" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
                </Grid>
              )}

              {/* <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={style.ChecboxColor}
                        name="isActive"
                        value="isActive"
                        checked={values.isActive}
                        onChange={() => setFieldValue('isActive', !values.isActive)}
                      />
                    }
                    label="Is Display"
                  />
                </Grid> */}
            </Grid>

            {dispValues.length > 0 && (
              <Box
                sx={{
                  width: '23%',
                  maxHeight: '80px',
                  paddingTop: '12px',
                  boxShadow:
                    '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
                  borderRadius: '12px',
                  position: 'absolute',
                  overflowY: 'auto',
                  zIndex: '1000'
                }}
              >
                <ul style={{ margin: '0px' }}>
                  {dispValues.map((name, index) => (
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

            <Grid style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" sx={style.changeBtn}>
                Add
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>

      <Box mt={4}>
        <SpecificationTable specifications={addedSpecifications} />
      </Box>
    </MainCard>
  );
};

export default SpecificationAdd;

// import React, { useEffect, useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
// import MainCard from 'ui-component/cards/MainCard';
// import { capitalizeFirstLetter } from '../utilities/Capitallised';

// import {
//   FormLabel, FormControlLabel, Checkbox, Box, Grid, MenuItem, Select, TextField, Button, IconButton, Tooltip, InputAdornment
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useTheme } from '@mui/material/styles';
// import commonStyles from 'assets/style/Style';
// import '../../../../assets/style/style.css'
// import { useNavigate } from 'react-router-dom';
// import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
// import { getSpecification, getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
// import { getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
// import { getCategory } from 'module/licensee/container/category/slice';
// import SpecificationTable from './SpecificationTable.jsx';
// import { addSpecification, getSpecificationById } from 'module/licensee/container/specificationContainer/slice';
// // import { loginUserFail } from 'container/LoginContainer/slice';
// // import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SpecificationAdd = ({ formtype, data }) => {

//   console.log("===datasspec===", data);
//   const theme = useTheme();
//   const style = commonStyles(theme);

//   const dispatch = useDispatch();

//   const mainCategories = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData || []);
//   const categories = useSelector((state) => state.licenseeReducer.category.categoryData || []);
//   const subCategories = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData || []);
//   const specifications = useSelector((state) => state.licenseeReducer.specification.specificationData);
//   // const specificationByIdData = useSelector((state) => state.licenseeReducer.specification.specificationByIdData);
//   const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
//   // const keys = Array.isArray(specificationsSpec?.keys) ? specificationsSpec.keys : [];

//   console.log(specifications, 'specifications');
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//   const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');
//   const navigate = useNavigate();
//   const [dispValues, setDispValues] = useState([]);
//   const [controlType, setControlType] = useState('');
//   const [addedSpecifications, setAddedSpecifications] = useState([]);
//   console.log("editdispValues==", dispValues);
//   useEffect(() => {
//     if (data && data.id) {
//       dispatch(getSpecificationById(data.id));
//     }
//   }, [dispatch, data]);

//   useEffect(() => {
//     dispatch(getSpecification());
//     dispatch(getSpecificationSpec({}));
//     dispatch(getCategory());
//     dispatch(getMainCategory());
//     dispatch(getSubCategory());
//   }, [dispatch]);

//   const backToSpecification = () => {
//     navigate('/specification');
//   };

//   const initialValues = {
//     mainCatgId: formtype === 'editform' ? specificationByIdData?.mainCatgId || '' : '',
//     catgId: formtype === 'editform' ? specificationByIdData?.catgId || '' : '',
//     subCatgId: formtype === 'editform' ? specificationByIdData?.subCatgId || '' : '',
//     dispValues: formtype === 'editform' ? specificationByIdData?.dispValues || '' : '',
//     // ctrnlType: formtype === 'editform' ? specificationByIdData?.ctrnlType || '' : '',
//     lblText: formtype === 'editform' ? specificationByIdData?.lblText || '' : '',
//     isActive: true,

//   };

//   console.log("===initialValues===", initialValues);

//   const validationSchema = Yup.object({
//     mainCatgId: Yup.string().required('Main Category is required'),
//     catgId: Yup.string().required('Category is required'),
//     subCatgId: Yup.string().required('Sub Category is required'),
//     ctrnlType: Yup.string().required('Control Type is required'),
//     lblText: Yup.string().required('Display Name is required')
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     console.log("===values====", values);
//     try {
//       const subCategoryName = filteredSubCategories.find(item => item.id === values.subCatgId)?.subCatgName || '';

//       const newSpecObject = {
//         mainCatgId: values.mainCatgId,
//         catgId: values.catgId,
//         subCatgId: values.subCatgId,
//         subCatgName: subCategoryName,
//         specItem: {
//           [values.specItem]: {
//             lblText: values.lblText,
//             ctrnlType: values.ctrnlType,
//             isDisplayed: values.isActive,
//             // dispValues: dispValues.length > 0 ? dispValues : ['']
//             dispValues: controlType === 'CHKBX' ? [true] : dispValues.length > 0 ? dispValues : ['']
//           }
//         }
//       }
//       // console.log("specItems====", specItems);
//       console.log("newSpecObject====", newSpecObject);

//       setAddedSpecifications(prevSpecs => {
//         const existingIndex = prevSpecs.findIndex(
//           spec => spec.subCatgId === newSpecObject.subCatgId && spec.subCatgName === newSpecObject.subCatgName
//         );
//         console.log("==existingIndex==", existingIndex);
//         console.log("==prevSpecs==", prevSpecs);
//         if (existingIndex !== -1) {
//           const updatedSpecs = [...prevSpecs];
//           updatedSpecs[existingIndex].specItem[values.specItem] = {
//             lblText: values.lblText,
//             ctrnlType: values.ctrnlType,
//             isDisplayed: values.isActive,
//             dispValues: controlType === 'CHKBX' ? [true] : dispValues.length > 0 ? dispValues : ['']
//           };
//           console.log(updatedSpecs, "==updatedSpecs==");
//           return updatedSpecs;
//         } else {
//           return [...prevSpecs, newSpecObject];
//         }
//       });

//       resetForm({
//         values: {
//           mainCatgId: values.mainCatgId,
//           catgId: values.catgId,
//           subCatgId: values.subCatgId,
//           specItem: '',
//           // ctrnlType: '',
//           // lblText: '',
//           isActive: true,
//           dispValues: []
//         }
//       });

//       setDispValues([]);

//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   console.log("addedSpecifications=====-", addedSpecifications);

//   const handleMainCategoryChange = (mainCatgId, setFieldValue) => {
//     setFieldValue('mainCatgId', mainCatgId);
//     const filtered = categories.rows.filter((category) => category.grpCatgId.id === mainCatgId);
//     setFilteredCategories(filtered);
//     setFieldValue('catgId', '');
//     setFilteredSubCategories([]);
//     setFieldValue('subCatgId', '');
//     setSelectedSubCategoryName('');
//   };

//   const handleCategoryChange = (catgId, setFieldValue) => {
//     setFieldValue('catgId', catgId);
//     const filtered = subCategories.rows.filter((subCategory) => subCategory.catgId.id === catgId);
//     setFilteredSubCategories(filtered);
//     setFieldValue('subCatgId', '');
//     setSelectedSubCategoryName('');
//   };

//   const handleSubCategoryChange = (subCatgId, setFieldValue) => {
//     setFieldValue('subCatgId', subCatgId);
//     const selectedSubCategory = subCategories.rows.find((subCategory) => subCategory.id === subCatgId);
//     setSelectedSubCategoryName(selectedSubCategory ? selectedSubCategory.subCatgName : '');
//   };

//   const handleAddDispValue = (value, setFieldValue) => {
//     if (value !== '') {
//       const updatedDispValues = [...dispValues, value];
//       setDispValues(updatedDispValues);
//       setFieldValue('dispValues', '');
//     }
//   };

//   const handleDispValuesDelete = (index) => {
//     const updatedDispValues = dispValues.filter((_, i) => i !== index);
//     setDispValues(updatedDispValues);
//   };

//   const handleSubmitAllSpecifications = async () => {
//     try {

//       await Promise.all(addedSpecifications.map(spec => dispatch(addSpecification(spec))));

//       setAddedSpecifications([]);
//       console.log('All specifications submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting all specifications:', error);
//     }
//     backToSpecification();
//   };

//   console.log("addedSpecifications=====", addedSpecifications);

//   return (
//     <MainCard>
//       <Box>
//         <h1>Add</h1>
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
//           {({ values, setFieldValue }) => (
//             <Form>
//               <Grid container spacing={2}>
//                 <Grid item sm={4}>
//                   <FormLabel>Select Main Category</FormLabel>

//                   <Select
//                     name="mainCatgId"
//                     id="mainCatgId"
//                     value={values.mainCatgId}
//                     onChange={(e) => handleMainCategoryChange(e.target.value, setFieldValue)}
//                     fullWidth
//                     style={{ padding: '8px', marginTop: '10px' }}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Main Category
//                     </MenuItem>
//                     {Array.isArray(mainCategories.rows) && mainCategories.rows.map((item) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {capitalizeFirstLetter(item.grpCatgName)}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <ErrorMessage name="mainCatgId" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item sm={4}>
//                   <FormLabel>Select Category</FormLabel>
//                   <Select
//                     name="catgId"
//                     id="catgId"
//                     value={values.catgId}
//                     onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
//                     fullWidth
//                     disabled={!values.mainCatgId}
//                     style={{ padding: '8px', marginTop: '10px' }}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Category
//                     </MenuItem>
//                     {Array.isArray(filteredCategories) && filteredCategories.map((item) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {capitalizeFirstLetter(item.catgName)}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <ErrorMessage name="catgId" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item sm={4}>
//                   <FormLabel>Select Sub Category</FormLabel>
//                   <Select
//                     name="subCatgId"
//                     id="subCatgId"
//                     value={values.subCatgId}
//                     onChange={(e) => handleSubCategoryChange(e.target.value, setFieldValue)}
//                     fullWidth
//                     disabled={!values.catgId}
//                     style={{ padding: '8px', marginTop: '10px' }}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Sub Category
//                     </MenuItem>
//                     {Array.isArray(filteredSubCategories) && filteredSubCategories.map((item) => (
//                       <MenuItem key={item.id} value={item.id}>
//                         {capitalizeFirstLetter(item.subCatgName)}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <ErrorMessage name="subCatgId" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item sm={12}>
//                   {selectedSubCategoryName && (
//                     <h2 style={{ borderBottom: '1px solid #e4e4e4', paddingBottom: '10px', textTransform: 'capitalize', fontWeight: '500' }}>{selectedSubCategoryName}</h2>
//                   )}
//                 </Grid>
//                 <Grid item sm={4}>
//                   <FormLabel>Select Specification Item</FormLabel>
//                   <Select
//                     name="specItem"
//                     id="specItem"
//                     value={values.specItem}
//                     onChange={(e) => setFieldValue('specItem', e.target.value)}
//                     fullWidth
//                     disabled={!values.subCatgId}
//                     style={{ padding: '8px', marginTop: '10px' }}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Specification Item
//                     </MenuItem>

//                     {specificationsSpec.keys && Object.keys(specificationsSpec.keys).map((key) => (
//                       <MenuItem key={key} value={specificationsSpec.keys[key]}>
//                         {specificationsSpec.keys[key]}
//                       </MenuItem>
//                     ))}

//                   </Select>
//                   <ErrorMessage name="specItem" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item sm={4}>
//                   <FormLabel>Select Control Type</FormLabel>
//                   <Select
//                     name="ctrnlType"
//                     id="ctrnlType"
//                     value={values.ctrnlType}
//                     onChange={(e) => {
//                       setFieldValue('ctrnlType', e.target.value);
//                       setControlType(e.target.value);
//                     }}
//                     fullWidth
//                     style={{ padding: '8px', marginTop: '10px' }}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Control
//                     </MenuItem>
//                     <MenuItem value="CBX">Combo Box</MenuItem>
//                     <MenuItem value="TXT">Text Box</MenuItem>
//                     <MenuItem value="TXTAR">Text Area</MenuItem>
//                     <MenuItem value="CHKBX">Check Box</MenuItem>
//                   </Select>
//                   <ErrorMessage name="ctrnlType" component="div" style={{ color: 'red' }} />
//                 </Grid>
//                 <Grid item sm={4}>
//                   <FormLabel>Display Name</FormLabel>
//                   <TextField
//                     name="lblText"
//                     value={values.lblText}
//                     onChange={(e) => setFieldValue('lblText', e.target.value)}
//                     fullWidth
//                     InputProps={{
//                       style: { padding: '7px' }
//                     }}
//                     style={{ marginTop: '10px', }}
//                   />
//                   <ErrorMessage name="lblText" component="div" style={{ color: 'red' }} />
//                 </Grid>

//                 {controlType === "CBX" && (
//                   <Grid item sm={4}>
//                     <FormLabel>Display Value</FormLabel>
//                     <TextField
//                       name="dispValues"
//                       id="dispValues"
//                       value={values.dispValues}
//                       onChange={(e) => setFieldValue('dispValues', e.target.value)}

//                       fullWidth
//                       InputProps={{
//                         style: { padding: '10px' },
//                         endAdornment: (
//                           <InputAdornment position="start">
//                             <Tooltip title="Send Data">
//                               <IconButton type="button" onClick={() => handleAddDispValue(values.dispValues, setFieldValue)}>
//                                 <SendIcon />
//                               </IconButton>
//                             </Tooltip>
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                     <ErrorMessage name="dispValues" component="div" style={{ color: 'red' }} />
//                   </Grid>
//                 )}

//                 <Grid item xs={12} sm={4}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         sx={style.ChecboxColor}
//                         name="isActive"
//                         value="isActive"
//                         checked={values.isActive}
//                         onChange={() => setFieldValue('isActive', !values.isActive)}
//                       />
//                     }
//                     label="Is Display"
//                   />
//                 </Grid>
//               </Grid>

//               {dispValues.length > 0 && (
//                 <Box
//                   sx={{
//                     width: '23%',
//                     maxHeight: '80px',
//                     paddingTop: '12px',
//                     boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
//                     borderRadius: '12px',
//                     position: 'absolute',
//                     overflowY: 'auto',
//                     zIndex: '1000'
//                   }}
//                 >
//                   <ul style={{ margin: '0px' }}>
//                     {dispValues.map((name, index) => (
//                       <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
//                         {name}
//                         <IconButton onClick={() => handleDispValuesDelete(index)} style={{ padding: '0px 10px 10px 0px' }}>
//                           <DeleteIcon style={{ width: '20px' }} />
//                         </IconButton>
//                       </li>
//                     ))}
//                   </ul>
//                 </Box>
//               )}

//               <Grid style={{ display: 'flex', justifyContent: 'end' }}>
//                 <Button type="submit" sx={style.changeBtn}>
//                   Add
//                 </Button>
//               </Grid>
//             </Form>
//           )}
//         </Formik>

//         {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
//         <Box mt={4}>
//           <SpecificationTable specifications={addedSpecifications} />
//         </Box>
//         <Box mt={2} display="flex" justifyContent="end">
//           <Button variant="contained" color="primary" onClick={handleSubmitAllSpecifications}>
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </MainCard>
//   );
// };

// export default SpecificationAdd;
