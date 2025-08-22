import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { getUserById } from 'module/vendor/container/userContainer/slice';
import formatDateTime from 'utils/formatDateTime';
import { roleMapping } from 'module/utlities/user_name';

const capitalizeName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const userById = useSelector((state) => state.data.user.userByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getUserById(data?.id));
    }
  }, [dispatch, data]);

  const fullName = userById?.fName || userById?.lName ? `${capitalizeName(userById?.fName)} ${capitalizeName(userById?.lName)}` : '-';

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>User ID</Typography>
          <Typography sx={style.viewModalContent}>{userById?.usrRefId || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Name</Typography>
          <Typography sx={style.viewModalContent}>{fullName}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Email</Typography>
          <Typography sx={style}>{userById?.email || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>User Type</Typography>
          <Typography sx={style.viewModalContent}>{userById?.userType ? roleMapping[userById.userType] : '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Licensee Type</Typography>
          <Typography sx={style.viewModalContent}>{userById?.licnseType || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Mobile</Typography>
          <Typography sx={style.viewModalContent}>{userById?.mobileNo || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>User Role</Typography>
          <Typography sx={style.viewModalContent}>{userById?.role || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Status</Typography>
          <Typography sx={style.viewModalContent}>{userById?.status || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Created Date</Typography>
          <Typography sx={style.viewModalContent}>{formatDateTime(userById?.createdAt)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewModal;
