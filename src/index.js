export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    const isBrowser = userAgent.includes("Mozilla");

    // 只处理根路径
    if (url.pathname === "/" || url.pathname === "") {
      if (isBrowser) {
        return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
      }

      // TVBox 请求根路径：取 api.json，替换路径后返回
      const apiResponse = await env.ASSETS.fetch(
        new Request(new URL("/iedo/api.json", request.url))
      );
      let jsonText = await apiResponse.text();
      // 把 "./" 替换成 "/iedo/"，让路径与根路径基址兼容
      jsonText = jsonText.replace(/"\.\//g, '"/iedo/');

      return new Response(jsonText, {
        status: 200,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
    }

    // 其他路径（jar、js 等）原样返回静态资源
    return env.ASSETS.fetch(request);
  },
};
