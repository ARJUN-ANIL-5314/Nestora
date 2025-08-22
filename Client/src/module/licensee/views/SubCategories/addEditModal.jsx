import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { getCategory } from 'module/licensee/container/category/slice';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import commonStyles from 'assets/style/Style';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { Box, Grid, Button, Checkbox, FormControlLabel, FormLabel, MenuItem, Select, FormGroup } from '@mui/material';
import { uploadImageRequest, updateimgById, uploadImageNull } from 'module/licensee/container/imgcontainer/slice';
import { addSubCategory, getSubCategoryById, updateSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
import { fetchCategoryByFilter } from 'module/licensee/container/RateCardContainer/slice';

const AddEditSubCategoryModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();

  const mainCategory = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
  const getCategoryData = useSelector((state) => state.licenseeReducer.RateCard.CategoryDatas);
  const subCategoryById = useSelector((state) => state.licenseeReducer.subCategory.subCategoryByIdData);
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);
  const [uploadError, setUploadError] = useState('');
  const [selectedImage, setSelectedImage] = useState(data?.subCatgImg);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log('==getCategoryData', getCategoryData);

  useEffect(() => {
    dispatch(getMainCategory());
    dispatch(getCategory());

    if (data && data.id) {
      dispatch(getSubCategoryById(data.id));
    }
    if (uploadedImageUrl) {
      setImageUploaded(true);
      setUploading(false);
    }
  }, [dispatch, data, uploadedImageUrl]);

  useEffect(() => {
    if (formtype === 'editform' && subCategoryById) {
      dispatch(fetchCategoryByFilter(subCategoryById.grpCatgId?.id));
    }
  }, [dispatch, formtype, subCategoryById]);

  const initialValues = {
    subCatgImg: formtype === 'editform' ? selectedImage || '' : '',
    subCatgName: formtype === 'editform' ? subCategoryById?.subCatgName || '' : '',
    grpCatgId: formtype === 'editform' ? subCategoryById?.grpCatgId?.id || '' : '',
    subCatgDescp: formtype === 'editform' ? subCategoryById?.subCatgDescp || '' : '',
    isActive: formtype === 'editform' ? subCategoryById?.isActive ?? false : true,
    catgId: formtype === 'editform' ? subCategoryById?.catgId?.id || '' : ''
  };

  const validationSchema = Yup.object({
    subCatgName: Yup.string().required('Name is required'),
    subCatgImg: Yup.string().required('Image is required'),
    grpCatgId: Yup.string().required('Main Category is required'),
    subCatgDescp: Yup.string().required('Description is required'),
    catgId: Yup.string().required('Category is required')
  });

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;

    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif'].includes(fileType)) {
      setUploadError('Only png,jpg,jpeg,svg and gif formats are allowed.');
      return;
    }

    if (fileSize > 400 * 1024) {
      setUploadError('File size should not exceed 400 KB.');
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    setUploading(true);
    dispatch(uploadImageRequest(file));
    setUploadError('');
  };

  const handleModalClose = () => {
    handleClose();
    setSelectedImage('');
    dispatch(uploadImageNull());
  };

  const onSubmit = async (values, { resetForm }) => {
    if (!imageUploaded || uploading) {
      console.error('Image is not uploaded yet');
      return;
    }

    const categoryData = {
      grpCatgId: values.grpCatgId,
      subCatgName: values.subCatgName,
      subCatgDescp: values.subCatgDescp,
      isActive: values.isActive,
      catgId: values.catgId,
      subCatgImg: selectedImage
    };

    try {
      if (formtype === 'addform') {
        await dispatch(addSubCategory(categoryData));
      } else {
        categoryData.id = data.id;
        await dispatch(updateSubCategory(categoryData));
        if (selectedImage !== subCategoryById?.subCatgImg) {
          await dispatch(updateimgById({ id: data.id, image: uploadedImageUrl }));
        }
      }
      handleModalClose();
      handleClose();
      resetForm();
      dispatch(uploadImageNull());
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Main Category<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="grpCatgId"
                  value={values.grpCatgId}
                  onChange={(e) => {
                    setFieldValue('grpCatgId', e.target.value);
                    dispatch(fetchCategoryByFilter(e.target.value));
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ height: '56px', marginTop: '8px' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Main Category
                  </MenuItem>
                  {mainCategory?.rows?.map((catg) => (
                    <MenuItem key={catg.id} value={catg.id}>
                      {capitalizeFirstLetter(catg.grpCatgName)}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="grpCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Category<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="catgId"
                  value={values.catgId}
                  onChange={(e) => {
                    setFieldValue('catgId', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ height: '56px', marginTop: '8px' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {getCategoryData?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {capitalizeFirstLetter(category.catgName)}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="subCatgName" id="subCatgName" placeholder="Name" component={Textfield} />
                <ErrorMessage name="subCatgName" component="div" style={{ color: '#f54d4f', fontSize: 12, marginBottom: '16px' }} />

                {/* </Grid>
              <Grid item xs={12} sm={6}> */}
                <FormLabel>
                  Description<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield multiline minRows={4} maxRows={4} id="subCatgDescp" name="subCatgDescp" placeholder="Description" />
                <ErrorMessage name="subCatgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>Visibility</FormLabel>

                <FormGroup sx={{ marginTop: '8px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={style.ChecboxColor}
                        name="isActive"
                        checked={values.isActive}
                        onChange={() => setFieldValue('isActive', !values.isActive)}
                      />
                    }
                    label="Active"
                  />
                </FormGroup>

                {/* </Grid>

              <Grid item xs={12} sm={6} md={6}> */}
                <div style={{ textAlign: 'left' }}>
                  <input
                    type="file"
                    name="myImage"
                    style={{ display: 'none', paddingTop: '12px' }}
                    id="contained-button-file"
                    onChange={(event) => {
                      handleUploadImage(event);
                      setFieldValue('subCatgImg', event.currentTarget.files[0]);
                    }}
                  />

                  <div>
                    <label htmlFor="contained-button-file">
                      <button
                        type="button"
                        onClick={() => document.getElementById('contained-button-file').click()}
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          borderRadius: '8px',
                          padding: '12px 20px',
                          textTransform: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginBottom: '8px',
                          fontSize: '16px',
                          transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#333';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#000';
                        }}
                      >
                        Upload Image<span style={{ color: 'red' }}>*</span>
                      </button>
                    </label>
                    <div style={{ color: 'grey', fontSize: 12, marginTop: '8px' }}>
                      <ul>
                        <li>File size should be below 400 KB</li>
                        <li>Files should be in PNG, JPG format</li>
                      </ul>
                    </div>
                  </div>

                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt=""
                      style={{
                        maxWidth: '100%',
                        height: '130px',
                        borderRadius: '8px',
                        marginTop: '8px'
                      }}
                    />
                  )}
                  <ErrorMessage name="subCatgImg" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  {uploadError && <div style={{ color: 'red', fontSize: 12, marginTop: '8px' }}>{uploadError}</div>}
                </div>
              </Grid>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" sx={style.changeBtn} disabled={uploading}>
                Save
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditSubCategoryModal;
