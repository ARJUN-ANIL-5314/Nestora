import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import commonStyles from 'assets/style/Style';
import { getCategoryById } from 'module/licensee/container/category/slice';
import { getSubCategoryById } from 'module/licensee/container/subCategoryContainer/slice';
import { capitalize } from 'utils/Capitalised';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const subCategoryById = useSelector((state) => state.licenseeReducer.subCategory.subCategoryByIdData);
  const categoryDetails = useSelector((state) => state.licenseeReducer.category.categoryByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getSubCategoryById(data?.id));
      dispatch(getCategoryById(data?.catgId));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Main Category</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(subCategoryById?.grpCatgId?.grpCatgName || '-')}</Typography>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Category</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(subCategoryById?.catgId?.catgName || '-')}</Typography>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Name</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(subCategoryById?.subCatgName || '-')}</Typography>
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{capitalize(subCategoryById?.subCatgDescp || '-')}</Typography>
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
              {subCategoryById?.subCatgImg ? (
                <img
                  src={subCategoryById.subCatgImg}
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
            <Typography sx={style.viewModalLab}>Visibility</Typography>
            <Typography sx={style.viewModalContent}>{categoryDetails.isActive ? 'Active' : 'In Active' || '-'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
