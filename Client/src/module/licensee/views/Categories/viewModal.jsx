import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';
import { getCategoryById } from 'module/licensee/container/category/slice';
import { capitalize } from 'utils/Capitalised';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const categoryById = useSelector((state) => state.licenseeReducer.category.categoryByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getCategoryById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Name</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(categoryById?.catgName || '-')}</Typography>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Main Category</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(categoryById?.grpCatgId?.grpCatgName || '-')}</Typography>
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
              {categoryById?.grpCatgImg ? (
                <img
                  src={categoryById.grpCatgImg}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    width: '50%',
                    maxHeight: '300px',
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
            <Typography sx={style.viewModalContent}>{capitalize(categoryById?.catgDescp || '-')}</Typography>
            {/* </Grid>
          <Grid item xs={12} md={6} sm={12}> */}
            <div style={{ paddingTop: '20px' }}>
              <Typography sx={style.viewModalLab}>Visibility</Typography>
              <Typography sx={style.viewModalContent}>{categoryById?.isActive ? 'Active' : 'In Active' || '-'}</Typography>
            </div>
          </Grid>

          {/* <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Status</Typography>
            <Typography sx={style.viewModalContent}>{categoryById?.isActive ? 'True' : 'False' || '-'}</Typography>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
