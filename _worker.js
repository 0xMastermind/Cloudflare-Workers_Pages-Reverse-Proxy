export default {
    async fetch(request) {
        // 处理请求体
        async function handleRequestBody(request) {
            if (request.method === "GET" || request.method === "HEAD") {
                return null;
            }
            try {
                return await request.text();
            } catch (error) {
                console.error("Error reading request body:", error);
                return null;
            }
        }

        // 主要的请求处理逻辑
        async function handleRequest(request) {
            let url = new URL(request.url);
            url.hostname = 'www.example.com';
            url.protocol = 'https:';

            let newRequestHeaders = new Headers(request.headers);
            newRequestHeaders.set('Host', url.hostname);
            newRequestHeaders.set('X-Real-IP', request.headers.get('cf-connecting-ip'));
            newRequestHeaders.set('X-Forwarded-For', request.headers.get('cf-ipcountry'));
            newRequestHeaders.set('REMOTE-HOST', request.headers.get('cf-connecting-ip'));
            newRequestHeaders.set('Referer', url.toString());

            let requestBody = await handleRequestBody(request);

            let newRequest = new Request(url, {
                method: request.method,
                headers: newRequestHeaders,
                body: requestBody
            });

            try {
                let response = await fetch(newRequest);

                if (response.headers.get('Content-Type')?.includes('text')) {
                    let text = await response.text();
                    text = text.replace(/www.example.com/g, 'proxy.example.com');

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
        }

        return handleRequest(request);
    }
};
