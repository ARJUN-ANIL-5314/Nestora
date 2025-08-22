// material-ui
import { styled } from '@mui/material/styles';
import MainSvg from 'assets/images/Home/build-img.jpg';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(() => ({
  minHeight: '100vh',
  width: '100%',
  backgroundImage: `url(${MainSvg})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // change from 110% to 'cover' for responsiveness
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default AuthWrapper1;
