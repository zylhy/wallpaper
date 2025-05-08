const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors'); 
const app = express();
// 允许所有来源访问
app.use(cors());
const target = 'https://passport.bilibili.com'; 
app.use('/api', proxy(target, {
  proxyReqPathResolver: function (req) {
    // 去掉 "/api" 前缀
    return req.originalUrl.replace(/^\/api/, '');
  },
  userResDecorator: (proxyRes, proxyResData, req, res) => {
    console.log('目标服务器响应内容:', proxyResData.toString());  // 打印响应内容
    return proxyResData;  // 将响应返回
  },
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    // 可选：传递 headers 或其他配置
    proxyReqOpts.headers['Content-Type'] = 'application/json'; 
    return proxyReqOpts;
  }
}));

// 启动服务
const PORT =3001;
app.listen(PORT, () => {
  console.log(`代理服务器已启动：http://localhost:${PORT}`);
});
