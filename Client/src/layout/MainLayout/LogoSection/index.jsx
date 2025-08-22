import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo2 from 'ui-component/Logo2';
import { MENU_OPEN } from 'store/actions';

// Styled component for the logo
const StyledLogo = styled(Logo2)`
  width: 150px; /* Adjust the width value as needed */
`;

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();

  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <StyledLogo />
      {/* <h1 style={{fontWeight:'bold'}}>OMS</h1> */}
    </ButtonBase>
  );
};

export default LogoSection;
