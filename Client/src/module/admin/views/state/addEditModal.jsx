import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
// import PropTypes from 'prop-types';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, MenuItem, Select, Typography } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { getCountry } from 'module/admin/container/countryContainer/slice';

import { addState, updateState, getStateById, getState } from 'module/admin/container/stateContainer/slice';
import { capitalizeFirstLetter } from 'module/licensee/views/utilities/Capitallised';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const stateByIdData = useSelector((state) => state.adminReducer.state.stateByIdData);
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getStateById(data.id));
    }
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const initialValues = {
    countryId: formtype === 'editform' ? stateByIdData?.countryId?.id || '' : '',
    code: formtype === 'editform' ? stateByIdData?.code || '' : '',
    name: formtype === 'editform' ? stateByIdData?.name || '' : '',
    type: formtype === 'editform' ? stateByIdData?.type || '' : '',
    capital: formtype === 'editform' ? stateByIdData?.capital || '' : ''
  };

  const validationSchema = Yup.object({
    code: Yup.string().required('Code is required'),
    name: Yup.string().required('Name is required'),
    countryId: Yup.string().required('Country is required'),
    type: Yup.string().required('Type is required'),
    capital: Yup.string().required('Capital is required')
  });

  const onSubmit = (values, { resetForm }) => {
    if (formtype && formtype === 'addform') {
      dispatch(addState(values));
      // dispatch(getState())
    } else {
      values.id = data.id;
      dispatch(updateState(values));
      dispatch(getState());
    }

    handleClose(formtype);
    resetForm();
  };
  const Type = [
    // { value: '', label: 'Select Payment Mode', disabled: true },
    { value: 'Union Territory', label: 'Union Territory' },
    { value: 'State', label: 'State' }
  ];
  return (
    <Box onClose={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4} className="EditDetails">
                <Typography>
                  Country<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Field
                  as={Select}
                  name="countryId"
                  id="countryId"
                  placeholder="Select Country"
                  displayEmpty
                  value={values.countryId}
                  onChange={(e) => {
                    setFieldValue('countryId', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  required
                  style={{
                    height: '49px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                    marginTop: '10px'
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Country
                  </MenuItem>
                  {CountryDetails?.rows?.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {capitalizeFirstLetter(country.name)}
                    </MenuItem>
                  ))}
                </Field>

                <ErrorMessage name="countryId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>
                  Code<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  name="code"
                  id="code"
                  placeholder="Code"
                  component={Textfield}
                  // onKeyPress={(e) => {
                  //   if (!/^[0-9.\b]+$/.test(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
                  //     e.preventDefault();
                  //   }
                  // }}
                />
                <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={4} md={4} className="EditDetails">
                <Typography>
                  Type<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Field
                  as={Select}
                  name="type"
                  id="type"
                  placeholder="Select State Type"
                  displayEmpty
                  value={values.type}
                  onChange={(e) => {
                    setFieldValue('type', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  required
                  style={{
                    height: '49px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                    marginTop: '10px'
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  {Type.map((mode) => (
                    <MenuItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="type" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormLabel>
                  Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="name" id="name" placeholder="Name" component={Textfield} />
                <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel>
                  Capital<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="capital" id="capital" placeholder="Capital" component={Textfield} />
                <ErrorMessage name="capital" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button type="submit" sx={style.changeBtn}>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
