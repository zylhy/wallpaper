const { getHeaders } = require("../utils/bilibiliHeaders");

module.exports = [
  {
    path: "/qrcode",
    method: "get",
    target: "https://passport.bilibili.com/x/passport-login/web/qrcode/generate",
    headers: getHeaders("qrcode"),
  },
  {
    path: "/user/:id",
    method: "get",
    target: "https://api.bilibili.com/x/space/acc/info/:id",
    headers: getHeaders("user"),
  },
  {
    path: "/video/detail",
    method: "get",
    target: "https://api.bilibili.com/x/web-interface/view",
    headers: getHeaders("video"),
  },
  {
    path: "/danmu/:cid",
    method: "get",
    target: "https://api.bilibili.com/x/v1/dm/list.so?oid=:cid",
    headers: getHeaders("danmu"),
  },
  {
    path: "/ranking",
    method: "get",
    target: "https://api.bilibili.com/x/web-interface/ranking/v2",
    headers: getHeaders("ranking"),
  }
];
