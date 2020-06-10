
//시작점
const express = require('express'); //익스프레스 모듈을 가져온다.
const app = express(); //새로운 익스프레스앱을 만든다.
const port = 5000;
const bodyParser = require('body-parser'); //클라이언트에서 주는 정보를 서버에서 분석해서 가져온다..
const { User } = require('./models/User.model'); //유저 모델을 가져온다.
const config = require('./config/key')


app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded 타입의데이터를 분석하여 가져온다.
app.use(bodyParser.json()); //application/json 타입의 데이터를 분석하여 가져온다.

const mongoose = require('mongoose'); //몽고디비를 편하게 쓰기위한 툴
mongoose
  .connect(
    config.mongoURI,
    {
      //몽고디비연결
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, //에러를 뜨게 하지 않기 위해 정의
    }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

//회원 가입 라우터
app.post('/register', (req, res) => {
  //콜백 함수로 정보를 받는다.
  //회원가입할때 필요한 정보를 받는다.
  const user = new User(req.boby); //데이터 베이스에 넣기위에선 req.body 를 해준다.
  
  //몽고디비 함수 save로 정보들이 유저 모델이 저장 된다. 콜백함수로 에러가 있을 경우 json 형태로 클라이언트에 전달 해준다.
  user.save((err, data) => {
    if(err) return res.json({success: false,  err})// 실패했다는 에러 메시지와 함께 전달
    return res.status(200).json({
      success: true
    })
  })
  
  //받은 데이터를 데이터베이스에 넣어준다.
});

app.get('/', (req, res) => {
  res.send('되냐 안되냐');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
