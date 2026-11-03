export default {
  async fetch(request, env) {
    const userAgent = request.headers.get("User-Agent") || "";
    // TVBox 客户端通常带 okhttp 标识，浏览器带 Mozilla
    const isBrowser = userAgent.includes("Mozilla");

    if (isBrowser) {
      // 浏览器：返回 public/index.html 那个伪装页面
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
    }

    // 非浏览器（大概率是 TVBox）：返回真正的 api.json
    return env.ASSETS.fetch(new Request(new URL("/iedo/api.json", request.url)));
  },
};
