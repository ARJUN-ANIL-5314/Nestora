import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch, useSelector } from 'react-redux';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import '../../../../assets/style/style.css';
import { tableCustomStyles } from '../tableStyle.jsx';
import { getEnqSource, deleteEnqSource } from 'module/admin/container/enqSourceContainer/slice';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import NoDataComponent from 'module/utlities/NoDataComponent.jsx';

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
  const enqSourceDetails = useSelector((state) => state.adminReducer.enqsource.enqsourceData);
  // const enqSourceCount = useSelector((state) => state.adminReducer.enqsource.enqsourceData.count);

  useEffect(() => {
    dispatch(getEnqSource({}));
    setTableHeading('Enquiry Source');
  }, [dispatch]);

  useEffect(() => {
    if (enqSourceDetails) {
      const { count, rows } = enqSourceDetails;
      setFilteredData(rows);
      setCount(count);
    }
  }, [enqSourceDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Enquiry Source');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Enquiry Source');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Enquiry Source');
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
    dispatch(deleteEnqSource(selectedId));
    setShowDeleteModal(false);
    dispatch(getEnqSource());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = enqSourceDetails.rows.filter((row) => {
      return row.name.toLowerCase().includes(searchValue) || row.desc.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  // const dataToDisplay = filteredData.length > 0 ? filteredData : enqSourceDetails.rows;

  const columns = [
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.name)
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => capitalizeFirstLetter(row.desc)
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
      customStyles={tableCustomStyles}
      pagination
      noDataComponent={<NoDataComponent />}
      paginationPerPage={10}
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
