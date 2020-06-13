const { createProxyMiddleware } = require('http-proxy-middleware');

//서버 포트와 리액트 포트를 하나로 합친다.
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //포트를 5000으로 주겠다.
      changeOrigin: true,
    })
  );
};