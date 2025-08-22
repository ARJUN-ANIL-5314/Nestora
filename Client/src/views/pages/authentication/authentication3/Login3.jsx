import { Link } from 'react-router-dom';
import 'assets/style/login3.css';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
// import { motion } from 'framer-motion';
// import { ReactComponent as LeftSVG } from 'assets/images/auth/back.svg';
// import LeftSVG from 'assets/images/auth/LOG1.png';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1 >
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} className="mainGrid LeftIMG">
          <div className="imglft">
          <div className="hidden lg:block text-left bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-custom-shadow max-w-[380px]">
  <h2 className="text-2xl md:text-3xl font-bold text-dark-b leading-snug tracking-wide">
    <span className="text-4xl text-light-b font-extrabold">F</span>inding Spaces<br />
    <span className="text-4xl text-light-b font-extrabold">C</span>reating Futures
  </h2>
  <p className="text-sm text-black italic pt-4">
    Start your real estate journey with confidence&mdash;whether you&rsquo;re looking for a new home, an investment opportunity, or a fresh start, we&rsquo;re here to guide you every step of the way.
  </p>
</div>



          </div>
        </Grid>
        <Grid item xs={12} md={6} className="mainGrid">
          <AuthCardWrapper className='border-2 border-dark-b '>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 1 }}>
                <Link to="#">
                  <Logo />
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={matchDownSM ? 'column-reverse' : 'row'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography
                        color={theme.palette.secondary.main}
                        gutterBottom
                        variant={matchDownSM ? 'h3' : 'h2'}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign={matchDownSM ? 'center' : 'inherit'}
                      >
                        Sign in with Email & Password
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={14}>
                <AuthLogin />
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>

        
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
