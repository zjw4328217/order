const proxy = require('http-proxy-middleware');//不用下载

module.exports = function(app) {
  app.use(
    '/api', 
    proxy({
      target: 'http://localhost:3666',
      changeOrigin: true,
      //pathRewrite:
    })
  );
  app.use(
    '/bai', 
    proxy({
      target: 'https://www.baidu.com/s',
      changeOrigin: true,
      //pathRewrite:
    })
  );


};