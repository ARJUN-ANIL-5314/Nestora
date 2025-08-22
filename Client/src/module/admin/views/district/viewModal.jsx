import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { getDistrictById } from 'module/admin/container/districtContainer/slice';

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (text) => {
  if (!text) return '-';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const districtById = useSelector((state) => state.adminReducer.district.districtByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getDistrictById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>State</Typography>
          <Typography sx={style.viewModalContent}>{districtById?.stateId?.name || '-'}</Typography>
        </Grid>
        <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Name</Typography>
          <Typography sx={style.viewModalContent}>{capitalizeFirstLetter(districtById?.name)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewModal;
