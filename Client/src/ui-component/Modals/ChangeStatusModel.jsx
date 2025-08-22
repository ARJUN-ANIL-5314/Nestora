import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';

const ChangeStatusModal = ({ open, handleClose, onStatusConfirm }) => {
  const theme = useTheme();
  const style = commonStyles(theme);

  const handleConfirm = () => {
    onStatusConfirm();
    handleClose();
  };

  const handleCloseModal = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <Box
        sx={{
          position: 'absolute',
          width: '30%',
          height: 'fit-content',
          backgroundColor: 'white',
          padding: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          borderRadius: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2
          }}
        >
          <span style={{ fontSize: '19px', justifyContent: 'flex-start' }}>Change Status Confirmation</span>

          <span style={{ cursor: 'pointer' }}>
            <HighlightOffIcon
              sx={{
                color: '#b1bdc0',
                fontSize: '35px'
              }}
              onClick={handleClose}
            />
          </span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '17px'
          }}
        >
          <p>Are you sure you want to change the status ?</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginBottom: '20px',
            justifyContent: 'center'
          }}
        >
          <Button variant="contained" sx={style.cancelBtn} onClick={handleClose}>
            No
          </Button>
          <Button color="info" variant="contained" sx={style.addBtn} onClick={handleConfirm}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ChangeStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onStatusConfirm: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired
};

export default ChangeStatusModal;
