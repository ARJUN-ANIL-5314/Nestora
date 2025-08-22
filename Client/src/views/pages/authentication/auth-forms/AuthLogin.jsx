import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userLogin } from '../../../../container/LoginContainer/slice';


const FirebaseLogin = ({ ...others }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
        .email('Must be a valid email address') 
        .required('Email is required'),
        password: Yup.string().required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          const value = {
            ...values,
            navigate
          };
          dispatch(userLogin(value));
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others} >
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1">Email</Typography>
            </Box>
            <OutlinedInput style={{ padding: '4px' }} value={values.email} name="email" onBlur={handleBlur} onChange={handleChange} />
            {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
            <Box sx={{ mb: 1, mt: 3 }}>
              <Typography variant="body1">Password</Typography>
            </Box>
            <OutlinedInput
              style={{ padding: '4px' }}
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
          </FormControl>

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography
              variant="subtitle1"
              color="secondary"
              component={Link}
              to="/forgot-password"
              style={{ marginTop: '20px', fontWeight: 'bold' }}
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </Typography>
          </Stack>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" className='!impotant bg-dark-b hover:bg-blue-400 hover:text-dark-b '>
                Login
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FirebaseLogin;