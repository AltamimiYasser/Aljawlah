import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Input = ({ label, name, ...rest }) => {
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Field name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Input;
