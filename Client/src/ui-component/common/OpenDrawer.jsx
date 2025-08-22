import React, { useEffect, useState } from 'react';
import { Drawer, Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import styles from './style';

const OpenDrawer = ({ open, handleClose, component, mdlHeading }) => {
  const theme = useTheme();
  const style = styles(theme);
  const [gradientLength, setGradientLength] = useState(0);

  const handleIconClick = () => {
    handleClose();
  };

  useEffect(() => {
    const textWidth = mdlHeading?.length * 18;
    setGradientLength(textWidth);
  }, [mdlHeading]);

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <Grid container spacing={2} sx={style.modalBoxHeader}>
        <Grid item xs={10}>
          <Box sx={style.modalHeadContent}>{mdlHeading ? mdlHeading : 'Heading'}</Box>
        </Grid>
        <Grid item xs={2} sx={style.closeIconGridDrawer}>
          <CloseIcon sx={style.closeIcon} onClick={handleIconClick} />
        </Grid>
        <Box
          sx={style.headerUnderLine}
          style={{ background: `linear-gradient(to right, #000000 ${gradientLength}px, #7070702e ${gradientLength}px)` }}
        />
      </Grid>
      <Box
        sx={{
          width: { xs: 'auto', sm: '540px' },
          padding: { xs: 2, sm: 0 }
        }}
      >
        {component}
      </Box>
    </Drawer>
  );
};

OpenDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  component: PropTypes.node,
  mdlHeading: PropTypes.string
};

export default OpenDrawer;
