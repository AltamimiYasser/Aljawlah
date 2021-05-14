import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Login from '../pages/Login';
import MainRentsList from '../pages/MainRentsList';
import AdminPrivateRoute from './AdminPrivateRoute';
import UserPrivateRoute from './UserPrivateRoute';
import styled, { css } from 'styled-components';
import AllBikesList from '../pages/AllBikesList';
import UsersList from '../pages/UsersList';
import AddBikeForm from '../pages/AddBikeForm';
import EditBikeForm from '../pages/EditBikeForm';
import AddCustomerForm from '../pages/AddCustomerForm';
import EditCustomerForm from '../pages/EditCustomerForm';
import CustomersList from '../pages/CustomersList';
import AddRentPhone from '../pages/AddRentPhone';
import RentDetailsMainPage from '../pages/RentDetailsMainPage';

import UserContext from '../context/userContext';
import AdminContext from '../context/adminContext';
import { useEffect } from 'react';
import RentChooseBikeForm from '../pages/RentChooseBikeForm';
import CustomerDetailsPage from '../pages/CustomerDetailsPage';
import BikeDetails from '../components/BikeDetails';

const Router = () => {
  const { loggedIn: loggedInUser } = useContext(UserContext);
  const { loggedIn: loggedInAdmin } = useContext(AdminContext);

  const [anyLoggedIn, setAnyLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedInAdmin || loggedInUser) {
      setAnyLoggedIn(true);
    } else {
      setAnyLoggedIn(false);
    }
  }, [loggedInAdmin, loggedInUser]);

  return (
    <Page loggedIn={anyLoggedIn}>
      <Switch>
        <Route exact path='/adminlogin' component={AdminLogin} />
        <AdminPrivateRoute exact path='/register'>
          <Register />
        </AdminPrivateRoute>
        <AdminPrivateRoute exact path='/bikes'>
          <AllBikesList />
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
        <Route exact path='/login' component={Login} />
        <UserPrivateRoute exact path='/rents'>
          <MainRentsList />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/customers'>
          <CustomersList />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/customers/new'>
          <AddCustomerForm />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/customers/edit/:id'>
          <EditCustomerForm />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/rents/new'>
          <AddRentPhone />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/rents/choosebike'>
          <RentChooseBikeForm />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/rents/:id'>
          <RentDetailsMainPage />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/customers/:id'>
          <CustomerDetailsPage />
        </UserPrivateRoute>
        <UserPrivateRoute exact path='/bikes/:id'>
          <BikeDetails />
        </UserPrivateRoute>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Page>
  );
};

const pageWhenNotLoggedIn = css`
  width: 100%;
  margin: 0;
`;

const Page = styled.div`
  flex: 1;
  width: 90%;
  margin: 40px auto;
  padding: 0;

  ${(props) => !props.loggedIn && pageWhenNotLoggedIn}
`;

export default Router;
