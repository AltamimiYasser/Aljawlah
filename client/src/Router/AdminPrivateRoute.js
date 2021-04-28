// if not logged in redirect to admin login
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import AdminContext from '../context/adminContext';

const AdminPrivateRoute = ({ children, ...rest }) => {
  const { loggedIn } = useContext(AdminContext);
  return (
    <Route
      {...rest}
      render={() => {
        return loggedIn === true ? children : <Redirect to='/adminlogin' />;
      }}></Route>
  );
};

export default AdminPrivateRoute;
