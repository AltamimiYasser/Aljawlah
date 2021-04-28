import { Form } from 'formik';
import styled from 'styled-components';

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 48px auto 0;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.25);
  border-radius: 4px;
  min-height: 500px;
  box-shadow: 5px 5px 5px rgba(0.5, 0.5, 0.5, 0.1);
  gap: 10px;

  @media (min-width: 768px) {
    width: 80%;
    max-width: 550px;
  }
`;

export const Title = styled.h1`
  padding: 16px 0;
  border-bottom: 1px solid lightgray;
  width: 90%;
  text-align: center;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
