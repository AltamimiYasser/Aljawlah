import { Form } from 'formik';
import styled from 'styled-components';

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 48px auto 0;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.25);
  border-radius: 4px;
  min-height: 500px;
  box-shadow: 5px 5px 5px rgba(0.5, 0.5, 0.5, 0.1);
  gap: 10px;
`;

export const Title = styled.h1`
  padding: 16px 0;
  border-bottom: 1px solid lightgray;
  width: 100%;
  text-align: center;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: 80%;
  margin: 20px;
  padding: 16px 10px;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 4px;
  border: none;
  background-color: rgba(36, 160, 237, 1);
  color: #fff;
  box-shadow: 1px 1px 1px rgba(36, 160, 237, 1);
`;
