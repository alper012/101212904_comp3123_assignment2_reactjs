const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://employee-vbackend.herokuapp.com",
            changeOrigin: true,
        })
    );
};