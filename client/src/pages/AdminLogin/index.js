import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormControl from '../../components/form';
import { FormWrapper, Title, FormFields, Button } from './Elements';

const AdminLogin = () => {
  // form
  const initialValues = { username: '', password: '' };
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });
  const handelSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}>
      {(formik) => (
        <FormWrapper>
          <Title>Admin Login</Title>
          <FormFields>
            <FormControl
              control='input'
              type='text'
              name='username'
              placeholder='Username'
              autocomplete='off'
            />
            <FormControl
              control='input'
              type='password'
              name='password'
              placeholder='Password'
              autocomplete='off'
            />
            <Button type='submit'>Submit</Button>
          </FormFields>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default AdminLogin;
