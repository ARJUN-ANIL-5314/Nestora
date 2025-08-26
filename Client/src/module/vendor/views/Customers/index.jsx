import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { IconButton, Tooltip, MenuItem, Select, FormControl } from '@mui/material';
import { Visibility, Delete, ShoppingCart, FilterList, ExpandLess } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';

import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import { capitalize } from '../utilities/Capitallised';
import { getCustomer, deleteCustomer } from 'module/vendor/container/customerContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from 'module/utlities/NoDataComponent.jsx';
import { roleMapping } from 'module/utlities/user_name';
import formatDateTime from 'utils/formatDateTime';

export default function Index() {
  const [tableHeading, setTableHeading] = useState('Customers');
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCustType, setSelectedCustType] = useState('');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.data.customers.customerData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCustomer({}));
  }, [dispatch]);

  useEffect(() => {
    setTableHeading('Customers');
    setCount(customerDetails?.rows?.length || 0);
    setFilteredData(customerDetails?.rows || []);
  }, [customerDetails]);

  useEffect(() => {
    let filtered = customerDetails?.rows || [];

    if (selectedStatus) {
      filtered = filtered.filter((row) => row.status === selectedStatus || row.customerId === selectedStatus);
    }

    if (selectedCustType) {
      filtered = filtered.filter((row) => row.custType === selectedCustType);
    }

    setFilteredData(filtered);
  }, [selectedStatus, selectedCustType, customerDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Customer');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Customer');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
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
    let data = customerDetails?.rows || [];

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

    // Apply customer type filter
    if (selectedCustType) {
      data = data.filter((row) => row.custType.toLowerCase() === selectedCustType.toLowerCase());
    }

    setFilteredData(data);
    setCount(data.length);
  };

  useEffect(() => {
    filterData();
  }, [searchValue, selectedStatus, selectedCustType, customerDetails]);

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
    dispatch(deleteCustomer(selectedId));
    setShowDeleteModal(false);
    dispatch(getCustomer({}));
  };

  const handleOrderClick = (row) => {
    const { id, fName, lName, contactMobile1 } = row;
    navigate('/orderAddPage', { state: { id, fName, lName, contactMobile1 } });
  };

  const handleStatusSelect = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleCustTypeSelect = (event) => {
    setSelectedCustType(event.target.value);
  };

  const handleClick = () => {
    setShowStatusFilter((prev) => !prev);
  };

  const truncateId = (id) => {
    return id?.length > 10 ? id.substring(12) + '' : id;
  };

  const columns = [
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
      name: 'CREATED DATE',
      selector: (row) => formatDateTime(row.createdAt)
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
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
          <Tooltip title="Order" placement="top" arrow>
            <IconButton onClick={() => handleOrderClick(row)}>
              <ShoppingCart className="actn-icon1" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  const statusOptions = ['active', 'suspended', 'created'];
  const custTypes = ['INDV', 'AGNT', 'ORG'];

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
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                tableHeading={tableHeading}
                count={count}
                handleAddModal={() => handleOpenModal('addform')}
                searchHandler={handleSearch}
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
            <div style={{ display: showStatusFilter ? 'block' : 'none' }}>
              <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                <Select
                  id="custtype-filter-select"
                  value={selectedCustType}
                  onChange={handleCustTypeSelect}
                  displayEmpty
                  sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px' }}
                >
                  <MenuItem value="">All Customer Types</MenuItem>
                  {custTypes.map((custType) => (
                    <MenuItem key={custType} value={custType}>
                      {capitalize(roleMapping[custType])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                <Select
                  id="status-filter-select"
                  value={selectedStatus}
                  onChange={handleStatusSelect}
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
            </div>
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
    </div>
  );
}
