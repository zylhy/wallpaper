const request = require('../request/index');
exports.getQRCode = async (req, res) => {
  try {
    const result = await request(
      'https://passport.bilibili.com/x/passport-login/web/qrcode/generate',
      'get',
      {},
      {
        headers: {
          Referer: 'https://www.bilibili.com/'
        }
      }
    );
    res.json(result);
  } catch (error) {
    console.error('获取二维码失败:', error.message);
    res.status(500).json({ message: '二维码获取失败' });
  }
};
