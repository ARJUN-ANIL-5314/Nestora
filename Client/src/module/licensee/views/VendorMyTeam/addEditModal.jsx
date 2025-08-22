import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, MenuItem, Select, IconButton, InputAdornment } from '@mui/material';
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (formtype === 'editform' && data && data.id) {
      dispatch(getUserById(data.id));
    }
  }, [dispatch, data, formtype]);

  const initialValues = {
    fName: formtype === 'editform' ? userById?.fName || '' : '',
    lName: formtype === 'editform' ? userById?.lName || '' : '',
    email: formtype === 'editform' ? userById?.email || '' : '',
    mobileNo: formtype === 'editform' ? userById?.mobileNo || '' : '',
    role: formtype === 'editform' ? userById?.role || '' : '',
    password: ''
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validationSchema = Yup.object({
    fName: Yup.string()
      .matches(/^[a-zA-Z\s ]+$/, 'First Name should contain only letters and spaces')
      .required('First Name is required'),
    email: Yup.string().required('Email is required').matches(emailRegex, 'Invalid email format'),
    mobileNo: Yup.string()
      .required('Mobile is required')
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number'),
    password:
      formtype === 'addform'
        ? Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
        : Yup.string().notRequired(),
    role: Yup.string().required('Role is required')
  });

  const onSubmit = (values, { resetForm }) => {
    const userData = {
      ...values
    };

    if (formtype === 'addform') {
      dispatch(addUser(userData));
    } else {
      userData.id = data.id;
      dispatch(updateUser(userData));
    }

    handleClose();
    resetForm();
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  First Name <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  name="fName"
                  id="fName"
                  placeholder="First Name"
                  value={values.fName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Last Name</FormLabel>
                <Textfield
                  name="lName"
                  id="lName"
                  placeholder="Last Name"
                  value={values.lName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Email <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Mobile <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  name="mobileNo"
                  id="mobileNo"
                  placeholder="Mobile"
                  value={values.mobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formtype === 'editform'}
                />
                <ErrorMessage name="mobileNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Role <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="role"
                  placeholder="Role"
                  id="role"
                  value={values.role}
                  onChange={(event) => setFieldValue('role', event.target.value)}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '51px',
                    width: '100%',
                    borderBottom: '1px solid black',
                    marginTop: '8px'
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Role
                  </MenuItem>
                  <MenuItem value="vendorAcnt">Accountant</MenuItem>
                  <MenuItem value="vendorMngr">Manager</MenuItem>
                  <MenuItem value="vendorOptr">Operator</MenuItem>
                </Select>
                <ErrorMessage name="role" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              {formtype === 'addform' && (
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Password <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Textfield
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <ErrorMessage name="password" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              )}
            </Grid>
            <Grid container justifyContent="flex-end">
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
