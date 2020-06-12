const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //포트를 5000으로 주겠다.
      changeOrigin: true,
    })
  );
};