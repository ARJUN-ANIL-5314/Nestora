import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCustomer } from 'module/vendor/container/customerContainer/slice';
import { userLogin } from 'container/LoginContainer/slice';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const Customers = ({ isLoading }) => {
  const theme = useTheme();

  // Access the customer count correctly
  const customerData = useSelector((state) => state.data.customers.customerData);
  const customerCount = customerData?.rows?.length || 0; // Extract the count from the rows
  const userDataDetailse = useSelector((state) => state.login.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomer());
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            {/* <List sx={{ py: 0, textDecoration: 'none' }} component={Link} to="/customers"> */}
            <List
              sx={{ py: 0, textDecoration: 'none' }}
              component={!userDataDetailse.ftLogin ? Link : 'div'}
              to={!userDataDetailse.ftLogin ? '/customers' : undefined}
            >
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '5px',
                      background: 'linear-gradient(210.04deg, #000000 29.06%, rgb(101 101 101 / 75%) 83.49%)',
                      color: '#ffffff',
                      mr: '10px'
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">Customers</Typography>}
                  secondary={
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                      {customerCount} {/* Display the correct customer count here */}
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

Customers.propTypes = {
  isLoading: PropTypes.bool
};

export default Customers;
