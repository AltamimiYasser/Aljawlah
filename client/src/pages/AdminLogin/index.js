import React, { useContext } from 'react';
import AdminContext from '../../context/adminContext';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router';

const AdminLogin = () => {
  const { loggedIn, getLoggedIn } = useContext(AdminContext);

  const formInitialValues = { username: '', password: '' };

  const handelSubmit = async ({ username, password }) => {
    try {
      await axios.post('/api/auth/admin/login', { username, password });
      getLoggedIn();
    } catch (err) {
      console.error(err);
      //TODO: ada notification alert
    }
  };
  return (
    <>
      {loggedIn ? <Redirect to='/register' /> : null}
      <Formik initialValues={formInitialValues} onSubmit={handelSubmit}>
        <Form>
          <Field name='username' placeholder='Email' type='text' />
          <Field name='password' placeholder='password' type='password' />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </>
  );
};

export default AdminLogin;
