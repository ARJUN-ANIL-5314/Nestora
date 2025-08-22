import PropTypes from 'prop-types';

// material-ui
// import EarningIcon from 'assets/images/icons/earning.svg';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { Link } from 'react-router-dom';
import { getPayments } from 'module/vendor/container/paymentContainer/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from 'container/LoginContainer/slice';
// assets
// import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles

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

const Payment = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const PaymentData = useSelector((state) => state.data.payment.PaymentData.count);
  const PaymentDatas = PaymentData ? PaymentData : 0;
  const userDataDetailse = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getPayments());
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List
              sx={{ py: 0, textDecoration: 'none' }}
              component={!userDataDetailse.ftLogin ? Link : 'div'}
              to={!userDataDetailse.ftLogin ? '/Payments' : undefined}
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
                  >
                    {/* <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" /> */}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">Payment</Typography>}
                  secondary={
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                      {PaymentDatas}
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

Payment.propTypes = {
  isLoading: PropTypes.bool
};

export default Payment;
