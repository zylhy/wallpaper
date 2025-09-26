const BASE_URL = 'http://localhost:3001/api/';

/**
 * 封装 fetch 请求
 * @param {string} path 接口路径
 * @param {object} options 可选参数
 *    - method: 请求方法，默认 GET
 *    - params: GET 请求的 query 参数
 *    - data: POST/PUT 请求的 body 数据
 *    - headers: 自定义请求头
 * @returns {Promise<any>} 返回解析后的 JSON
 */
async function request(path, options = {}) {
  const {
    method = 'GET',
    params = null,
    data = null,
    headers = {}
  } = options;

  // 构造 URL
  let url = BASE_URL + path;

  // GET 请求拼接 query 参数
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...headers
      }),
      body: ['POST','PUT','PATCH'].includes(method.toUpperCase()) ? JSON.stringify(data) : null
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('请求失败:', error.message);
    throw error; // 可以在调用处 catch
  }
}

export { request };
