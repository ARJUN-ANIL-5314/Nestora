import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Box, Tooltip } from '@mui/material';
import { Visibility, PersonOff, FilterList, Close } from '@mui/icons-material';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import ViewModal from './viewModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import SuspendModal from 'ui-component/Modals/SuspendModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllmyteam, changeStatus } from 'module/vendor/container/userContainer/slice';
import { tableCustomStyles } from '../tableStyle';
import '../../../../assets/style/style.css';
import { roleMapping } from 'module/utlities/user_name.js';
import NoDataComponent from 'module/utlities/NoDataComponent';
import FilterModalComponent from './FilterModalComponent.jsx';
import { capitalize } from 'utils/Capitalised';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');

  const [filteredData, setFilteredData] = useState([]);
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  const [count, setCount] = useState(0);
  const modalStyle = { width: '60%' };

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.getAllTeam);
  const nonLicenseeUsers = userDetails?.rows?.filter((user) => user.role !== 'licensee') || [];
  const LicenseeFilter = useSelector((state) => state.data.user?.licenseeOptions?.team || []);

  useEffect(() => {
    dispatch(getAllmyteam({}));
    setTableHeading(' Teams');
  }, [dispatch]);

  useEffect(() => {
    if (nonLicenseeUsers.length > 0) {
      applyFilters(nonLicenseeUsers, filterValues);
    }
  }, [userDetails, filterValues]);

  const applyFilters = (data, filters) => {
    let filtered = data;

    if (filters?.LicenseeFilter?.value) {
      filtered = LicenseeFilter;
    }

    if (filters?.status?.value) {
      filtered = filtered.filter((user) => user.status === filters.status.value);
    }

    if (filters?.anotherStatus?.value) {
      filtered = filtered.filter((user) => user.role === filters.anotherStatus.value);
    }

    setFilteredData(filtered);
    setCount(filtered.length);
  };

  const handleApplyFilter = (newFilterValues) => {
    setFilterValues(newFilterValues);
    setShowFilterModal(false);
    setOpenModal(false);
  };

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Team Member');
        ComponentToRender = <NoDataComponent />;
        break;
      case 'editform':
        setModalHeading('Edit Team Member');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading(
          <>
            View Team Member
            <span
              style={{
                backgroundColor: '#505359',
                color: '#f0f0f0',
                padding: '4px 12px',
                borderRadius: '12px',
                marginLeft: '12px',
                display: 'inline-block',
                fontSize: '0.85em',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.05em'
              }}
            >
              {item.orgId}
            </span>
          </>
        );
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleClick = () => {
    setShowRoleFilter((prev) => !prev);
    setShowFilterModal((prev) => !prev);
    setOpenModal(true);
    setModalHeading('Teams Filter');
    setModalComponent(<FilterModalComponent handleApply={handleApplyFilter} userDetails={userDetails} />);
  };

  const handleClearFilter = () => {
    setFilteredData(nonLicenseeUsers);
    setCount(nonLicenseeUsers.length);
    setShowRoleFilter(false);
    setShowFilterModal(false);
    setOpenModal(false);
    setFilterValues({});
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = nonLicenseeUsers.filter((row) => {
      return (
        `${row.fName} ${row.lName}`.toLowerCase().includes(searchValue) ||
        row.usrRefId?.toLowerCase().includes(searchValue) ||
        row.email?.toLowerCase().includes(searchValue) ||
        row.mobileNo?.toLowerCase().includes(searchValue) ||
        row.orgName?.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filtered);
    setCount(filtered.length);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowFilterModal(false);
    setShowSuspendModal(false);
  };

  const handleSuspendModal = (row) => {
    setShowSuspendModal(true);
    setSelectedRow(row);
  };

  const suspendUserConfirm = (newStatus) => {
    handleStatusChange(selectedRow, newStatus);
  };

  const handleStatusChange = (row, newStatus) => {
    const updatedStatus = newStatus ? 'suspended' : 'active';
    dispatch(changeStatus({ id: row.id, status: updatedStatus }));
    setShowSuspendModal(false);
  };

  const columns = [
    {
      name: '#UID',
      selector: (row) => row.usrRefId
    },
    {
      name: 'ORG NAME',
      selector: (row) => row.orgName
    },
    {
      name: 'CREATED BY',
      selector: (row) => capitalize(`${row.createdBy.fName} ${row.createdBy.lName}`)
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
      name: 'ROLE',
      selector: (row) => (row.role ? roleMapping[row.role] : '-')
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
              <Visibility className="actn-icon1" />
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

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

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
              <CardHead searchHandler={handleSearch} tableHeading={tableHeading} count={count} hasAdd={false} />
              <IconButton
                onClick={showRoleFilter ? handleClearFilter : handleClick}
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
                {showRoleFilter ? <Close /> : <FilterList />}
              </IconButton>
            </div>
            {showRoleFilter && (
              <Modal
                open={showFilterModal}
                onClose={handleCloseModal}
                aria-labelledby="filter-modal-title"
                aria-describedby="filter-modal-description"
              >
                <Box sx={modalBoxStyle}>
                  <FilterModalComponent handleApply={handleApplyFilter} userDetails={userDetails} />
                </Box>
              </Modal>
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
      {showSuspendModal && (
        <SuspendModal row={selectedRow} open={showSuspendModal} handleClose={handleCloseModal} onSuspendConfirm={suspendUserConfirm} />
      )}
    </div>
  );
}
