import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  // add the errors to the TextField config object
  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
