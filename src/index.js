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

      // TVBox 等非浏览器客户端：取 api.json，替换相对路径后返回
      const apiResponse = await env.ASSETS.fetch(
        new Request(new URL("/iedo/api.json", request.url))
      );
      let jsonText = await apiResponse.text();

      // 把 "./" 替换成完整绝对 URL，消除路径解析歧义
      jsonText = jsonText.replace(/"\.\//g, '"https://fun.iedo.vip/iedo/');

      return new Response(jsonText, {
        status: 200,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
    }

    // 其他所有路径（spider.jar、js、py 等）原样返回静态资源
    return env.ASSETS.fetch(request);
  },
};
