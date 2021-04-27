import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

const FormGroup = styled.div`
  width: 80%;
  max-width: 550px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

const InputField = styled(Field)`
  width: 80%;
  font-size: 1.2rem;
  padding: 16px 8px;
  border-radius: 10px;
  border: 2px solid #7f7f7f;
`;

const ErrorText = styled.div`
  color: red;
  height: 36px;
  background-color: #fdefee;
  padding: 8px 8px;
  width: 80%;
  font-size: 1.1rem;
  margin-top: -5px;
  border-radius: 4px;
`;

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
