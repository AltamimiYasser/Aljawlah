import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AdminContext from '../../context/adminContext';
import notify from '../../utils/notifications';

const Navbar = () => {
  const history = useHistory();
  const redirect = () => {
    getLoggedIn();
    if (loggedIn) {
      history.push('/admin-dashboard');
    }
  };
  const { loggedIn, getLoggedIn } = useContext(AdminContext);
  const handelClick = async (e) => {
    e.preventDefault();

    try {
      await axios.get('/api/auth/admin/logout');
      redirect();
    } catch (err) {
      console.log(err);
      notify('Error', err, 'danger');
    }
  };
  return (
    <nav>
      <Link to='/adminlogin'>Admin Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/admin-dashboard'>Admin Dashboard</Link>
      <button onClick={handelClick}>Logout</button>
    </nav>
  );
};

export default Navbar;
