import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LandinPage from '../components/views/landingPage/LandingPage';
import LoginPage from '../components/views/loingPage/LoginPage';
import RegisterPage from '../components/views/registerPage/RegisterPage';
import Footer from '../components/views/footer/Footer';
import auth from '../hoc/Auth';
import NavBarPage from './views/navBarPage/NavBarPage';

function App() {
  return (
    <Router>
    <NavBarPage />
      <Switch>
        {/* auth 로 감싸서 인증되는 유저만 페이지 접근이 가능하게 만든다. */}
        <Route exact path="/" component={auth(LandinPage, null)} />
        <Route exact path="/login" component={auth(LoginPage, false)} />
        <Route exact path="/register" component={auth(RegisterPage, false)} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
