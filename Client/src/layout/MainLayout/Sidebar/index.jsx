import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, Button, Dialog, DialogTitle, DialogContent, IconButton, Grid, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import CloseIcon from '@mui/icons-material/Close';
import ReportIcon from '@mui/icons-material/Report';
import { drawerWidth } from 'store/constant';
import OpenDrawer from 'ui-component/common/OpenDrawer';
import EditUser from 'Profile/views/userProf/EditUser';
import OrgProfEdit from 'Profile/views/orgProf/OrgProfEdit';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'container/LoginContainer/slice';

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');

  const userProfile = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    if (userProfile?.ftLogin && userProfile?.role !== 'admin') {
      setOpenDialog(true);
    }
  }, [userProfile]);

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseDrawer = () => setOpenDrawer(false);

  const handleUpdateProfile = () => {
    const userId = userProfile?.id;
    const userType = userProfile?.userType;
    setOpenDrawer(true);
    setOpenDialog(false);

    let ComponentToRender;
    if (['ORG', 'AGNT'].includes(userType)) {
      setModalHeading('Update Profile');
      ComponentToRender = <OrgProfEdit userId={userId} formType="addForm" handleClose={handleCloseDrawer} />;
    } else if (userType === 'INDV') {
      setModalHeading('Update Profile');
      ComponentToRender = <EditUser userId={userId} formType="addForm" handleClose={handleCloseDrawer} />;
    }
    setModalComponent(ComponentToRender);
  };

  const handleMenuClick = (event) => {
    if (userProfile?.ftLogin && userProfile?.role !== 'admin') {
      event.preventDefault();
      setOpenDialog(true);
    }
  };

  const drawer = (
    <>
      <Dialog
        open={openDialog}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog();
          }
        }}
        sx={{ padding: '20px' }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Grid container mb={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <ReportIcon sx={{ fontSize: '80px', color: '#ff0000bd' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" mt={2} component="h2">
                Please update your profile details!
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <MenuList onMenuClick={handleMenuClick} />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList onMenuClick={handleMenuClick} />
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <OpenDrawer open={openDrawer} handleClose={handleCloseDrawer} component={modalComponent} mdlHeading={modalHeading} />
      <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor="left"
          open={drawerOpen}
          onClose={drawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: 'none',
              [theme.breakpoints.up('md')]: {
                top: '88px'
              }
            }
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
