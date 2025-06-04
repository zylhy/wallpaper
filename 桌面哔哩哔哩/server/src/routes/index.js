// src/routes/index.js
const express = require('express');
const router = express.Router();
const qrcodeController = require('../controllers/qrcodeController');

router.get('/qrcode', qrcodeController.getQRCode);

module.exports = router;
