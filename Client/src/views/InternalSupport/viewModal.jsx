import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { roleMapping } from 'module/utlities/user_name';
import formatDateTime from 'utils/formatDateTime';
import { capitalize } from 'utils/Capitalised';
import { getSupportById } from 'container/SupportContainer/slice';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const supportById = useSelector((state) => state.support.supportByIdData);
  useEffect(() => {
    if (data?.id) {
      dispatch(getSupportById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Ticket No</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.ticketNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Type</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(supportById?.sprtType || '-')}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Title</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(supportById?.sprtTitle || '-')}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Created Date</Typography>
            <Typography sx={style.viewModalContent}>{formatDateTime(supportById?.createdAt) || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Priority</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(supportById?.priority || '-')}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Name</Typography>
            <Typography sx={style.viewModalContent}>
              {capitalize(supportById?.createdBy?.fName + ' ' + supportById?.createdBy?.lName || '-')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Mobile No</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.createdBy?.mobileNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Role</Typography>
            <Typography sx={style.viewModalContent}>
              {capitalize(supportById?.createdBy?.role ? roleMapping[supportById.createdBy.role] : '-')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>OrgId</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.orgId || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>OrgName</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(supportById?.orgName || '-')}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(supportById?.desc || '-')}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Status</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.status || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Image</Typography>
            {/* Display the selected image with reduced size */}
            {supportById?.imgUrls && (
              <img
                src={supportById.imgUrls}
                alt="Selected"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }} // Adjust maximum height as needed
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
