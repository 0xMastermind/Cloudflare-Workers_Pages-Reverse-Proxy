# Cloudflare-Workers_Pages-Reverse-Proxy
Enhancing Web Page Accessibility: Leveraging Cloudflare Workers & Pages for Reverse Proxy Functionality.
提升网页访问性：利用 Cloudflare Workers 和 Pages 实现反向代理功能。

# 1. Create a worker & Pages
From the root of the Cloudflare dashboard, go to "Workers & Pages" > "Overview" > "Create application" > "Create Worker". At this point, you can either keep the random worker name or choose your own. Click "Deploy" once done.

# 2. Configure the worker to act as a proxy
Click "Edit code" once the new worker has been saved following "Deploy". (And if you're already on the worker page, click "Quick edit".) You should now be seeing a code editor for the worker. Just replace all the existing content with this proxying code:
https://github.com/0xMastermind/Cloudflare-Workers-Reverse-Proxy/blob/main/_worker.js

# 3. Use a custom domain for the worker
This step is optional, but highly recommended. To use your own domain instead of the basic *.workers.dev one, go to the worker page (by exiting the code editor, if you're still in it) and there click "View" under "Custom Domains". Click "Add Custom Domain", type in a subdomain, and save with "Add Custom Domain". The subdomain can be anything, even pineapple.yourdomain.com – just remember to avoid terms like "tracking" or "analytics", as they may be blanket-blocked.
