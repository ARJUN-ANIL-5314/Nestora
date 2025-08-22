// EditUser.js

import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Index.css';
import * as Yup from 'yup';
import TextField from 'ui-component/common/TextField';
import Select from 'ui-component/common/SelectField';
import { userLogin } from 'container/LoginContainer/slice';
import { addUserProf, updateUserProfId, getUserProfId } from '../../container/profileContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getStateByFilter } from 'module/admin/container/stateContainer/slice';
import { getDistrictByFilter } from 'module/admin/container/districtContainer/slice';
import { uploadImageRequest, updateimgById } from 'module/licensee/container/imgcontainer/slice';
import { capitalize } from 'utils/Capitalised';

// Helper functions
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ` 00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function stringAvatar(name) {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => capitalizeFirstLetter(part)[0]).join('');
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: initials
  };
}

const EditUser = ({ UserDetailse, userId, formtype, handleClose }) => {
  const dispatch = useDispatch();
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateByFilterData);
  const district = useSelector((state) => state.adminReducer.district.districtByFilter);
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);
  const userMeDataDe = useSelector((state) => state.login.user);

  const [photo, setPhoto] = useState(UserDetailse?.imgUrl);
  const [selectedImage, setSelectedImage] = useState(UserDetailse?.imgUrl);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selecteCountry, SetSelectedCountry] = useState(UserDetailse?.country?.id);
  const [selecteState, SetSelectedState] = useState(UserDetailse?.state?.id);
  const [imageError, setImageError] = useState('');

  const [defaultCountry, setDefaultCountry] = useState('');
  const [defaultState, setDefaultState] = useState('');
  const [defaultDistrict, setDefaultDistrict] = useState('');

  useEffect(() => {
    dispatch(getCountry());
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (selecteCountry) {
      dispatch(getStateByFilter(selecteCountry));
    }
  }, [dispatch, selecteCountry]);

  useEffect(() => {
    if (selecteState) {
      dispatch(getDistrictByFilter(selecteState));
    }
  }, [dispatch, selecteState]);

  useEffect(() => {
    if (uploadedImageUrl) {
      setImageUploaded(true);
      setUploading(false);
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    if (CountryDetails?.rows) {
      const india = CountryDetails.rows.find((country) => country.name === 'India');
      if (india) {
        setDefaultCountry(india.id);
        SetSelectedCountry(india.id);
        dispatch(getStateByFilter(india.id));
      }
    }
  }, [CountryDetails, dispatch]);

  useEffect(() => {
    if (stateDetails?.rows) {
      const Kerala = stateDetails.rows.find((state) => state.name === 'Kerala');
      if (Kerala) {
        setDefaultState(Kerala.id);
        SetSelectedState(Kerala.id);
        dispatch(getDistrictByFilter(Kerala.id));
      }
    }
  }, [stateDetails, dispatch]);

  useEffect(() => {
    if (district?.rows) {
      const kozhikode = district.rows.find((district) => district.name === 'Kozhikode');
      if (kozhikode) {
        setDefaultDistrict(kozhikode.id);
      }
    }
  }, [district]);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg'].includes(file.type)) {
        setImageError('Only JPG and PNG images are allowed');
        return;
      }
      if (file.size > 400 * 1024) {
        setImageError('Image size should be less than 400 KB');
        return;
      }
      setImageError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(URL.createObjectURL(file));
      setUploading(true);
      dispatch(uploadImageRequest(file));
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const [initialValues, setInitialValues] = useState({
    imgUrl: uploadedImageUrl || '',
    fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
    lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
    contactMobile1: '',

    country: defaultCountry,
    state: defaultState,
    district: defaultDistrict,

    city: '',
    region: '',
    landmark: '',
    addr1: '',
    addr2: '',
    postalCode: ''
  });

  useEffect(() => {
    if (UserDetailse && UserDetailse.id && formtype === 'editform') {
      setInitialValues({
        userId: userMeDataDe?.id || '',
        imgUrl: UserDetailse?.imgUrl || uploadedImageUrl || '',
        fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
        lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
        contactMobile1: UserDetailse?.contactMobile1 || '',

        // country: UserDetailse?.country?.id || defaultCountryId || '',
        // state: UserDetailse?.state?.id || defaultState || '',
        // district: UserDetailse?.district?.id || defaultDistrict || '',
        country: data.address?.country?.id || '',
        state: data.address?.state?.id || '',
        district: data.address?.district?.id || '',

        city: UserDetailse?.city || '',
        region: UserDetailse?.region || '',
        landmark: UserDetailse?.landmark || '',
        addr1: UserDetailse?.addr1 || '',
        addr2: UserDetailse?.addr2 || '',
        postalCode: UserDetailse?.postalCode || ''
      });
      setSelectedImage(UserDetailse?.imgUrl || uploadedImageUrl || '');
    } else if (formtype === 'addForm') {
      setInitialValues((prevValues) => ({
        ...prevValues,
        country: defaultCountry || '',
        state: defaultState || '',
        district: defaultDistrict || '',
        userId: userMeDataDe?.id || '',
        fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
        lName: capitalizeFirstLetter(userMeDataDe?.lName || '')
      }));
    }
  }, [formtype, userMeDataDe, uploadedImageUrl, defaultCountry, defaultState, defaultDistrict]);

  const onSubmit = async (values, { resetForm }) => {
    if (!imageUploaded || uploading) {
      console.error('Image is not uploaded yet');
      return;
    }
    try {
      const sanitizedValues = { ...values, imgUrl: uploadedImageUrl || photo };
      if (formtype === 'addForm') {
        sanitizedValues.userId = userId;
        await dispatch(addUserProf(sanitizedValues));
      } else {
        sanitizedValues.id = userId;
        await dispatch(updateUserProfId(sanitizedValues));
        if (selectedImage !== sanitizedValues?.imgUrl) {
          await dispatch(updateimgById({ id: userId, image: uploadedImageUrl }));
        }
      }
      dispatch(getUserProfId(userId));
      handleModalClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const validationSchema = Yup.object({
    fName: Yup.string()
      .required('First Name is required')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name.'),

    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),

    region: Yup.string().required('Region is required'),
    landmark: Yup.string().required('Land Mark is required'),
    addr1: Yup.string().required('Address Line 1 is required'),
    city: Yup.string().required('City is required'),

    postalCode: Yup.string()
      .required('Postal Code is required')
      .when('formtype', {
        is: 'addform',
        then: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit postal code'),
        otherwise: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit postal code')
      })
  });

  return (
    <Box>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} className="PhotsSet">
                <Avatar
                  src={photo}
                  {...(photo ? {} : stringAvatar(`${userMeDataDe?.fName} ${userMeDataDe?.lName}`))}
                  className="editPhotos"
                />

                <input
                  type="file"
                  id="photoInput"
                  name="myImage"
                  style={{ display: 'none' }}
                  onChange={(event) => {
                    handleUploadImage(event);
                    setFieldValue('imgUrl', event.currentTarget.files[0]);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="PhotButton">
                <Button variant="outlined" className="PhotsSetButton" onClick={() => document.getElementById('photoInput').click()}>
                  Edit Photo
                </Button>
              </Grid>
              <div style={{ color: 'grey', fontSize: 12, marginTop: '8px' }}>
                {imageError && (
                  <div style={{ textAlign: 'right' }} className="error">
                    {imageError}
                  </div>
                )}

                <div>
                  <ul>
                    <li>File size should be below 400 KB</li>
                    <li>Files should be in PNG, JPG, GIF, or SVG format</li>
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      First Name<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="fName" placeholder="Enter First Name" id="fName" />
                    <ErrorMessage name="fName" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>Last Name</Typography>
                    <Field as={TextField} name="lName" placeholder="Enter Last Name" id="lName" />
                    <ErrorMessage name="lName" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>WhatsApp</Typography>
                    <Field as={TextField} name="contactMobile1" placeholder="Enter WhatsApp No" id="contactMobile1" />
                    <ErrorMessage name="contactMobile1" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      Country<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field
                      as={Select}
                      name="country"
                      id="country"
                      value={values.country || defaultCountry}
                      onChange={(e) => {
                        setFieldValue('country', e.target.value);
                        SetSelectedCountry(e.target.value);

                        dispatch(getStateByFilter(e.target.value));
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Country
                      </MenuItem>
                      {CountryDetails?.rows?.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {capitalize(country.name)}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      State<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field
                      as={Select}
                      name="state"
                      id="state"
                      value={values.state || defaultState}
                      onChange={(e) => {
                        setFieldValue('state', e.target.value);
                        SetSelectedState(e.target.value);
                        dispatch(getDistrictByFilter(e.target.value));
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select State
                      </MenuItem>
                      {stateDetails?.rows?.map((state) => (
                        <MenuItem key={state.id} value={state.id}>
                          {capitalize(state.name)}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      District<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field
                      as={Select}
                      name="district"
                      id="district"
                      value={values.district || defaultDistrict}
                      onChange={(e) => {
                        setFieldValue('district', e.target.value);
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select District
                      </MenuItem>
                      {district?.rows?.map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                          {capitalize(district.name)}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="district" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      City<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="city" placeholder="Enter City" id="city" />
                    <ErrorMessage name="city" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      Region<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="region" placeholder="Enter Region" id="region" />
                    <ErrorMessage name="region" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      Landmark<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="landmark" placeholder="Enter Landmark" id="landmark" />
                    <ErrorMessage name="landmark" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      Address Line 1<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="addr1" placeholder="Enter Address Line 1" id="addr1" />
                    <ErrorMessage name="addr1" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>Address Line 2</Typography>
                    <Field as={TextField} name="addr2" placeholder="Enter Address Line 2" id="addr2" />
                    <ErrorMessage name="addr2" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      Postal Code<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="postalCode" placeholder="Enter Postal Code" id="postalCode" />
                    <ErrorMessage name="postalCode" component="div" className="error" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }} className="EditDetails">
              <Typography>
                <span style={{ color: 'red' }}>*</span> <em>You Can&apos;t Change Your Primary Contact Number And Email</em>
              </Typography>
            </Grid>
            <Grid item xs={12} className="EditSave">
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUser;
