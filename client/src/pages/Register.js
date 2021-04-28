import React, { useContext } from 'react';
import * as Yup from 'yup';
import AdminContext from '../context/adminContext';
import { Redirect } from 'react-router-dom';
import Form from '../components/form';

const Register = () => {
  // formik
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = ({ username, password }) => {
    console.log({ username, password });
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
  console.log('register page');
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      handelSubmit={handelSubmit}
      title='Register'
      fields={fields}
    />
  );
};

export default Register;
