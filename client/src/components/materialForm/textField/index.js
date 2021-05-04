import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...otherProps }) => {
  // get the formik helper meta and filed properties
  const [field, meta] = useField(name);

  // all the properties we will pass to the TextField
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  // add the errors to the TextField config object
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;