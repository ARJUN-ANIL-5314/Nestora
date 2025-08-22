import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Box, Typography, TextField, Button, IconButton, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from 'module/vendor/container/customerContainer/slice';
import { tableCustomStyles } from '../../tableStyle';
import { capitalize } from '../../utilities/Capitallised';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #b1b1b1',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4
};

function CustomerModal({ open, handleClose, onSelect, setSelectedRow, selectedRow }) {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.data.customers.customerData);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(customerDetails.rows);
  }, [customerDetails]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = customerDetails.rows.filter((row) => {
      return (
        row.fName?.toLowerCase().includes(searchValue) ||
        row.customerId?.toLowerCase().includes(searchValue) ||
        row.address?.city?.toLowerCase().includes(searchValue) ||
        row.lName?.toLowerCase().includes(searchValue) ||
        row.contactMobile1?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filtered);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleFormSubmit = () => {
    if (selectedRow) {
      onSelect(selectedRow);
    }
  };

  const columns = [
    {
      name: 'SELECT',
      cell: (row) => <Radio checked={selectedRow?.customerId === row.customerId} onChange={() => handleRowSelect(row)} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
    {
      name: 'CUST ID',
      selector: (row) => row.customerId
    },
    {
      name: 'NAME',
      selector: (row) => capitalize(`${row.fName} ${row.lName}`)
    },
    {
      name: 'CITY',
      // selector: (row) => capitalize(row.address?.city),
      selector: (row) => capitalize(row.address?.district.name)
    },
    {
      name: 'MOBILE',
      selector: (row) => row.contactMobile1
    }
  ];

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={tableCustomStyles}
          striped
          highlightOnHover
          pointerOnHover
          onRowClicked={handleRowSelect}
          subHeader
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[10, 20, 30]}
          subHeaderComponent={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Select Customer
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={handleSearch}
                style={{ backgroundColor: 'white', width: '40vh' }}
              />
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          }
        />
        <Box mt={2} textAlign="right">
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomerModal;
