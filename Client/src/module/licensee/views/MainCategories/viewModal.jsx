import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { getMainCategoryById } from 'module/licensee/container/mainCategoryContainer/slice';
import { capitalize } from 'utils/Capitalised';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const mainCategoryById = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getMainCategoryById(data.id));
    }
  }, [dispatch, data]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Name</Typography>
          <Typography sx={style.viewModalContent}>{capitalize(mainCategoryById?.grpCatgName) || '-'}</Typography>
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Visibility</Typography>
          <Typography sx={style.viewModalContent}>
            {mainCategoryById?.isActive != null ? (mainCategoryById.isActive ? 'Active' : 'In Active') : '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Image</Typography>
          <Box
            sx={{
              paddingTop: '16px',
              paddingLeft: '0px',
              display: 'inline-grid',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mainCategoryById?.grpCatgImg ? (
              <img
                src={mainCategoryById.grpCatgImg}
                alt=""
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  width: '75%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid grey'
                }}
              />
            ) : (
              <Typography sx={style.viewModalContent}>-</Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <Typography sx={style.viewModalLab}>Description</Typography>
          <Typography sx={style.viewModalContent}>{capitalize(mainCategoryById?.grpCatgDescp) || '-'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewModal;
