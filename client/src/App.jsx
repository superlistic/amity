import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import AuthOnlyRoute from './routes/AuthOnlyRoute';
import Landing from './views/Landing/Landing';
import Navbar from './views/Navbar/Navbar';
import About from './views/About/About';
import Register from './views/Auth/Register/Register';
import Login from './views/Auth/Login/Login';
import Connection from './views/Connection/Connection';
import ErrorComponent from './views/ErrorComponent/ErrorComponent';
import Settings from './views/Settings/Settings';
import { checkAuth } from './actions/auth';

const App = ({ checkAuth }) => {
  useEffect(() => {
    console.log('APP RENDERING (useEffect)');
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <AuthOnlyRoute path="/connection" component={Connection} />
          <Route path="/about" exact component={About} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/" exact component={Landing} />
          <Route path="/*" component={ErrorComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { checkAuth })(App);
