// if not logged in redirect to user login
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import UserContext from '../context/userContext';

const AdminPrivateRoute = ({ children, path, ...rest }) => {
  const { loggedIn } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn === true ? (
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
