// OrgProfEdit.js

import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from 'ui-component/common/TextField';
import Select from 'ui-component/common/SelectField';
import './Index.css';
import * as Yup from 'yup';
import { loginUser, userLogin } from 'container/LoginContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getStateByFilter } from 'module/admin/container/stateContainer/slice';
import { getDistrictByFilter } from 'module/admin/container/districtContainer/slice';
import { addOrgProf, updateOrgProfId, getOrgProfId } from 'Profile/container/orgprofContainer/slice';
import { uploadImageRequest, updateimgById } from 'module/licensee/container/imgcontainer/slice';
import { capitalize } from 'utils/Capitalised';

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
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

const OrgProfEdit = ({ OrgDetails, userId, formtype, handleClose }) => {
  const dispatch = useDispatch();
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateByFilterData);
  const district = useSelector((state) => state.adminReducer.district.districtByFilter);
  const userMeDataDe = useSelector((state) => state.login.user);
  const uploadedImageUrl = useSelector((state) => state.licenseeReducer.ImageData.ImgData);

  const [selectedImage, setSelectedImage] = useState(OrgDetails?.imgUrl);
  const [photo, setPhoto] = useState(OrgDetails?.imgUrl);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageError, setImageError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [selecteCountry, SetSelectedCountry] = useState(OrgDetails?.country?.id);
  const [selecteState, SetSelectedState] = useState(OrgDetails?.state?.id);

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
        setImageError('Only JPG, PNG, GIF, and SVG images are supported.');
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

  const validationSchema = Yup.object({
    fName: Yup.string()
      .matches(/^[a-zA-Z\s ]+$/, 'First Name should contain only letters and spaces')
      .required('First Name is required'),
    orgName: Yup.string().required('ORG Name is required'),
    licenceNo: Yup.string().required('License No is required'),
    licensePerson: Yup.string().required('License Person is required'),

    spocName: Yup.string().required('SPOC Name is required'),
    spocPhn: Yup.string()
      .required('Mobile is required')
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number'),
    landmark: Yup.string().required('Landmark is required'),
    addr1: Yup.string().required('Address Line 1 is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    region: Yup.string().required('Region is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string()
      .required('Postal Code is required')
      .when('formtype', {
        is: 'addform',
        then: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit postal code'),
        otherwise: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit postal code')
      }),

    contactMobile1: Yup.string()
      .matches(/^[1-9]\d{9}$/, 'Must be a 10-digit mobile number')
      .notRequired()
  });

  const handleModalClose = () => {
    handleClose();
  };

  const [initialValues, setInitialValues] = useState({
    imgUrl: uploadedImageUrl || '',
    fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
    lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),

    // homeDlry: false,
    // pending  home delevery
    spocName: '',
    spocDsgntn: '',
    spocEmail: '',
    spocPhn: '',

    licenceNo: '',
    licensePerson: '',
    gstin: '',
    gstType: '',
    orgName: '',
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
    if (formtype === 'editform' && OrgDetails && OrgDetails.id) {
      setInitialValues({
        imgUrl: OrgDetails?.imgUrl || uploadedImageUrl || '',
        userId: userMeDataDe?.id || '',
        fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
        lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
        contactMobile1: OrgDetails?.contactMobile1 || '',

        // country: data?.address?.country?.id || defaultCountry,
        //   state: data?.address?.state?.id || defaultState,
        //   district: data?.address?.district?.id || defaultDistrict,

        country: data.address?.country?.id || '',
        state: data.address?.state?.id || '',
        district: data.address?.district?.id || '',

        city: OrgDetails?.city || '',
        region: OrgDetails?.region || '',
        landmark: OrgDetails?.landmark || '',
        addr1: OrgDetails?.addr1 || '',
        addr2: OrgDetails?.addr2 || '',
        postalCode: OrgDetails?.postalCode || '',
        spocName: OrgDetails?.spocName || '',
        spocDsgntn: OrgDetails?.spocDsgntn || '',
        spocEmail: OrgDetails?.spocEmail || '',
        spocPhn: OrgDetails?.spocPhn || '',
        licenceNo: OrgDetails?.licenceNo || '',
        licensePerson: OrgDetails?.licensePerson || '',
        gstin: OrgDetails?.gstin || '',
        gstType: OrgDetails?.gstType || '',
        orgName: OrgDetails?.orgName || ''
      });
      setSelectedImage(OrgDetails?.imgUrl || uploadedImageUrl || '');
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
  }, [OrgDetails, formtype, userMeDataDe, uploadedImageUrl, defaultCountry, defaultState, defaultDistrict]);

  const onSubmit = async (values, { resetForm }) => {
    if (!imageUploaded || uploading) {
      console.error('Image is not uploaded yet');
      return;
    }
    try {
      const sanitizedValues = { ...values, imgUrl: uploadedImageUrl || photo };
      if (formtype === 'addForm') {
        sanitizedValues.userId = userId;
        await dispatch(addOrgProf(sanitizedValues));
      } else {
        sanitizedValues.id = userId;
        await dispatch(updateOrgProfId(sanitizedValues));
        if (selectedImage !== sanitizedValues?.imgUrl) {
          await dispatch(updateimgById({ id: userId, image: uploadedImageUrl }));
        }
      }
      dispatch(getOrgProfId(userId));
      dispatch(loginUser());
      handleModalClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const gstTypeList = ['unRegistered', 'regular', 'composition'];

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
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
                    setFieldValue('imgUrl ', event.currentTarget.files[0]);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="PhotButton">
                <Button
                  variant="outlined"
                  className="PhotsSetButton"
                  // onClick={handleButtonClick}
                  onClick={() => document.getElementById('photoInput').click()}
                >
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
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      First Name<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} name="fName" placeholder="Enter First Name" id="fName" />
                    <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>Last Name</Typography>
                    <Field as={TextField} name="lName" placeholder="Enter Last Name" id="lName" />
                    <ErrorMessage name="lName" component="div" className="error" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      SPOC Name<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} id="spocName" placeholder="Enter SPOC Name" name="spocName" />
                    <ErrorMessage name="spocName" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>SPOC Designation</Typography>
                    <Field as={TextField} id="spocDsgntn" placeholder="Enter SPOC Designation" name="spocDsgntn" />
                    <ErrorMessage name="spocDsgntn" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>SPOC Email</Typography>
                    <Field as={TextField} id="spocEmail" placeholder="Enter SPOC Email" name="spocEmail" />
                    <ErrorMessage name="spocEmail" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      SPOC Contact<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} id="spocPhn" placeholder="Enter SPOC Contact" name="spocPhn" />
                    <ErrorMessage name="spocPhn" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      License No<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} id="licenceNo" placeholder="Enter License No" name="licenceNo" />
                    <ErrorMessage name="licenceNo" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      License Person<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} id="licensePerson" placeholder="Enter License Person" name="licensePerson" />
                    <ErrorMessage name="licensePerson" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>GST No</Typography>
                    <Field as={TextField} id="gstin" placeholder="Enter GST No" name="gstin" />
                    <ErrorMessage name="gstin" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>GST Type</Typography>
                    <Field
                      as={Select}
                      name="gstType"
                      id="gstType"
                      fullWidth
                      label="GST Type"
                      variant="outlined"
                      value={values.gstType}
                      onChange={(e) => {
                        setFieldValue('gstType', e.target.value);
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select GST Type
                      </MenuItem>
                      {gstTypeList?.map((gstType) => (
                        <MenuItem key={gstType} value={gstType}>
                          {capitalize(gstType)}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="gstType" component="div" className="error" />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>
                      ORG Name<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <Field as={TextField} id="orgName" placeholder="Enter ORG Name" name="orgName" />
                    <ErrorMessage name="orgName" component="div" className="error" />
                  </Grid>

                  {/* -------------------------------------------------------------------------------- */}

                  <Grid item xs={12} sm={6} md={6} className="EditDetails">
                    <Typography>WhatsApp</Typography>
                    <Field as={TextField} id="contactMobile1" placeholder="Enter WhatsApp" name="contactMobile1" />
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
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrgProfEdit;
