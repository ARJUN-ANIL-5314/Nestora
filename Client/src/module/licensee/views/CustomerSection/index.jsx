import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { IconButton, Tooltip, MenuItem, Select, FormControl, Grid } from '@mui/material';
import { Visibility, FilterList, ExpandLess } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import OpenModal from 'ui-component/common/OpenModal';
import CardHead from 'ui-component/common/CardHead';
import ViewModal from './viewModal.jsx';

import { capitalize } from 'utils/Capitalised';
import { getUserCreatedBy } from 'module/vendor/container/userContainer/slice';
import { licensegetCustomer } from 'module/vendor/container/customerContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from 'module/utlities/NoDataComponent';
import { roleMapping } from 'module/utlities/user_name';
import { formatDate } from 'utils/DateTimeFormat';

export default function Index() {
  const [tableHeading, setTableHeading] = useState('Customers');
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.data.customers.LicenseeCustomerData);

  useEffect(() => {
    dispatch(licensegetCustomer({}));
    dispatch(getUserCreatedBy({}));
  }, [dispatch]);

  useEffect(() => {
    setTableHeading('Customer');
    setCount(customerDetails?.customers?.length || 0);
    setFilteredData(customerDetails?.customers || []);
  }, [customerDetails]);

  useEffect(() => {
    let filtered = customerDetails?.customers || [];
    if (selectedStatus) {
      filtered = filtered.filter((row) => row.status === selectedStatus || row.customerId === selectedStatus);
    }
    if (selectedOrg) {
      filtered = filtered.filter((row) => row.orgName === selectedOrg);
    }
    setFilteredData(filtered);
  }, [selectedStatus, selectedOrg, customerDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'viewform':
        setModalHeading('View Customer');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const filterData = () => {
    let data = customerDetails?.customers || [];

    // Apply search filter
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase();
      data = data.filter(
        (row) =>
          `${row.fName ?? ''} ${row.lName ?? ''}`.toLowerCase().includes(lowerSearchValue) ||
          row.contactMobile1?.toLowerCase().includes(lowerSearchValue) ||
          row.contactMobile2?.toLowerCase().includes(lowerSearchValue) ||
          row.email?.toLowerCase().includes(lowerSearchValue) ||
          row.customerId?.toLowerCase().includes(lowerSearchValue)
      );
    }
    // Apply status filter
    if (selectedStatus) {
      data = data.filter((row) => row.status.toLowerCase() === selectedStatus.toLowerCase());
    }
    // Apply orgName filter
    if (selectedOrg) {
      data = data.filter((row) => row.orgName === selectedOrg);
    }
    setFilteredData(data);
    setCount(data.length);
  };

  useEffect(() => {
    filterData();
  }, [searchValue, selectedStatus, selectedOrg, customerDetails]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusSelect = (event) => {
    setSelectedStatus(event);
  };

  const handleClick = () => {
    setShowStatusFilter((prev) => !prev);
  };

  const truncateId = (id) => {
    return id?.length > 10 ? id.substring(12) + '' : id;
  };

  const columns = useMemo(
    () => [
      {
        name: 'ORG NAME',
        selector: (row) => row.orgName
      },
      {
        name: 'CUSTOMER ID',
        selector: (row) => truncateId(row.customerId)
      },
      {
        name: 'NAME',
        selector: (row) => capitalize(`${row.fName} ${row.lName}`)
      },
      {
        name: 'MOBILE',
        selector: (row) => '+91 ' + row.contactMobile1
      },
      {
        name: 'TYPE',
        selector: (row) => (row.custType ? roleMapping[row.custType] : '-')
      },
      {
        name: 'CREATED DATE',
        selector: (row) => formatDate(row.createdAt)
      },
      {
        name: 'STATUS',
        selector: (row) => ({
          display: capitalize(row.status),
          color: row.status.toLowerCase() === 'active' ? 'green' : row.status.toLowerCase() === 'suspended' ? 'red' : 'blue'
        }),
        cell: (row) => (
          <span
            style={{ color: row.status.toLowerCase() === 'active' ? 'green' : row.status.toLowerCase() === 'suspended' ? 'red' : 'blue' }}
          >
            {capitalize(row.status)}
          </span>
        )
      },
      {
        name: 'ACTIONS',
        cell: (row) => (
          <div>
            <Tooltip title="View" placement="top" arrow>
              <IconButton onClick={() => handleOpenModal('viewform', row)}>
                <Visibility className="actn-icon1" style={{ textAlign: 'center' }} />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    [customerDetails]
  );

  const orgNames = useMemo(() => {
    const orgNameSet = new Set();
    customerDetails?.customers?.forEach((customer) => {
      if (customer.orgName) {
        orgNameSet.add(customer.orgName);
      }
    });
    return Array.from(orgNameSet);
  }, [customerDetails]);

  const statusOptions = ['active', 'suspended', 'created'];

  return (
    <div style={{ position: 'relative' }}>
      <DataTable
        columns={columns}
        customStyles={tableCustomStyles}
        data={filteredData}
        striped
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        noDataComponent={<NoDataComponent />}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        subHeaderComponent={
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                searchHandler={handleSearch}
                tableHeading={tableHeading}
                filter="filter"
                hasAdd={false}
                count={count}
                handleAddModal={() => handleOpenModal('addform')}
              />
              <IconButton
                onClick={handleClick}
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
                {showStatusFilter ? <ExpandLess /> : <FilterList />}
              </IconButton>
            </div>
            {showStatusFilter && (
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
                  <FormControl variant="standard" sx={{ minWidth: 150, ml: 1 }}>
                    <Autocomplete
                      id="org-filter"
                      options={orgNames}
                      getOptionLabel={(option) => option}
                      onChange={(event, newValue) => setSelectedOrg(newValue ?? null)}
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
        <OpenModal
          open={openModal}
          handleClose={handleCloseModal}
          component={modalComponent}
          mdlwidth={modalStyle.width}
          mdlHeading={modalHeading}
        />
      )}
    </div>
  );
}
