import React, { useEffect, useState } from 'react';
import { Grid, Box, Avatar, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import './Index.css';
import MainCard from 'ui-component/cards/MainCard';
import { IconLocation, IconUser } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import OpenDrawer from 'ui-component/common/OpenDrawer';
import EditUser from './EditUser';
import { userLogin } from 'container/LoginContainer/slice';
import { getUserProfId } from '../../container/profileContainer/slice';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    opacity: 1,
    WebkitTextFillColor: '#121926',
    color: '#121926',
    fontSize: '1.2rem'
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

function capitalizeFirstLetter(string) {
  if (!string) return '';
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

function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    if (formtype === 'editform') setPage(1);
  };

  const userProfile = localStorage.getItem('user');
  const userId = JSON.parse(userProfile)?.user?.id;
  const dispatch = useDispatch();
  const LoginProfile = useSelector((state) => state.login.user);
  const UserDetailse = useSelector((state) => state.profile?.profile?.profByIdData || '');

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'editform':
        setModalHeading('Update Profile');
        ComponentToRender = (
          <EditUser userId={userId} formtype="editform" data={item} handleClose={handleCloseModal} UserDetailse={UserDetailse} />
        );
        break;
      default:
        setModalHeading('Add Profile');
        ComponentToRender = <EditUser userId={userId} formtype="addForm" data={item} handleClose={handleCloseModal} />;
    }
    setModalComponent(ComponentToRender);
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  const Epmty = isEmptyObject(UserDetailse);

  useEffect(() => {
    dispatch(getUserProfId(userId));
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
                {UserDetailse?.imgUrl?.length > 0 ? (
                  <img
                    src={UserDetailse.imgUrl}
                    alt={`${UserDetailse.userId?.fName} ${UserDetailse.userId?.lName}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : (
                  stringAvatar(`${LoginProfile?.fName} ${LoginProfile?.lName}`).children
                )}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
              <Grid container>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">First Name</Typography>
                  <CustomTextField fullWidth value={capitalizeFirstLetter(LoginProfile?.fName || '')} variant="standard" disabled />
                </Grid>
                <Grid item xs={12} sm={6} className="Details">
                  <Typography className="formTitle">Last Name</Typography>
                  <CustomTextField fullWidth value={capitalizeFirstLetter(LoginProfile?.lName || '')} variant="standard" disabled />
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
                <IconLocation className="IconTitle" /> Contact Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="Details">
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">WhatsApp</Typography>
              <CustomTextField fullWidth value={UserDetailse?.contactMobile1 || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Country</Typography>
              <CustomTextField fullWidth value={UserDetailse?.country?.name || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">State</Typography>
              <CustomTextField fullWidth value={UserDetailse?.state?.name || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">District</Typography>
              <CustomTextField fullWidth value={UserDetailse?.district?.name || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">City</Typography>
              <CustomTextField fullWidth value={UserDetailse?.city || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Region</Typography>
              <CustomTextField fullWidth value={UserDetailse?.region || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Landmark</Typography>
              <CustomTextField fullWidth value={UserDetailse?.landmark || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Address line 1</Typography>
              <CustomTextField fullWidth value={UserDetailse?.addr1 || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Address line 2</Typography>
              <CustomTextField fullWidth value={UserDetailse?.addr2 || ''} variant="standard" disabled />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className="formTitle">Postal Code</Typography>
              <CustomTextField fullWidth value={UserDetailse?.postalCode || ''} variant="standard" disabled />
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}

export default Index;
