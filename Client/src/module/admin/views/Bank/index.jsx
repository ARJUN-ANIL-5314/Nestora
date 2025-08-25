import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import '../../../../assets/style/style.css';
import ViewModal from './viewModal.jsx';
import { IconButton } from '@mui/material';
import { tableCustomStyles } from '../tableStyle.jsx';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getBank, deleteBank } from 'module/admin/container/bankContainer/slice';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from 'module/utlities/NoDataComponent.js';

export default function Support() {
  const [tableHeading, setTableHeading] = useState('Bank');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(0);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const bankDetails = useSelector((state) => state.adminReducer.bank.bankData);

  useEffect(() => {
    dispatch(getBank({}));
    setTableHeading('Bank');
  }, [dispatch]);

  useEffect(() => {
    if (bankDetails) {
      const { count, rows } = bankDetails;
      setFilteredData(rows);
      setCount(count);
    }
  }, [bankDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Bank');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Bank');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Bank');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    if (formtype === 'addform') setPage(1);
    dispatch(getBank());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteBank(selectedId));
    setShowDeleteModal(false);
    dispatch(getBank());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = bankDetails.rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.code.toLowerCase().includes(searchValue) ||
        row.desc.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  const columns = [
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.name)
    },
    {
      name: 'CODE',
      selector: (row) => row.code.toUpperCase()
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        if (row.desc) {
          return capitalizeFirstLetter(row.desc.length > 20 ? row.desc.substring(0, 20) + '....' : row.desc);
        } else {
          return 'N/A';
        }
      }
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <DataTable
        columns={columns}
        data={filteredData}
        striped
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        customStyles={tableCustomStyles}
        paginationPerPage={10}
        noDataComponent={<NoDataComponent />}
        paginationRowsPerPageOptions={[10, 20, 30]}
        subHeaderComponent={
          <div>
            <CardHead
              tableHeading={tableHeading}
              handleAddModal={() => handleOpenModal('addform')}
              bankDetails={bankDetails}
              searchHandler={handleSearch}
              count={count}
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
        }
      />
    </div>
  );
}
