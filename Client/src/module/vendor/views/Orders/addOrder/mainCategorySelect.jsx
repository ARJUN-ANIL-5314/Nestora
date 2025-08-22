import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { capitalizeFirstLetter } from 'module/utlities/Capitallised';
import { Grid, Box, Breadcrumbs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { vendorGetMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
import { vendorGetcetCategory } from 'module/licensee/container/category/slice';
import { vendorGetSubCategory } from 'module/licensee/container/subCategoryContainer/slice';

function MainCategorySelect({ setSubCategories, selectedSubCategory, setSelectedSubCategory, onBreadcrumbsChange }) {
  const dispatch = useDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const getMainCategoryData = useSelector((state) => state.licenseeReducer.mainCategory.vendorGetmainCategoryData);
  console.log('getMainCategoryData', getMainCategoryData);

  const getCategoryData = useSelector((state) => state.licenseeReducer.category.vendorCategory);

  console.log('getCategoryData', getCategoryData);

  const getSubCategoryData = useSelector((state) => state.licenseeReducer.subCategory.vendorSubCategoryData);
  console.log('==selectedMainCategory==', selectedMainCategory);
  const handleMainCategoryHover = (grpCatgId, mainCategory) => {
    const filtered = getCategoryData?.rows?.filter((category) => category.grpCatgId.id === grpCatgId);
    setFilteredCategories(filtered);
    setIsDropdownVisible(true);
    setSelectedMainCategory(mainCategory);
    setSelectedCategory(null); // Reset selected category
    setSelectedSubCategory(null); // Reset selected subcategory
    setSubCategories([]); // Clear subcategories
  };

  useEffect(() => {
    const newBreadcrumbsNames = [
      selectedMainCategory && selectedMainCategory.grpCatgName,
      selectedCategory && selectedCategory.catgName,
      selectedSubCategory && selectedSubCategory.subCatgName
    ].filter(Boolean);

    const newBreadcrumbsIds = [
      selectedMainCategory && selectedMainCategory.id,
      selectedCategory && selectedCategory.id,
      selectedSubCategory && selectedSubCategory.id
    ].filter(Boolean);

    setBreadcrumbs({ names: newBreadcrumbsNames, ids: newBreadcrumbsIds });
    onBreadcrumbsChange({ names: newBreadcrumbsNames, ids: newBreadcrumbsIds });
  }, [selectedMainCategory, selectedCategory, selectedSubCategory]);

  const handleCategoryClick = (catgId, category) => {
    setSelectedCategoryId(catgId);
    setSelectedCategory(category);
    setIsDropdownVisible(false);
    dispatch(vendorGetSubCategory(catgId));
  };

  useEffect(() => {
    dispatch(vendorGetMainCategory());
    dispatch(vendorGetcetCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId && getSubCategoryData) {
      const filteredSubCategories = getSubCategoryData?.rows?.filter((subCat) => subCat.catgId.id === selectedCategoryId);
      setSubCategories(filteredSubCategories || []);
    }
  }, [selectedCategoryId, getSubCategoryData, setSubCategories]);

  return (
    <div>
      <a
        href="#"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 16px',
          textDecoration: 'none',
          color: isDropdownVisible ? 'white' : 'black',
          backgroundColor: isDropdownVisible ? 'black' : '#eef2f6',
          borderRadius: '10px',
          width: '200px',
          border: '1px solid #e5e5e5'
        }}
      >
        Select Category
        <ArrowDropDownIcon />
      </a>

      <Grid item xs={12} marginTop={2}>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs &&
            breadcrumbs.names &&
            breadcrumbs.names.map((breadcrumb, index) => (
              <Typography key={index} color="inherit" href="#" onClick={() => console.log('breadcrumb clicked')}>
                {breadcrumb}
              </Typography>
            ))}
        </Breadcrumbs>
      </Grid>

      {isDropdownVisible && (
        <Grid
          container
          style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            zIndex: '100',
            top: '195px',
            width: '70%'
          }}
          // onMouseLeave={handleMainCategoryLeave}
        >
          <Grid item md={4}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderRight: '1px solid #c8c8c8' }}>
              {getMainCategoryData?.rows?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMainCategoryHover(item.id, item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleMainCategoryHover(item.id, item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  style={{
                    padding: '5px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderBottom: '1px solid #c8c8c8',
                    cursor: 'pointer'
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: '#eef2f6',
                      height: '40px',
                      width: '40px',
                      borderRadius: '5px',
                      border: '1px solid #e2e2e2',
                      marginRight: '10px'
                    }}
                  >
                    <img src={item.grpCatgImg} style={{ objectFit: 'cover' }} height={40} width={40} alt="" />
                  </Box>
                  {capitalizeFirstLetter(item.grpCatgName)}
                  <ArrowForwardIcon style={{ marginLeft: 'auto', fontSize: '26px', paddingRight: '10px' }} />
                </div>
              ))}
            </ul>
          </Grid>
          <Grid item md={8} container>
            {filteredCategories?.length > 0 ? (
              filteredCategories.map((item, index) => (
                <Grid item md={6} padding={2} key={index}>
                  <button
                    style={{
                      padding: '5px 0',
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #000000',
                      borderRadius: '10px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                    onClick={() => handleCategoryClick(item.id, item)}
                  >
                    <Box
                      style={{
                        backgroundColor: '#eef2f6',
                        height: '40px',
                        width: '40px',
                        borderRadius: '5px',
                        border: '1px solid #e2e2e2',
                        margin: '0px 10px 0px 5px'
                      }}
                    >
                      <img src={item.grpCatgImg} height={40} width={40} alt="" />
                    </Box>
                    {capitalizeFirstLetter(item.catgName)}
                  </button>
                </Grid>
              ))
            ) : (
              <p style={{ padding: '20px' }}>No categories available</p>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MainCategorySelect;
