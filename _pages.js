export default {
  async fetch(request, env) {
    // 处理请求体
    let requestBody = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        requestBody = await request.text();
      } catch (error) {
        console.error("Error reading request body:", error);
      }
    }

    // 构建新的请求 URL
    let url = new URL(request.url);
    url.hostname = 'example.com';
    url.protocol = 'https:';

    // 构建新的请求头
    let newRequestHeaders = new Headers(request.headers);
    newRequestHeaders.set('Host', url.hostname);
    newRequestHeaders.set('X-Real-IP', request.headers.get('cf-connecting-ip'));
    newRequestHeaders.set('X-Forwarded-For', request.headers.get('cf-ipcountry'));
    newRequestHeaders.set('REMOTE-HOST', request.headers.get('cf-connecting-ip'));
    newRequestHeaders.set('Referer', url.toString());

    // 创建新的请求
    let newRequest = new Request(url, {
      method: request.method,
      headers: newRequestHeaders,
      body: requestBody
    });

    // 发送请求并处理响应
    try {
      let response = await fetch(newRequest);

      // 对文本内容进行处理
      if (response.headers.get('Content-Type')?.includes('text')) {
        let text = await response.text();
        text = text.replace(/hostloc.com/g, 'example.com');

        return new Response(text, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }

      return response;
    } catch (error) {
      console.error("Error fetching new request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
