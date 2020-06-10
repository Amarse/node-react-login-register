
//환경변수 에서 모드가 dev 인가 prod 모드를 알수 있다.

if(process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
}else {
  module.exports = require('./dev')
}