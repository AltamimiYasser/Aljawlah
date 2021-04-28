import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminContextProvider } from './context/adminContext';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <AdminContextProvider>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </AdminContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
