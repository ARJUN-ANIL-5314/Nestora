import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import { IconButton, Select, MenuItem, FormControl, Tooltip } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CardHead from 'ui-component/common/CardHead';
import '../../../../assets/style/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { tableCustomStyles } from '../tableStyle.jsx';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { deleteimg, getimgById } from 'module/licensee/container/imgcontainer/slice';
import { getCategory, deleteCategory } from 'module/licensee/container/category/slice';
import FilterListIcon from '@mui/icons-material/FilterList';
import { uploadImageNull } from 'module/licensee/container/imgcontainer/slice';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';

import NoDataComponent from '../NoDataComponent';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState('');
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('Categories');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedFilename, setSelectedFilename] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.licenseeReducer.category.categoryData);
  const mainCategoryData = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
  console.log('mainCategoryData:', mainCategoryData);

  useEffect(() => {
    dispatch(getCategory({}));
    dispatch(getimgById({}));
    dispatch(getMainCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categoryDetails) {
      const { count, rows } = categoryDetails;
      setFilteredData(rows);
      setCount(count);
    }
    setTableHeading('Categories');
  }, [categoryDetails]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Categories');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Categories');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Categories');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    dispatch(uploadImageNull());
    setShowDeleteModal(false);
    if (formtype === 'addform') {
      dispatch(getCategory());
    }
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
    setSelectedFilename(item.grpCatgImg);
  };

  const deleteReferenceConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(deleteCategory(selectedId));
      await dispatch(deleteimg(selectedFilename));
      dispatch(getCategory());
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting category or image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (categoryDetails?.rows) {
      const filtered = categoryDetails.rows.filter((row) => {
        return row.catgName.toLowerCase().includes(searchValue) || row.catgDescp.toLowerCase().includes(searchValue);
      });
      setFilteredData(filtered);
      setCount(filtered.length);
    }
  };

  const handleCategoryFilter = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category && categoryDetails?.rows) {
      const filtered = categoryDetails.rows.filter((row) => row.grpCatgId.grpCatgName === category);
      setFilteredData(filtered);
    } else {
      setFilteredData(categoryDetails?.rows || []);
    }
  };

  const columns = [
    {
      name: 'CATEGORIES',
      selector: (row) => capitalizeFirstLetter(row.catgName)
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        const capitalizedDescription = capitalizeFirstLetter(row.catgDescp);
        return capitalizedDescription.length > 20 ? capitalizedDescription.substring(0, 20) + '....' : capitalizedDescription;
      }
    },
    {
      name: 'IMAGE',
      selector: (row) => (
        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <img src={row.grpCatgImg} alt="Categories" style={{ width: '50px', height: '50px' }} />
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

  const uniqueCategories = mainCategoryData?.rows ? [...new Set(mainCategoryData.rows.map((item) => item?.grpCatgName))] : [];

  return (
    <div style={{ position: 'relative' }}>
      <DataTable
        columns={columns}
        data={filteredData} // Always use filteredData
        striped
        highlightOnHover
        pointerOnHover
        subHeader
        customStyles={tableCustomStyles}
        pagination
        noDataComponent={<NoDataComponent />}
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 10, 20, 30]}
        subHeaderComponent={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                tableHeading={tableHeading}
                handleAddModal={() => handleOpenModal('addform')}
                categoryDetails={categoryDetails}
                searchHandler={handleSearch}
                count={count}
              />
              <IconButton
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                style={{
                  fontSize: 16,
                  padding: '10px',
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '10px'
                }}
              >
                <FilterListIcon fontSize="medium" />
              </IconButton>
            </div>
            {showCategoryFilter && (
              <div>
                <FormControl variant="standard" sx={{ minWidth: 120, mb: -3 }}>
                  <Select
                    id="category-filter-select"
                    value={selectedCategory}
                    onChange={handleCategoryFilter}
                    displayEmpty
                    sx={{ minWidth: 120, m: 1, borderRadius: 2, padding: '4px 8px 4px 7px;' }}
                  >
                    <MenuItem value="">Select Main Category</MenuItem>
                    {uniqueCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {capitalizeFirstLetter(category)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        }
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
      {loading && <div>Loading...</div>}
    </div>
  );
}
