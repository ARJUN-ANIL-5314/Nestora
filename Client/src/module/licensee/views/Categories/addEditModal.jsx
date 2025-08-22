import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
// import commonStyles from 'assets/style/Style';
import { Box, Grid, FormLabel, Button, Checkbox, FormControlLabel, MenuItem, Select, FormGroup } from '@mui/material';
import { uploadImageRequest, updateimgById } from 'module/licensee/container/imgcontainer/slice';
import { addCategory, getCategoryById, updateCategory } from 'module/licensee/container/category/slice';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  // const theme = useTheme();
  // const style = commonStyles(theme);
  const dispatch = useDispatch();

  const categoryById = useSelector((state) => state.licenseeReducer.category.categoryByIdData);
  const mainCategory = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);
  const [uploadError, setUploadError] = useState('');
  const [selectedImage, setSelectedImage] = useState(data?.grpCatgImg);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(getMainCategory());
    if (data && data.id) {
      dispatch(getCategoryById(data.id));
    }
    if (uploadedImageUrl) {
      setImageUploaded(true);
      setUploading(false);
    }
  }, [dispatch, data, uploadedImageUrl]);

  const initialValues = {
    grpCatgImg: formtype === 'editform' ? selectedImage || '' : '',
    catgName: formtype === 'editform' ? categoryById?.catgName || '' : '',
    catgDescp: formtype === 'editform' ? categoryById?.catgDescp || '' : '',
    grpCatgId: formtype === 'editform' ? categoryById?.grpCatgId?.id || '' : '',
    isActive: formtype === 'editform' ? data?.isActive || false : true
  };

  const validationSchema = Yup.object({
    catgName: Yup.string().required('Name is required'),
    grpCatgImg: Yup.string().required('Image is required'),
    grpCatgId: Yup.string().required('Main Category is required'),
    catgDescp: Yup.string().required('Description is required')
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

  const onSubmit = async (values, { resetForm }) => {
    if (!imageUploaded || uploading) {
      console.error('Image is not uploaded yet');
      return;
    }

    const categoryData = {
      catgName: values.catgName,
      catgDescp: values.catgDescp,
      grpCatgId: values.grpCatgId,
      isActive: values.isActive,
      grpCatgImg: selectedImage
    };

    console.log('Submitting category data:', categoryData);

    try {
      if (formtype === 'addform') {
        await dispatch(addCategory(categoryData));
        console.log('Category Added Successfully');
      } else {
        categoryData.id = data.id;
        await dispatch(updateCategory(categoryData));
        console.log('Category Updated Successfully');
        if (selectedImage !== categoryById?.grpCatgImg) {
          await dispatch(updateimgById({ id: data.id, image: uploadedImageUrl }));
        }
      }

      handleClose();
      resetForm();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Main Category<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="grpCatgId"
                  id="grpCatgId"
                  value={values.grpCatgId}
                  onChange={(e) => setFieldValue('grpCatgId', e.target.value)}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '56px',
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid black',
                    marginTop: '8px'
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Main Category
                  </MenuItem>
                  {mainCategory?.rows?.map((grpCatg) => (
                    <MenuItem key={grpCatg.id} value={grpCatg.id}>
                      {capitalizeFirstLetter(grpCatg.grpCatgName)}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="grpCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '12px' }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="catgName" id="catgName" placeholder="Name" component={Textfield} />
                <ErrorMessage name="catgName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Description<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  multiline
                  minRows={4}
                  maxRows={6}
                  name="catgDescp"
                  id="catgDescp"
                  placeholder="Description"
                  component={Textfield}
                />
                <ErrorMessage name="catgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <input
                  type="file"
                  name="myImage"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  onChange={(event) => {
                    handleUploadImage(event);
                    setFieldValue('grpCatgImg', event.currentTarget.files[0]);
                  }}
                />
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
                  <div>
                    <ul>
                      <li>File size should be below 400 KB</li>
                      <li>Files should be in PNG, JPG, GIF, or SVG format</li>
                    </ul>
                  </div>
                </div>
                <ErrorMessage name="grpCatgImg" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                {uploadError && <div style={{ color: 'red', fontSize: 12, marginTop: '8px' }}>{uploadError}</div>}
                <Grid item xs={12} sm={6}>
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
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>Visibility</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isActive"
                        id="isActive"
                        color="primary"
                        checked={values.isActive}
                        onChange={(e) => setFieldValue('isActive', e.target.checked)}
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: 'black',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#black'
                      }
                    }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
