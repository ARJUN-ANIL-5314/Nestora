import React, { useEffect } from 'react';
import { Box, CardHeader, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'container/LoginContainer/slice';
import Grid from '@mui/material/Grid';
import { capitalize } from 'utils/Capitalised';

const UserSection = () => {
  const userData = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  const capitalizeFirstLetter = (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const userFullName = userData ? `${capitalizeFirstLetter(userData.fName || '-')} ${capitalizeFirstLetter(userData.lName || '-')}` : '-';
  const orgName = userData ? `${capitalizeFirstLetter(userData.orgName || '')}` : '';

  return (
    <Box sx={{ ml: 5 }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-start' }}> */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'flex-start'
          }}
        >
          {userData ? <CardHeader key={userData.id} sx={{ m: 0, p: 0 }} title={orgName} /> : <p>Loading...</p>}
        </Grid>

        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {userData ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardHeader key={userData.id} sx={{ m: 0, p: 0 }} title={userFullName} />
              <Typography variant="body2" sx={{ textAlign: 'end', fontWeight: '450' }}>
                {capitalize(userData.role)}
              </Typography>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSection;
