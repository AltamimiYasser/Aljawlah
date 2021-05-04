import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handelChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configSelector = {
    ...otherProps,
    ...field,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handelChange,
  };

  // add the errors to the TextField config object
  if (meta && meta.touched && meta.error) {
    configSelector.error = true;
    configSelector.helperText = meta.error;
  }

  return (
    <TextField {...configSelector}>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectWrapper;
