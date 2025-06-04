// src/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

// 允许所有来源跨域访问
app.use(cors());

app.use(express.json());
app.use('/api', routes);

module.exports = app;
