import styled from 'styled-components';
import { Field } from 'formik';

export const FormGroup = styled.div`
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

export const InputField = styled(Field)`
  width: 80%;
  font-size: 1.2rem;
  padding: 16px 8px;
  border-radius: 10px;
  border: 2px solid #7f7f7f;
`;

export const ErrorText = styled.div`
  color: red;
  height: 36px;
  background-color: #fdefee;
  padding: 8px 8px;
  width: 80%;
  font-size: 1.1rem;
  margin-top: -5px;
  border-radius: 4px;
`;
