import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'module/vendor/container/userContainer/slice';
// assets
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { userLogin } from 'container/LoginContainer/slice';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const MyteamDarkCard = ({ isLoading }) => {
  const dataval = useSelector((state) => state.data.user.userData.count);
  const dispatch = useDispatch();
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper
          border={false}
          content={false}
          component={!userDataDetailse.ftLogin ? Link : 'div'}
          to={!userDataDetailse.ftLogin ? '/myteam' : undefined}
        >
          <Box sx={{ p: 2, height: '103px', display: 'flex', alignItems: 'center' }}>
            <List sx={{ py: 0, textDecoration: 'none' }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h3" sx={{ color: '#fff' }}>
                      My Team
                    </Typography>
                  }
                  secondary={
                    <Typography variant="h5" sx={{ color: 'primary.light', mt: 0.25 }}>
                      {dataval}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

MyteamDarkCard.propTypes = {
  isLoading: PropTypes.bool
};

export default MyteamDarkCard;
