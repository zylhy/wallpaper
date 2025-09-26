const request = require("../request");

function buildTargetUrl(template, params) {
  let url = template;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
}

exports.proxyHandler = async (config, req, res) => {
  try {
    // 拼接 URL（支持路径参数）
    const targetUrl = buildTargetUrl(config.target, req.params);

    // 请求数据
    const data = req.method.toLowerCase() === "get" ? req.query : req.body;

    const result = await request(
      targetUrl,
      config.method,
      data,
      { headers: config.headers || {} }
    );

    res.json(result);
  } catch (error) {
    console.error(`代理接口失败: ${config.path}`, error.message);
    res.status(500).json({ message: "代理请求失败" });
  }
};
