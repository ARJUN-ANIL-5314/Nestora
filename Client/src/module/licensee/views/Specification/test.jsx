import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import '../../../../assets/style/style.css';
import MainCard from 'ui-component/cards/MainCard';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
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
import SpecificationTable from './SpecificationTable.jsx';
import { getSpecificationById, getSingleSpec, updateSpecification } from 'module/licensee/container/specificationContainer/slice';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SpecificationEditPage = () => {
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
  console.log(specificationByIdData, '====specificationByIdData===');
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
  const SpecificationsList = location.state?.specificationsListss;
  const [singleSpecDataa, setSingleSpecDataa] = useState(singleSpecData);
  console.log('==SpecificationsList==', SpecificationsList);

  const [specItem, setSpecItem] = React.useState('');
  const [display, setDisplay] = useState([]);
  const navigate = useNavigate();
  const [displayValues, setDisplayValues] = useState(
    singleSpecData?.displayValues ? singleSpecData.displayValues.split(', ').map((value) => value.trim()) : []
  );

  console.log('==singleSpecDataa==', singleSpecDataa);
  const backToSpecification = () => {
    navigate('/specification');
  };

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

  useEffect(() => {
    setSingleSpecDataa(singleSpecData);
  }, [singleSpecData]);

  useEffect(() => {
    if (!hasUpdated && specificationByIdData?.subCatgName !== undefined) {
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
      setDataList((prevDataList) => {
        return prevDataList.map((item) => {
          console.log('==newItem', item);
          const specItem = {
            ...(item.specItem || {}),
            [newSpecItem]: newSpecObject,
            ...Object.fromEntries(
              Object.entries(item.specItem || {}).map(([key, value]) => [
                key,
                {
                  ...value,
                  dispValues: Array.isArray(value.dispValues) ? value.dispValues : value.dispValues.map((dispValue) => dispValue.value)
                }
              ])
            )
          };
          console.log('==specItem==', specItem);

          return {
            mainCatgId: item.mainCatgId,
            catgId: item.catgId,
            subCatgId: item.subCatgId,
            subCatgName: item.subCatgId.subCatgName,
            specItem: specItem
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
      // setValues({
      //     specItem: '',
      //     lblText: '',
      //     ctrnlType: '',
      //     subCatgId: '',
      //     mainCatgId: '',
      //     catgId: '',
      //     isActive: false,
      //   });
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
        <h1>Edit Specification</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <FormLabel> Main Category</FormLabel>
                  <TextField
                    name="mainCatgId"
                    value={capitalizeFirstLetter(values.mainCatgId.grpCatgName)}
                    // onChange={(e) => setFieldValue('mainCatgId', e.target.value)}
                    fullWidth
                    InputProps={{ style: { padding: '7px' } }}
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
                    InputProps={{ style: { padding: '7px' } }}
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
                    InputProps={{ style: { padding: '7px' } }}
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
                <SpecificationTable specifications={datalist} setShowFeild={setShowFeild} />
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
