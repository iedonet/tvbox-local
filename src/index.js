export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";

    // 只对根路径做分流
    if (url.pathname === "/" || url.pathname === "") {
      // 浏览器特征：包含 Mozilla
      const isBrowser = userAgent.includes("Mozilla");
      if (isBrowser) {
        return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
      }
      // TVBox（okhttp）等非浏览器：返回 api.json
      return env.ASSETS.fetch(new Request(new URL("/iedo/api.json", request.url)));
    }

    // 其他路径原样返回静态资源
    return env.ASSETS.fetch(request);
  },
};
