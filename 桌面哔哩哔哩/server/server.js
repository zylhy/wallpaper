// server.js
const app = require('./src/app');

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
