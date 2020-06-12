//시작점
const express = require('express'); //익스프레스 모듈을 가져온다.
const app = express(); //새로운 익스프레스앱을 만든다.
const port = 5000;
const bodyParser = require('body-parser'); //클라이언트에서 주는 정보를 서버에서 분석해서 가져온다..
const cookieParser = require('cookie-parser'); //쿠키에 저장한다.
const { User } = require('./models/User.model'); //유저 모델을 가져온다.
const config = require('./config/key');
const { auth } = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded 타입의데이터를 분석하여 가져온다.
app.use(bodyParser.json()); //application/json 타입의 데이터를 분석하여 가져온다.
app.use(cookieParser());

const mongoose = require('mongoose'); //몽고디비를 편하게 쓰기위한 툴
mongoose
  .connect(config.mongoURI, {
    //몽고디비연결
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, //에러를 뜨게 하지 않기 위해 정의
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

//회원 가입 라우터
app.post('/api/users/register', (req, res) => {
  //콜백 함수로 정보를 받는다.
  //회원가입할때 필요한 정보를 받는다.
  const user = new User(req.body); //데이터 베이스에 넣기위에선 req.body 를 해준다.
  //-암호화 해줘야 한다.유저모델에 유저 정보를 저장하기 전에 (user.model에 userSchema.pre('save')실행)
  //몽고디비 함수 save로 정보들이 유저 모델이 저장 된다. 콜백함수로 에러가 있을 경우 json 형태로 클라이언트에 전달 해준다.
  user.save((err, user) => {
    // console.log(user);
    if (err) return res.json({ success: false, err }); // 실패했다는 에러 메시지와 함께 전달
    return res.status(200).json({
      success: true,
    });
  });

  //받은 데이터를 데이터베이스에 넣어준다.
});

//로그인
app.post('/api/users/login', (req, res) => {
  //데이터 베이스에서 이메일을 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log('user', user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일을 확인하세요',
      });
    }
    //데이터베이스에 이메일이 있다면 패스워드를 비교한다.
    // console.log('req info', req.body);

    user.comparePassword(req.body.password, (err, isMatch) => {
      //비밀번호가 틀리다면

      // console.log('match', isMatch);
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      //비밀번호가 맞다면 토큰을 생성한다.

      user.generateToken((err, user) => {
        console.log('gen', user);
        if (err) return res.status(400).send(err);
        //토큰을 쿠키에 저장한다.
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  //미들웨어를 거져 이 부분까지 왔다는 거는 Authentication이 true 라는 것.
  res.status(200).json({
    _id: req.user._id,
    //role 0 이면 일반유져 0이 아니면 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//로그아웃
app.get('/api/users/logout', auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {//토큰을 지워준다.
    if (err) return res.json({ seccess: false, err });
    return res.status(200).send({ seccess: true });
  });
});

app.get('/', (req, res) => {
  res.send('되는것인가...');
});

app.get('/api/hello', (req, res)=> {
  res.send('안녕하세요')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
