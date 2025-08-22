import React from 'react';
// import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { changePasswordRequest } from 'container/LoginContainer/slice';

const NewPassMain = ({ ...others }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((state) => state.login.userDatas);
  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Confirm password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          // dispatch(changePasswordRequest({ newPassword: values.newPassword, userData }));
          navigate('/login'); // Navigate to Login3 page
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth sx={{ mb: 2 }} error={Boolean(touched.newPassword && errors.newPassword)}>
            <Typography variant="body1">New Password</Typography>
            <OutlinedInput
              style={{ padding: '4px' }}
              value={values.newPassword}
              name="newPassword"
              type="password"
              autoComplete="new-password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.newPassword && errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} error={Boolean(touched.confirmPassword && errors.confirmPassword)}>
            <Typography variant="body1">Confirm Password</Typography>
            <OutlinedInput
              style={{ padding: '4px' }}
              value={values.confirmPassword}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Confirm
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewPassMain;
