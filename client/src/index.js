import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminContextProvider } from './context/adminContext';
import { UserContextProvider } from './context/userContext';
import { ThemeContextProvider } from './context/themeContext';

ReactDOM.render(
  <React.StrictMode>
    <AdminContextProvider>
      <UserContextProvider>
        <ThemeContextProvider>
          <Router>
            <App />
          </Router>
        </ThemeContextProvider>
      </UserContextProvider>
    </AdminContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
