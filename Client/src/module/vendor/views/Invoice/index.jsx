import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ConfrmModal from 'ui-component/Modals/ConfrmModal';
import '../../../../assets/style/style.css';
import { IconButton } from '@mui/material';
import { Visibility, Delete, PictureAsPdf } from '@mui/icons-material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
import { deleteOrder, updateOrder } from 'module/vendor/container/orderContainer/slice';
import { addInvoice, getInvoice } from 'module/vendor/container/invoiceContainer/slice';
// import { getOrder } from 'module/vendor/container/orderContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from '../NoDataComponent';
import MyDocument from './invoicePDF.jsx';

export default function Index() {
  // const navigate = useNavigate();

  const [tableHeading, setTableHeading] = useState('');
  // const [orderAdd, setOrderAdd] = useState(false);
  // const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCnfrmModal, setShowCnfrmModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  // const [filteredData, setFilteredData] = useState([]);
  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const invoiceDetails = useSelector((state) => state.data.invoice.invoiceData);
  // const dataval = useSelector((state) => state.data.order.orderData.count);

  console.log('==invoiceDetails==', invoiceDetails);

  useEffect(() => {
    dispatch(getInvoice());
    setTableHeading('Invoice');
    // setOrderAdd(true)
    // setCount(Number(dataval));
  }, [dispatch]);

  // useEffect(() => {
  //   if (invoiceDetails) {
  //     const { count } = invoiceDetails;
  //     setCount(count);
  //   }
  // }, [invoiceDetails]);

  const handleOpenModal = (whichOpen) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Customer');
        // ComponentToRender = <OrderAddPage />;
        break;
      case 'editform':
        setModalHeading('Edit Customer');
        // ComponentToRender = <OrderAddPage formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Order');
        // ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = () => {
    // const searchValue = event.target.value.toLowerCase();
    // const filteredData = invoiceDetails.rows.filter((row) => {
    //   return (row.orderRefNo.toLowerCase().includes(searchValue) ||
    //     row.payAmt.toLowerCase().includes(searchValue) ||
    //     row.orderRefNo.toLowerCase().includes(searchValue) ||
    //     row.orderRefNo.toLowerCase().includes(searchValue));
    // });
    // console.log("==filteredData==---", filteredData);
    // setFilteredData(filteredData);
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    setShowCnfrmModal(false);
    if (formtype === 'addform') setPage(1);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteOrder(selectedId));
    setShowDeleteModal(false);
  };

  const orderConfirm = () => {
    let data = {
      id: selectedItem.id,
      status: 'confirm'
    };
    let invoice = {
      orderId: selectedItem.id
    };
    dispatch(updateOrder(data));
    dispatch(addInvoice(invoice));
    setShowCnfrmModal(false);
  };

  const columns = [
    {
      name: 'INV NO',
      selector: (row) => row.invNo
    },
    {
      name: 'INV TYPE',
      selector: (row) => row.invType
    },
    {
      name: 'ORDER NO',
      selector: (row) => row.orderId.orderRefNo
    },
    {
      name: 'AMOUNT',
      selector: (row) => row.amount
    },

    {
      name: 'STATUS',
      selector: (row) => capitalizeFirstLetter(row.status)
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform')}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton>
            <PDFDownloadLink document={<MyDocument data={row} />} fileName={`invoice_${row.invNo}.pdf`}>
              {({ loading }) => (loading ? <button>Loading...</button> : <PictureAsPdf className="actn-icon5" />)}
            </PDFDownloadLink>
          </IconButton>

          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={invoiceDetails.rows}
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
          <CardHead
            tableHeading={tableHeading}
            // orderAdd={orderAdd}
            // count={count}
            // handleAddModal={() => handleOpenModal('addform')}
            searchHandler={handleSearch}
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
          {showCnfrmModal && (
            <ConfrmModal
              open={showCnfrmModal}
              handleClose={handleCloseModal}
              // id={selectedId}
              orderConfirm={orderConfirm}
            />
          )}
        </div>
      }
    />
  );
}
