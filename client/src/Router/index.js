import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashBoard from '../pages/AdminDashBoard';
import AdminLogin from '../pages/AdminLogin';
import Register from '../pages/Register';
import AdminPrivateRoute from './AdminPrivateRoute';

const Router = () => {
  return (
    <Switch>
      <Route path='/adminlogin' component={AdminLogin} />
      <AdminPrivateRoute path='/register'>
        <Register />
      </AdminPrivateRoute>
      <AdminPrivateRoute path='/admin-dashboard'>
        <AdminDashBoard />
      </AdminPrivateRoute>
    </Switch>
  );
};

export default Router;
