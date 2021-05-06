import React from 'react';
import { AdminContextProvider } from './context/adminContext';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import './App.css';

import Router from './Router';
import Navbar from './components/navbar';
import Footer from './components/footer';
import styled from 'styled-components';

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <AdminContextProvider>
        <ReactNotification />
        <ConfirmProvider>
          <AppContainer>
            <Navbar />
            <Router />
            <Footer />
          </AppContainer>
        </ConfirmProvider>
      </AdminContextProvider>
    </MuiPickersUtilsProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  //TODO: Fix all media query to fix width for smaller devices
`;

export default App;
