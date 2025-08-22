import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Grid
} from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import OpenDrawer from 'ui-component/common/OpenDrawer';
import OrgProfEdit from 'Profile/views/orgProf/OrgProfEdit';
import EditUser from 'Profile/views/userProf/EditUser';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import ReportIcon from '@mui/icons-material/Report';
import { userLogin } from 'container/LoginContainer/slice';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const [open, setOpen] = useState(false);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');

  const userProfile = useSelector((state) => state.login.user);
  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  useEffect(() => {
    setShouldShowDialog(userProfile?.ftLogin === true && userProfile?.role !== 'admin');
  }, [userProfile]);

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpen(false);
  };

  const handleUpdateProfile = (whichOpen, item) => {
    const userId = userProfile?.id;
    const userTypeStatus = userProfile?.userType;
    setOpenModal(true);
    setOpen(false);

    let ComponentToRender;

    if (userTypeStatus === 'ORG' || userTypeStatus === 'AGNT') {
      if (whichOpen === 'addForm') {
        setModalHeading('Update Profile');
        ComponentToRender = <OrgProfEdit userId={userId} formtype="addForm" data={item} handleClose={handleCloseModal} />;
      }
    } else if (userTypeStatus === 'INDV') {
      if (whichOpen === 'addForm') {
        setModalHeading('Update Profile');
        ComponentToRender = <EditUser userId={userId} formtype="addForm" data={item} handleClose={handleCloseModal} />;
      }
    }
    setModalComponent(ComponentToRender);
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    if (shouldShowDialog) {
      setOpen(true);
    } else {
      dispatch({ type: MENU_OPEN, id: item.id });
      if (matchesSM) dispatch({ type: SET_MENU, opened: false });
      navigate(item.url);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemButton
        component={Link}
        to={item.url}
        disabled={item.disabled}
        onClick={handleItemClick}
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`
        }}
        selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
            <Grid item sm={12}>
              <ReportIcon sx={{ fontSize: '80px', color: '#ff0000bd' }} />
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h3" mt={2} component="h2">
                Please update your profile details before proceeding!
              </Typography>
            </Grid>
          </Grid>

          <div style={{ marginBottom: '14px' }}>
            <Button variant="contained" color="primary" onClick={() => handleUpdateProfile('addForm', null)}>
              Update Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {openModal && <OpenDrawer open={openModal} handleClose={handleCloseModal} component={modalComponent} mdlHeading={modalHeading} />}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number
};

export default NavItem;
