// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { SendOtpRequest } from 'container/LoginContainer/slice';

const ForgetMain = ({ ...others }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        mobileNo: ''
      }}
      validationSchema={Yup.object().shape({
        mobileNo: Yup.string()
          .matches(/^[0-9]+$/, 'Must be a valid mobile number')
          .required('Mobile number is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          // Send the request with the mobileNo as payload
          // await dispatch(SendOtpRequest({ mobileNo: values.mobileNo, navigate }));
          // navigate('/EnterOTP');
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
          <FormControl fullWidth error={Boolean(touched.mobileNo && errors.mobileNo)}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1">Mobile</Typography>
            </Box>
            <OutlinedInput style={{ padding: '4px' }} value={values.mobileNo} name="mobileNo" onBlur={handleBlur} onChange={handleChange} />
            {touched.mobileNo && errors.mobileNo && <FormHelperText error>{errors.mobileNo}</FormHelperText>}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Get OTP
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgetMain;
