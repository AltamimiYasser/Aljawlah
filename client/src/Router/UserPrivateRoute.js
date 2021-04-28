// if not logged in redirect to user login
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import UserContext from '../context/userContext';
import AdminContext from '../context/adminContext';

const AdminPrivateRoute = ({ children, path, ...rest }) => {
  const { loggedIn: loggedInUser } = useContext(UserContext);
  const { loggedIn: loggedInAdmin } = useContext(AdminContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedInUser === true || loggedInAdmin === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
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
