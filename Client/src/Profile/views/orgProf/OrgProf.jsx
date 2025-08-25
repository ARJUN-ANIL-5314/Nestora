import React from 'react';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material';
import './Index.css';
import OpenDrawer from 'ui-component/common/OpenDrawer';
import { userLogin } from 'container/LoginContainer/slice';
import OrgProfEdit from './OrgProfEdit.jsx';
// import { getOrgProfId } from 'Profile/container/orgprofContainer/slice';
import { IconLicense, IconLocation, IconUser, IconUsers } from '@tabler/icons';
import { capitalize } from 'utils/Capitalised';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    opacity: 1,
    WebkitTextFillColor: '#121926',
    color: '#121926',
    fontSize: '1rem'
  }
});

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

function stringAvatar(name) {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => capitalize(part)[0]).join('');

  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: initials
  };
}

const OrgProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    if (formtype === 'editform') setPage(1);
  };

  const OrgProfile = localStorage.getItem('user');
  const userId = JSON.parse(OrgProfile)?.user?.id;
  const dispatch = useDispatch();
  const LoginProfile = useSelector((state) => state.login.user);
  const OrgDetails = useSelector((state) => state.profile.orgprof.orgByIdData);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'editform':
        setModalHeading('Update Profile');
        ComponentToRender = (
          <OrgProfEdit userId={userId} formtype="editform" data={item} handleClose={handleCloseModal} OrgDetails={OrgDetails} />
        );
        break;
      default:
        setModalHeading('Add Profile');
        ComponentToRender = <OrgProfEdit userId={userId} formtype="addForm" data={item} handleClose={handleCloseModal} />;
    }
    setModalComponent(ComponentToRender);
  };
  // -------------------------------------------------------

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  const Epmty = isEmptyObject(OrgDetails);

  useEffect(() => {
    // dispatch(getOrgProfId(userId));
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <>
      {openModal && (
        <OpenDrawer open={openModal} handleClose={() => setOpenModal(false)} component={modalComponent} mdlHeading={modalHeading} />
      )}
      <MainCard className="ProMainCard">
        <Box>
          <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h4" className="Title">
                <IconUser className="IconTitle" /> Update Profile
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="TitleButton">
              <Button variant="outlined" onClick={() => handleOpenModal(Epmty === true ? 'addForm' : 'editform')}>
                Edit Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6} md={3} className="MainProPhoto">
              <Avatar className="ProPhoto">
                {OrgDetails.imgUrl && OrgDetails.imgUrl ? (
                  <img
                    src={OrgDetails.imgUrl}
                    alt={`${OrgDetails.userId?.fName} ${OrgDetails.userId?.lName}`}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  { ...stringAvatar(`${LoginProfile?.fName} ${LoginProfile?.lName}`) }.children
                )}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
              <Grid container>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">First Name</Typography>
                  <CustomTextField fullWidth value={capitalize(LoginProfile?.fName || '')} variant="standard" disabled />
                </Grid>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">Last Name</Typography>
                  <CustomTextField fullWidth value={capitalize(LoginProfile?.lName || '')} variant="standard" disabled />
                </Grid>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">Contact No</Typography>
                  <CustomTextField fullWidth value={LoginProfile?.mobileNo || ''} variant="standard" disabled />
                </Grid>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">Email</Typography>
                  <CustomTextField fullWidth value={LoginProfile?.email || ''} variant="standard" disabled />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <MainCard className="ProMainCard">
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" className="Title">
                <IconLicense className="IconTitle" /> Licence Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="Details">
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Licence No</Typography>
              <CustomTextField fullWidth value={OrgDetails.licenceNo ? OrgDetails.licenceNo : ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Licence Person</Typography>
              <CustomTextField
                fullWidth
                value={capitalize(OrgDetails.licensePerson ? OrgDetails.licensePerson : '')}
                variant="standard"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">GST No</Typography>
              <CustomTextField fullWidth value={OrgDetails.gstin ? OrgDetails.gstin : ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">GST Type</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.gstType ? OrgDetails.gstType : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">ORG Name</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.orgName ? OrgDetails.orgName : '')} variant="standard" disabled />
            </Grid>
          </Grid>
        </Box>
      </MainCard>

      <MainCard className="ProMainCard">
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" className="Title">
                <IconUsers className="IconTitle" /> SPOC Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="Details">
            {/* <Grid item xs={12} sm={6} md={4} className="Details">
              <Typography className="formTitle">Home Delivery</Typography>
              <CustomTextField fullWidth value={OrgDetails.homeDlry ? 'true' : 'false'} variant="standard" disabled />
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} className="Details">
              <Typography className="formTitle">SPOC Name</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.spocName ? OrgDetails.spocName : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="Details">
              <Typography className="formTitle">SPOC Designation</Typography>
              <CustomTextField
                fullWidth
                value={capitalize(OrgDetails.spocDsgntn ? OrgDetails.spocDsgntn : '')}
                variant="standard"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="Details">
              <Typography className="formTitle">SPOC Email</Typography>
              <CustomTextField fullWidth value={OrgDetails.spocEmail ? OrgDetails.spocEmail : ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="Details">
              <Typography className="formTitle">SPOC Contact No.</Typography>
              <CustomTextField fullWidth value={OrgDetails.spocPhn ? OrgDetails.spocPhn : ''} variant="standard" disabled />
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <MainCard className="ProMainCard">
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" className="Title">
                <IconLocation className="IconTitle" /> Contact Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="Details">
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">WhatsApp</Typography>
              <CustomTextField fullWidth value={OrgDetails.contactMobile1 ? OrgDetails.contactMobile1 : ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Country</Typography>
              <CustomTextField
                fullWidth
                value={capitalize(OrgDetails.country?.name ? OrgDetails.country?.name : '')}
                variant="standard"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">State</Typography>
              <CustomTextField
                fullWidth
                value={capitalize(OrgDetails.state?.name ? OrgDetails.state?.name : '')}
                variant="standard"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">District</Typography>
              <CustomTextField
                fullWidth
                value={capitalize(OrgDetails.district?.name ? OrgDetails.district?.name : '')}
                variant="standard"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">City</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.city ? OrgDetails.city : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Region</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.region ? OrgDetails.region : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Landmark</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.landmark ? OrgDetails.landmark : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Address Line 1</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.addr1 ? OrgDetails.addr1 : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Address Line 2</Typography>
              <CustomTextField fullWidth value={capitalize(OrgDetails.addr2 ? OrgDetails.addr2 : '')} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Postal Code</Typography>
              <CustomTextField fullWidth value={OrgDetails.postalCode || ''} variant="standard" disabled />
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
};

export default OrgProfile;
