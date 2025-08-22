import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { roleMapping } from 'module/utlities/user_name';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { getUserById } from 'module/vendor/container/userContainer/slice';
import { useState } from 'react';
import formatDate from 'utils/formatDate';
import { capitalize } from 'utils/Capitalised';
const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const userById = useSelector((state) => state.data.user.userByIdData);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (data?.id) {
      dispatch(getUserById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="View Modal Tabs">
          <Tab label="Basic Details" />
          <Tab label="Owner Details" />
        </Tabs>
        {activeTab === 0 && (
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Name</Typography>
                <Typography sx={style.viewModalContent}>{`${userById.fName} ${userById.lName}` || '-'}</Typography>
              </Grid>
              {/* <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Last Name</Typography>
            <Typography sx={style.viewModalContent}>{userById?.lName || '-'}</Typography>
          </Grid> */}
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
                {/* <Typography sx={style.viewModalContent}> {userById?.role }</Typography> */}
                <Typography sx={style.viewModalContent}>{userById?.role ? roleMapping[userById.role] : '-'}</Typography>
              </Grid>

              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Created Date</Typography>
                <Typography sx={style.viewModalContent}>{formatDate(userById?.createdAt || '-')}</Typography>
              </Grid>
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Status</Typography>
                <Typography sx={style.viewModalContent}>{userById?.status || '-'}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 1 && (
          <Box p={3}>
            {/* Add General Details here */}
            <Grid container spacing={3}>
              {/* Add additional fields as required */}
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Name</Typography>
                <Typography sx={style.viewModalContent}>{`${userById?.createdBy?.fName} ${userById?.createdBy?.lName}` || '-'}</Typography>
              </Grid>
              {/* <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Last Name</Typography>
            <Typography sx={style.viewModalContent}>{userById?.lName || '-'}</Typography>
          </Grid> */}
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Email</Typography>
                <Typography sx={style}>{userById?.createdBy?.email || '-'}</Typography>
              </Grid>
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Mobile</Typography>
                <Typography sx={style.viewModalContent}>{userById?.createdBy?.mobileNo || '-'}</Typography>
              </Grid>

              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Org Name</Typography>
                <Typography sx={style.viewModalContent}>{capitalize(userById?.orgName || '-')}</Typography>
              </Grid>

              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Created Date</Typography>
                <Typography sx={style.viewModalContent}>{formatDate(userById?.createdBy?.createdAt || '-')}</Typography>
              </Grid>
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <Typography sx={style.viewModalLab}>Status</Typography>
                <Typography sx={style.viewModalContent}>{userById?.createdBy?.status || '-'}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ViewModal;
