import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Landing from './views/Landing/Landing';
import Navbar from './views/Navbar/Navbar';
import About from './views/About/About';
import Register from './views/Auth/Register/Register';
import Login from './views/Auth/Login/Login';
import Connection from './views/Connection/Connection';
import ErrorComponent from './views/ErrorComponent/ErrorComponent';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/connection" exact component={Connection} />
          <Route path="/" exact component={Landing} />
          <Route path="/*" component={ErrorComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
