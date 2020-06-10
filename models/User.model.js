'use strict';

//스키마란? 유저 정보거나, 게시판의 정보의 타입을 정해주는 것.
//모델은 스키마를 감싸주는 역할을 한다.

//유저 데이터를 저장하기 위한 스키마 작성

const mongoose = require('mongoose'); //몽구스를 가져온다.

//유저 스키마 작성
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //r공뱅을 없애주는것
    unique: 1,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: Number,
});

//모델로 감싸준다.
const User = mongoose.model('User', userSchema);

module.exports = { User }; //user 내보내기