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
import { getDistrict, deleteDistrict } from 'module/admin/container/districtContainer/slice';
import NoDataComponent from 'module/utlities/NoDataComponent.js';
import { capitalizeFirstLetter } from 'module/licensee/views/utilities/Capitallised.js';

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
  const districtDetails = useSelector((state) => state.adminReducer.district.districtData);
  // const districtCount = useSelector((state) => state.adminReducer.district.districtData.count);

  useEffect(() => {
    dispatch(getDistrict({}));

    setTableHeading('District');
  }, [dispatch]);

  useEffect(() => {
    if (districtDetails) {
      const { count, rows } = districtDetails;
      setFilteredData(rows);
      setCount(count);
    }
  }, [districtDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add District');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit District');
        ComponentToRender = (
          <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} districtDetails={districtDetails} />
        );
        break;
      case 'viewform':
        setModalHeading('View District');
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
    dispatch(deleteDistrict(selectedId));
    setShowDeleteModal(false);
    dispatch(getDistrict());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = districtDetails.rows.filter((row) => {
      return row.name.toLowerCase().includes(searchValue) || row?.stateId?.name.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  // const dataToDisplay = filteredData.length > 0 ? filteredData : districtDetails.rows;

  const columns = [
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.name)
    },
    {
      name: 'STATE',
      selector: (row) => capitalizeFirstLetter(row?.stateId?.name)
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
    <DataTable
      columns={columns}
      data={filteredData}
      striped
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      paginationPerPage={10}
      customStyles={tableCustomStyles}
      paginationRowsPerPageOptions={[10, 20, 30]}
      noDataComponent={<NoDataComponent />}
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
