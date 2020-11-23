import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Register from './components/Register/Register';
import Connection from './components/Connection/Connection';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/connection">
            <Connection />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
