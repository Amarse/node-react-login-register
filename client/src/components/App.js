import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandinPage from '../components/views/landingPage/LandingPage';
import LoginPage from '../components/views/loingPage/LoginPage';
import RegisterPage from '../components/views/registerPage/RegisterPage';
import auth from '../hoc/Auth';

function App() {
  return (
    <Router>
      <Switch>
        {/* auth 로 감싸서 인증되는 유저만 페이지 접근이 가능하게 만든다. */}
        <Route exact path="/" component={auth(LandinPage, null)} />
        <Route exact path="/login" component={auth(LoginPage, false)} />
        <Route exact path="/register" component={auth(RegisterPage, false)} />
      </Switch>
    </Router>
  );
}

export default App;
