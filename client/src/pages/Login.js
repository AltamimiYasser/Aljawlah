import React, { useContext } from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import axios from 'axios';
import UserContext from '../context/userContext';
import notify from '../utils/notifications';
import { Redirect } from 'react-router';

const Login = (props) => {
  // get admin context to redirect after log in
  const { loggedIn, getLoggedIn } = useContext(UserContext);

  // redirect after log in
  const redirect = () => {
    getLoggedIn();
    if (loggedIn) {
      props.history.push(props.location.state.prevLocation || '/rents');
    }
  };

  // formik stuff
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = ({ username, password }) => {
    console.log(`username: ${username}, password: ${password}`);
    axios
      .post('/api/auth/users/login', { username, password })
      .then((response) => {
        redirect();
      })
      .catch((err) => {
        notify(
          'Error',
          err.response.data.errors[0].msg || 'Unknown error',
          'danger'
        );
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
        <Redirect to='/rents' />
      ) : (
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          handelSubmit={handelSubmit}
          title='User Login'
          fields={fields}
        />
      )}
    </>
  );
};

export default Login;
