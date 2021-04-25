import React, { useState } from 'react';
import FormField from '../components/FormField';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logAdminIn } from '../actions/admin';

// -----------------------STYLE------------------------ //
const StyledForm = styled.form`
  max-width: 500px;
  padding: 10 20px;
  background-color: rgba(228, 228, 228, 0.25);
  box-shadow: 5 10px rgba(228, 228, 228, 0.5);
  display: flex;
  flex-direction: column;
  gap: 32px 10px;
  align-items: center;
  justify-content: center;
  margin: 30 auto;
`;

const StyledH1 = styled.h1`
  padding: 10px 20px;
  margin-top: 20px;
`;

const StyledFormGroup = styled.div`
  padding: 16px;
`;
// -----------------------STYLE------------------------ //

const AdminLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isAdminState = useSelector((state) => state.admin);

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(logAdminIn({ username, password }));
    history.push('/register');
  };

  return (
    <StyledForm onSubmit={signIn}>
      <StyledH1>Admin</StyledH1>
      <StyledFormGroup>
        <FormField
          type='text'
          placeholder='Username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormField
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </StyledFormGroup>
      <Button color={`#24a0ed`} label='Login' type='submit' />
    </StyledForm>
  );
};
//
export default AdminLogin;
