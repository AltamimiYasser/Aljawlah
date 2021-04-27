import React from 'react';
import { AdminContextProvider } from './context/adminContext';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './App.css';

import AdminLogin from './pages/AdminLogin';
const App = () => {
  return (
    <AdminContextProvider>
      <ReactNotification />
      <Switch>
        <Route path='/adminlogin' component={AdminLogin} />
      </Switch>
    </AdminContextProvider>
  );
};

export default App;
