import React, { useContext } from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import axios from 'axios';
import AdminContext from '../context/adminContext';
import notify from '../utils/notifications';
import { Redirect } from 'react-router';

const AdminLogin = (props) => {
  // get admin context to redirect after log in
  const { loggedIn, getLoggedIn } = useContext(AdminContext);

  // redirect after log in
  const redirect = () => {
    getLoggedIn();
    if (loggedIn) {
      props.history.push(
        props.location.state.prevLocation || '/admin-dashboard'
      );
    }
  };

  // formik stuff
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = ({ username, password }) => {
    axios
      .post('/api/auth/admin/login', { username, password })
      .then((res) => {
        redirect();
      })
      .catch((err) => {
        let msg;
        if (err.response.data.errors[0].msg) {
          msg = err.response.data.errors[0].msg;
        } else {
          msg = 'Unknown Error';
        }
        notify('Error', msg, 'danger');
      });
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
    <>
      {loggedIn ? (
        <Redirect to='/admin-dashboard' />
      ) : (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          handelSubmit={handelSubmit}
          title='Admin Login'
          fields={fields}
        />
      )}
    </>
  );
};

export default AdminLogin;
