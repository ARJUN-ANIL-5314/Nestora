import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import Textfield from 'ui-component/common/TextField';
import { Button, Tab, Tabs } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'assets/style/style.css';

import { addCustomer, updateCustomer, getCustomerById } from 'module/vendor/container/customerContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getEnqSource } from 'module/admin/container/enqSourceContainer/slice';
import { getEnqMode } from 'module/admin/container/enqModeContainer/slice';
import { getStateByFilter } from 'module/admin/container/stateContainer/slice';
import { getDistrictByFilter } from 'module/admin/container/districtContainer/slice';

import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons';
import { capitalize } from 'utils/Capitalised';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const dispatch = useDispatch();

  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  const enqSourceDetails = useSelector((state) => state.adminReducer.enqsource.enqsourceData);
  const enqModDetails = useSelector((state) => state.adminReducer.enqmode.enqModeData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateByFilterData);
  const district = useSelector((state) => state.adminReducer.district.districtByFilter);
  // const stateDetails = useSelector((state) => state.adminReducer.state.stateData);

  const [selecteCountry, SetSelectedCountry] = useState(data?.address?.country?.id);
  const [selecteState, SetSelectedState] = useState(data?.address?.state?.id);
  const [currentTab, setCurrentTab] = useState(0);

  const [defaultCountry, setDefaultCountry] = useState('');
  const [defaultState, setDefaultState] = useState('');
  const [defaultDistrict, setDefaultDistrict] = useState('');

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getEnqSource());
    dispatch(getEnqMode());
  }, [dispatch]);

  useEffect(() => {
    if (selecteCountry) {
      dispatch(getStateByFilter(selecteCountry));
    }
  }, [dispatch, selecteCountry]);

  useEffect(() => {
    if (selecteState) {
      dispatch(getDistrictByFilter(selecteState));
    }
  }, [dispatch, selecteState]);

  useEffect(() => {
    if (CountryDetails?.rows) {
      const india = CountryDetails.rows.find((country) => country.name === 'India');
      if (india) {
        setDefaultCountry(india.id);
        SetSelectedCountry(india.id);
        dispatch(getStateByFilter(india.id));
      }
    }
  }, [CountryDetails, dispatch]);

  useEffect(() => {
    if (stateDetails?.rows) {
      const Kerala = stateDetails.rows.find((state) => state.name === 'Kerala');
      if (Kerala) {
        setDefaultState(Kerala.id);
        SetSelectedState(Kerala.id);
        dispatch(getDistrictByFilter(Kerala.id));
      }
    }
  }, [stateDetails, dispatch]);

  useEffect(() => {
    if (district?.rows) {
      const kozhikode = district.rows.find((district) => district.name === 'Kozhikode');
      if (kozhikode) {
        setDefaultDistrict(kozhikode.id);
      }
    }
  }, [district]);

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      dispatch(getCustomerById(data.id));
    }
  }, [dispatch, data, formtype]);

  const [initialValues, setInitialValues] = useState({
    custType: 'INDV',
    fName: '',
    lName: '',
    email: '',
    contactMobile1: '',
    contactMobile2: '',
    address: {
      city: '',
      addr1: '',
      addr2: '',
      country: defaultCountry,
      state: defaultState,
      district: defaultDistrict,
      postalCode: ''
    },
    gstin: '',
    companyName: '',
    licenceNo: '',
    remarks: '',
    enqMode: '',
    enqSource: '',
    extRefNo: ''
  });

  // --------------------------------------

  useEffect(() => {
    if (CountryDetails && stateDetails && district) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        address: {
          country: data?.address?.country?.id || defaultCountry,
          state: data?.address?.state?.id || defaultState,
          district: data?.address?.district?.id || defaultDistrict,
          city: data?.address?.city || '',
          addr1: data?.address?.addr1 || '',
          addr2: data?.address?.addr2 || '',
          postalCode: data?.address?.postalCode || ''
        },
        enqMode: data?.enqMode?.id,
        enqSource: data?.enqSource?.id
      }));
    }
  }, [CountryDetails, stateDetails, district, data, defaultCountry, defaultState, defaultDistrict]);

  // ---------------edit setup  configruation---------------
  useEffect(() => {
    if (data && formtype === 'editform') {
      setInitialValues({
        custType: data.custType || '',
        fName: data.fName || '',
        lName: data.lName || '',
        email: data.email || '',
        contactMobile1: data.contactMobile1 || '',
        contactMobile2: data.contactMobile2 || '',
        address: {
          country: data.address?.country?.id || '',
          state: data.address?.state?.id || '',
          district: data.address?.district?.id || '',
          city: data.address?.city || '',
          addr1: data.address?.addr1 || '',
          addr2: data.address?.addr2 || '',
          postalCode: data.address?.postalCode || ''
        },
        enqMode: data.enqMode?.id || '',
        enqSource: data.enqSource?.id || '',
        licenceNo: data.licenceNo || '',
        companyName: data.companyName || '',
        gstin: data.gstin || '',
        remarks: data.remarks || '',
        extRefNo: data.extRefNo || ''
      });
    }
  }, [data, formtype]);

  // ---------------edit setup  stop---------------

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  //-------------------- validation numbers---------------------------
  const validationSchema = Yup.object({
    custType: Yup.string().required('Customer Type is required'),

    fName: Yup.string()
      .matches(/^[a-zA-Z\s ]+$/, 'First Name should contain only letters and spaces')
      .required('First Name is required'),

    contactMobile1: Yup.string()
      .required('Mobile is required')
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number and cannot start with 0'),

    contactMobile2: Yup.string().matches(/^\d{10}$/, 'Must be a 10-digit mobile number'),

    email: Yup.string().when('formtype', {
      is: 'addform',
      then: Yup.string().required('Email is required').matches(emailRegex, 'Invalid email format'),
      otherwise: Yup.string().matches(emailRegex, 'Invalid email format')
    }),

    companyName: Yup.string().when('custType', {
      is: (custType) => custType === 'ORG' || custType === 'AGNT',
      then: Yup.string().required('Company Name is required'),
      otherwise: Yup.string().notRequired()
    }),

    address: Yup.object({
      postalCode: Yup.string().when('formtype', {
        is: 'addform',
        then: Yup.string()
          .required('Postal Code is required')
          .matches(/^\d{6}$/, 'Must be a 6-digit postal code'),
        otherwise: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit postal code')
      })
    })
  });

  //-------------------  form sumbit ------------------------------------
  const onSubmit = async (values, { resetForm }) => {
    const customerData = {
      ...values
    };

    // console.log('customerData',customerData);
    if (formtype === 'addform') {
      await dispatch(addCustomer(customerData));
    } else {
      values.id = data.id;
      dispatch(updateCustomer({ id: data.id, ...customerData }));
    }

    handleClose();
    resetForm();
  };

  // ----------------- tab managing function  ---------------------------
  const handleNext = () => {
    if (currentTab < 2) {
      setCurrentTab((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTab > 0) {
      setCurrentTab((prev) => prev - 1);
    }
  };

  return (
    <Box onClose={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
              <Tab label="Basic Details" />
              <Tab label="Additional Details" />
              <Tab label="General Details" />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
              {/* Basic Details Tab */}
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <FormLabel>
                    Customer Type<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    placeholder="Select Customer Type"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
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
                      Select Customer Type
                    </MenuItem>
                    <MenuItem value="ORG">Organization</MenuItem>
                    <MenuItem value="INDV">Individual</MenuItem>
                    <MenuItem value="AGNT">Agent</MenuItem>
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>
                    First Name<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Textfield name="fName" id="fName" placeholder="First Name" component={Textfield} />
                  <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Textfield name="lName" id="lName" placeholder="Last Name " component={Textfield} />
                  <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>
                    Mobile (Primary)<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Textfield name="contactMobile1" id="contactMobile1" placeholder="Mobile" component={Textfield} />
                  <ErrorMessage name="contactMobile1" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>WhatsApp</FormLabel>
                  <Textfield name="contactMobile2" id="contactMobile2" placeholder="WhatsApp" component={Textfield} />
                  <ErrorMessage name="contactMobile2" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>Email</FormLabel>
                  <Textfield type="email" name="email" id="email" placeholder="Email" component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Country</FormLabel>
                  <Select
                    name="address.country"
                    id="address.country"
                    variant="outlined"
                    value={values.address.country || defaultCountry}
                    onChange={(e) => {
                      setFieldValue('address.country', e.target.value);
                      SetSelectedCountry(e.target.value);
                      dispatch(getStateByFilter(e.target.value));
                    }}
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
                      Select Country
                    </MenuItem>
                    {CountryDetails?.rows?.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {capitalize(country?.name)}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.country" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormLabel>State</FormLabel>
                  <Select
                    name="address.state"
                    id="address.state"
                    variant="outlined"
                    value={values.address.state || defaultState}
                    onChange={(e) => {
                      setFieldValue('address.state', e.target.value);
                      SetSelectedState(e.target.value);
                      dispatch(getDistrictByFilter(e.target.value));
                    }}
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
                      Select State
                    </MenuItem>
                    {stateDetails?.rows?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {capitalize(state?.name)}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.state" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormLabel>District</FormLabel>
                  <Select
                    name="address.district"
                    id="address.district"
                    variant="outlined"
                    value={values.address.district || defaultDistrict}
                    onChange={(e) => {
                      setFieldValue('address.district', e.target.value);
                    }}
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
                      Select District
                    </MenuItem>
                    {district?.rows?.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {capitalize(district?.name)}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.district" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormLabel>City</FormLabel>
                  <Textfield name="address.city" id="address.city" placeholder="City" component={Textfield} />
                  <ErrorMessage name="address.city" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormLabel>Address Line 1</FormLabel>
                  <Textfield name="address.addr1" id="address.addr1" placeholder="Address Line 1" component={Textfield} />
                  <ErrorMessage name="address.addr1" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Address Line 2</FormLabel>
                  <Textfield name="address.addr2" id="address.addr2" placeholder="Address Line 2" component={Textfield} />
                  <ErrorMessage name="address.addr2" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Postal Code</FormLabel>
                  <Textfield name="address.postalCode" id="address.postalCode" placeholder="Postal Code" component={Textfield} />
                  <ErrorMessage name="address.postalCode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              {/* Remarks Tab */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormLabel>Enquiry Source</FormLabel>
                  <Select
                    name="enqSource"
                    id="enqSource"
                    variant="outlined"
                    value={values.enqSource || ''}
                    onChange={(e) => {
                      setFieldValue('enqSource', e.target.value);
                    }}
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
                      Select Enquiry Source
                    </MenuItem>
                    {enqSourceDetails?.rows?.map((enqsource) => (
                      <MenuItem key={enqsource.id} value={enqsource.id}>
                        {enqsource.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="enqSource" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormLabel>Enquiry Mode</FormLabel>
                  <Select
                    name="enqMode"
                    id="enqMode"
                    value={values.enqMode || ''}
                    defaultValue="Select EnquiryMode"
                    onChange={(e) => {
                      setFieldValue('enqMode', e.target.value);
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
                      Select Enquiry Mode
                    </MenuItem>
                    {enqModDetails?.rows?.map((enqmode) => (
                      <MenuItem key={enqmode.id} value={enqmode.id}>
                        {enqmode.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="enqMode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>Reference By</FormLabel>
                  <Textfield name="extRefNo" id="extRefNo" placeholder="Reference By" component={Textfield} />
                  <ErrorMessage name="extRefNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormLabel>Remarks</FormLabel>

                  <Textfield name="remarks" id="remarks" placeholder="Remarks" component={Textfield} />
                  <ErrorMessage name="remarks" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  {values?.custType !== 'INDV' && (
                    <>
                      <FormLabel>
                        Company Name <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Textfield name="companyName" id="companyName" placeholder="Company Name" component={Textfield} />
                      <ErrorMessage name="companyName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </>
                  )}
                </Grid>
                <Grid item md={4}>
                  {values.custType !== 'INDV' && (
                    <React.Fragment>
                      <FormLabel>GST No</FormLabel>
                      <Textfield name="gstin" id="gstin" placeholder="GST No " component={Textfield} />
                    </React.Fragment>
                  )}
                  <ErrorMessage name="gstin" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  {values.custType !== 'INDV' && (
                    <React.Fragment>
                      <FormLabel>License No</FormLabel>
                      <Textfield name="licenceNo" id="licenceNo" placeholder="License No" component={Textfield} />
                    </React.Fragment>
                  )}
                  <ErrorMessage name="licenceNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              </Grid>
            </TabPanel>

            <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {currentTab > 0 && (
                <Button
                  onClick={handlePrev}
                  disabled={currentTab === 0}
                  variant="contained"
                  startIcon={<IconArrowLeft />}
                  sx={{ marginRight: '20px' }}
                >
                  Previous
                </Button>
              )}
              <Box>
                {currentTab === 2 && (
                  <Button type="submit" variant="contained" startIcon={<IconCheck />}>
                    Submit
                  </Button>
                )}
                {currentTab < 2 && (
                  <Button onClick={handleNext} disabled={currentTab === 2} variant="contained" endIcon={<IconArrowRight />}>
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default AddEditModal;
