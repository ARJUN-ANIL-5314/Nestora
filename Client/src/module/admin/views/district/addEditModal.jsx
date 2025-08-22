import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, MenuItem, Select } from '@mui/material';
import commonStyles from 'assets/style/Style';

import { getState } from 'module/admin/container/stateContainer/slice.js';
import { addDistrict, updateDistrict, getDistrictById, getDistrict } from 'module/admin/container/districtContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const districtByIdData = useSelector((state) => state.adminReducer.district.districtByIdData);
  const error = useSelector((state) => state.adminReducer.district.error);

  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);

  useEffect(() => {
    dispatch(getState({}));
    if (data && data.id) {
      dispatch(getDistrictById(data.id));
    }
  }, [dispatch, data]);

  const initialValues = {
    name: formtype === 'editform' ? districtByIdData?.name || '' : '',
    stateId: formtype === 'editform' ? districtByIdData?.stateId?.id || '' : ''
  };

  const validationSchema = Yup.object({
    stateId: Yup.string().required('State is required'),
    name: Yup.string().required('Name is required')
  });

  const onSubmit = async (values, { resetForm }) => {
    const districtData = {
      stateId: values.stateId,
      name: values.name
    };
    try {
      if (formtype === 'addform') {
        await dispatch(addDistrict(districtData));
      } else {
        districtData.id = data.id;
        await dispatch(updateDistrict(districtData));
        await dispatch(getDistrict());
      }
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  State<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="stateId"
                  id="stateId"
                  required
                  variant="outlined"
                  value={values.stateId}
                  onChange={(e) => setFieldValue('stateId', e.target.value)}
                  fullWidth
                  displayEmpty
                  style={{
                    height: '56px',
                    borderBottom: '1px solid black',
                    padding: '0 14px',
                    marginTop: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {stateDetails?.rows?.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="stateId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="name" id="name" placeholder="Name" component={Textfield} style={{ marginTop: '8px' }} />
                <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </Box>
  );
};

export default AddEditModal;
