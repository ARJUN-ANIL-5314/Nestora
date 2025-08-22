import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthWrapper1 from '../../AuthWrapper1';
import AuthCardWrapper from '../../AuthCardWrapper';
import OTPMain from './OTPMain';
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';

const EnterOTP = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '80vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 1 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Enter OTP
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter the OTP sent to your Mobile Number
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <OTPMain />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper1>
  );
};

export default EnterOTP;
