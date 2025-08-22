import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import commonStyles from 'assets/style/Style';

import { addSupportType, updateSupportType, getSupportTypeById, getSupportType } from 'module/admin/container/supportTypeContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const supportTypeById = useSelector((state) => state.adminReducer.supportType.supportTypeByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getSupportTypeById(data.id));
    }
  }, [dispatch, data]);

  const initialValues = {
    supportType: formtype === 'editform' ? supportTypeById?.supportType || '' : '',
    desc: formtype === 'editform' ? supportTypeById?.desc || '' : '',
    isActive: formtype === 'editform' ? supportTypeById?.isActive || false : true
  };

  const validationSchema = Yup.object({
    supportType: Yup.string().required('SupportType is required'),
    desc: Yup.string().required('Description is required'),
    ...(formtype === 'editform' && { isActive: Yup.string().required('isActive is required') })
  });

  const onSubmit = (values, { resetForm }) => {
    if (formtype && formtype === 'addform') {
      dispatch(addSupportType(values));
    } else {
      values.id = data.id;
      dispatch(updateSupportType(values));
      dispatch(getSupportType());
    }

    handleClose(formtype);
    resetForm();
  };

  const CheckboxField = () => {
    const { values, setFieldValue } = useFormikContext();
    return (
      <FormControlLabel
        control={
          <Checkbox
            sx={style.ChecboxColor}
            name="isActive"
            value="isActive"
            checked={values.isActive}
            onChange={() => setFieldValue('isActive', !values.isActive)}
          />
        }
        label="isActive"
      />
    );
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel>
                    Support Type<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Textfield name="supportType" id="supportType" placeholder="SupportType" component={Textfield} />
                  <ErrorMessage name="supportType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                  <FormLabel sx={{ marginTop: '12px' }}>
                    Status<span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <FormGroup>
                    <CheckboxField />
                  </FormGroup>
                  <ErrorMessage name="isActive" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>
                Description<span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Textfield multiline minRows={4} maxRows={6} name="desc" id="desc" placeholder="Description" component={Textfield} />
              <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
          </Grid>
          <Button type="submit" sx={style.changeBtn}>
            Save
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
