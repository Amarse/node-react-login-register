import React from 'react';
import { loginUser } from '../../../_actions/User.action';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './Login.css'

function LoginPage(props) {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmitHendler = (values) => {
    console.log('values', values);

    dispatch(loginUser(values)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('이메일 혹은 아이디를 확인해주세요');
      }
    });
  };

  return (
    <div  className="login-form">
      <h3>Sign in</h3>
      <form onSubmit={handleSubmit(onSubmitHendler)}>
      
          <label htmlFor="inputEmail">Email</label>
          <input
            className="form-control"
            type="email"
            id="inputEmail"
            name="email"
            ref={register({
              required: 'Enter your Email',
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: 'Enter a valid e-mail address',
              },
            })}
          />
       
        {errors.email && <p className="error">{errors.email.message}</p>}
       
          <label htmlFor="inputPassword">Password</label>
          <input
            className="form-control"
            type="password"
            id="inputPassword"
            name="password"
            ref={register({
              required: 'Enter your Password',
              minLength: 8,
              maxLength: 15,
              pattern: {
                value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message: 'Enter a valid password',
              },
            })}
          />
        
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">
          login
        </button>
        <a href="/register">Sign up?</a>
      
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
