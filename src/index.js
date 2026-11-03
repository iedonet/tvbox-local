export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    const isBrowser = userAgent.includes("Mozilla");

    // 只对根路径做分流
    if (url.pathname === "/" || url.pathname === "") {
      if (isBrowser) {
        // 浏览器：返回伪装页面
        return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
      }
      // TVBox 等非浏览器客户端：返回原始 api.json
      return env.ASSETS.fetch(new Request(new URL("/iedo/api.json", request.url)));
    }

    // 其他所有路径（spider.jar、js、py 等）原样返回静态资源
    return env.ASSETS.fetch(request);
  },
};
