// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { Modal, Box, Typography, TextField, Button, IconButton, Radio, useMediaQuery } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch, useSelector } from 'react-redux';
// import { tableCustomStyles } from '../../tableStyle';
// // import { capitalizeFirstLetter } from '../../utilities/Capitallised';
// import { getOrderById,getInvoiceById } from 'module/vendor/container/paymentContainer/slice';

// function OrderModal({ open, handleClose, onSelect, id }) {
//   const dispatch = useDispatch();
//   const OrderDetails = useSelector((state) => state.data.payment.OrderByIdData);
//   const InvoiceDetails = useSelector((state) => state.data.payment.InvoiceByIdData);
//   // const OrderDetails = useSelector((state) => state.data.customers.customerData);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
// console.log("==OrderDetails==", OrderDetails);
// console.log("==InvoiceDetails==", InvoiceDetails);
// console.log("==id==", id);

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: isMobile ? '90%' : '70%',
//     bgcolor: 'background.paper',
//     border: '1px solid #b1b1b1',
//     borderRadius: '10px',
//     boxShadow: 24,
//     p: 4
//   };

//   useEffect(() => {
//     dispatch(getOrderById(id));
//     dispatch(getInvoiceById(id));
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredData(InvoiceDetails.rows);
//   }, [InvoiceDetails]);

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filtered = InvoiceDetails.rows.filter((row) => {
//       return (
//         row.orderRefNo?.toLowerCase().includes(searchValue) ||
//         row.orderDate?.toLowerCase().includes(searchValue) ||
//         row.payAmt.toLowerCase().includes(searchValue) ||
//         row.dueDate?.toLowerCase().includes(searchValue) ||
//         row.dlryStatus?.toLowerCase().includes(searchValue)
//       );
//     });
//     setFilteredData(filtered);
//   };

//   const handleRowSelect = (row) => {
//     setSelectedRow(row);
//   };

//   const handleFormSubmit = () => {
//     if (selectedRow) {
//       onSelect(selectedRow);
//     }
//   };

//   const columns = [
//     {
//       name: 'SELECT',
//       cell: (row) => <Radio checked={selectedRow?.orderRefNo === row.orderRefNo} onChange={() => handleRowSelect(row)} />,
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true
//     },
//     {
//       name: 'ORDER NO',
//       selector: (row) => {
//       return  row.orderNo
//       }
//     },
//     {
//       name: 'INV NO',
//       selector: (row) => {
//         return   row.invNo
//       }
//     },

//     {
//       name: 'AMOUNT',
//       selector: (row) => row.amount
//     },
//     {
//       name: 'PAYABLE AMOUNT',
//       selector: (row) => row.payableAmnt
//     },
//     // {
//     //   name: 'DUE DATE',
//     //   selector: (row) => row.orderId.dueDate
//     // },
//     // {
//     //   name: 'DELIVERY STATUS',
//     //   selector: (row) => row.dlryStatus
//     // }
//   ];

//   return (
//     <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//       <Box sx={style}>
//         <DataTable
//           columns={columns}
//           data={filteredData}
//           customStyles={tableCustomStyles}
//           striped
//           highlightOnHover
//           pointerOnHover
//           onRowClicked={handleRowSelect}
//           subHeader
//           pagination
//           paginationPerPage={6}
//           paginationRowsPerPageOptions={[10, 20, 30]}
//           subHeaderComponent={
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               {!isMobile ? <Typography id="modal-modal-title" sx={{textAlign:'start'}}>Select Order</Typography> : <></>}
//               <TextField
//                 variant="outlined"
//                 placeholder="Search..."
//                 onChange={handleSearch}
//                 style={{ backgroundColor: 'white', width: '40vh' }}
//               />
//               <IconButton onClick={handleClose}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           }
//         />
//         <Box mt={2} textAlign="right">
//           <Button variant="contained" color="primary" onClick={handleFormSubmit}>
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// export default OrderModal;

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Box, Typography, TextField, Button, IconButton, Radio, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { tableCustomStyles } from '../../tableStyle';
// import { capitalizeFirstLetter } from '../../utilities/Capitallised';
import { getOrderById } from 'module/vendor/container/paymentContainer/slice';

function OrderModal({ open, handleClose, onSelect, id }) {
  const dispatch = useDispatch();
  const OrderDetails = useSelector((state) => state.data.payment.OrderByIdData);
  // const OrderDetails = useSelector((state) => state.data.customers.customerData);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '90%' : '70%',
    bgcolor: 'background.paper',
    border: '1px solid #b1b1b1',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(OrderDetails.rows);
  }, [OrderDetails]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = OrderDetails.rows.filter((row) => {
      return (
        row.orderRefNo?.toLowerCase().includes(searchValue) ||
        row.orderDate?.toLowerCase().includes(searchValue) ||
        row.payAmt.toLowerCase().includes(searchValue) ||
        row.dueDate?.toLowerCase().includes(searchValue) ||
        row.dlryStatus?.toLowerCase().includes(searchValue)
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
      cell: (row) => <Radio checked={selectedRow?.orderRefNo === row.orderRefNo} onChange={() => handleRowSelect(row)} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
    {
      name: 'ORDER REF NO',
      selector: (row) => row.orderRefNo
    },
    {
      name: 'ORDER DATE',
      selector: (row) => row.orderDate
    },
    {
      name: 'AMOUNT',
      selector: (row) => row.payAmt
    },
    {
      name: 'DUE DATE',
      selector: (row) => row.dueDate
    },
    {
      name: 'DELIVERY STATUS',
      selector: (row) => row.dlryStatus
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
              {!isMobile ? (
                <Typography id="modal-modal-title" sx={{ textAlign: 'start' }}>
                  Select Order
                </Typography>
              ) : (
                <></>
              )}
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

export default OrderModal;
