import React from 'react';
import { AdminContextProvider } from './context/adminContext';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './App.css';

import Router from './Router';
import Navbar from './components/navbar';

const App = () => {
  return (
    <AdminContextProvider>
      <ReactNotification />
      <Navbar />
      <Router />
    </AdminContextProvider>
  );
};

export default App;
