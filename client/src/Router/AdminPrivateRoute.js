// if not logged in redirect to admin login
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import AdminContext from '../context/adminContext';

const AdminPrivateRoute = ({ children, path, ...rest }) => {
  const { loggedIn } = useContext(AdminContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/adminlogin',
              state: {
                prevLocation: path,
              },
            }}
          />
        );
      }}></Route>
  );
};

export default AdminPrivateRoute;
