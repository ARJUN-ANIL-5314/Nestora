import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterLicenseeByTeam } from 'module/vendor/container/userContainer/slice';

const OPTIONS = {
  status: [
    { value: 'active', label: 'Active' },
    { value: 'created', label: 'Created' },
    { value: 'suspended', label: 'Suspended' }
  ],
  roles: [
    { value: 'adminAcnt', label: 'Admin Accountant' },
    { value: 'adminMngr', label: 'Admin Manager' },
    { value: 'adminOptr', label: 'Admin Operator' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'vendorAcnt', label: 'Vendor Accountant' },
    { value: 'vendorMngr', label: 'Vendor Manager' },
    { value: 'vendorOptr', label: 'Vendor Operator' },
    { value: 'licensee', label: 'Licensee' },
    { value: 'licnseAcnt', label: 'Licensee Accountant' },
    { value: 'licnseMngr', label: 'Licensee Manager' },
    { value: 'licnseOptr', label: 'Licensee Operator' }
  ]
};

function FilterModalComponent({ handleApply, userDetails }) {
  const dispatch = useDispatch();

  const [licenseeOptions, setLicenseeOptions] = useState([]);
  const [selectedLicensee, setSelectedLicensee] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState(null);

  useEffect(() => {
    const processLicenseeOptions = (rows) =>
      rows?.filter((row) => row.role === 'licensee').map((row) => ({ value: row.id, label: `${row.fName} ${row.lName}`, key: row.id }));

    if (userDetails?.rows) setLicenseeOptions(processLicenseeOptions(userDetails.rows));
  }, [userDetails]);

  useEffect(() => {
    if (selectedLicensee?.value) dispatch(filterLicenseeByTeam(selectedLicensee.value));
  }, [selectedLicensee, dispatch]);

  const handleApplyClick = () => {
    handleApply({
      LicenseeFilter: selectedLicensee,
      status: selectedStatus,
      anotherStatus: selectedRoles
    });
  };

  const handleClearClick = () => {
    setSelectedLicensee(null);
    setSelectedStatus(null);
    setSelectedRoles(null);
    handleApply({ LicenseeFilter: null, status: null, anotherStatus: null });
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        {['licensee', 'status', 'roles'].map((filter) => (
          <Grid item xs={12} sm={4} key={filter.id}>
            <Autocomplete
              options={filter === 'licensee' ? licenseeOptions : OPTIONS[filter]}
              getOptionLabel={(option) => option.label}
              value={filter === 'licensee' ? selectedLicensee : filter === 'status' ? selectedStatus : selectedRoles}
              onChange={(event, newValue) =>
                filter === 'licensee'
                  ? setSelectedLicensee(newValue)
                  : filter === 'status'
                  ? setSelectedStatus(newValue)
                  : setSelectedRoles(newValue)
              }
              renderInput={(params) => (
                <TextField {...params} label={`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`} variant="outlined" />
              )}
            />
          </Grid>
        ))}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="outlined" style={{ marginRight: '10px', borderColor: 'black', color: 'black' }} onClick={handleClearClick}>
            Clear
          </Button>
          <Button variant="contained" color="primary" onClick={handleApplyClick}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterModalComponent;
