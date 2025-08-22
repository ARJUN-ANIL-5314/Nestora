import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import TextField from 'ui-component/common/TextField';
import { Button, IconButton, InputAdornment, MenuItem, Select } from '@mui/material';
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
    userType: formtype === 'editform' ? userById?.userType || '' : '',
    licnseType: formtype === 'editform' ? userById?.licnseType || '' : '',
    role: 'licensee',
    password: ''
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validationSchema = Yup.object({
    fName: Yup.string()
      .matches(/^[a-zA-Z\s ]+$/, 'First Name should contain only letters and spaces')
      .required('First Name is required'),

    email: Yup.string().matches(emailRegex, 'Invalid email format').required('Email is required'),

    mobileNo: Yup.string()
      .required('Mobile is required')
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number'),

    role: Yup.string().required('Role is required'),
    userType: Yup.string().required('User Type is required'),
    licnseType: Yup.string().required('Licensee Type is required'),
    password:
      formtype === 'addform' ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string()
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (values, { resetForm }) => {
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
        {({ values, handleChange }) => (
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
                <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
                  Licensee Type<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="licnseType"
                  id="licnseType"
                  value={values.licnseType}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '51px',
                    width: '100%',
                    borderRadius: '2px !important',
                    borderBottom: '1px solid black',
                    marginTop: '8px'
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Licensee Type
                  </MenuItem>
                  <MenuItem value="shared">Shared</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
                <ErrorMessage name="licnseType" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  User Type<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="userType"
                  id="userType"
                  value={values.userType}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '51px',
                    width: '100%',
                    borderRadius: '2px !important',
                    borderBottom: '1px solid black',
                    marginTop: '8px'
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select User Type
                  </MenuItem>
                  <MenuItem value="INDV">Individual</MenuItem>
                  <MenuItem value="ORG">Organisation</MenuItem>
                  <MenuItem value="AGNT">Agent</MenuItem>
                </Select>
                <ErrorMessage name="userType" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Role<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField name="role" id="role" value="Licensee" disabled />
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button type="submit" sx={style.changeBtn}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
