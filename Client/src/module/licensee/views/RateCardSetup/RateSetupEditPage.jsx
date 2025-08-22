import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import styles from './style';
import '../../../../assets/style/style.css';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { useTheme } from '@mui/material/styles';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { getSpecificationSpec } from 'module/licensee/container/specificationContainer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getRateSetupById } from 'module/licensee/container/RateCardSetupContainer/slice';
import { Button, FormLabel, Grid, MenuItem, Select } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
// import { fetchSingleSpecification } from 'module/licensee/container/specificationContainer/slice';
import { IconButton, TextField } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import DataTable from 'react-data-table-component';
import MainCard from 'ui-component/cards/MainCard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getSpecificationFiltered } from 'module/licensee/container/RateCardContainer/slice';
import { useNavigate } from 'react-router-dom';

export default function RateSetupEditPage() {
  const theme = useTheme();
  const style = styles(theme);
  const location = useLocation();
  const specificationsSpec = useSelector((state) => state.licenseeReducer.specification.specList);
  const navigate = useNavigate();
  const data = location.state?.data;
  const dispatch = useDispatch();
  const [showFeild, setShowFeild] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [addedSpecItems, setAddedSpecItems] = useState([data]);
  console.log('==editedValues', editedValues);
  console.log('==data', data);

  const backToRateCardSetup = () => {
    navigate('/rate_card_setup');
  };
  useEffect(() => {
    if (data && data.id) {
      dispatch(getRateSetupById(data.id));
      dispatch(getSpecificationFiltered(data.subCatgId.id));
    }
  }, [dispatch, data]);

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

  const specifications = useSelector((state) => state.licenseeReducer.RateCard.specificationDataFilterd);
  const hasRows = specifications && specifications.rows && specifications.rows.length > 0;
  const specItem = hasRows ? specifications.rows[0].specItem : {};
  const [selectedSpecification, setSelectedSpecification] = useState('');
  const [selectCkeckboxValue, setckeCkboxValue] = useState([]);
  console.log('==specItem==', specItem);

  const initialValues = {
    subCatgId: data?.subCatgId.subCatgName || ''
  };

  const handleSpecificationChange = (e, setFieldValue) => {
    const selectedSpec = e.target.value;
    setSelectedSpecification(selectedSpec);
    const ckeckboxx = selectedSpec && specItem[selectedSpec]?.ctrnlType;
    setckeCkboxValue(ckeckboxx);
    const disp = specItem[selectedSpec]?.dispValues;
    if (ckeckboxx === 'CHKBX') {
      setFieldValue('dispValue', disp);
    }
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
    backToRateCardSetup();
  };

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

  const onEdit = (singleData) => {
    console.log('=singleData=', singleData);
    setEditedValues(singleData);
    setShowFeild(true);
  };

  const [tableValue, setTableValue] = useState(SpecificationsList);
  console.log(tableValue);

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
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => onEdit(row)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];
  const handleDelete = (row) => {
    const updatedEntries = SpecificationsList.filter((entry) => entry !== row);
    console.log('==updatedEntries==', updatedEntries);
    setTableValue(updatedEntries);
  };

  return (
    <div>
      <MainCard>
        <Box>
          <Grid container sx={style.modalBoxHeader}>
            <Grid item xs={11}>
              <h2>Edit Rate Card Setup</h2>
            </Grid>

            <Grid item xs={1} sx={style.closeIconGrid} style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon sx={style.closeIcon} onClick={backToRateCardSetup} />
            </Grid>
            <div
              style={{
                height: '2px',
                width: '100%',
                background: ' linear-gradient(to right, rgb(0, 0, 0) 198px, rgba(112, 112, 112, 0.18) 198px)'
              }}
            ></div>
          </Grid>
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
                <Box sx={{ paddingBottom: '10px' }}>
                  <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item sm={4}>
                      <FormLabel> Sub Category</FormLabel>
                      <TextField
                        name="mainCatgId"
                        value={capitalizeFirstLetter(values.subCatgId)}
                        onChange={(e) => setFieldValue('mainCatgId', e.target.value)}
                        fullWidth
                        InputProps={{ style: { padding: '7px' } }}
                        style={{ marginTop: '10px' }}
                        disabled
                      />
                    </Grid>

                    <Box sx={{ overflowX: 'auto', width: '100%', marginTop: '10px' }}>
                      <Grid item sx={{ mt: 2 }} md={12}>
                        <DataTable
                          columns={columns}
                          data={SpecificationsList}
                          pagination
                          highlightOnHover
                          pointerOnHover
                          customStyles={customStyles}
                          responsive
                        />
                      </Grid>
                    </Box>
                    {showFeild && (
                      <>
                        <Grid item xs={12} spacing={2}>
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
                            value={editedValues.pattern}
                            onChange={(e) => {
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
                            <MenuItem value="PTRN_A">Pattern 1</MenuItem>
                            <MenuItem value="PTRN_B">Pattern 2</MenuItem>
                            <MenuItem value="PTRN_C">Pattern 3</MenuItem>
                            <MenuItem value="PTRN_D">Pattern 4</MenuItem>
                            <MenuItem value="PTRN_E">Pattern 5</MenuItem>
                            <MenuItem value="PTRN_F">Pattern 6</MenuItem>
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
                            value={editedValues.specItem}
                            onChange={(e) => {
                              console.log('==e==', e);
                              handleSpecificationChange(e, setFieldValue);
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
                              Select Item
                            </MenuItem>
                            {specificationsSpec.keys &&
                              Object.keys(specificationsSpec.keys).map((key) => (
                                <MenuItem key={key} value={specificationsSpec.keys[key]}>
                                  {specificationsSpec.keys[key]}
                                </MenuItem>
                              ))}
                          </Select>
                          <ErrorMessage name="spcfctnId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                        </Grid>
                        {selectCkeckboxValue != 'CHKBX' ? (
                          <>
                            <Grid item md={4} xs={12}>
                              <FormLabel>
                                Type <span style={{ color: 'red' }}>*</span>
                              </FormLabel>
                              <Select
                                name="dispValue"
                                id="dispValue"
                                placeholder="Select Display Value"
                                value={editedValues.combType}
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
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </Grid>

                  <Grid item md={3} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '20px' }}>
                    <Box>
                      <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
                        Add
                      </Button>
                    </Box>
                  </Grid>

                  <Grid container sm={12}>
                    <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                      <Button onClick={handleFinalSubmit} color="info" variant="contained" sx={style.addBtnHead}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </MainCard>
    </div>
  );
}
