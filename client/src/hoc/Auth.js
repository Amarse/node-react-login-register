/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/User.action';
import { useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {
  //option 은  null, true, false 가 있는데
  //null은 아무나 출입이 가능한 페이지
  //true는 로그인한 유저만 추입이 가능한 페이지
  //false는 로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태 null상태
        if (!response.payload.isAuth) {
          //null 상태에서 true로 들어가려 할때
          if (option) {
            props.history.push('/login');
          }
        } else {
          //로그인한 상태이지만 어드민이 아닐때 true상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            //false 일때 로그인한 유저가 들어갈 수 없는 페이지를 들어가려고 할때
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
