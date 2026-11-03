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
      return env.ASSETS.fetch(new Request(new URL("/iedo/api.json", request.url)));
    }

    // 其他所有路径（包括 spider.jar、js 文件、py 文件）直接交给静态资源
    return env.ASSETS.fetch(request);
  },
};
