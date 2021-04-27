import React from 'react';
import { ErrorMessage } from 'formik';

import { FormGroup, InputField, ErrorText } from './Elements';

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <FormGroup>
      <InputField name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={ErrorText} />
    </FormGroup>
  );
};

export default Input;
