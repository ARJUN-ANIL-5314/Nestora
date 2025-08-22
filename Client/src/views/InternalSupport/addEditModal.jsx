import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import { Button, MenuItem, TextField } from '@mui/material';
import commonStyles from 'assets/style/Style';
import Textfield from 'ui-component/common/TextField';
import { addSupport, updateSupport } from '../../container/SupportContainer/slice';
import { uploadImageRequest, updateimgById } from 'module/licensee/container/imgcontainer/slice';
import { capitalize } from 'utils/Capitalised';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);

  const [selectedImage, setSelectedImage] = useState(data?.imgUrls);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (uploadedImageUrl) {
      setImageUploaded(true);
      setUploading(false);
    }
  }, [dispatch, uploadedImageUrl]);

  const handleModalClose = () => {
    handleClose();
  };

  const initialValues = {
    sprtType: formtype === 'editform' ? data?.sprtType || '' : '',
    priority: formtype === 'editform' ? data?.priority || '' : '',
    desc: formtype === 'editform' ? data?.desc || '' : '',
    sprtTitle: formtype === 'editform' ? data?.sprtTitle || '' : '',
    imgUrls: formtype === 'editform' ? data?.imgUrls || '' : '',
    status: formtype === 'editform' ? data?.status || '' : ''
  };

  const validationSchema = Yup.object({
    sprtTitle: Yup.string().required('Title is required'),
    priority: Yup.string().required('Priority is required'),
    desc: Yup.string().required('Description is required')
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

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const onSubmit = async (values, { resetForm }) => {
    if (!imageUploaded || uploading) {
      console.error('Image is not uploaded yet');
      return;
    }

    const supportData = {
      sprtType: values.sprtType,
      priority: values.priority,
      desc: values.desc,
      sprtTitle: values.sprtTitle,
      imgUrls: selectedImage,
      status: values.status
    };

    try {
      if (formtype === 'addform') {
        await dispatch(addSupport(supportData));
      } else {
        supportData.id = data.id;
        await dispatch(updateSupport(supportData));
        if (selectedImage !== data?.imgUrls) {
          await dispatch(updateimgById({ id: data.id, image: uploadedImageUrl }));
        }
      }

      handleModalClose();
      resetForm();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function capitalizeFirstLetter(value) {
    return value?.charAt(0)?.toUpperCase() + value?.slice(1);
  }

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Type</FormLabel>
                <TextField
                  name="type"
                  id="type"
                  value={capitalize('internal')}
                  variant="outlined"
                  disabled
                  fullWidth
                  style={{
                    color: '#000',
                    height: '49px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'White',
                    marginTop: '8px',
                    marginBottom: '8px'
                  }}
                  placeholder="Internal"
                >
                  <MenuItem value="internal" disabled>
                    Internal
                  </MenuItem>
                </TextField>
                <ErrorMessage name="sprtType" component="div" style={{ color: '#f54d4f', fontSize: 12, marginTop: '8px' }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Title<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  name="sprtTitle"
                  id="sprtTitle"
                  value={values.sprtTitle}
                  onChange={(e) => {
                    setFieldValue('sprtTitle', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '49px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                    marginTop: '8px',
                    marginBottom: '8px'
                  }}
                  placeholder="Support Title"
                >
                  <MenuItem value="" disabled>
                    Select Title
                  </MenuItem>
                </TextField>
                <ErrorMessage name="sprtTitle" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              {/* <Grid item xs={12} sm={6} md={6}> */}
              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Priority <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Select
                  name="priority"
                  id="priority"
                  // label="Priority"
                  value={values.priority}
                  onChange={(e) => {
                    setFieldValue('priority', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  style={{
                    height: '49px',
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'white',
                    marginTop: '10px'
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Priority
                  </MenuItem>
                  {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {capitalizeFirstLetter(option.label)}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="priority" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel>
                  Description<span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <Textfield
                  multiline
                  minRows={4}
                  maxRows={6}
                  aria-label="maximum height"
                  name="desc"
                  id="desc"
                  placeholder="Description"
                  component={Textfield}
                  style={{ overflow: 'auto', maxHeight: '500px' }}
                />
                <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '-60px' }}>
                <input
                  type="file"
                  name="imgUrls"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  onChange={(event) => {
                    handleUploadImage(event);
                    setFieldValue('imgUrls', event.currentTarget.files[0]);
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
                      padding: '12px 20px', // Increased padding
                      textTransform: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginBottom: '8px', // Added margin bottom for spacing
                      fontSize: '16px', // Increased font size
                      transition: 'background-color 0.3s' // Added transition for hover effect
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#333'; // Darker background color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#000'; // Original background color when not hovering
                    }}
                  >
                    Upload Image
                  </button>
                </label>
                <div style={{ color: 'grey', fontSize: 12, marginTop: '8px' }}>
                  <div>
                    <ul>
                      <li>File size should be below 400 KB</li>
                      <li>Files should be in jpeg ,png, jpg ,svg,gif format</li>
                    </ul>
                  </div>
                </div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }} // Adjust maximum height as needed
                  />
                )}
                <ErrorMessage name="imgUrls" component="div" style={{ color: '#f54d4f' }} />
                {uploadError && <div style={{ color: 'red', fontSize: 12, marginTop: '8px' }}>{uploadError}</div>}
              </Grid>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="submit" sx={style.changeBtn}>
                Save
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;
