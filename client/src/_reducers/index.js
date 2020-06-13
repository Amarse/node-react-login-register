import { combineReducers } from 'redux';
import user from '../_reducers/User.reducer';

//combineReducers: 나눠진 리듀셔를 하나로 합치는 기능을 한다.

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
