const { User } = require('../models/User.model');


let  auth = (req, res, next) => {

  //인증을 처리 하는 곳
  //클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth; //쿠키 파서를 이용하여 찾는다.

  
  //토큰을 복호화 한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true })

    //토큰과 유저를 req를 넣으줌으로 인해 클라이언트쪽에서 쓸수있게 넣어준다.
    req.token = token;
    req.user = user;
    next();// next로 다음으로 넘겨준다.
  })
  //유저가 있으면 인증 되고,

  //유저가 없으면 인증이 안된다.

  

}

module.exports = { auth };