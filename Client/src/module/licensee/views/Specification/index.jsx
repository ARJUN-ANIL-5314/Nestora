import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import SpecificationAdd from './SpecificationAdd.jsx';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../assets/style/style.css';
import { capitalizeFirstLetter } from '../utilities/Capitallised.jsx';
import ViewModal from './ViewModal.jsx';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getSpecification, deleteSpecification } from 'module/licensee/container/specificationContainer/slice.jsx';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from './NoDataComponent.jsx';
import { useNavigate } from 'react-router-dom';
import DeleteModal from 'ui-component/Modals/DeleteModal.jsx';

export default function Index() {
  const navigate = useNavigate();
  const [tableHeading, setTableHeading] = useState('');
  const [specificationAdd, setSpecificationAdd] = useState(false);
  const [count, setCount] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const specificationDetails = useSelector((state) => state.licenseeReducer.specification.specificationData);

  console.log(specificationDetails, '=====specificationDetails=====');

  useEffect(() => {
    dispatch(getSpecification());
    setTableHeading('Specification');
    setSpecificationAdd(true);
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Customer');
        ComponentToRender = <SpecificationAdd />;
        break;
      case 'editform':
        setModalHeading('Edit Customer');
        ComponentToRender = <SpecificationAdd formtype="editform" datas={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Specification');
        ComponentToRender = <ViewModal datas={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log('==searchValue', searchValue);

    const filteredData = specificationDetails.rows.filter((row) => {
      console.log('==row', row);
      return row.subCatgName.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredData);
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

  useEffect(() => {
    if (specificationDetails) {
      const { count } = specificationDetails;
      setCount(count);
    }
  }, [specificationDetails]);

  const handleEditPage = (data) => {
    console.log('==item==', data);
    navigate('/specificationEditPage', { state: { data } });
  };

  const deleteReferenceConfirm = async () => {
    try {
      dispatch(deleteSpecification(selectedId));
    } catch (error) {
      console.error('Error deleting :', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const columns = [
    {
      name: 'MAIN CATEGORY',
      selector: (row) => capitalizeFirstLetter(row.mainCatgId.grpCatgName)
    },
    {
      name: ' CATEGORY',
      selector: (row) => capitalizeFirstLetter(row.catgId.catgName)
    },
    {
      name: 'SUB CATEGORY',
      selector: (row) => capitalizeFirstLetter(row.subCatgName)
    },
    {
      name: 'SPECIFICATION ITEM',
      cell: (row) => {
        const specItems = row.specItem;
        const keys = Object.keys(specItems);
        const lblTexts = keys.map((key) => capitalizeFirstLetter(specItems[key].lblText));
        return <div>{lblTexts.join(', ')}</div>;
      }
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleEditPage(row)}>
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
      customStyles={tableCustomStyles}
      striped
      data={specificationDetails.rows}
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
            specificationAdd={specificationAdd}
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
        </div>
      }
    />
  );
}
