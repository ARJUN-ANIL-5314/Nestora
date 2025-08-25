import { Button, FormLabel, Grid, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './style.js';
import TextField from 'ui-component/common/TextField';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { updateRateCard } from 'module/licensee/container/RateCardContainer/slice';
import { ErrorMessage, Form, Formik } from 'formik';
import { getSpecificationById } from 'module/licensee/container/specificationContainer/slice';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import Textfield from 'ui-component/common/TextField';
import { useDispatch } from 'react-redux';

const EditModal = ({ data, handleClose }) => {
  console.log('==data', data);

  const id = data?.spcfctnId?.id;
  const theme = useTheme();
  const style = styles(theme);

  const dispatch = useDispatch();
  const formikRef = React.useRef(null);

  useEffect(() => {
    dispatch(getSpecificationById(id));
  }, [id]);

  const initialValues = {
    ...data?.item.reduce((acc, item) => ({ ...acc, [item]: data?.dispValue[0].value }), {}),
    mainCatgId: data.mainCatgId.id,
    catgId: data?.catgId.id || '',
    subCatgId: data?.subCatgId.id || '',
    ownerId: '',
    currency: 'INR',
    rate: data?.rate || ''
  };
  console.log('==rateinitialValues==', initialValues);

  // let dispId = data.dispValue.map(dispId => dispId._id)

  return (
    <div>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            console.log('====ratelValues==', values);
            const updatedData = {
              // mainCatgId: data.mainCatgId.id,
              // catgId: data?.catgId.id,
              // subCatgId: data?.subCatgId.id,
              // combType:data.combType,
              // rateCardSetupId:data.rateCardSetupId.id,
              // item: data.item,
              // dispValue: dispId,
              // currency: 'INR',
              rate: Number(values.rate)
            };

            console.log('==Number==', updatedData.rate);
            dispatch(updateRateCard({ updatedData, id: data.id }));
            resetForm();
            handleClose();
          }}
          enableReinitialize={true}
          innerRef={formikRef}
        >
          {({ values }) => (
            <Form>
              <Box sx={{ paddingBottom: '10px' }}>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                  <Grid item md={4}>
                    <FormLabel>Main Category</FormLabel>
                    <Textfield
                      disabled
                      name="mainCatgId"
                      id="mainCatgId"
                      value={capitalizeFirstLetter(data?.mainCatgId?.grpCatgName)}
                      placeholder="Rate"
                      component={Textfield}
                    />
                    <ErrorMessage name="mainCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                  <Grid item md={4}>
                    <FormLabel> Category</FormLabel>
                    <Textfield
                      disabled
                      name="catgId"
                      id="catgId"
                      value={capitalizeFirstLetter(data?.catgId?.catgName)}
                      placeholder="Rate"
                      component={Textfield}
                    />
                    <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid item md={4}>
                    <FormLabel> Sub Category</FormLabel>
                    <Textfield
                      disabled
                      name="subCatgId"
                      id="subCatgId"
                      value={capitalizeFirstLetter(data?.subCatgId?.subCatgName)}
                      placeholder="subCatgId"
                      component={Textfield}
                    />
                    <ErrorMessage name="subCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  {data?.item.map((item, index) => (
                    <Grid item md={3} xs={12} key={index}>
                      <FormLabel>{capitalizeFirstLetter(item)}</FormLabel>
                      <TextField
                        disabled
                        name={item}
                        id={item}
                        value={capitalizeFirstLetter(data.dispValue[index].value)}
                        variant="outlined"
                        fullWidth
                        style={{
                          height: '49px',
                          width: '100%',
                          border: 'none',
                          backgroundColor: 'white',
                          marginTop: '10px'
                        }}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                      <ErrorMessage name={item} component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                    </Grid>
                  ))}
                  <Grid item md={3}>
                    <FormLabel>Rate</FormLabel>
                    <Textfield
                      name="rate"
                      id="rate"
                      value={values?.rate}
                      onKeyPress={(e) => {
                        if (!/^[0-9.\b]+$/.test(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Rate"
                      component={Textfield}
                      InputProps={{
                        startAdornment: <InputAdornment position="end">INR</InputAdornment>
                      }}
                    />
                    <ErrorMessage name="rate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid container sm={12}>
                    <Grid item md={12} style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
                      <Box>
                        <Button type="submit" color="info" variant="contained" sx={style.addBtnHead}>
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default EditModal;
