const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/objects*', { target: process.env.REACT_APP_BACKEND_URL }),
    createProxyMiddleware('/objects/*', { target: process.env.REACT_APP_BACKEND_URL }),
  );
};
