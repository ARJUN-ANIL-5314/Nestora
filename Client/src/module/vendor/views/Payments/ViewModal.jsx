import React from 'react';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';

const ViewModal = ({ data }) => {
  console.log('🚀 ~ ViewModal ~ data:', data);
  const theme = useTheme();
  const style = commonStyles(theme);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Payment No</Typography>
            <Typography sx={style.viewModalContent}>{data?.paymentNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Customer Type</Typography>
            <Typography sx={style.viewModalContent}>{data?.custType || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Name</Typography>
            <Typography sx={style.viewModalContent}>{data?.fName + ' ' + data?.lName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Email</Typography>
            <Typography sx={style.viewModalContent}>{data?.custEmail || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Mobile</Typography>
            <Typography sx={style}>{data?.custContactNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Order Date</Typography>
            <Typography sx={style.viewModalContent}>{data?.orderDate || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Paid Amount</Typography>
            <Typography sx={style.viewModalContent}> {data?.paidAmnt || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Paid Date</Typography>
            <Typography sx={style}>{data?.paidDate || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Due Date</Typography>
            <Typography sx={style}>{data?.dueDate || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Payment Mode</Typography>
            <Typography sx={style.viewModalContent}>{data?.payMode || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Bank RefNo</Typography>
            <Typography sx={style.viewModalContent}>{data?.bankRefNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Payment No</Typography>
            <Typography sx={style.viewModalContent}>{data?.paymentNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Razor PaymentId</Typography>
            <Typography sx={style.viewModalContent}>{data?.razorPaymentId || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Org Type</Typography>
            <Typography sx={style.viewModalContent}>{data?.orgType || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Status</Typography>
            <Typography sx={style.viewModalContent}>{data?.status || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Remarks</Typography>
            <Typography sx={style.viewModalContent}>{data?.remarks || '-'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
