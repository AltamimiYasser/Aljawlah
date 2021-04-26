import React from 'react';
import { AdminContextProvider } from './context/adminContext';
import { Switch, Route } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <AdminContextProvider>
      <Switch>
        <Route path='/adminlogin' component={AdminLogin} />
      </Switch>
    </AdminContextProvider>
  );
};

export default App;
