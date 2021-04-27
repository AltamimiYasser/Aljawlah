import React from 'react';
import * as Yup from 'yup';
import Form from '../components/form';

const AdminLogin = () => {
  const initialValues = { username: '', password: '' };
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });
  const handelSubmit = (values) => {
    console.log(values);
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
      title='Admin Login'
      fields={fields}
    />
  );
};

export default AdminLogin;
