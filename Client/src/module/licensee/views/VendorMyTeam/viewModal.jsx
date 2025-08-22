import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import commonStyles from 'assets/style/Style';
import { roleMapping } from 'module/utlities/user_name';
import { capitalize } from 'utils/Capitalised';
import { getUserById } from 'module/vendor/container/userContainer/slice';
import formatDateTime from 'utils/formatDateTime';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const userById = useSelector((state) => state.licenseeReducer.user.userByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getUserById(data.id));
    }
  }, [dispatch, data]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Name</Typography>
          <Typography sx={style.viewModalContent}>
            {capitalize(userById?.fName ? `${userById.fName} ${userById.lName}` : userById?.lName || '')}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Email</Typography>
          <Typography sx={style}>{userById?.email || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Mobile</Typography>
          <Typography sx={style.viewModalContent}>{userById?.mobileNo || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>User Role</Typography>
          <Typography sx={style.viewModalContent}>{userById?.role ? roleMapping[userById.role] : '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Created Date</Typography>
          <Typography sx={style.viewModalContent}>{formatDateTime(userById?.createdAt || '-')}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Status</Typography>
          <Typography sx={style.viewModalContent}>{userById?.status || '-'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewModal;
