import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddRateCardSetup from './AddRateSetup.jsx';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/style/style.css';
import CardHead from 'ui-component/common/CardHead';
import { IconButton } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getRateCardSetup, deleteRateCardSetup } from 'module/licensee/container/RateCardSetupContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from './NoDataComponent.jsx';
import { Box } from '@mui/system';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import { capitalizeFirstLetter } from '../utilities/Capitallised.js';
import ViewModal from './viewModal.jsx';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [tableHeading, setTableHeading] = useState('');
  const [rateSetUpAdd, setrateSetUpAdd] = useState(false);
  const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const RateCardSetupDetails = useSelector((state) => state.licenseeReducer.RateCardSetup.RateCardSetupData);
  const navigate = useNavigate();
  console.log('==RateCardSetupDetails', RateCardSetupDetails);

  useEffect(() => {
    dispatch(getRateCardSetup());
    setTableHeading('Rate Card Set Up');
    setrateSetUpAdd(true);
  }, [dispatch]);

  useEffect(() => {
    if (RateCardSetupDetails) {
      const { count } = RateCardSetupDetails;
      setCount(count);
    }
  }, [RateCardSetupDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Rate Card');
        ComponentToRender = <AddRateCardSetup />;
        break;
      case 'editform':
        setModalHeading('Edit Rate Card');
        ComponentToRender = <AddRateCardSetup formtype="editform" data={item} whichOpen={whichOpen} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Rate Card Set Up');

        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = RateCardSetupDetails.rows.filter((row) => {
      console.log('==row', row);

      return row.subCatgName.toLowerCase().includes(searchValue) || row.pattern.toLowerCase().includes(searchValue);
    });

    setFilteredData(filteredData);
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    if (formtype === 'addform') setPage(1);
  };

  const handleDeleteModal = (item) => {
    console.log('==item==', item);
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = async () => {
    try {
      dispatch(deleteRateCardSetup(selectedId));
    } catch (error) {
      console.error('Error deleting :', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEditPage = (data) => {
    console.log('==item==', data);
    navigate('/rate_cardSetup_Edit', { state: { data } });
  };

  const columns = [
    {
      name: 'SUB CATEGORY',
      selector: (row) => <span>{capitalizeFirstLetter(`${row?.subCatgId?.subCatgName}`)}</span>
    },
    {
      name: 'PATTERN',
      selector: (row) => row.pattern
    },

    {
      name: 'ACTIONS',
      cell: (row) => (
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleEditPage(row)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <div className="table-container">
      <DataTable
        responsive
        columns={columns}
        customStyles={tableCustomStyles}
        striped
        data={filteredData.length > 0 ? filteredData : RateCardSetupDetails.rows}
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        noDataComponent={<NoDataComponent />}
        subHeaderComponent={
          <div>
            <CardHead
              tableHeading={tableHeading}
              rateSetUpAdd={rateSetUpAdd}
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
    </div>
  );
};
export default Index;
