import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { tableCustomStyles } from '../tableStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import '../../../../assets/style/style.css';
import { getState, deleteState } from 'module/admin/container/stateContainer/slice';
import { capitalizeFirstLetter } from 'module/licensee/views/utilities/Capitallised.js';

// Corrected the folder name from 'utlities' to 'utilities'
import NoDataComponent from 'module/utilities/NoDataComponent';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(0);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);

  useEffect(() => {
    dispatch(getState({}));
    setTableHeading('State');
  }, [dispatch]);

  useEffect(() => {
    if (stateDetails) {
      const { count, rows } = stateDetails;
      setFilteredData(rows);
      setCount(count);
    }
  }, [stateDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add State');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit State');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View State');
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
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteState(selectedId));
    setShowDeleteModal(false);
    dispatch(getState());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = stateDetails.rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.code.toLowerCase().includes(searchValue) ||
        row.capital.toLowerCase().includes(searchValue) ||
        row?.countryId?.name.toLowerCase().includes(searchValue)
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
      name: 'TYPE',
      selector: (row) => capitalizeFirstLetter(row.type)
    },
    {
      name: 'CAPITAL',
      selector: (row) => capitalizeFirstLetter(row.capital)
    },
    {
      name: 'COUNTRY',
      selector: (row) => capitalizeFirstLetter(row?.countryId?.name)
    },
    {
      name: 'ACTIONS',
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
    <DataTable
      columns={columns}
      data={filteredData}
      striped
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      noDataComponent={<NoDataComponent />}
      paginationPerPage={10}
      customStyles={tableCustomStyles}
      paginationRowsPerPageOptions={[10, 20, 30]}
      subHeaderComponent={
        <div>
          <CardHead
            tableHeading={tableHeading}
            handleAddModal={() => handleOpenModal('addform')}
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
  );
}
