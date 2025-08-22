import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button } from '@mui/material';
import commonStyles from 'assets/style/Style';
import 'assets/style/style.css';
import { addBank, updateBank, getBankById, getBank } from 'module/admin/container/bankContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const bankById = useSelector((state) => state.adminReducer.bank.bankByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getBankById(data.id));
    }
  }, [dispatch, data]);

  const initialValues = {
    name: formtype === 'editform' ? bankById?.name || '' : '',
    code: formtype === 'editform' ? bankById?.code || '' : '',
    desc: formtype === 'editform' ? bankById?.desc || '' : ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required')
  });

  const onSubmit = (values, { resetForm }) => {
    const isChanged = Object.keys(initialValues).some((key) => initialValues[key] !== values[key]);
    if (isChanged) {
      if (formtype && formtype === 'addform') {
        // values.address = {
        //   ...values.address,
        // };
        dispatch(addBank(values));
      } else {
        values.id = data.id;
        dispatch(updateBank(values));
        dispatch(getBank());
      }
      handleClose(formtype);
      resetForm();
      toast.success('Updated Successfully', { autoClose: 3000 });
    } else {
      handleClose(formtype);
      resetForm();
    }
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <FormLabel>
                Name<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Textfield name="name" id="name" placeholder="Name" component={Textfield} />
              <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormLabel>
                Code<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Textfield name="code" id="code" placeholder="Code" component={Textfield} />
              <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>

            <Grid item xs={6} sm={6}>
              <FormLabel>Description</FormLabel>
              <Textfield multiline minRows={4} maxRows={6} name="desc" id="desc" placeholder="Description" component={Textfield} />
              <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="submit" sx={style.changeBtn}>
              Save
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
