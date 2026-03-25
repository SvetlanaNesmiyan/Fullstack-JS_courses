import http from 'http';
import url from 'url';
import { parse as qsParse, stringify as qsStringify } from './querystring.mjs';

// Функція для генерації HTML сторінки
const createHtmlResponse = (title, heading, content) => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
</head>
<body>
  <h1>${heading}</h1>
  ${content}
</body>
</html>`;
};

// Створення HTTP сервера
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Безпечні заголовки
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Маршрути
  if (method === 'GET') {
    switch (pathname) {
      case '/':
        res.statusCode = 200;
        res.end(createHtmlResponse('Home', 'Home', '<p>Welcome to the Home Page</p>'));
        break;
        
      case '/about':
        res.statusCode = 200;
        res.end(createHtmlResponse('About', 'About', '<p>Learn more about us</p>'));
        break;
        
      case '/contact':
        res.statusCode = 200;
        res.end(createHtmlResponse('Contact', 'Contact', '<p>Get in touch</p>'));
        break;
        
      default:
        res.statusCode = 404;
        res.end(createHtmlResponse('404', 'Page Not Found', '<p>The page you requested does not exist.</p>'));
        break;
    }
  } else if (method === 'POST') {
    if (pathname === '/submit') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        let data;
        try {
          data = qsParse(body);
        } catch (error) {
          res.statusCode = 500;
          res.end(createHtmlResponse('500 Error', 'Error 500', '<p>Server Error</p>'));
          return;
        }
        
        const name = data.name || '';
        const email = data.email || '';
        
        // Валідація
        if (!name || !email) {
          res.statusCode = 400;
          res.end(createHtmlResponse('Invalid Data', 'Invalid form data', '<p>Please fill in all fields.</p>'));
          return;
        }
        
        res.statusCode = 200;
        res.end(createHtmlResponse('Form Submitted', 'Form Submitted', `<p>Name: ${name}</p><p>Email: ${email}</p>`));
      });
    } else {
      res.statusCode = 404;
      res.end(createHtmlResponse('404', 'Page Not Found', '<p>The page you requested does not exist.</p>'));
    }
  } else if (method === 'PUT') {
    // PUT метод не дозволений для головної сторінки
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, POST');
    res.end(createHtmlResponse('405', 'Method Not Allowed', '<p>The PUT method is not allowed on this route.</p>'));
  } else {
    res.statusCode = 404;
    res.end(createHtmlResponse('404', 'Page Not Found', '<p>The page you requested does not exist.</p>'));
  }
});

// Експорт сервера для тестів
export { server };

// Запуск сервера, якщо файл виконується напряму
const PORT = 3000;
if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}