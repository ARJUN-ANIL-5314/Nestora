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

  const formatCustomDate = (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}> Owner Id</Typography>
            <Typography sx={style.viewModalContent}>{data?.mainCatgId?.orgId || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Main Category</Typography>
            <Typography sx={style.viewModalContent}>{data?.mainCatgId?.grpCatgName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Category</Typography>
            <Typography sx={style.viewModalContent}>{data?.catgId?.catgName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Sub Category</Typography>
            <Typography sx={style.viewModalContent}>{data?.subCatgId?.subCatgName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Comb Type</Typography>
            <Typography sx={style.viewModalContent}>{data.combType || '-'}</Typography>
          </Grid>

          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Item</Typography>
            <Typography sx={style.viewModalContent}>{data?.item.join(',') || '-'}</Typography>
          </Grid>

          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Value</Typography>
            <Typography sx={style.viewModalContent}>
              {data?.dispValue.length > 0 ? data.dispValue.map((item) => item.value).join(', ') : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Rate</Typography>
            <Typography sx={style.viewModalContent}> {data?.rate || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Created At</Typography>
            <Typography sx={style.viewModalContent}>{formatCustomDate(data?.createdAt) || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Updated At</Typography>
            <Typography sx={style.viewModalContent}>{formatCustomDate(data?.updatedAt) || '-'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
