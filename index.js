//시작점

const express = require('express') //익스프레스 모듈을 가져온다.
const app = express() //새로운 익스프레스앱을 만든다.
const port = 5000

const mongoose = require('mongoose')//몽고디비를 편하게 쓰기위한 툴
mongoose.connect('mongodb+srv://AliceKim:alice1234@boilerplate-pcioc.mongodb.net/<dbname>?retryWrites=true&w=majority', { //몽고디비연결
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //에러를 뜨게 하지 않기 위해 정의
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))






app.get('/', (req, res) => { res.send('hello')})

app.listen(port, () => { console.log(`Example app listening on port ${port}`)})