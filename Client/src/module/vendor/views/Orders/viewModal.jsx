// import React from 'react'

// function viewModal() {
//   return (
//     <div>Work in Process...</div>
//   )
// }

// export default viewModal

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';
// import { roleMapping } from 'module/utlities/user_name'

// import { getUserById } from 'module/vendor/container/userContainer/slice';
import { getOrderCreatedBy } from 'module/vendor/container/orderContainer/slice';
const ViewModal = ({ data }) => {
  // const theme = useTheme();
  // const style = commonStyles(theme);
  const dispatch = useDispatch();
  // const userById = useSelector((state) => state.licenseeReducer.user.userByIdData);

  const orderById = useSelector((state) => state.data.order.orderByIdData);

  // console.log('===============userid=====================', userById);
  console.log('===============orderById=====================', orderById);

  useEffect(() => {
    if (data?.id) {
      dispatch(getOrderCreatedBy(data?.id));
    }
  }, [dispatch, data]);
  // console.log('================data====================', data.id);

  return (
    <>
      {/* <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>First Name</Typography>
            <Typography sx={style.viewModalContent}>{orderById?.fName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Last Name</Typography>
            <Typography sx={style.viewModalContent}>{orderById?.lName || '-'}</Typography>
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

            <Typography sx={style.viewModalContent}> {userById?.role ? roleMapping[userById.role] : '-'}
            </Typography>
          </Grid>

        </Grid>
      </Box> */}
    </>
  );
};

export default ViewModal;
