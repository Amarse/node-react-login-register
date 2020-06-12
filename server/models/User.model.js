//스키마란? 유저 정보거나, 게시판의 정보의 타입을 정해주는 것.
//모델은 스키마를 감싸주는 역할을 한다.

const mongoose = require('mongoose'); //몽구스를 가져온다.
//유저 데이터를 저장하기 위한 스키마 작성
const bcrypt = require('bcrypt');
//soltRounds 생성
const soltRounds = 10;
//토큰 생성
const jwt = require('jsonwebtoken');

//유저 스키마 작성
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백을 없애주는것
    unique: 1,
  },
  password: {
    type: String,

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




//유저모델에 유저 정보를 저장하기 전에
userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    //비밀번호 암호화 시킨다.
    //솔트를 생성하고, 솔트로 비번을 암호한다.
    bcrypt.genSalt(soltRounds, function (err, salt) {
      if (err) return next(err); //에러가 나면 index.js 로 보내지고

      //솔트를 생성했다면
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; //패스워드를 암호화 된 패스워드로 교체
        next();
      });
    });
  } else {
    next()
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 와 데이터베이스에 있는 암호
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err); //비밀번호가 맞지 않으면 에러
    cb(null, isMatch) // 비밀번호가 맞다면 에러는 없고 매치로 정보를 보내준다.
    
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;
//  console.log('user._id', user._id)
  //jsonwebtoken을 이용해 웹 토큰 만들기
  var token = jwt.sign(user._id.toHexString(),'secretToken')
  // user._id + 'userToken' = token 토큰형성
  //유저 스키마 토큰에 넣어준다.
  user.token = token;
  user.save(function (err, user){
      if(err) return cb(err)
      cb(null, user);
  })
}
userSchema.statics.findByToken = function(token, cb){
  var user = this;
  //토큰을 decode  한다.

  // user._id + '' = token 을 만들때 쓴 'secretToken'  넣어준다,.
  jwt.verify(token,'secretToken', function(err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음 

    //클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는지 확인
    user.findOne({'_id': decoded, 'token': token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })
  })
}
//모델로 감싸준다.
const User = mongoose.model('User', userSchema);

module.exports = { User }; //user 내보내기
