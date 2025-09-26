// B 站常用 API 所需 headers
function getHeaders(type) {
    // 通用 headers
    const base = {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.bilibili.com/", // 默认通用 Referer
    };

    // 各接口特殊 headers 覆盖
    const specialReferer = {
        user: "https://space.bilibili.com/", // 用户接口需要空间页 Referer
        // 以后其他接口也可以在这里添加
        // danmu: "https://www.bilibili.com/video/", 
    };

    // 如果 type 有特殊 Referer 就覆盖
    return {
        ...base,
        ...(specialReferer[type] ? { Referer: specialReferer[type] } : {}),
    };
}

module.exports = { getHeaders };
