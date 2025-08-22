import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  // const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false); // Default to unchecked

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={4}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
             className='rounded-md'
            >
              <Box sx={{ mr: matchDownSM ? 1 : 2, width: 20 }} >
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
        </Grid>

        <Grid item xs={14}>
          <Divider  />
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            
            const response = await fetch('http://localhost:3002/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });
        
            const data = await response.json();
        
            if (response.ok) {
              setStatus({ success: true });
              alert('User registered successfully!');
            } else {
              setErrors({ submit: data.error });
            }
            
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setErrors({ submit: 'Something went wrong' });
            setSubmitting(false);
          }
          
        }}
        
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" margin="normal" name="fname" type="text" autoComplete="off" variant="outlined"  sx={{ padding: '3px' }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" margin="normal" name="lname" type="text" autoComplete="off" variant="outlined" sx={{ padding: '3px' }} />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} margin="normal" variant="outlined" sx={{ padding: '3px' }}>
              <InputLabel >Email Address / Username</InputLabel>
              <OutlinedInput id="email" type="email" value={values.email} name="email" onBlur={handleBlur} onChange={handleChange} autoComplete="off" label="Email Address / Username" />
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} margin="normal" variant="outlined" sx={{ padding: '3px' }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="new-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox className='pl-4' checked={checked} onChange={(event) => setChecked(event.target.checked)} color="primary" />}
                  label={<Typography variant="subtitle1">Agree with <Link to="#">Terms & Condition.</Link></Typography>}
                />
              </Grid>
            </Grid>

            {errors.submit && <Box sx={{ mt: 3 }}><FormHelperText error>{errors.submit}</FormHelperText></Box>}

            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <Button 
                className='text-white bg-dark-b font-semibold'
                  disableElevation 
                  disabled={isSubmitting} 
                  fullWidth 
                  size="large" 
                  type="submit" 
                  variant="contained"
                  sx={{ 
                    backgroundColor: 'dark-blue !important', // Force black button
                    color: '#FFFFFF !important', // Force white text
                    '&:hover': {
                      backgroundColor: '#7897ff !important' ,
                      color:'dark-blue !important'// Darker black on hover
                    }
                  }}
                >
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
