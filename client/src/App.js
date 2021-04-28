import React, { useContext } from 'react';
import { AdminContextProvider } from './context/adminContext';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './App.css';

import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashBoard';
import Register from './pages/Register';
import AdminContext from './context/adminContext';

const App = () => {
  return (
    <AdminContextProvider>
      <ReactNotification />
      <Switch>
        <Route path='/adminlogin' component={AdminLogin} />
        <Route path='/register' component={Register} />
        <Route path='/admin-dashboard' component={AdminDashBoard} />
      </Switch>
    </AdminContextProvider>
  );
};

export default App;
