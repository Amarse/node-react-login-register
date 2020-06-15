/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import axios from 'axios';
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';

function NavMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div className="menu">
        <a href="/login">Signin</a>
        <a href="/register">Signup</a>
      </div>
    );
  } else {
    return <a className="logout"onClick={logoutHandler}>Logout</a>;
  }
}

export default withRouter(NavMenu);
