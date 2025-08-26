import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch, useSelector } from 'react-redux';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import { tableCustomStyles } from '../tableStyle.jsx';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import '../../../../assets/style/style.css';
import { getCountry, deleteCountry } from 'module/admin/container/countryContainer/slice';

import { capitalizeFirstLetter } from 'module/utilities/Capitallised';
import NoDataComponent from 'module/utilities/NoDataComponent';

export default function Country() {
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

  const countryDetails = useSelector((state) => state.adminReducer.country.countryData);

  useEffect(() => {
    dispatch(getCountry({}));
    setTableHeading('Country');
  }, [dispatch]);

  useEffect(() => {
    if (countryDetails) {
      const { count, rows } = countryDetails;
      setFilteredData(rows);
      setCount(count);
    }
  }, [countryDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Country');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Country');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Country');
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
    if (formtype === 'addform') {
      // Ensure you have setPage in your codebase, otherwise remove this line
      // setPage(1);
    }
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteCountry(selectedId));
    setShowDeleteModal(false);
    dispatch(getCountry());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = countryDetails.rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.isoName.toLowerCase().includes(searchValue) ||
        row.iso3Name.toLowerCase().includes(searchValue) ||
        row.niceName.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  const columns = [
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.name),
    },
    {
      name: 'ISO NAME',
      selector: (row) => row.isoName.toUpperCase(),
    },
    {
      name: 'ISO3 NAME',
      selector: (row) => row.iso3Name.toUpperCase(),
    },
    {
      name: 'NICE NAME',
      selector: (row) => capitalizeFirstLetter(row.niceName),
    },
    {
      name: 'CALLING CODE',
      selector: (row) => row.callingCode,
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
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      striped
      highlightOnHover
      pointerOnHover
      subHeader
      customStyles={tableCustomStyles}
      pagination
      paginationPerPage={10}
      noDataComponent={<NoDataComponent />}
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
            <DeleteModal
              open={showDeleteModal}
              handleClose={handleCloseModal}
              id={selectedId}
              onDeleteConfirm={deleteReferenceConfirm}
            />
          )}
        </div>
      }
    />
  );
}
