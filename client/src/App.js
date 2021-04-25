import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Rents from './pages/Rents';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route
              path='/adminlogin'
              name='AdminLogin'
              component={AdminLogin}
            />
            <Route path='/rents' name='Rents' component={Rents} />
          </Switch>
          <Footer />
        </>
      </Router>
    </Provider>
  );
}

export default App;
