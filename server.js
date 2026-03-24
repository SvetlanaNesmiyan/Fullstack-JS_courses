const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { handleRequest } = require('./routeHandlers');
const { generateErrorHTML } = require('./htmlUtils');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('X-Content-Type-Options', 'nosniff');

    let body = '';
    if (method === 'POST') {
      const limit = 1024 * 1024;
      req.on('data', chunk => {
        body += chunk;
        if (body.length > limit) {
          res.writeHead(413, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(generateErrorHTML('Payload Too Large', 'Request entity too large'));
          req.connection.destroy();
        }
      });

      return req.on('end', async () => {
        try {
          const parsedBody = querystring.parse(body);
          const sanitizedBody = {};
          for (const key in parsedBody) {
            sanitizedBody[key] = escapeHtml(parsedBody[key]);
          }
          await handleRequest(req, res, pathname, method, sanitizedBody);
        } catch (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(generateErrorHTML('Internal Server Error', 'Server Error'));
        }
      });
    }

    // For GET and other methods
    await handleRequest(req, res, pathname, method, null);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateErrorHTML('Internal Server Error', 'Server Error'));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function escapeHtml(text) {
  const map = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}