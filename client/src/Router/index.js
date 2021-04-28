import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashBoard from '../pages/AdminDashBoard';
import AdminLogin from '../pages/AdminLogin';
import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Login from '../pages/Login';
import RentsList from '../pages/RentsList';
import AdminPrivateRoute from './AdminPrivateRoute';
import UserPrivateRoute from './UserPrivateRoute';
import styled from 'styled-components';

const Router = () => {
  return (
    <Page>
      <Switch>
        <Route path='/adminlogin' component={AdminLogin} />
        <AdminPrivateRoute path='/register'>
          <Register />
        </AdminPrivateRoute>
        <AdminPrivateRoute path='/admin-dashboard'>
          <AdminDashBoard />
        </AdminPrivateRoute>
        <Route path='/login' component={Login} />
        <UserPrivateRoute path='/rents'>
          <RentsList />
        </UserPrivateRoute>
        <Route path='/' component={Landing} />
      </Switch>
    </Page>
  );
};

const Page = styled.div`
  flex: 1;
`;

export default Router;
