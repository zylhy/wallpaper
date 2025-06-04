// request.js
const axios = require('axios');

// 创建实例
const instance = axios.create({
  timeout: 10000, // 10 秒超时
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Content-Type': 'application/json'
  }
});

// 请求拦截器（可加 token 或日志）
instance.interceptors.request.use(config => {
  // 例如自动添加 token
  // config.headers.Authorization = 'Bearer YOUR_TOKEN';
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器（统一错误处理）
instance.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error.response) {
    console.error(`HTTP ${error.response.status}:`, error.response.data);
  } else {
    console.error('请求失败:', error.message);
  }
  return Promise.reject(error);
});

// 封装请求函数
const request = (url, method = 'get', data = {}, config = {}) => {
  return instance({
    url,
    method,
    ...(method === 'get' ? { params: data } : { data }),
    ...config
  });
};

module.exports = request;
