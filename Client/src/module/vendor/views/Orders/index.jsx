import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
// import { useNavigate } from 'react-router-dom';
import OrderAddPage from './addOrder/orderAddPage.jsx';
// import { useNavigate } from 'react-router-dom';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ConfrmModal from 'ui-component/Modals/ConfrmModal';
import '../../../../assets/style/style.css';
import ViewModal from './viewModal.jsx';
import { IconButton } from '@mui/material';
import { Visibility, TaskAlt, Delete } from '@mui/icons-material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
import { deleteOrder, updateOrder } from 'module/vendor/container/orderContainer/slice';
import { addInvoice } from 'module/vendor/container/invoiceContainer/slice';
import { getOrder } from 'module/vendor/container/orderContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from './NoDataComponent';

export default function Index() {
  // const navigate = useNavigate();

  const [tableHeading, setTableHeading] = useState('');
  const [orderAdd, setOrderAdd] = useState(false);
  const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCnfrmModal, setShowCnfrmModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.data.order.orderData);
  // const dataval = useSelector((state) => state.data.order.orderData.count);

  console.log('==orderDetails==', orderDetails);

  useEffect(() => {
    dispatch(getOrder());
    setTableHeading('Orders');
    setOrderAdd(true);
    // setCount(Number(dataval));
  }, [dispatch]);

  useEffect(() => {
    const filtered = orderDetails?.rows;
    setFilteredData(filtered);
    console.log('==filtered==', filtered);
  }, [orderDetails]);

  useEffect(() => {
    if (orderDetails) {
      const { count } = orderDetails;
      setCount(count);
    }
  }, [orderDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Customer');
        ComponentToRender = <OrderAddPage />;
        break;
      case 'editform':
        setModalHeading('Edit Customer');
        ComponentToRender = <OrderAddPage formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Order');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = orderDetails.rows.filter((row) => {
      return (
        row.orderRefNo.toLowerCase().includes(searchValue) ||
        row.payAmt.toLowerCase().includes(searchValue) ||
        row.orderRefNo.toLowerCase().includes(searchValue) ||
        row.orderRefNo.toLowerCase().includes(searchValue)
      );
    });
    console.log('==filteredData==---', filteredData);
    setFilteredData(filteredData);
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
    dispatch(getOrder());
  };

  const handleCnfrmModal = (item) => {
    console.log('item====', item.orderFrom.id);

    setShowCnfrmModal(true);
    setSelectedItem(item);
  };

  const orderConfirm = () => {
    let data = {
      id: selectedItem.id,
      status: 'confirm'
    };
    let invoice = {
      orderId: selectedItem.id,
      orderFrom: selectedItem.orderFrom.id
    };

    console.log('==ss==', invoice);

    dispatch(updateOrder(data));
    dispatch(addInvoice(invoice));
    setShowCnfrmModal(false);
    dispatch(getOrder());
  };

  const columns = [
    {
      name: 'ORDER ID',
      selector: (row) => row.orderRefNo
    },
    // {
    //   name: 'CUST ID',

    //   selector: row => row.orderFrom.customerId,
    // },
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.orderFromName)
    },
    {
      name: 'MOBILE',
      selector: (row) => row.custContactNo
    },
    {
      name: 'PAYMENT',
      selector: (row) => row.orderAmount
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
          <IconButton onClick={() => handleCnfrmModal(row)}>
            <TaskAlt className="actn-icon2" style={{ fontSize: '20px' }} />
          </IconButton>
          {/* <IconButton >
            <EditNoteIcon className='actn-icon2' />
          </IconButton> */}
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
      data={filteredData > 0 ? filteredData : orderDetails.rows}
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
            orderAdd={orderAdd}
            count={count}
            handleAddModal={() => handleOpenModal('addform')}
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
