import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import AuthOnlyRoute from './routes/AuthOnlyRoute';
import Landing from './views/Landing/Landing';
import Navbar from './views/Navbar/Navbar';
import About from './views/About/About';
import Register from './views/Auth/Register/Register';
import Login from './views/Auth/Login/Login';
import Connection from './views/Connection/Connection';
import Profile from './views/Connection/Profile/Profile';
import ErrorComponent from './views/ErrorComponent/ErrorComponent';
import Settings from './views/Connection/Settings/Settings';
import { checkAuth } from './actions/auth';

const App = ({ checkAuth, loading, isAuthenticated }) => {
  useEffect(() => {
    console.log('APP RENDERING (useEffect)');
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <AuthOnlyRoute path="/profile/:username" component={Profile} />
          <AuthOnlyRoute path="/connection" component={Connection} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/settings" exact component={Settings} />
          {isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <>
              <Route path="/about" exact component={About} />
              <Route path="/" exact component={Landing} />
            </>
          )}

          <Route path="/*" component={ErrorComponent} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { checkAuth })(App);
