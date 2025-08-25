import React, { useState, useEffect } from 'react';
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  // FormLabel,
  Tooltip
} from '@mui/material';
import { Visibility, Delete, CheckCircle, PersonOff, FilterList, ExpandLess } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { getInternalSupport, updateStatus, deleteSupport, totalCount } from '../../container/SupportContainer/slice';
import { tableCustomStyles } from '../../ui-component/common/tableStyle';
import 'assets/style/style.css';
import NoDataComponent from '../../ui-component/common/NoDataComponent';
import formatDateTime from '../../utils/formatDateTime';
//import formatDate from '../../utils/formatDate'
import { capitalize } from '../../utils/Capitalised';
import ChangeStatusModal from 'ui-component/Modals/ChangeStatusModel';
import { roleMapping } from 'module/utlities/user_name';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState('');
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectItem, setSelectedItem] = useState('created');

  const dispatch = useDispatch();

  const supportDetails = useSelector((state) => state.support.supportInternal);

  const userRole = useSelector((state) => state.login?.user?.role);

  const userData = localStorage.getItem('user');

  const userObject = JSON.parse(userData);
  const userId = userObject?.user?.id;

  const isUserInSupportTo = (userId, supportTo) => {
    return supportTo.some((support) => support.id == userId);
  };

  const isAdmin = (userRole) => {
    return userRole === 'admin';
  };

  const allowedSupportFromRoles = ['licensee', 'adminOptr', 'adminMngr', 'adminAcnt'];

  useEffect(() => {
    dispatch(getInternalSupport({}));
    dispatch(totalCount());
  }, [dispatch]);

  useEffect(() => {
    if (supportDetails) {
      const { count } = supportDetails;
      setCount(count);
    }
  }, [supportDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Internal Support');
        setModalComponent(<AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />);
        break;
      case 'editform':
        setModalHeading('Edit Internal Support');
        setModalComponent(<AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />);
        break;
      case 'viewform':
        setModalHeading('View Internal Support');
        setModalComponent(<ViewModal data={item} />);
        break;
      default:
        setModalComponent(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
    // setSelectedRole('');
    // setSelectedStatus('');
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteSupport(selectedId));
    setShowDeleteModal(false);
    dispatch(getInternalSupport({}));
  };

  useEffect(() => {
    filterData();
  }, [searchValue, selectedRole, selectedStatus, supportDetails]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const statuConfirm = () => {
    let nextStatus;

    switch (selectItem?.status?.toLowerCase()) {
      case 'active':
        nextStatus = 'inprogress';
        break;
      case 'inprogress':
        nextStatus = 'completed';
        break;
      default:
        nextStatus = selectItem?.status;
    }

    const id = selectItem?.id;
    const status = { status: nextStatus };

    dispatch(updateStatus({ id, status }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'created':
        return 'blue';
      case 'active':
        return 'green';
      case 'inprogress':
        return 'orange';
      case 'completed':
        return 'red';
      default:
        return 'black';
    }
  };

  const handleFirstStatusChange = (row) => {
    if (userRole == 'admin' && allowedSupportFromRoles.includes(row.supportFrom.role)) {
      if (row.status == 'created') {
        const id = row.id;
        const status = { status: 'active' };
        dispatch(updateStatus({ id, status }));
      }
    } else {
      if (row.status == 'created' && isUserInSupportTo(userId, row.supportTo) && !isAdmin(userRole)) {
        const id = row.id;
        const status = { status: 'active' };
        dispatch(updateStatus({ id, status }));
      }
    }
  };

  const handleStatusModal = (row) => {
    setSelectedItem(row);
    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedItem();
  };

  const filterData = () => {
    let filteredData = supportDetails;
    if (searchValue !== '') {
      filteredData = filteredData.filter((row) => {
        return row.sprtTitle.toLowerCase().includes(searchValue) || row.ticketNo.toLowerCase().includes(searchValue);
      });
    }
    if (selectedRole !== '') {
      filteredData = filteredData.filter((row) => row.priority === selectedRole);
    }

    if (selectedStatus !== '') {
      filteredData = filteredData.filter((row) => row.status === selectedStatus);
    }
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  const handleClick = () => {
    setShowRoleFilter((prev) => !prev);
  };

  const columns = [
    {
      name: 'TICKET NO',
      selector: (row) => row.ticketNo
    },
    {
      name: 'TITLE',
      selector: (row) => capitalize(row.sprtTitle)
    },
    {
      name: 'CREATED DATE',
      selector: (row) => formatDateTime(row.createdAt)
    },
    {
      name: 'PRIORITY',
      selector: (row) => capitalize(row.priority)
    },
    {
      name: 'STATUS',
      selector: 'status',
      cell: (row) => (
        <div>
          <span style={{ color: getStatusColor(row.status) }}>{row.status ? roleMapping[row.status] : '-'}</span>
        </div>
      )
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              onClick={() => {
                handleFirstStatusChange(row);
                handleOpenModal('viewform', row);
              }}
            >
              {' '}
              <Visibility className="actn-icon1" />
            </IconButton>
          </Tooltip>

          {!isUserInSupportTo(userId, row.supportTo) && (
            <>
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
            </>
          )}

          {isUserInSupportTo(userId, row.supportTo) && row.status !== 'completed' ? (
            <Tooltip title="Update Status" placement="top" arrow>
              <IconButton onClick={() => handleStatusModal(row)}>
                <PersonOff className="actn-icon4" />
              </IconButton>
            </Tooltip>
          ) : (
            row.status === 'completed' && (
              <Tooltip title="Completed" placement="top" arrow>
                <IconButton>
                  <CheckCircle style={{ color: 'green' }} className="actn-icon4" />
                </IconButton>
              </Tooltip>
            )
          )}
        </div>
      )
    }
  ];

  const fixedStatus = ['created', 'active', 'inprogress', 'completed'];
  const fixedRoles = ['low', 'medium', 'high', 'urgent'];

  return (
    <div style={{ position: 'relative' }}>
      <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={
          searchValue?.length > 0 && filteredData?.length > 0
            ? filteredData
            : searchValue?.length > 0 && filteredData?.length === 0
            ? []
            : searchValue?.length === 0 && (selectedRole !== '' || selectedStatus !== '')
            ? filteredData
            : supportDetails?.length > 0
            ? supportDetails
            : []
        }
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        striped
        noDataComponent={<NoDataComponent />}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[6, 10, 20, 30]}
        subHeaderComponent={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                searchHandler={handleSearch}
                tableHeading="Internal Support"
                count={count}
                handleAddModal={() => handleOpenModal('addform')}
                hasAdd={userRole !== 'admin'}
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
                {showRoleFilter ? <ExpandLess /> : <FilterList />}
              </IconButton>
            </div>
            {showRoleFilter && (
              <div>
                <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                  <Select
                    id="status-filter-select"
                    value={selectedStatus}
                    onChange={(e) => handleStatusSelect(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    {fixedStatus.map((status) => (
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
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">All Priorities</MenuItem>
                    {fixedRoles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {capitalize(role)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        }
      />
      {openModal && (
        <OpenModal open={openModal} handleClose={handleCloseModal} component={modalComponent} mdlwidth={'60%'} mdlHeading={modalHeading} />
      )}
      {showDeleteModal && (
        <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
      )}
      {showStatusModal && (
        <ChangeStatusModal open={showStatusModal} handleClose={handleCloseStatusModal} id={selectedId} onStatusConfirm={statuConfirm} />
      )}
    </div>
  );
}
