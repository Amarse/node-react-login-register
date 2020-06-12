import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandinPage from '../components/views/LandingPage/LandingPage';
import LoginPage from '../components/views/LoingPage/LoginPage';
import RegisterPage from '../components/views/RegisterPage/RegisterPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandinPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
