import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddRateCard from './AddRateCard.js';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/style/style.css';
import CardHead from 'ui-component/common/CardHead';
import EditModal from './EditModal.js';
import { IconButton } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getRateCard, deleteRateCard } from 'module/licensee/container/RateCardContainer/slice.js';
import { tableCustomStyles } from '../tableStyle.jsx';
import NoDataComponent from './NoDataComponent.js';
import { Box } from '@mui/system';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import { capitalizeFirstLetter } from '../utilities/Capitallised.js';
import ViewModal from './ViewModal.js';

const Index = () => {
  const [rateCardAdd, setrateCardAdd] = useState(false);
  const [tableHeading, setTableHeading] = useState('');
  const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const RateCardDetails = useSelector((state) => state.licenseeReducer.RateCard.RateCardData);

  console.log('ratecard', RateCardDetails);

  useEffect(() => {
    dispatch(getRateCard());
    setTableHeading('Rate Card');
    setrateCardAdd(true);
  }, [dispatch]);

  useEffect(() => {
    if (RateCardDetails) {
      const { count } = RateCardDetails;
      setCount(count);
    }
  }, [RateCardDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Rate Card');
        ComponentToRender = <AddRateCard />;
        break;
      case 'editform':
        setModalHeading('Edit Rate Card');
        ComponentToRender = <EditModal formtype="editform" data={item} whichOpen={whichOpen} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Rate Card');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = RateCardDetails.rows.filter((row) => {
      return row.item.toLowerCase().includes(searchValue) || row?.subCatgId?.subCatgName.toLowerCase().includes(searchValue);
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

  const deleteReferenceConfirm = async () => {
    try {
      dispatch(deleteRateCard(selectedId));
      // dispatch(getRateCard());
    } catch (error) {
      console.error('Error deleting :', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const columns = [
    {
      name: 'SUB CATEGORY',
      selector: (row) => <span>{capitalizeFirstLetter(`${row?.subCatgId?.subCatgName}`)}</span>
    },
    {
      name: 'ITEM',
      selector: (row) => capitalizeFirstLetter(row.item.join(',  '))
    },

    {
      name: 'VALUE',
      selector: (row) => {
        if (row.dispValue && Array.isArray(row.dispValue) && row.dispValue.length > 0) {
          const values = row.dispValue.map((item) => `${item.value}`);
          return capitalizeFirstLetter(values.join(', '));
        }
        return '';
      }
    },
    {
      name: 'CURRENCY',
      selector: (row) => row.currency
    },
    {
      name: 'RATE',
      selector: (row) => row.rate
    },

    {
      name: 'ACTIONS',
      cell: (row) => (
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
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
        data={filteredData.length > 0 ? filteredData : RateCardDetails.rows}
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
              rateCardAdd={rateCardAdd}
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
