import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/User.action';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Register.css';

function RegisterPage(props) {
  const { register, handleSubmit, errors, watch } = useForm();
  const dispatch = useDispatch();

  const onSubmitHendler = (values) => {
    console.log('values', values);

    dispatch(registerUser(values)).then((response) => {
      if (response.payload.success) {
        props.history.push('/');
      } else {
        alert('Failed to sign up.');
      }
    });
  };

  return (
    <div className="login-form">
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit(onSubmitHendler)}>
        <label htmlFor="inputName">Name</label>
        <input
          type="text"
          id="inputName"
          name="name"
          ref={register({ required: 'Enter your Name' })}
        />
        <label htmlFor="inputEmail">Email</label>
        <input
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
        <label htmlFor="inputRePassword">Repeat password</label>
        <input
          type="password"
          id="inputRePassword"
          name="password_repeat"
          ref={register({
            validate: (value) => {
              return value === watch('password') || 'The passwords do not match';
            }
          })}
        />
        {errors.password_repeat && (
          <p className="error">{errors.password_repeat.message}</p>
        )}
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
