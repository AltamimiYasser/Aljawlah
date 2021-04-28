import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AdminContext from '../../context/adminContext';
import UserContext from '../../context/userContext';

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  text-decoration: none;
`;

const Navbar = () => {
  const history = useHistory();

  const { loggedIn: loggedInAdmin, getLoggedIn: getLoggedInAdmin } = useContext(
    AdminContext
  );

  const { loggedIn: loggedInUser, getLoggedIn: getLoggedInUser } = useContext(
    UserContext
  );

  const redirectAdmin = () => {
    getLoggedInAdmin();
    if (!loggedInAdmin) {
      history.push('/admin-dashboard');
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
    <Nav>
      {!loggedInAdmin && !loggedInUser ? (
        <>
          <Link to='/adminlogin'>Admin Login</Link>{' '}
          <Link to='/login'>User login</Link>
        </>
      ) : null}

      {loggedInAdmin ? (
        <>
          {' '}
          <Link to='/admin-dashboard'>Admin Dashboard</Link>{' '}
          <Link to='/register'>Register</Link>{' '}
        </>
      ) : null}
      {loggedInUser || loggedInAdmin ? (
        <Link to='/rents'>Rents List</Link>
      ) : null}

      {loggedInAdmin ? (
        <button onClick={handelAdminLogout}>Admin Logout</button>
      ) : null}
      {loggedInUser ? (
        <button onClick={handelUserLogout}>User Logout</button>
      ) : null}
    </Nav>
  );
};

export default Navbar;
