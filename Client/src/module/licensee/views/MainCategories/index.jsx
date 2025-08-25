import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal.jsx';
import { IconButton, Tooltip } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { tableCustomStyles } from '../tableStyle.jsx';
import '../../../../assets/style/style.css';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal.jsx';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import NoDataComponent from '../NoDataComponent';

import { getMainCategory, deleteMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { uploadImageNull } from 'module/licensee/container/imgcontainer/slice';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [count, setCount] = useState('');
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const dataval = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData.count);
  const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const mainCategoryDetails = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);

  useEffect(() => {
    dispatch(getMainCategory({}));
    setTableHeading('Main Categories');
    setFilteredData(mainCategoryDetails?.rows);
    if (dataval !== undefined) {
      setCount(Number(dataval));
    }
  }, [dispatch, dataval]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Main Categories');
        ComponentToRender = <AddEditModal key="add" formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Main Categories');
        ComponentToRender = <AddEditModal key="edit" formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Main Categories');
        ComponentToRender = <ViewModal key="view" data={item} />;
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
    dispatch(getMainCategory());
    dispatch(uploadImageNull());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteMainCategory(selectedId));
    setShowDeleteModal(false);
    dispatch(getMainCategory());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (mainCategoryDetails?.rows) {
      const filteredData = mainCategoryDetails.rows.filter((row) => {
        return row.grpCatgName.toLowerCase().includes(searchValue) || row.grpCatgDescp.toLowerCase().includes(searchValue);
      });
      setFilteredData(filteredData);
      setCount(filteredData.length);
    }
  };

  // const dataToDisplay = filteredData.length > 0 ? filteredData : mainCategoryDetails.rows || [];

  const columns = [
    {
      name: 'MAIN CATEGORIES',
      selector: (row) => capitalizeFirstLetter(row.grpCatgName)
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        const capitalizedDescription = capitalizeFirstLetter(row.grpCatgDescp);
        if (capitalizedDescription.length > 20) {
          return capitalizedDescription.substring(0, 20) + '....';
        }
        return capitalizedDescription;
      }
    },

    {
      name: 'IMAGE',
      selector: (row) => (
        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <img src={row.grpCatgImg} alt="grpCatgImg" style={{ width: '50px', height: '50px' }} />
        </div>
      )
    },
    {
      // name: 'STATUS',
      // selector: (row) => (
      //   <span style={{ color: row.isActive ? 'green' : 'darkred' }}>
      //     {row.isActive ? 'True' : 'False'}
      //   </span>
      // ),
      name: 'VISIBILITY',
      selector: (row) => <span style={{ color: row.isActive ? 'green' : 'darkred' }}>{row.isActive ? 'Active' : 'In Active'}</span>
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
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
      noDataComponent={<NoDataComponent />}
      customStyles={tableCustomStyles}
      pagination
      paginationPerPage={6}
      paginationRowsPerPageOptions={[6, 10, 20, 30]}
      subHeaderComponent={
        <div>
          <CardHead
            tableHeading={tableHeading}
            handleAddModal={() => handleOpenModal('addform')}
            mainCategoryDetails={mainCategoryDetails}
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
