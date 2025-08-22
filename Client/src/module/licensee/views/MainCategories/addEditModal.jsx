import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { addMainCategory, updateMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { uploadImageRequest, updateimgById, uploadImageNull } from 'module/licensee/container/imgcontainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);

  const [selectedImage, setSelectedImage] = useState(data?.grpCatgImg);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (uploadedImageUrl) {
      setImageUploaded(true);
      setUploading(false);
    }
  }, [uploadedImageUrl]);

  const initialValues = {
    grpCatgName: formtype === 'editform' ? data?.grpCatgName || '' : '',
    grpCatgDescp: formtype === 'editform' ? data?.grpCatgDescp || '' : '',
    grpCatgImg: formtype === 'editform' ? selectedImage || '' : '',
    isActive: formtype === 'editform' ? data?.isActive || false : true
  };

  const validationSchema = Yup.object({
    grpCatgName: Yup.string().required('Name is required'),
    grpCatgImg: Yup.string().required('Image is required'),
    grpCatgDescp: Yup.string().required('Description is required')
  });

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif'].includes(fileType)) {
        setUploadError('Only png, jpg, jpeg, svg, and gif formats are allowed.');
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
    }
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
      grpCatgName: values.grpCatgName,
      grpCatgDescp: values.grpCatgDescp,
      isActive: values.isActive,
      grpCatgImg: selectedImage
    };

    console.log('categoryData0', categoryData);

    try {
      if (formtype === 'addform') {
        await dispatch(addMainCategory(categoryData));
      } else {
        categoryData.id = data.id;
        await dispatch(updateMainCategory(categoryData));
        if (selectedImage !== data?.grpCatgImg) {
          await dispatch(updateimgById({ id: data.id, image: uploadedImageUrl }));
        }
      }

      handleModalClose();
      resetForm();
      setSelectedImage('');
      dispatch(uploadImageNull());
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
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Name<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield name="grpCatgName" id="grpCatgName" placeholder="Name" component={Textfield} />
                <ErrorMessage name="grpCatgName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} sm={4}>
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
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>
                  Description<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  multiline
                  minRows={4}
                  maxRows={6}
                  name="grpCatgDescp"
                  id="grpCatgDescp"
                  placeholder="Description"
                  component={Textfield}
                />
                <ErrorMessage name="grpCatgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
            </Grid>
            <Grid container>
              <Grid xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" sx={style.changeBtn} disabled={uploading}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
