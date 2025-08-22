import React, { useState, useEffect } from 'react';
import { IconButton, MenuItem, Select, FormControl, Tooltip, Grid } from '@mui/material';
import { Visibility, Delete, FilterList, ExpandLess } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from 'module/vendor/container/userContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import '../../../../assets/style/style.css';
import { roleMapping } from 'module/utlities/user_name';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from '../NoDataComponent';
import { capitalize } from 'utils/Capitalised';
import formatDateTime from 'utils/formatDateTime';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.userData);
  const dataval = useSelector((state) => state.data.user.userData?.count || 0);

  useEffect(() => {
    dispatch(getUser({}));
    setCount(dataval);
  }, [dispatch, dataval]);

  useEffect(() => {
    let filtered = userDetails?.rows || [];
    if (selectedRole) {
      filtered = filtered.filter((row) => row.role === selectedRole);
    }
    if (selectedStatus) {
      filtered = filtered.filter((row) => row.status === selectedStatus || row.custType === selectedStatus);
    }
    setFilteredData(filtered);
  }, [selectedRole, selectedStatus, userDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let heading = '';
    let component = null;

    switch (whichOpen) {
      case 'addform':
        heading = 'Add My Team';
        component = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        heading = 'Edit My Team';
        component = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        heading = 'View My Team';
        component = <ViewModal data={item} />;
        break;
      default:
        break;
    }

    setModalHeading(heading);
    setModalComponent(component);
  };

  useEffect(() => {
    filterData();
  }, [searchValue, selectedRole, selectedStatus, userDetails]);

  const filterData = () => {
    let data = userDetails?.rows || [];

    // Apply search filter
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase();
      data = data.filter(
        (row) =>
          `${row.fName} ${row.lName}`.toLowerCase().includes(lowerSearchValue) ||
          (row.mobileNo && row.mobileNo.toLowerCase().includes(lowerSearchValue)) ||
          (row.usrRefId && row.usrRefId.toLowerCase().includes(lowerSearchValue)) ||
          (row.email && row.email.toLowerCase().includes(lowerSearchValue))
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

    setFilteredData(data);
    setCount(data.length);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteUser(selectedId));
    setShowDeleteModal(false);
    dispatch(getUser({}));
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
      name: 'USER ID',
      selector: (row) => row.usrRefId
    },
    {
      name: 'NAME',
      selector: (row) => capitalize(`${row.fName} ${row.lName}`)
    },
    {
      name: 'MOBILE',
      selector: (row) => `+91 ${row.mobileNo}`
    },
    {
      name: 'EMAIL',
      selector: (row) => row.email
    },
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
        <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => handleOpenModal('viewform', row)}>
              <Visibility className="actn-icon1" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton onClick={() => handleOpenModal('editform', row)}>
              <EditNoteIcon className="actn-icon2" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton onClick={() => handleDeleteModal(row)}>
              <Delete className="actn-icon3" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  const statusOptions = ['active', 'suspended', 'created'];
  const fixedRole = ['adminAcnt', 'adminMngr', 'adminOptr'];
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
                tableHeading="My Team"
                filter="filter"
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
                      {fixedRole.map((role) => (
                        <MenuItem key={role} value={role}>
                          {capitalizeFirstLetter(roleMapping[role])}
                        </MenuItem>
                      ))}
                    </Select>
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
      {showDeleteModal && (
        <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
      )}
    </div>
  );
}
