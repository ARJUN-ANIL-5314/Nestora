import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import TextField from 'ui-component/common/TextField';
import { Button, IconButton, InputAdornment } from '@mui/material';
import commonStyles from 'assets/style/Style';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { addUser, updateUser, getUserById } from 'module/vendor/container/userContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const userById = useSelector((state) => state.data.user.userByIdData);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getUserById(data.id));
    }
  }, [dispatch, data]);

  const initialValues = {
    fName: formtype === 'editform' ? userById?.fName || '' : '',
    lName: formtype === 'editform' ? userById?.lName || '' : '',
    email: formtype === 'editform' ? userById?.email || '' : '',
    mobileNo: formtype === 'editform' ? userById?.mobileNo || '' : '',
    role: 'vendor',
    password: ''
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validationSchema = Yup.object({
    fName: Yup.string()
      .matches(/^[a-zA-Z\s ]+$/, 'First Name should contain only letters and spaces')
      .required('First Name is required'),

    email: Yup.string().required('Email is required').matches(emailRegex, 'Invalid email format'),

    mobileNo: Yup.string()
      .matches(/^[1-9]\d*$/, 'Mobile number should not start with zero and must contain only numbers')
      .required('Mobile is required')
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number'),

    role: Yup.string().required('Role is required'),

    password:
      formtype === 'addform'
        ? Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
        : Yup.string().notRequired()
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (values, { resetForm }) => {
    console.log('==values==', values);

    const userData = {
      ...values
    };

    if (formtype === 'addform') {
      dispatch(addUser(userData));
    } else {
      values.id = data.id;
      dispatch(updateUser(values));
    }
    handleClose();
    resetForm();
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  First Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField name="fName" id="fName" placeholder="First Name" />
                <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Last Name</FormLabel>
                <TextField name="lName" id="lName" placeholder="Last Name" />
                <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Email<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField name="email" id="email" placeholder="Email" />
                {touched.email && errors.email && <div style={{ color: '#f54d4f', fontSize: 12 }}>{errors.email}</div>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Mobile<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField name="mobileNo" id="mobileNo" placeholder="Mobile" disabled={formtype === 'editform'} />
                <ErrorMessage name="mobileNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Role<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField name="role" id="role" placeholder="Vendor" value="Vendor" disabled />
                <ErrorMessage name="role" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              {formtype === 'addform' && (
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Password<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TextField
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <ErrorMessage name="password" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              )}
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" sx={style.changeBtn}>
                Save
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
