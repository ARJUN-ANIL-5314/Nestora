import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import MainCategorySelect from './mainCategorySelect';
import OrderImage from './orderImage';
import OrderSpecification from './orderSpecification';
import { capitalize } from '../../utilities/Capitallised';
import CustomerModal from './customerModal';
import OrderShowTable from './orderShowTable';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';

function OrderAddPage() {
  const [openModal, setOpenModal] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formData, setFormData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  console.log('==selectedRow==', selectedRow);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { id, fName, lName, contactMobile1 } = location.state;
      setSelectedRow({
        id,
        fName,
        lName,
        contactMobile1
      });
    }
  }, [location.state]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedRow(customer);
    handleCloseModal();
  };

  const handleFormSubmit = (values) => {
    setFormData((prevFormData) => [...prevFormData, values]);
  };

  const handleDeleteRow = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleBreadcrumbsChange = (newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  // In the parent component
  // const handleDeleteRow = (updatedFormData) => {
  //   setFormData(updatedFormData);
  // };
  // const handleDeleteRow = (item) => {
  //   const updatedFormData = formData.filter((row) => row !== item);
  //   setFormData(updatedFormData);
  // };
  return (
    <MainCard>
      <Grid container style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h3">
            Add Orders
          </Typography>
          <Grid style={{ display: 'flex' }}>
            <MainCategorySelect
              onBreadcrumbsChange={handleBreadcrumbsChange}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <Grid>
            <Typography variant="h4">
              {capitalize(selectedRow ? selectedRow.fName + ' ' + selectedRow.lName : 'No Customer Selected')}
            </Typography>
            <Typography variant="h5">{selectedRow ? selectedRow.contactMobile1 : ''}</Typography>
          </Grid>
          <Grid
            style={{
              backgroundColor: selectedRow ? '#edf7ed' : '#fff4e5',
              height: '41px',
              border: selectedRow ? '1px solid #418944' : '1px solid #f1852d',
              borderRadius: '20px',
              marginLeft: '15px'
            }}
          >
            <IconButton onClick={handleOpenModal}>
              <PersonIcon style={{ color: selectedRow ? '#418944' : '#f1852d' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container paddingTop={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <Grid container>
              <Grid item xs={12} sm={5} paddingRight={2}>
                <OrderImage
                  subCategories={subCategories}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                />
              </Grid>
              <Grid item xs={12} sm={7} style={{ height: '65vh', overflowY: 'auto' }}>
                <OrderSpecification breadcrumbs={breadcrumbs} selectedSubCategory={selectedSubCategory} onSubmit={handleFormSubmit} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container paddingTop={3} marginTop={5}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <Typography bgcolor="black" color={'white'} gutterBottom variant="h3" paddingBottom={2} paddingLeft={2} paddingTop={2}>
              Your Order Details
            </Typography>
            <Grid container padding={2}>
              <Grid item md={12}>
                <OrderShowTable formData={formData} selectedRow={selectedRow} handleDeleteRow={handleDeleteRow} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <CustomerModal
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        open={openModal}
        handleClose={handleCloseModal}
        onSelect={handleCustomerSelect}
      />
    </MainCard>
  );
}

export default OrderAddPage;
