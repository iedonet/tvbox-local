export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    const isBrowser = userAgent.includes("Mozilla");

    // 只对根路径做分流
    if (url.pathname === "/" || url.pathname === "") {
      if (isBrowser) {
        return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
      }
      // TVBox 请求根路径时，302 重定向到 api.json 的完整地址
      return Response.redirect(new URL("/iedo/api.json", request.url).toString(), 302);
    }

    // 其他所有路径（spider.jar、js、py 等）直接交给静态资源
    return env.ASSETS.fetch(request);
  },
};
