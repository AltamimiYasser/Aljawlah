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
    password: Yup.string().required('Required'),
  });

  const handelSubmit = async ({ username, password }) => {
    try {
      const res = await axios.post('/api/auth/users/register', {
        username,
        password,
      });
      if (res.status === 200) {
        notify('Saved', 'User Register Successfully', 'success');
        //TODO redirect

        history.push('/users');
      }
    } catch (err) {
      const error = err.response.data.errors[0].msg;
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
