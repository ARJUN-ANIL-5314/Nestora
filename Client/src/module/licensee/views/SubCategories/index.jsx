import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import ViewModal from './viewModal.jsx';
import AddEditModal from './addEditModal.jsx';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import { tableCustomStyles } from '../tableStyle.jsx';
import CardHead from 'ui-component/common/CardHead';
import { IconButton, Select, MenuItem, FormControl, Tooltip, Grid } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../../../../assets/style/style.css';
import { getSubCategory, deleteSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
import { getCategory } from 'module/licensee/container/category/slice';
import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { uploadImageNull } from 'module/licensee/container/imgcontainer/slice';
import NoDataComponent from '../NoDataComponent.js';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState('');
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [formType, setFormType] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const dataval = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData?.count);
  const modalStyle = { width: '60%' };
  const mainCategories = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData || []);
  const categories = useSelector((state) => state.licenseeReducer.category.categoryData || []);
  const subCategoryDetails = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData);

  useEffect(() => {
    dispatch(getMainCategory({}));
    dispatch(getCategory({}));
    dispatch(getSubCategory({}));
    setFilteredData(subCategoryDetails?.rows);
    setTableHeading('Sub Categories');
    setCount(Number(dataval));
  }, [dispatch, dataval]);

  useEffect(() => {
    if (!selectedMainCategory) {
      setFilteredCategories([]);
      setSelectedCategory('');
      return;
    }
    const filtered = categories.rows.filter((category) => category.grpCatgId.id === selectedMainCategory);
    setFilteredCategories(filtered);
    setSelectedCategory('');
  }, [selectedMainCategory, categories.rows]);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredData(subCategoryDetails?.rows);
      setCount(Number(dataval));
      return;
    }
    const filtered = subCategoryDetails.rows.filter((subCategory) => subCategory.catgId.id === selectedCategory);
    setFilteredData(filtered);
    setCount(filtered.length);
  }, [selectedCategory, subCategoryDetails, dataval]);

  const handleOpenModal = (whichOpen, item, formtype) => {
    setOpenModal(true);
    setFormType(formtype);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Sub Category');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Sub Category');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Sub Category');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
    dispatch(getSubCategory());
    dispatch(uploadImageNull());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = async () => {
    try {
      await dispatch(deleteSubCategory(selectedId));
      dispatch(getSubCategory());
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = subCategoryDetails.rows.filter((row) => {
      console.log('==row', row);

      return row.subCatgName.toLowerCase().includes(searchValue) || row.subCatgDescp.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredData);
    setCount(filteredData.length);
  };

  const columns = [
    {
      name: 'SUB CATEGORY',
      selector: (row) => capitalizeFirstLetter(row.subCatgName)
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        const capitalizedDescription = capitalizeFirstLetter(row.subCatgDescp);
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
          <img src={row.subCatgImg} alt="subCatgImg" style={{ width: '50px', height: '50px' }} />
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
            <IconButton onClick={() => handleOpenModal('viewform', row, 'viewform')}>
              <Visibility className="actn-icon1" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton onClick={() => handleOpenModal('editform', row, 'editform')}>
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

  const handleMainCategoryChange = (mainCatgId) => {
    setSelectedMainCategory(mainCatgId);
  };

  const handleCategoryChange = (catgId) => {
    setSelectedCategory(catgId);
  };

  return (
    <div style={{ position: 'relative' }}>
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
        paginationPerPage={6}
        paginationRowsPerPageOptions={[10, 20, 30]}
        subHeaderComponent={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHead
                tableHeading={tableHeading}
                handleAddModal={() => handleOpenModal('addform')}
                subCategoryDetails={subCategoryDetails}
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
                  marginLeft: '20px'
                }}
              >
                <FilterListIcon fontSize="medium" />
              </IconButton>
            </div>
            {showCategoryFilter && (
              <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }} spacing={2}>
                <Grid item sx={{ ml: 2 }}>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={selectedMainCategory}
                      onChange={(event) => handleMainCategoryChange(event.target.value)}
                      displayEmpty
                      renderValue={(selected) =>
                        selected
                          ? mainCategories.rows.find((cat) => cat.id === selected)?.grpCatgName || 'Select Main Category'
                          : 'Select Main Category'
                      }
                    >
                      <MenuItem value="">
                        <em>Select Main Category</em>
                      </MenuItem>
                      {mainCategories?.rows?.map((mainCategory) => (
                        <MenuItem key={mainCategory.id} value={mainCategory.id}>
                          {mainCategory.grpCatgName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sx={{ ml: 2 }}>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={selectedCategory}
                      onChange={(event) => handleCategoryChange(event.target.value)}
                      displayEmpty
                      renderValue={(selected) =>
                        selected ? filteredCategories.find((cat) => cat.id === selected)?.catgName || 'Select Category' : 'Select Category'
                      }
                    >
                      <MenuItem value="">
                        <em>Select Category</em>
                      </MenuItem>
                      {filteredCategories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.catgName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
          formtype={formType}
        />
      )}
      {showDeleteModal && (
        <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
      )}
    </div>
  );
}
