import React from 'react';
import styled from 'styled-components';

const StyledField = styled.input`
  padding: 12px 20px;
  margin: 16px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 90%;
  font-size: 1.3rem;
  text-align: center;
`;

const FormField = ({ type, placeholder, value, onChange }) => {
  return (
    <StyledField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormField;
