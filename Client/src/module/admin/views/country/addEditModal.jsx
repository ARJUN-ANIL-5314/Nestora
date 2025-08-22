import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import TextField from 'ui-component/common/TextField';
import { Button, FormLabel } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { addCountry, updateCountry, getCountryById, getCountry } from 'module/admin/container/countryContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const countryById = useSelector((state) => state.adminReducer.country.countryByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getCountryById(data.id));
    }
  }, [dispatch, data]);

  const initialValues = {
    name: formtype === 'editform' ? countryById?.name || '' : '',
    isoName: formtype === 'editform' ? countryById?.isoName || '' : '',
    iso3Name: formtype === 'editform' ? countryById?.iso3Name || '' : '',
    niceName: formtype === 'editform' ? countryById?.niceName || '' : '',
    callingCode: formtype === 'editform' ? countryById?.callingCode || '' : ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    isoName: Yup.string().required('ISO Name is required'),
    iso3Name: Yup.string().required('ISO3 Name is required'),
    niceName: Yup.string().required('Nice name is required'),
    callingCode: Yup.string().required('Calling Code is required')
  });

  const onSubmit = (values, { resetForm }) => {
    if (formtype && formtype === 'addform') {
      dispatch(addCountry(values));
    } else {
      values.id = data.id;
      dispatch(updateCountry(values));
      dispatch(getCountry());
    }

    handleClose();
    resetForm();
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>
                Name<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <TextField name="name" id="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>
                ISO Name<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <TextField name="isoName" id="isoName" placeholder="ISO Name" />
              <ErrorMessage name="isoName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>
                ISO3 Name<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <TextField name="iso3Name" id="iso3Name" placeholder="ISO3 Name" />
              <ErrorMessage name="iso3Name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>
                Nice Name<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <TextField name="niceName" id="niceName" placeholder="Nice Name" />
              <ErrorMessage name="niceName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>
                Calling Code<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <TextField name="callingCode" id="callingCode" placeholder="Calling Code" />
              <ErrorMessage name="callingCode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="submit" sx={style.changeBtn}>
              Save
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
