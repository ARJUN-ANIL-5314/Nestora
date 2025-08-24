import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import '../../../../assets/style/style.css';
import ViewModal from './ViewModal.js';
import { FormControl, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { capitalize } from '../utilities/Capitallised';
import { getCustomer, deleteCustomer } from 'module/vendor/container/customerContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from './NoDataComponent.js';
import AddModalbox from './addPayment/addPayment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { useNavigate } from 'react-router-dom';
import { getPayments } from 'module/vendor/container/paymentContainer/slice';
import { FilterList, ExpandLess } from '@mui/icons-material';

import styles from 'ui-component/common/style';
export default function Index() {
  // const navigate = useNavigate();

  const [tableHeading, setTableHeading] = useState('');
  // const [paymentAdd, setOrderAdd] = useState(false);
  const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  // const [open, setOpen] = React.useState(false);
  const [selectedFilter, setselectedFilter] = useState('');
  const [showFilters, setshowFilters] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const style = commonStyles(theme);
  const styling = styles(theme);

  // const handleAddDrawerOpen = () => {
  //   setOpen(true);
  // };
  // const handleAddDrawerClose = () => {
  //   setOpen(false);
  // };

  const HandlePaymentAddClick = () => {
    navigate('/PaymentAddPage');
  };
  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const PaymentData = useSelector((state) => state.data.payment.PaymentData);
  // const dataval = useSelector((state) => state.data.customers.customerData.count);

  useEffect(() => {
    dispatch(getPayments());
    setTableHeading('Payment');
    // setOrderAdd(true);
    // setCount(Number());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilter) {
      const filtered = PaymentData?.rows?.filter((row) => row.status === selectedFilter) || [];
      setFilteredData(filtered);
    } else {
      setFilteredData(PaymentData?.rows || []);
    }
  }, [selectedFilter, PaymentData]);

  useEffect(() => {
    if (PaymentData) {
      const { count, rows } = PaymentData;
      setFilteredData(rows);
      setCount(count);
    }
  }, [PaymentData]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Customer');
        ComponentToRender = <AddModalbox onclose={handleAddDrawerClose} open={open} />;
        break;
      case 'editform':
        setModalHeading('Edit Customer');
        ComponentToRender = <ViewModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('Payment Details');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  // const handleSearch = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   if (PaymentData && PaymentData.rows) {
  //     const filtered = PaymentData.rows.filter((row) => {
  //       return (
  //         (row.fName && row.fName.toLowerCase().includes(searchValue)) ||
  //         (row.custEmail && row.custEmail.toLowerCase().includes(searchValue)) ||
  //         (row.lName && row.lName.toLowerCase().includes(searchValue)) ||
  //         (row.orderNo && row.orderNo.toLowerCase().includes(searchValue)) ||
  //         (row.custContactNo && row.custContactNo.toLowerCase().includes(searchValue))
  //       );
  //     });
  //     setFilteredData(filtered);
  //     setCount(filteredData.length);
  //   }
  // };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (PaymentData?.rows) {
      const filteredData = PaymentData.rows.filter((row) => {
        return (
          (row.fName && row.fName.toLowerCase().includes(searchValue)) ||
          (row.custEmail && row.custEmail.toLowerCase().includes(searchValue)) ||
          (row.lName && row.lName.toLowerCase().includes(searchValue)) ||
          (row.orderNo && row.orderNo.toLowerCase().includes(searchValue)) ||
          (row.custContactNo && row.custContactNo.toLowerCase().includes(searchValue))
        );
      });
      setFilteredData(filteredData);
      setCount(filteredData.length);
    }
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    if (formtype === 'addform') setPage(1);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteCustomer(selectedId));
    setShowDeleteModal(false);
    dispatch(getCustomer());
  };

  const columns = [
    {
      name: 'ORDER NO',

      selector: (row) => (
        <Tooltip title={row?.orderNo} arrow>
          <span>{row?.orderNo}</span>
        </Tooltip>
      )
      // sortable: true,
    },
    // {
    //   name: 'Payment NO',
    //   selector: row => row.paymentNo,
    //   sortable: true,
    // },
    {
      name: 'NAME',

      selector: (row) => (
        <Tooltip title={capitalize(`${row.fName} ${row.lName}`)} arrow>
          <span>{capitalize(`${row.fName} ${row.lName}`)}</span>
        </Tooltip>
      ),
      sortable: true
    },

    {
      name: 'MOBILE',

      selector: (row) => (
        <Tooltip title={row.custContactNo} arrow>
          <span>{row.custContactNo}</span>
        </Tooltip>
      ),
      sortable: true
    },
    {
      name: 'EMAIL',
      selector: (row) => (
        <Tooltip title={row.custEmail} arrow>
          <span>{row.custEmail}</span>
        </Tooltip>
      ),
      sortable: true
    },
    {
      name: 'PAID DATE',
      selector: (row) => new Date(row.paidDate).toLocaleDateString(),
      sortable: true
    },
    {
      name: 'DUE DATE',
      selector: (row) => new Date(row.dueDate).toLocaleDateString(),
      sortable: true
    },
    {
      name: 'AMOUNT',
      selector: (row) => row.paidAmnt,
      sortable: true
    },
    {
      name: 'MODE',
      selector: (row) => row.payMode,
      sortable: true
    },
    {
      name: 'STATUS',
      selector: (row) => capitalize(row.status),
      sortable: true
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const handleClick = () => {
    setshowFilters((prev) => !prev); // Toggle the filter display
  };

  const handleStatusSelect = (status) => {
    setselectedFilter(status);
  };
  const FiltersArray = ['open', 'partial', 'paid', 'cancelled', 'refunded'];

  return (
    <DataTable
      columns={columns}
      // data={filteredData.length > 0 ? filteredData : PaymentData.rows}
      data={filteredData}
      customStyles={tableCustomStyles}
      striped
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      paginationPerPage={6}
      paginationRowsPerPageOptions={[10, 20, 30]}
      noDataComponent={<NoDataComponent />}
      subHeaderComponent={
        <div>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ ...styling.modalHeadContent, textAlign: 'left' }}>{tableHeading ? tableHeading : 'Add Heading'}</Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                sx={{ width: '100%' }}
                placeholder="Search Here"
                InputLabelProps={{
                  shrink: false
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                className="searchOne"
                onChange={handleSearch}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ ...styling.modalResult, marginRight: 1 }}>
                  <FilterAltSharpIcon />
                  <span style={{ fontWeight: '900' }}>Result:{count ? count : '0'}</span>
                </Box>
                <Button color="info" variant="contained" onClick={HandlePaymentAddClick} sx={style.addBtnHead}>
                  +ADD
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={1} md={1} sx={{ marginTop: '5px' }}>
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
                {showFilters ? <ExpandLess /> : <FilterList />}
              </IconButton>
            </Grid>
          </Grid>
          {showFilters && (
            <div style={{ marginTop: 10 }}>
              <FormControl variant="standard" style={{ minWidth: 120, marginBottom: -3 }}>
                <Select
                  id="status-filter-select"
                  value={selectedFilter}
                  onChange={(e) => handleStatusSelect(e.target.value)}
                  displayEmpty
                  sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px' }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  {FiltersArray.map((status) => (
                    <MenuItem key={status} value={status}>
                      {capitalize(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
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
      }
    />
  );
}
