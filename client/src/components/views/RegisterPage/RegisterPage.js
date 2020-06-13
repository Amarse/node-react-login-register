import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/User.action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();
  //이름
  const [name, setName] = useState('');
  //이메일
  const [email, setEmail] = useState('');
  //패스워드
  const [password, setPassword] = useState('');
  //패스워드 확인
  const [confirmPassword, setConfirmPassword] = useState('');

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmitHendler = (event) => {
    event.preventDefault(); //이벤트가 리프레쉬되는걸 막는다.
    console.log('email', email);

    if (password !== confirmPassword) {
      return alert('비밀번호를 확인해주세요');
    }

    let body = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up.');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHendler}
      >
        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConPasswordHandler}
        />
        <br />
        <button>login</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
