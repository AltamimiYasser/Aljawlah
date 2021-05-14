import axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import notify from '../utils/notifications';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  // formik
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .min(5, 'Must be at least 5 characters long'),
    passwordVerification: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must Match'),
  });

  const handelSubmit = async ({ username, password }) => {
    try {
      const res = await axios.post('/api/auth/users/register', {
        username,
        password,
      });
      if (res.status === 200) {
        notify('Saved', 'User Register Successfully', 'success');

        history.push('/users');
      }
    } catch (err) {
      let error = 'Unknown Error';
      if (err.response.data && err.response.data.errors)
        error = err.response.data.errors[0].msg;
      notify('Error', error, 'danger');
    }
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
    {
      control: 'input',
      type: 'password',
      name: 'passwordVerification',
      placeholder: 'Verify Password',
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
