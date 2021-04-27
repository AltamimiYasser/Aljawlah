import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControl from '../../components/form';

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
        <Form>
          <FormControl
            control='input'
            type='text'
            label='Username'
            name='username'
          />
          <FormControl
            control='input'
            type='password'
            label='Password'
            name='password'
          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminLogin;
