import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSumit) {
  const request = axios
    .post('/api/users/login', dataToSumit)
    .then((response) => response.data); // 서버에서 받은 리스폰스를 리퀘스트에 담는다.
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSumit) {
  const request = axios
    .post('/api/users/register', dataToSumit)
    .then((response) => response.data); // 서버에서 받은 리스폰스를 리퀘스트에 담는다.
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data); // 서버에서 받은 리스폰스를 리퀘스트에 담는다.
  return {
    type: AUTH_USER,
    payload: request,
  };
}
