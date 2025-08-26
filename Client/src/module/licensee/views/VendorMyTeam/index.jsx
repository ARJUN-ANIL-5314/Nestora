import React, { useState, useEffect } from 'react';
import { IconButton, MenuItem, Select, FormControl, Tooltip, Grid, Autocomplete, TextField } from '@mui/material';
import { Visibility, FilterList, ExpandLess } from '@mui/icons-material';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import ViewModal from './viewModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { getLicenseeTeam } from 'module/vendor/container/userContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import '../../../../assets/style/style.css';
import { roleMapping } from 'module/utlities/user_name';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from '../NoDataComponent.js';
import formatDateTime from 'utils/formatDateTime';
import { capitalize } from 'utils/Capitalised';
import { useMemo } from 'react';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');

  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.data.user.userData);
  const userDetails = useSelector((state) => state.data.user.userData);
  console.log('userDetailsuserDetails', userDetails.vendorUsers);

  const dataval = useSelector((state) => state.data.user.userData?.count || 0);

  useEffect(() => {
    dispatch(getLicenseeTeam());
    setCount(dataval);
  }, [dispatch, dataval]);

  useEffect(() => {
    let filtered = userDetails?.vendorUsers || [];
    if (selectedRole) {
      filtered = filtered.filter((row) => row.role === selectedRole);
    }
    if (selectedStatus) {
      filtered = filtered.filter((row) => row.status === selectedStatus || row.custType === selectedStatus);
    }
    if (selectedOrg) {
      filtered = filtered.filter((row) => row.orgName.toLowerCase() === selectedOrg.toLowerCase());
    }

    setFilteredData(filtered);
  }, [selectedRole, selectedStatus, userDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let heading = '';
    let component = null;

    switch (whichOpen) {
      case 'viewform':
        heading = 'View Vendor Team';
        component = <ViewModal data={item} />;
        break;
      default:
        break;
    }

    setModalHeading(heading);
    setModalComponent(component);
  };

  const filterData = () => {
    let data = userDetails?.vendorUsers || [];

    // Apply search filter
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase();
      data = data.filter(
        (row) =>
          `${row.fName ?? ''} ${row.lName ?? ''}`.toLowerCase().includes(lowerSearchValue) ||
          row.mobileNo?.toLowerCase().includes(lowerSearchValue) ||
          row.email?.toLowerCase().includes(lowerSearchValue) ||
          row.usrRefId?.toLowerCase().includes(lowerSearchValue)
      );
    }

    // Apply status filter
    if (selectedStatus) {
      data = data.filter((row) => row.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    // Apply role filter
    if (selectedRole) {
      data = data.filter((row) => row.role === selectedRole);
    }
    if (selectedOrg) {
      data = data.filter((row) => row.orgName.toLowerCase() === selectedOrg.toLowerCase());
    }
    setFilteredData(data);
    setCount(data.length);
  };

  useEffect(() => {
    filterData();
  }, [searchValue, selectedRole, selectedStatus, selectedOrg, userDetails]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
  };

  const toggleRoleFilter = () => {
    setShowRoleFilter((prev) => !prev);
  };

  const handleRoleSelect = (event) => {
    setSelectedRole(event);
  };

  const handleStatusSelect = (event) => {
    setSelectedStatus(event);
  };

  const columns = [
    {
      name: 'ORG NAME',
      selector: (row) => capitalize(`${row.orgName}`)
    },
    {
      name: 'USER ID',
      selector: (row) => row.usrRefId
    },
    {
      name: 'NAME',
      selector: (row) => capitalize(`${row.fName} ${row.lName}`)
    },
    {
      name: 'MOBILE',
      selector: (row) => '+91 ' + row.mobileNo
    },
    // {
    //   name: 'EMAIL',
    //   selector: (row) => row.email,
    // },
    {
      name: 'ROLE',
      selector: (row) => roleMapping[row.role]
    },
    {
      name: 'CREATED DATE',
      selector: (row) => formatDateTime(row.createdAt)
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => handleOpenModal('viewform', row)}>
              <Visibility className="actn-icon1" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  const statusOptions = ['active', 'suspended', 'created'];
  const fixedRoles = ['vendorAcnt', 'vendorMngr', 'vendorOptr'];
  console.log('==orgNames===', userDetails);

  const orgNames = useMemo(() => {
    const orgNameSet = new Set();
    userDetails?.vendorUsers?.forEach((user) => {
      if (user.orgName) {
        orgNameSet.add(user.orgName);
      }
    });
    return Array.from(orgNameSet);
  }, [userDetails]);
  return (
    <div style={{ position: 'relative' }}>
      <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={filteredData}
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        striped
        noDataComponent={<NoDataComponent />}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        subHeaderComponent={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                searchHandler={handleSearch}
                tableHeading="Vendor Team"
                filter="filter"
                hasAdd={false}
                count={count}
                handleAddModal={() => handleOpenModal('addform')}
              />
              <IconButton
                onClick={toggleRoleFilter}
                style={{
                  fontSize: 16,
                  padding: '10px',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px'
                }}
              >
                {showRoleFilter ? <ExpandLess /> : <FilterList />}
              </IconButton>
            </div>
            {showRoleFilter && (
              <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item style={{ marginTop: 10 }}>
                  <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                    <Select
                      id="status-filter-select"
                      value={selectedStatus}
                      onChange={(e) => handleStatusSelect(e.target.value)}
                      displayEmpty
                      sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px' }}
                    >
                      <MenuItem value="">All Status</MenuItem>
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {capitalize(status)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                    <Select
                      id="role-filter-select"
                      value={selectedRole}
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      displayEmpty
                      sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px' }}
                    >
                      <MenuItem value="">All Roles</MenuItem>
                      {fixedRoles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {capitalizeFirstLetter(roleMapping[role])}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ minWidth: 150, ml: 1 }}>
                    <Autocomplete
                      id="org-filter"
                      options={orgNames}
                      getOptionLabel={(option) => option}
                      onChange={(event, newValue) => {
                        setSelectedOrg(newValue || '');
                      }}
                      renderInput={(params) => <TextField {...params} label="Filter by Org Name" variant="standard" />}
                      sx={{ minWidth: 120, mb: -3 }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </div>
        }
      />
      {openModal && (
        <OpenModal open={openModal} handleClose={handleCloseModal} component={modalComponent} mdlwidth="60%" mdlHeading={modalHeading} />
      )}
    </div>
  );
}
