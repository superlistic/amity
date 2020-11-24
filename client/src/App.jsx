import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing/Landing';
import Navbar from './views/Navbar/Navbar';
import About from './views/About/About';
import Register from './views/Register/Register';
import Connection from './views/Connection/Connection';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/connection" component={Connection} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
