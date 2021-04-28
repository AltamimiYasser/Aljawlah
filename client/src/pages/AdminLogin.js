import React, { useContext } from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import axios from 'axios';

import notify from '../utils/notifications';
import AdminContext from '../context/adminContext';

const AdminLogin = (props) => {
  // get admin context to redirect if admin is logged in
  const { loggedIn, getLoggedIn } = useContext(AdminContext);

  // redirect after log in
  const redirect = () => {
    getLoggedIn();
    if (loggedIn) {
      const prevLocation = props.location.state.prevLocation;
      props.history.push(prevLocation);
    }
  };

  // formik stuff
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = async ({ username, password }) => {
    try {
      await axios.post('/api/auth/admin/login', {
        username,
        password,
      });
      redirect();
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
      title='Admin Login'
      fields={fields}
    />
  );
};

export default AdminLogin;
