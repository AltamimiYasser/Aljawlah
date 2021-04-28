import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminContextProvider } from './context/adminContext';

ReactDOM.render(
  <React.StrictMode>
    <AdminContextProvider>
      <Router>
        <App />
      </Router>
    </AdminContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
