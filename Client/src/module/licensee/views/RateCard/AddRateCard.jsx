// // rate card code without integrated ratecardsetup

// import { Button, FormLabel, Grid, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
// import { Box } from '@mui/system';
// import React from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import styles from './style';
// import { useTheme } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
// import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchCategoryByFilter,
//   getSubFilterCategory,
//   getSpecificationFiltered,
//   addRateCard
// } from 'module/licensee/container/RateCardContainer/slice';
// import { ErrorMessage, Form, Formik } from 'formik';
// import { capitalizeFirstLetter } from '../utilities/Capitallised';
// import Textfield from 'ui-component/common/TextField';
// import { getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
// import { useState } from 'react';
// import { Delete } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import { fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
// import DataTable from 'react-data-table-component';
// import { toast } from 'react-toastify';
// const AddRateCard = ({ whichOpen }) => {
//   const theme = useTheme();
//   const style = styles(theme);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const formikRef = React.useRef(null);
//   const [rateCardEntries, setRateCardEntries] = useState([]);
//   const [selectedSubCategory, setCatgValue] = useState([]);
//   const [selectedMainCatag, setMainCatagValue] = useState([]);
//   const [selectedCatag, setCatagValue] = useState([]);
//   const [selectSubCatagValue, setSubCatagValue] = useState([]);

//   console.log("==rateCardEntries", rateCardEntries);

//   const backToRateCard = () => {
//     navigate('/rate_card');
//   };
//   const customStyles = {
//     table: {
//       style: {
//         border: '1px solid #ccc'
//       }
//     },
//     headRow: {
//       style: {
//         fontWeight: '900',
//         fontSize: '14px',
//         backgroundColor: '#f5f5f5'
//       }
//     },
//     rows: {
//       style: {
//         borderBottom: '1px solid #ccc'
//       }
//     }
//   };

//   useEffect(() => {
//     dispatch(getMainCategory());
//     dispatch(getSpecificationSpec());
//   }, []);
//   useEffect(() => {
//     if (selectedSubCategory) {
//       dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory }));
//     }
//   }, [dispatch, selectedSubCategory]);

//   const mainCategory = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
//   const getCategoryData = useSelector((state) => state.licenseeReducer.RateCard.CategoryDatas);
//   const getSubCategoryData = useSelector((state) => state.licenseeReducer.RateCard.subCategoryFilterData);
//   const specifications = useSelector((state) => state.licenseeReducer.RateCard.specificationDataFilterd);
//   const hasRows = specifications && specifications.rows && specifications.rows.length > 0;
//   const specItem = hasRows ? specifications.rows[0].specItem : {};

//   const [selectedSpecification, setSelectedSpecification] = useState('');
//   const [selectCkeckboxValue, setckeCkboxValue] = useState([]);
// console.log("==selectedSpecification==", selectedSpecification);

//   const initialValues = {
//     mainCatgId: '',
//     catgId: '',
//     subCatgId: '',
//     spcfctnId: '',
//     dispValue: '',
//     currency: 'INR',
//     rate: ''
//   };

//   const handleSpecificationChange = (e,setFieldValue) => {
//     const selectedSpec = e.target.value;
//     setSelectedSpecification(selectedSpec);
//     const ckeckboxx = selectedSpec && specItem[selectedSpec]?.ctrnlType;
//     setckeCkboxValue(ckeckboxx);
//     const disp = specItem[selectedSpec]?.dispValues;
//     if (ckeckboxx === 'CHKBX') {
//       setFieldValue('dispValue',disp );
//     }
//   };

//   const handleAddEntry = (values) => {
//     if (selectedMainCatag && selectedCatag && selectSubCatagValue && selectedSpecification  && values.rate) {
//       const newEntry = {
//         mainCatgId: selectedMainCatag,
//         catgId: selectedCatag,
//         subCatgId: selectSubCatagValue,
//         spcfctnId: specifications.rows[0].id,
//         item: selectedSpecification,
//         dispValue: values.dispValue,
//         currency: 'INR',
//         rate: values.rate
//       };
//       setRateCardEntries([...rateCardEntries, newEntry]);
//       formikRef.current.resetForm();
//     } else {
//       toast.error('Please fill out all required fields.');
//     }
//   };

//   const handleFinalSubmit = () => {
//     dispatch(addRateCard({ rateCardEntries }));
//     backToRateCard();
//   };

//   const columns = [
//     {
//       name: 'ITEM',
//       selector: (row) => capitalizeFirstLetter(row.item)
//     },
//     {
//       name: 'VALUE',
//       selector: (row) => {
//         return (row.dispValue.value ).toString()
//       }
//     },
//     {
//       name: 'RATE',
//       selector: (row) => row.rate
//     },
//     {
//       name: 'ACTION',
//       cell: (row) => (
//         <div>
//           <IconButton onClick={() => handleDeleteEntry(row)}>
//             <Delete className="actn-icon3" />
//           </IconButton>
//         </div>
//       )
//     }
//   ];
//   const handleDeleteEntry = (row) => {
//     console.log("==row",row);
//     const updatedEntries = rateCardEntries.filter((entry) => entry !== row);
//     setRateCardEntries(updatedEntries);
//     console.log("updatedEntries",updatedEntries);
//   };

//   return (
//     <div>
//       <MainCard>
//         {whichOpen !== 'editform' ? (
//           <>
//             <Grid container spacing={2} sx={style.modalBoxHeader}>
//               <Grid item xs={11}>
//                 <Box sx={style.modalHeadContent}>Add Rate Card</Box>
//               </Grid>

//               <Grid item xs={1} sx={style.closeIconGrid}>
//                 <CloseIcon sx={style.closeIcon} onClick={backToRateCard} />
//               </Grid>
//               <Box sx={style.headerUnderLine}></Box>
//             </Grid>
//           </>
//         ) : (
//           <></>
//         )}
//         <Box sx={style.formBox}>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={(values, { resetForm }) => {
//               console.log("===values==", values);
//               handleAddEntry(values);
//               resetForm();
//             }}
//             enableReinitialize={true}
//             innerRef={formikRef}
//           >
//             {({ setFieldValue, values }) => (
//               <Form>
//                 <Box sx={{ paddingBottom: '10px' }}>
//                   <Grid container spacing={2} sx={{ marginTop: '10px' }}>
//                     <Grid item md={4} xs={12}>
//                       <FormLabel>
//                         Main Category <span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="mainCatgId"
//                         id="mainCatgId"
//                         placeholder="Select Main Category"
//                         defaultValue={selectedMainCatag}
//                         onChange={(e) => {
//                           setFieldValue('mainCatgId', e.target.value.id);
//                           dispatch(fetchCategoryByFilter(e.target.value.id));
//                           setMainCatagValue(e.target.value.id);
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
//                         <MenuItem value="" disabled>
//                           Select Main Category
//                         </MenuItem>
//                         {mainCategory?.rows?.map((mode) => (
//                           <MenuItem key={mode.value} value={mode}>
//                            {capitalizeFirstLetter(mode.grpCatgName)}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <ErrorMessage name="mainCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>

//                     <Grid item md={4} xs={12}>
//                       <FormLabel>
//                         Category <span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="catgId"
//                         id="catgId"
//                         placeholder="Select Category"
//                         defaultValue={selectedCatag}
//                         onChange={(e) => {
//                           setFieldValue('catgId', e.target.value.id);
//                           dispatch(getSubFilterCategory(e.target.value.id));
//                           setCatagValue(e.target.value.id);
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
//                         <MenuItem value="" disabled>
//                           Select Category
//                         </MenuItem>
//                         {getCategoryData?.map((mode) => (
//                           <MenuItem key={mode.value} value={mode}>
//                             {capitalizeFirstLetter(mode.catgName)}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     <Grid item md={4} xs={12}>
//                       <FormLabel>
//                         Sub Category <span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="subCatgId"
//                         id="subCatgId"
//                         placeholder="Select Sub Category"
//                         defaultValue={selectSubCatagValue}
//                         onChange={(e) => {
//                           setFieldValue('subCatgId', e.target.value.id);
//                           setCatgValue(e.target.value.subCatgName);
//                           dispatch(getSpecificationFiltered(e.target.value.id));
//                           setSubCatagValue(e.target.value.id);
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
//                         <MenuItem value="" disabled>
//                           Select Sub Category
//                         </MenuItem>
//                         {getSubCategoryData?.map((mode) => (
//                           <MenuItem key={mode.value} value={mode}>
//                            {capitalizeFirstLetter(mode.subCatgName)}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       <ErrorMessage name="subCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     <Grid item xs={12} spacing={2}>
//                       <Grid item xs={12}>
//                         <Typography   style={{ marginBottom: '0px' ,fontSize:'20px',fontWeight:600}}>{selectedSubCategory ? capitalizeFirstLetter(selectedSubCategory) : ''}</Typography>
//                         <Typography sx={{fontWeight:600}}>Specification</Typography>
//                       </Grid>
//                       <Grid sx={{ display: 'flex', flexWrap: 'wrap' }} spacing={2}>
//                       </Grid>
//                     </Grid>
//                     <Grid item md={3} xs={12}>
//                       <FormLabel>
//                         Item <span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Select
//                         name="spcfctnId"
//                         id="spcfctnId"
//                         placeholder="Select Specification"
//                         defaultValue={values.spcfctnId}
//                         onChange={(e) => handleSpecificationChange(e, setFieldValue)}
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
//                         <MenuItem value="" disabled>
//                           Select Item
//                         </MenuItem>
//                          {Object.keys(specItem).map((key) =>
//                           key !== 'remarks' ? (
//                             <MenuItem key={key} value={key}>
//                               {capitalizeFirstLetter(key)}
//                             </MenuItem>
//                           ) : null
//                         )}
//                       </Select>
//                       <ErrorMessage name="spcfctnId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     {selectCkeckboxValue != 'CHKBX' ? (
//                       <>
//                         <Grid item md={3} xs={12}>
//                           <FormLabel>
//                             Display Value <span style={{ color: 'red' }}>*</span>
//                           </FormLabel>
//                           <Select
//                             name="dispValue"
//                             id="dispValue"
//                             placeholder="Select Display Value"
//                             defaultValue={values.spcfctnId}
//                             onChange={(e) => {
//                               console.log("==e", e);
//                               setFieldValue('dispValue', e.target.value);
//                             }}
//                             variant="outlined"
//                             fullWidth
//                             style={{
//                               height: '49px',
//                               width: '100%',
//                               border: 'none',
//                               backgroundColor: 'white',
//                               marginTop: '10px'
//                             }}
//                             displayEmpty
//                           >
//                             <MenuItem value="" disabled>
//                               Select Value
//                             </MenuItem>
//                             {selectedSpecification &&
//                               specItem[selectedSpecification]?.dispValues?.map((dispValue, index) => (

//                                 <MenuItem key={index} value={dispValue}>
//                                   {dispValue.value}
//                                 </MenuItem>
// ))}
//                           </Select>
//                           <ErrorMessage name="dispValue" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                         </Grid>
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                     <Grid item md={3}>
//                       <FormLabel>
//                         Rate <span style={{ color: 'red' }}>*</span>
//                       </FormLabel>
//                       <Textfield
//                         name="rate"
//                         onKeyPress={(e) => {
//                           if (!/^[0-9.\b]+$/.test(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
//                             e.preventDefault();
//                           }
//                         }}
//                         id="rate"
//                         placeholder="Rate"
//                         component={Textfield}
//                         InputProps={{
//                           startAdornment: <InputAdornment position="end">INR</InputAdornment>
//                         }}
//                       />
//                       <ErrorMessage name="rate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                     </Grid>
//                     </Grid>
//                     <Grid item md={3} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '20px' }}>
//                       <Box>
//                         <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
//                           ADD
//                         </Button>
//                       </Box>
//                     </Grid>

//                     <Box sx={{ overflowX: 'auto', width: '100%' ,marginTop:'10px'}}>
//                     <Grid item sx={{ mt: 2 }} md={12}>

//                       <DataTable
//                         columns={columns}
//                         data={rateCardEntries}
//                         pagination
//                         highlightOnHover
//                         pointerOnHover
//                         customStyles={customStyles}
//                         responsive
//                       />

//                     </Grid>
//                     </Box>
//                     <Grid container sm={12}>
//                       <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
//                         <Box>
//                           <Button onClick={handleFinalSubmit} color="info" variant="contained" sx={style.addBtnHead}>
//                             Submit
//                           </Button>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                 </Box>
//               </Form>
//             )}
//           </Formik>
//         </Box>
//       </MainCard>
//     </div>
//   );
// };

// export default AddRateCard;

import { Button, FormLabel, Grid, InputAdornment, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import styles from './style';
import '../../../../assets/style/style.css';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategoryByFilter,
  getSubFilterCategory,
  getSpecificationFiltered,
  addRateCard
} from 'module/licensee/container/RateCardContainer/slice';
import { ErrorMessage, Form, Formik } from 'formik';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import Textfield from 'ui-component/common/TextField';
import { getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
import DataTable from 'react-data-table-component';
import { getRateCardSetup } from 'module/licensee/container/RateCardSetupContainer/slice';

const AddRateCard = () => {
  const theme = useTheme();
  const style = styles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = React.useRef(null);
  // const [rateCardEntries, setRateCardEntries] = useState([]);
  const [selectedSubCategory, setCatgValue] = useState([]);
  const [selectedMainCatag, setMainCatagValue] = useState([]);
  const [selectedCatag, setCatagValue] = useState([]);
  const [selectSubCatagValue, setSubCatagValue] = useState([]);
  const RateCardSetupDetails = useSelector((state) => state.licenseeReducer.RateCardSetup.RateCardSetupData.rows);
  const [combinationSpecItems, setCombinationSpecItems] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [individualSpecItems, setIndividualSpecItems] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [rateValue, setRateValue] = useState('');
  const [indRateValue, setIndRateValue] = useState('');
  const [combinationData, setCombinationData] = useState([]);
  const [individualData, setIndividualData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [displayValues, setDisplayValues] = useState([]);
  const [rateCardData, setRateCardData] = useState([]);
  const [selectedIndData, setSelectedIndData] = useState({});
  // const [displayValues, setDisplayValues] = useState([]);
  console.log('==combinationSpecItems', combinationSpecItems);

  const handleItemChange = (event) => {
    const selectedItemValue = event.target.value;
    setSelectedItem(selectedItemValue);
    setTabValue(1);
    const displayValuesForSelectedItem = specItem[selectedItemValue] && specItem[selectedItemValue].dispValues;
    if (displayValuesForSelectedItem) {
      setDisplayValues(displayValuesForSelectedItem);
    } else {
      setDisplayValues([]);
    }
    setSelectedIndData((prevData) => ({ ...prevData, item: selectedItemValue }));
  };
  // const handleItemChange = (event) => {
  //   const selectedItemValue = event.target.value;
  //   setSelectedItem(selectedItemValue);
  //   setTabValue(1);
  //   const displayValuesForSelectedItem = specItem[selectedItemValue] && specItem[selectedItemValue].dispValues;
  //   setDisplayValues(displayValuesForSelectedItem);
  //   setSelectedIndData((prevData) => ({ ...prevData, item: selectedItemValue }));
  // };

  const handleDisplayValueChange = (event) => {
    const selectedDisplayValue = [event.target.value._id, event.target.value.value];
    console.log('==selectedDisplayValue==', selectedDisplayValue);
    setSelectedIndData({ ...selectedIndData, displayValue: selectedDisplayValue });
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const backToRateCard = () => {
    navigate('/rate_card');
  };
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

  console.log('==combinationData', combinationData);
  console.log('==individualData', individualData);
  console.log('==rateCardData', rateCardData);
  useEffect(() => {
    setRateCardData([...individualData, ...combinationData]);
  }, [individualData, combinationData]);
  const matchedItem =
    RateCardSetupDetails &&
    Array.isArray(RateCardSetupDetails) &&
    RateCardSetupDetails.find((item) => item.subCatgId && item.subCatgId.id === selectSubCatagValue);
  console.log('==matchedItem', matchedItem);

  useEffect(() => {
    if (matchedItem) {
      const dispSpecItems = matchedItem.dispSpecItems;
      const combinationItems = dispSpecItems.filter((item) => item.combType === 'COMB');
      const individualItems = dispSpecItems.filter((item) => item.combType === 'INDV');

      setCombinationSpecItems(combinationItems);
      setIndividualSpecItems(individualItems);
    }
  }, [matchedItem]);

  useEffect(() => {
    dispatch(getRateCardSetup());
    dispatch(getMainCategory());
    dispatch(getSpecificationSpec());
  }, []);
  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(fetchSingleSpecification({ searchVal: selectedSubCategory }));
    }
  }, [dispatch, selectedSubCategory]);

  const mainCategory = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
  const getCategoryData = useSelector((state) => state.licenseeReducer.RateCard.CategoryDatas);
  const getSubCategoryData = useSelector((state) => state.licenseeReducer.RateCard.subCategoryFilterData);
  const specifications = useSelector((state) => state.licenseeReducer.RateCard.specificationDataFilterd);
  const hasRows = specifications && specifications.rows && specifications.rows.length > 0;
  const specItem = hasRows ? specifications.rows[0].specItem : {};

  console.log('==specItem==', specItem);

  const initialValues = {
    mainCatgId: '',
    catgId: '',
    subCatgId: '',
    spcfctnId: '',
    dispValue: '',
    currency: 'INR',
    rate: ''
  };

  const validationSchema = Yup.object({
    mainCatgId: Yup.string().required('Main Category is required'),
    catgId: Yup.string().required('Category is required'),
    subCatgId: Yup.string().required('Sub Category is required')
  });

  const handleFinalSubmit = () => {
    dispatch(addRateCard({ rateCardData }));
    backToRateCard();
  };

  const handleCombValues = () => {
    const values = formikRef.current.values;
    console.log('==refvalues', values);
    const combinationValues = {
      mainCatgId: values.mainCatgId,
      catgId: values.catgId,
      subCatgId: values.subCatgId,
      combType: 'COMB',
      rateCardSetupId: matchedItem.id,
      item: Object.keys(selectedData).filter((key) => key !== 'rate'),
      dispValue: Object.keys(selectedData)
        .filter((key) => key !== 'rate')
        .map((key) => selectedData[key]._id),
      dispValues: Object.keys(selectedData)
        .filter((key) => key !== 'rate')
        .map((key) => selectedData[key].value),
      rate: selectedData.rate
    };
    console.log('==combinationValues', combinationValues.dispValue);
    setCombinationData([...combinationData, combinationValues]);
  };
  const handleIndValues = () => {
    const values = formikRef.current.values;
    const individualValues = {
      mainCatgId: values.mainCatgId,
      catgId: values.catgId,
      subCatgId: values.subCatgId,
      combType: 'INDV',
      rateCardSetupId: matchedItem.id,
      item: [selectedIndData.item],
      dispValue: [selectedIndData.displayValue[0]],
      dispValues: [selectedIndData.displayValue[1]],
      rate: selectedIndData.rate
    };
    console.log('==individualValues', individualValues);
    setIndividualData([...individualData, individualValues]);
  };

  console.log('==selectedData', selectedData);

  const columnsCombination = [
    {
      name: 'ITEM',
      selector: (row) => row.item.join(', ')
    },
    {
      name: 'DISPLAY VALUES',
      selector: (row) => row.dispValues.join(', ')
    },

    {
      name: 'RATE',
      selector: (row) => row.rate
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleDelete(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];
  const columnsIndividual = [
    {
      name: 'ITEM',
      selector: (row) => row.item
    },
    {
      name: 'DISPLAY VALUES',
      selector: (row) => row.dispValues
    },

    {
      name: 'RATE',
      selector: (row) => row.rate
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleDeleteInd(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];

  const handleDelete = (row) => {
    const updatedCombination = combinationData.filter((entry) => entry !== row);
    setCombinationData(updatedCombination);
  };
  const handleDeleteInd = (row) => {
    const updatedIndividual = individualData.filter((entry) => entry !== row);
    setIndividualData(updatedIndividual);
  };

  return (
    <div>
      <MainCard>
        <Grid container sx={style.modalBoxHeader}>
          <Grid item xs={11}>
            <h2>Add Rate Card</h2>
          </Grid>

          <Grid item xs={1} sx={style.closeIconGrid} style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon sx={style.closeIcon} onClick={backToRateCard} />
          </Grid>
          <div
            style={{
              height: '2px',
              width: '100%',
              background: ' linear-gradient(to right, rgb(0, 0, 0) 198px, rgba(112, 112, 112, 0.18) 198px)'
            }}
          ></div>
        </Grid>

        {/* <Box sx={style.formBox}> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('==values', values);
            // handleAddEntry(values);
          }}
          enableReinitialize={true}
          innerRef={formikRef}
        >
          {({ setFieldValue }) => (
            <Form>
              <Box sx={{ paddingBottom: '10px' }}>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Main Category <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="mainCatgId"
                      id="mainCatgId"
                      placeholder="Select Main Category"
                      defaultValue={selectedMainCatag}
                      onChange={(e) => {
                        setFieldValue('mainCatgId', e.target.value.id);
                        dispatch(fetchCategoryByFilter(e.target.value.id));
                        setMainCatagValue(e.target.value.id);
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
                      <MenuItem value="" disabled>
                        Select Main Category
                      </MenuItem>
                      {mainCategory?.rows?.map((mode) => (
                        <MenuItem key={mode.value} value={mode}>
                          {capitalizeFirstLetter(mode.grpCatgName)}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="mainCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Category <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="catgId"
                      id="catgId"
                      placeholder="Select Category"
                      defaultValue={selectedCatag}
                      onChange={(e) => {
                        setFieldValue('catgId', e.target.value.id);
                        dispatch(getSubFilterCategory(e.target.value.id));
                        setCatagValue(e.target.value.id);
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
                      <MenuItem value="" disabled>
                        Select Category
                      </MenuItem>
                      {getCategoryData?.map((mode) => (
                        <MenuItem key={mode.value} value={mode}>
                          {capitalizeFirstLetter(mode.catgName)}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Sub Category <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="subCatgId"
                      id="subCatgId"
                      placeholder="Select Sub Category"
                      defaultValue={selectSubCatagValue}
                      onChange={(e) => {
                        setFieldValue('subCatgId', e.target.value.id);
                        setCatgValue(e.target.value.subCatgName);
                        dispatch(getSpecificationFiltered(e.target.value.id));
                        setSubCatagValue(e.target.value.id);
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
                      <MenuItem value="" disabled>
                        Select Sub Category
                      </MenuItem>
                      {getSubCategoryData?.map((mode) => (
                        <MenuItem key={mode.value} value={mode}>
                          {capitalizeFirstLetter(mode.subCatgName)}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="subCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <h3 style={{ borderBottom: '1px solid #e4e4e4', paddingBottom: '10px', marginBottom: '0px', fontWeight: 600 }}>
                        {selectedSubCategory ? capitalizeFirstLetter(selectedSubCategory) : ''}
                      </h3>
                    </Grid>

                    <Grid sx={{ display: 'flex', flexWrap: 'wrap' }} spacing={2}>
                      <Grid item xs={12}>
                        <Tabs value={tabValue} onChange={handleChange} aria-label="specification tabs">
                          <Tab label="COMBINATION" />
                          <Tab label="INDIVIDUAL" />
                        </Tabs>
                      </Grid>

                      {tabValue === 0 && (
                        <Grid item xs={12}>
                          <Box sx={{ marginTop: '10px' }}>
                            <Grid container spacing={2}>
                              {combinationSpecItems.map((item) => {
                                console.log('==item', item);
                                return (
                                  <Grid item xs={4} key={item._id} spacing={2}>
                                    <FormLabel>
                                      {item.specItem} <span style={{ color: 'red' }}>*</span>
                                    </FormLabel>
                                    <Select
                                      name={item.specItem}
                                      id={item.specItem}
                                      placeholder={`Select ${item.specItem}`}
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
                                      onChange={(e) => {
                                        console.log('==e', e);
                                        setSelectedData((prevData) => ({ ...prevData, [item.specItem]: e.target.value }));
                                      }}
                                    >
                                      <MenuItem value="">Select {item.specItem}</MenuItem>
                                      {specItem[item.specItem] &&
                                        specItem[item.specItem].dispValues.map((option) => (
                                          <MenuItem key={option._id} value={option}>
                                            {option.value}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </Grid>
                                );
                              })}
                              <Grid item xs={4}>
                                <FormLabel>
                                  Rate <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <Textfield
                                  name="rate"
                                  onKeyPress={(e) => {
                                    if (!/^[0-9.\b]+$/.test(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
                                      e.preventDefault();
                                    }
                                  }}
                                  value={rateValue}
                                  id="rate"
                                  placeholder="Rate"
                                  component={Textfield}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="end">INR</InputAdornment>
                                  }}
                                  onChange={(e) => {
                                    setRateValue(e.target.value);
                                    setSelectedData((prevData) => ({ ...prevData, rate: e.target.value }));
                                  }}
                                />
                              </Grid>
                            </Grid>
                            <Box style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px', marginTop: '5px' }}>
                              <Button type="submit" color="info" variant="contained" onClick={handleCombValues} sx={style.addBtnHead}>
                                Add
                              </Button>
                            </Box>
                            <DataTable
                              columns={columnsCombination}
                              data={combinationData}
                              pagination
                              highlightOnHover
                              pointerOnHover
                              customStyles={customStyles}
                              responsive
                            />
                          </Box>
                        </Grid>
                      )}

                      {tabValue === 1 && (
                        <Grid item xs={12}>
                          <Box sx={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <FormLabel>
                                  Item <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <Select
                                  name="item"
                                  id="item"
                                  placeholder="Select Item"
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
                                  value={selectedItem}
                                  onChange={handleItemChange}
                                >
                                  {individualSpecItems.map((item) => (
                                    <MenuItem key={item._id} value={item.specItem}>
                                      {item.specItem}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid item xs={4}>
                                <FormLabel>
                                  Display Value <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                {displayValues && (
                                  <Select
                                    name="displayValue"
                                    id="displayValue"
                                    placeholder="Select Display Value"
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
                                    onChange={handleDisplayValueChange}
                                  >
                                    {displayValues.map((option) => (
                                      <MenuItem key={option._id} value={option}>
                                        {option.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                )}
                              </Grid>

                              <Grid item xs={4}>
                                <FormLabel>
                                  Rate <span style={{ color: 'red' }}>*</span>
                                </FormLabel>
                                <Textfield
                                  name="rate"
                                  value={indRateValue}
                                  onKeyPress={(e) => {
                                    if (!/^[0-9.\b]+$/.test(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
                                      e.preventDefault();
                                    }
                                  }}
                                  id="rate"
                                  placeholder="Rate"
                                  component={Textfield}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="end">INR</InputAdornment>
                                  }}
                                  onChange={(e) => {
                                    setIndRateValue(e.target.value);
                                    setSelectedIndData((prevData) => ({ ...prevData, rate: e.target.value }));
                                  }}
                                />
                              </Grid>
                            </Grid>
                            <Box style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px', marginTop: '5px' }}>
                              <Button type="submit" color="info" variant="contained" onClick={handleIndValues} sx={style.addBtnHead}>
                                Add
                              </Button>
                            </Box>

                            <DataTable
                              columns={columnsIndividual}
                              data={individualData}
                              pagination
                              highlightOnHover
                              pointerOnHover
                              customStyles={customStyles}
                              responsive
                            />
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container sm={12}>
                  <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                    <Box>
                      <Button onClick={handleFinalSubmit} color="info" variant="contained" sx={style.addBtnHead}>
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
        {/* </Box> */}
      </MainCard>
    </div>
  );
};

export default AddRateCard;
