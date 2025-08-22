import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCreatedBy } from 'module/vendor/container/userContainer/slice';
import { IconUserPlus } from '@tabler/icons';
import { Link } from 'react-router-dom';
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

const Vendors = ({ isLoading }) => {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.userData);
  const userDataDas = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(getUserCreatedBy({}));
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails?.rows) {
      const licenseeData = userDetails.rows.filter((row) => row.role === 'vendor');
      setCount(licenseeData.length);
    }
  }, [userDetails]);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            {/* <List sx={{ py: 0 , textDecoration:'none'}} component={Link} to="/vendor">  */}
            <List
              sx={{ py: 0, textDecoration: 'none' }}
              component={!userDataDas.ftLogin ? Link : 'div'}
              to={!userDataDas.ftLogin ? '/vendor' : undefined}
            >
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '5px',
                    background: 'linear-gradient(210.04deg, #000000 29.06%, rgb(101 101 101 / 75%) 83.49%)',
                    color: '#ffffff',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconUserPlus style={{ fontSize: '50px' }} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">Vendor</Typography>}
                  secondary={
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                      {count}
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

Vendors.propTypes = {
  isLoading: PropTypes.bool
};

export default Vendors;
