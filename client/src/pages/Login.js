import React, { useContext } from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import axios from 'axios';
import UserContext from '../context/userContext';
import notify from '../utils/notifications';

const Login = (props) => {
  // get admin context to redirect after log in
  const { loggedIn, getLoggedIn } = useContext(UserContext);

  // redirect after log in
  const redirect = () => {
    getLoggedIn();
    if (loggedIn) {
      const prevLocation = props.location.state.prevLocation;
      console.log(prevLocation);
      props.history.push(prevLocation || '/rents');
    }
  };

  // formik stuff
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Required')
      .min(6, 'Must be at least 6 characters long'),
    password: Yup.string().required('Required'),
  });

  const handelSubmit = async ({ username, password }) => {
    try {
      await axios.post('/api/auth/users/login', {
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
      title='User Login'
      fields={fields}
    />
  );
};

export default Login;
