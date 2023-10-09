const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://adorable-singlet-frog.cyclic.app',
      changeOrigin: true,
    })
  );
};
