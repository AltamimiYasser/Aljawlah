// formik control
import React from 'react';
import Input from './Input';

const FormControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
