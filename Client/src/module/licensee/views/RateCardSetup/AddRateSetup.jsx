import { Button, FormLabel, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import styles from './style';
import { useTheme } from '@mui/material/styles';
import '../../../../assets/style/style.css';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryByFilter, getSubFilterCategory, getSpecificationFiltered } from 'module/licensee/container/RateCardContainer/slice';
import { addRateCardSetup, getPatternValue } from 'module/licensee/container/RateCardSetupContainer/slice';
import { ErrorMessage, Form, Formik } from 'formik';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
import DataTable from 'react-data-table-component';

const AddRateSetup = () => {
  const theme = useTheme();
  const style = styles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSubCategory, setCatgValue] = useState([]);
  const [selectedMainCatag, setMainCatagValue] = useState([]);
  const [selectedCatag, setCatagValue] = useState([]);
  const [selectSubCatagValue, setSubCatagValue] = useState([]);
  const [selectSubCatagId, setSubCatagId] = useState([]);
  const [specificationsList, setSpecificationsList] = useState([]);
  const [addedSpecItems, setAddedSpecItems] = useState([]);

  console.log(addedSpecItems, '==addedSpecItems');
  console.log(specificationsList, '==specificationsList');

  const backToRateCard = () => {
    navigate('/rate_card_setup');
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

  useEffect(() => {
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
  const patterDesp = useSelector((state) => state.licenseeReducer.RateCardSetup.patterValue.description);
  const hasRows = specifications && specifications.rows && specifications.rows.length > 0;
  const specItem = hasRows ? specifications.rows[0].specItem : {};
  const [selectedSpecification, setSelectedSpecification] = useState('');
  // const [selectCkeckboxValue, setckeCkboxValue] = useState([]);
  console.log('==patterDesp==', patterDesp);

  const initialValues = {};

  const handleSpecificationChange = (e) => {
    const selectedSpec = e.target.value;
    setSelectedSpecification(selectedSpec);
    // const ckeckboxx = selectedSpec && specItem[selectedSpec]?.ctrnlType;
    // setckeCkboxValue(ckeckboxx);
    // const disp = specItem[selectedSpec]?.dispValues;
    // if (ckeckboxx === 'CHKBX') {
    //   setFieldValue('dispValue', disp);
    // }
  };

  const handleAddEntry = (values) => {
    if (selectSubCatagValue && selectSubCatagId && selectedSpecification && values.dispValue && values.calfrml) {
      const existingIndex = addedSpecItems.findIndex(
        (spec) => spec.subCatgId === selectSubCatagId && spec.subCatgName === selectSubCatagValue.subCatgName
      );

      if (existingIndex !== -1) {
        const updatedSpecs = [...addedSpecItems];
        updatedSpecs[existingIndex].dispSpecItems.push({
          specItem: selectedSpecification,
          combType: values.dispValue
        });
        setAddedSpecItems(updatedSpecs);
      } else {
        const newEntry = {
          subCatgName: selectSubCatagValue.subCatgName,
          subCatgId: selectSubCatagId,
          specificationId: specifications.rows[0].id,
          pattern: values.calfrml,
          dispSpecItems: [
            {
              specItem: selectedSpecification,
              combType: values.dispValue
            }
          ]
        };
        setAddedSpecItems([...addedSpecItems, newEntry]);
      }
    }
  };

  const handleFinalSubmit = () => {
    dispatch(addRateCardSetup(addedSpecItems[0]));
    backToRateCard();
  };

  const handleDelete = (item) => {
    console.log('==item', item);

    const deletedItem = specificationsList.find((spec) => spec.itemIndex === item.itemIndex);
    console.log('Deleted specification item:', deletedItem.specItem);

    const specificationItemToDelete = deletedItem.specItem;

    addedSpecItems.forEach((spec) => {
      console.log('==spec==', spec);

      // if (spec.specItem && spec.specItem[specificationItemToDelete]) {
      //   delete spec.specItem[specificationItemToDelete];
      // }
      if (spec.dispSpecItems) {
        spec.dispSpecItems = spec.dispSpecItems.filter((dispSpecItem) => dispSpecItem.specItem !== specificationItemToDelete);
      }
    });
    setSpecificationsList((prevList) => prevList.filter((spec) => spec.itemIndex !== item.itemIndex));
  };

  useEffect(() => {
    const SpecificationsList = addedSpecItems.flatMap((spec) => {
      console.log(spec, '==spec==');
      if ([spec] && spec.dispSpecItems) {
        return Object.entries(spec.dispSpecItems).map(([key, value], itemIndex) => {
          console.log('==key==', key);
          return {
            subCatgName: spec.subCatgName,
            combType: value.combType,
            specItem: value.specItem,
            pattern: spec.pattern,
            itemIndex
          };
        });
      } else {
        return [];
      }
    });
    setSpecificationsList(SpecificationsList);
  }, [addedSpecItems]);

  // const [tableValue, setTableValue] = useState(SpecificationsList);

  // console.log("==SpecificationsList==", SpecificationsList);

  // console.log(tableValue, "==tableValue");
  const columns = [
    {
      name: 'SUB CATEGORY ',
      selector: (row) => capitalizeFirstLetter(row.subCatgName)
    },
    {
      name: 'SPEC ITEM ',
      selector: (row) => capitalizeFirstLetter(row.specItem)
    },

    {
      name: 'TYPE ',
      selector: (row) => capitalizeFirstLetter(row.combType)
    },

    {
      name: 'PATTERN',
      selector: (row) => row.pattern
    },
    {
      name: 'Actions',
      cell: (row) => (
        <IconButton onClick={() => handleDelete(row)}>
          <Delete className="actn-icon3" />
        </IconButton>
      )
    }
  ];
  // const handleDelete = (row) => {

  //   const updatedEntries = SpecificationsList.filter((entry) => entry !== row);
  //   console.log("==updatedEntries==", updatedEntries);
  //   setTableValue(updatedEntries);
  // };

  const patternValue = (val1) => {
    dispatch(getPatternValue(val1));
  };
  return (
    <div>
      <MainCard>
        <Grid container sx={style.modalBoxHeader}>
          <Grid item xs={11}>
            <h2>Add Rate Card Set Up</h2>
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

        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log('==values==', values);
              handleAddEntry(values);
            }}
            enableReinitialize={true}
          >
            {({ setFieldValue, values }) => (
              <Form>
                {/* <Box sx={{ paddingBottom: '10px' }}> */}
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
                        setSubCatagId(e.target.value.id);
                        setSubCatagValue(e.target.value);
                      }}
                      variant="outlined"
                      fullWidth
                      style={{
                        height: '49px',
                        width: '100%',
                        border: 'none',
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
                      <Typography style={{ marginBottom: '0px', fontSize: '20px', fontWeight: 600 }}>
                        {selectedSubCategory ? capitalizeFirstLetter(selectedSubCategory) : ''}
                      </Typography>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexWrap: 'wrap' }} spacing={2}></Grid>
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Calculation Formula <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="calfrml"
                      id="calfrml"
                      placeholder="Select Display Value"
                      defaultValue={values.calfrml}
                      onChange={(e) => {
                        patternValue(e.target.value);
                        setFieldValue('calfrml', e.target.value);
                      }}
                      variant="outlined"
                      fullWidth
                      style={{
                        height: '49px',
                        width: '100%',
                        marginTop: '10px'
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Calculation Formula
                      </MenuItem>
                      <MenuItem value="PTRN_A">PTRN_A</MenuItem>
                      <MenuItem value="PTRN_B">PTRN_B</MenuItem>
                      <MenuItem value="PTRN_C">PTRN_C</MenuItem>
                      <MenuItem value="PTRN_D">PTRN_D</MenuItem>
                      <MenuItem value="PTRN_E">PTRN_E</MenuItem>
                      <MenuItem value="PTRN_F">PTRN_F</MenuItem>
                    </Select>
                    <ErrorMessage name="calfrml" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Specification Item <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="spcfctnId"
                      id="spcfctnId"
                      placeholder="Select Specification"
                      defaultValue={values.spcfctnId}
                      onChange={(e) => handleSpecificationChange(e, setFieldValue)}
                      variant="outlined"
                      fullWidth
                      style={{
                        height: '49px',
                        width: '100%',
                        border: 'none',
                        marginTop: '10px'
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Item
                      </MenuItem>

                      {Object.keys(specItem).map((key) =>
                        key !== 'remarks' ? (
                          <MenuItem key={key} value={key}>
                            {capitalizeFirstLetter(key)}
                          </MenuItem>
                        ) : null
                      )}
                    </Select>
                    <ErrorMessage name="spcfctnId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormLabel>
                      Type <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Select
                      name="dispValue"
                      id="dispValue"
                      placeholder="Select Display Value"
                      defaultValue={values.dispValue}
                      onChange={(e) => {
                        setFieldValue('dispValue', e.target.value);
                      }}
                      variant="outlined"
                      fullWidth
                      style={{
                        height: '49px',
                        width: '100%',
                        marginTop: '10px'
                      }}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Type
                      </MenuItem>
                      <MenuItem value="COMB">Combination</MenuItem>
                      <MenuItem value="INDV">Individual</MenuItem>
                    </Select>
                    <ErrorMessage name="dispValue" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                </Grid>
                <Grid item md={3} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <Box
                    style={{
                      backgroundColor: patterDesp ? '#cf61231a' : 'transparent',
                      border: patterDesp ? '1px solid' : 'none',
                      borderRadius: '10px',
                      padding: '0px 20px',
                      width: '100%',
                      color: '#ff6c00',
                      display: patterDesp ? 'block' : 'hide'
                    }}
                  >
                    <h4>{patterDesp}</h4>
                  </Box>
                  <Box>
                    <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
                      Add
                    </Button>
                  </Box>
                </Grid>

                <Box sx={{ overflowX: 'auto', width: '100%', marginTop: '10px' }}>
                  <Grid item sx={{ mt: 2 }} md={12}>
                    <DataTable
                      columns={columns}
                      data={specificationsList}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      customStyles={customStyles}
                      responsive
                    />
                  </Grid>
                </Box>
                <Grid container sm={12}>
                  <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                    <Button onClick={handleFinalSubmit} color="info" variant="contained" sx={style.addBtnHead}>
                      Save
                    </Button>
                  </Grid>
                </Grid>

                {/* </Box> */}
              </Form>
            )}
          </Formik>
        </Box>
      </MainCard>
    </div>
  );
};

export default AddRateSetup;
