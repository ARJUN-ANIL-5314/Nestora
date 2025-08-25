import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, MenuItem, Select, FormControl } from '@mui/material';
import { Visibility, Delete, PersonOff, FilterList, ExpandLess } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import SuspendModal from 'ui-component/Modals/SuspendModal';
import ViewModal from './viewModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCreatedBy, deleteUser, changeStatus } from 'module/vendor/container/userContainer/slice';
import { tableCustomStyles } from '../tableStyle';
import '../../../../assets/style/style.css';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from 'module/utlities/NoDataComponent';
import formatDateTime from 'utils/formatDateTime';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLicenseType, setSelectedLicenseType] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.userData);
  const licenseeData = React.useMemo(() => userDetails?.rows?.filter((row) => row.role === 'licensee') || [], [userDetails]);

  const modalStyle = { width: '60%' };
  useEffect(() => {
    dispatch(getUserCreatedBy({}));
  }, [dispatch]);

  useEffect(() => {
    filterData();
  }, [licenseeData, searchValue, selectedStatus, selectedLicenseType, selectedUserType]);

  const filterData = () => {
    let data = licenseeData;

    // Apply filters
    if (searchValue) {
      const searchTerms = searchValue.toLowerCase().split(' ');
      data = data.filter((row) =>
        searchTerms.every((term) =>
          [row.fName, row.lName, row.usrRefId, row.email, row.mobileNo].some((field) => field?.toLowerCase().includes(term))
        )
      );
    }

    if (selectedStatus) {
      data = data.filter((row) => row.status === selectedStatus);
    }

    if (selectedLicenseType) {
      data = data.filter((row) => row.licnseType === selectedLicenseType);
    }

    if (selectedUserType) {
      data = data.filter((row) => row.userType === selectedUserType);
    }

    setFilteredData(data);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Licensee');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Licensee');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Licensee');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
    setShowSuspendModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteUser(selectedId));
    setShowDeleteModal(false);
  };

  const handleSuspendModal = (row) => {
    setShowSuspendModal(true);
    setSelectedRow(row);
  };

  const suspendUserConfirm = (status) => {
    handleStatusChange(selectedRow, status);
  };

  const handleStatusChange = (row, newStatus) => {
    const updatedStatus = newStatus ? 'suspended' : 'active';
    dispatch(changeStatus({ id: row.id, status: updatedStatus }));
    setShowSuspendModal(false);
  };

  const columns = [
    {
      name: 'USER ID',
      selector: (row) => row.usrRefId
    },

    {
      name: 'NAME',
      selector: (row) => `${capitalizeFirstLetter(row.fName)} ${capitalizeFirstLetter(row.lName)}`
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
      name: 'STATUS',
      selector: (row) => ({
        display: capitalizeFirstLetter(row.status),
        color: row.status.toLowerCase() === 'active' ? 'green' : row.status.toLowerCase() === 'suspended' ? 'red' : 'blue'
      }),
      cell: (row) => (
        <span
          style={{ color: row.status.toLowerCase() === 'active' ? 'green' : row.status.toLowerCase() === 'suspended' ? 'red' : 'blue' }}
        >
          {capitalizeFirstLetter(row.status)}
        </span>
      )
    },
    {
      name: 'CREATED DATE',
      selector: (row) => formatDateTime(row.createdAt)
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        //   <Tooltip title="View" placement="top" arrow>
        //     <IconButton onClick={() => handleOpenModal('viewform', row)}>
        //       <Visibility className="actn-icon1" />
        //     </IconButton>
        //   </Tooltip>
        //   <Tooltip title="Edit" placement="top" arrow>
        //     <IconButton onClick={() => handleOpenModal('editform', row)}>
        //       <EditNoteIcon className="actn-icon2" />
        //     </IconButton>
        //   </Tooltip>
        //   <Tooltip title="Delete" placement="top" arrow>
        //     <IconButton onClick={() => handleDeleteModal(row)}>
        //       <Delete className="actn-icon3" />
        //     </IconButton>
        //   </Tooltip>
        //   <Tooltip title="Suspend" placement="top" arrow>
        //     <IconButton onClick={() => handleSuspendModal(row)}>
        //       <PersonOff className="actn-icon4" />
        //     </IconButton>
        //   </Tooltip>
        // </div>
        <div style={{ width: '400px', display: 'flex', justifyContent: 'space-between' }}>
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
          <Tooltip title="Suspend" placement="top" arrow>
            <IconButton onClick={() => handleSuspendModal(row)}>
              <PersonOff className="actn-icon4" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

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
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        noDataComponent={<NoDataComponent />}
        subHeaderComponent={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                searchHandler={handleSearch}
                tableHeading={'Licensee'}
                count={filteredData.length}
                handleAddModal={() => handleOpenModal('addform')}
              />
              <IconButton
                onClick={() => setShowRoleFilter(!showRoleFilter)}
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
              <div style={{ marginTop: 10, display: 'block', alignItems: 'center' }}>
                <FormControl variant="standard" style={{ minWidth: 120, mb: -3 }}>
                  <Select
                    id="status-filter-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                    <MenuItem value="created">Created</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" style={{ minWidth: 120, mb: -3 }}>
                  <Select
                    id="license-filter-select"
                    value={selectedLicenseType}
                    onChange={(e) => setSelectedLicenseType(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">All Licensee Type</MenuItem>
                    <MenuItem value="shared">Shared</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" style={{ minWidth: 120, mb: -3 }}>
                  <Select
                    id="user-type-filter-select"
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">All User Type</MenuItem>
                    <MenuItem value="INDV">Individual</MenuItem>
                    <MenuItem value="ORG">Organization</MenuItem>
                    <MenuItem value="AGNT">Agent</MenuItem>
                  </Select>
                </FormControl>
              </div>
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
      {showDeleteModal && (
        <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
      )}
      {showSuspendModal && (
        <SuspendModal row={selectedRow} open={showSuspendModal} handleClose={handleCloseModal} onSuspendConfirm={suspendUserConfirm} />
      )}
    </div>
  );
}
