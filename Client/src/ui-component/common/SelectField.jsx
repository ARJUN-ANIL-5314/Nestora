import React from 'react';
import { useField } from 'formik';
import { Field } from 'formik';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const SelectComponent = ({ label, style, ...props }) => {
  const theme = useTheme();
  const [field] = useField(props.name);

  return (
    <Field
      {...field}
      {...props}
      style={style}
      label={label}
      displayEmpty
      fullWidth
      variant="filled"
      sx={{
        ...theme.typography.customInput,
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E6E6E6',
        background: 'transparent',
        '& .MuiSelect-select': {
          padding: '16px 15px 11px !important',
          color: '#515151',
          fontSize: '16px'
        }
      }}
      component={Select}
    />
  );
};

SelectComponent.propTypes = {
  field: PropTypes.any,
  name: PropTypes.any,
  style: PropTypes.any,
  label: PropTypes.any,
  inputMode: PropTypes.string
};

export default SelectComponent;
