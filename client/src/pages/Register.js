import axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import Form from '../components/form';

const Register = () => {
  // formik
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = async ({ username, password }) => {
    try {
      await axios.post('/api/auth/users/register');
    } catch (err) {}
  };

  const fields = [
    {
      control: 'input',
      type: 'text',
      name: 'username',
      placeholder: 'Username',
    },
    {
      control: 'input',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    },
  ];
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      handelSubmit={handelSubmit}
      title='Register a New User'
      fields={fields}
      autoComplete='off'
    />
  );
};

export default Register;
