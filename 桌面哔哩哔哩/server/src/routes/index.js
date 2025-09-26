const express = require("express");
const router = express.Router();
const apiConfig = require("../config/apiConfig");
const proxyController = require("../controllers/proxyController");

// 根据配置生成路由
apiConfig.forEach(cfg => {
  router[cfg.method](cfg.path, (req, res) =>
    proxyController.proxyHandler(cfg, req, res)
  );
});

module.exports = router;
