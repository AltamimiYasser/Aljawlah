import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AdminContext from '../../context/adminContext';
import UserContext from '../../context/userContext';
import ThemeContext from '../../context/themeContext';
import { DirectionsBike } from '@styled-icons/material/DirectionsBike';
import { Nav } from './Elemnts';

const Navbar = () => {
  const history = useHistory();

  const { loggedIn: loggedInAdmin, getLoggedIn: getLoggedInAdmin } = useContext(
    AdminContext
  );

  const { loggedIn: loggedInUser, getLoggedIn: getLoggedInUser } = useContext(
    UserContext
  );

  const { theme } = useContext(ThemeContext);

  const redirectAdmin = () => {
    getLoggedInAdmin();
    if (!loggedInAdmin) {
      history.push('/adminlogin');
    }
  };

  const redirectUser = () => {
    getLoggedInUser();
    if (!loggedInUser) {
      history.push('/login');
    }
  };

  const handelAdminLogout = async (e) => {
    try {
      await axios.get('/api/auth/admin/logout');
      redirectAdmin();
    } catch (err) {
      console.log(err);
    }
  };

  const handelUserLogout = async (e) => {
    try {
      await axios.get('/api/auth/users/logout');
      redirectUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navWrapper'>
      <Nav theme={theme}>
        <DirectionsBike className='bike' size={38} />
        <Link to='/' className='title'>
          <h1>AL-JAWLAH</h1>
        </Link>
        {!loggedInAdmin && !loggedInUser ? (
          <>
            <Link to='/adminlogin' className='link'>
              Admin Login
            </Link>{' '}
            <Link to='/login' className='link'>
              User login
            </Link>
          </>
        ) : null}
        {loggedInAdmin ? (
          <>
            {' '}
            <Link to='/bikes' className='link'>
              Bikes
            </Link>{' '}
            <Link to='/users' className='link'>
              Users
            </Link>{' '}
            <Link to='/register' className='link'>
              Register
            </Link>{' '}
          </>
        ) : null}
        {loggedInUser || loggedInAdmin ? (
          <Link to='/rents' className='link'>
            Rents List
          </Link>
        ) : null}
        {loggedInAdmin ? (
          <button onClick={handelAdminLogout} className='btn'>
            Admin Logout
          </button>
        ) : null}
        {loggedInUser ? (
          <button onClick={handelUserLogout} className='btn'>
            User Logout
          </button>
        ) : null}
      </Nav>
    </div>
  );
};

export default Navbar;
