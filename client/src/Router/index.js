import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Login from '../pages/Login';
import RentsList from '../pages/RentsList';
import AdminPrivateRoute from './AdminPrivateRoute';
import UserPrivateRoute from './UserPrivateRoute';
import styled from 'styled-components';
import BikesList from '../pages/BikesList';
import UsersList from '../pages/UsersList';
import AddBikeForm from '../pages/AddBikeForm';
import EditBikeForm from '../pages/EditBikeForm';
import AddCustomerForm from '../pages/AddCustomerForm';
import EditCustomerForm from '../pages/EditCustomerForm';
import CustomersList from '../pages/CustomersList';

const Router = () => {
  return (
    <Page>
      <Switch>
        <Route path='/adminlogin' component={AdminLogin} />
        <AdminPrivateRoute path='/register'>
          <Register />
        </AdminPrivateRoute>
        <AdminPrivateRoute exact path='/bikes'>
          <BikesList />
        </AdminPrivateRoute>

        <AdminPrivateRoute exact path='/users'>
          <UsersList />
        </AdminPrivateRoute>
        <AdminPrivateRoute exact path='/bikes/new'>
          <AddBikeForm />
        </AdminPrivateRoute>
        <AdminPrivateRoute exact path='/bikes/edit/:id'>
          <EditBikeForm />
        </AdminPrivateRoute>
        <Route path='/login' component={Login} />
        <UserPrivateRoute path='/rents'>
          <RentsList />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/customers'>
          <CustomersList />
        </UserPrivateRoute>
        <UserPrivateRoute path='/customers/new'>
          <AddCustomerForm />
        </UserPrivateRoute>
        <UserPrivateRoute path='/customers/edit/:id'>
          <EditCustomerForm />
        </UserPrivateRoute>
        <Route path='/' component={Landing} />
      </Switch>
    </Page>
  );
};

const Page = styled.div`
  flex: 1;
  width: 90%;
  margin: 40px auto;
  padding: 0;
`;

export default Router;
