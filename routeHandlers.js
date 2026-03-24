const { generateHomePage, generateAboutPage, generateContactPage, generateFormSubmitPage, generateErrorHTML } = require('./htmlUtils');

async function handleRequest(req, res, pathname, method, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (method === 'GET') {
    switch (pathname) {
      case '/':
        const homeHTML = generateHomePage();
        res.writeHead(200);
        res.end(homeHTML);
        break;
      case '/about':
        const aboutHTML = generateAboutPage();
        res.writeHead(200);
        res.end(aboutHTML);
        break;
      case '/contact':
        const contactHTML = generateContactPage();
        res.writeHead(200);
        res.end(contactHTML);
        break;
      default:
        const notFoundHTML = generateErrorHTML('404 Not Found', 'Page Not Found');
        res.writeHead(404);
        res.end(notFoundHTML);
        break;
    }
  } else if (method === 'POST' && pathname === '/submit') {
    const { name, email } = body;
    if (!name || !email || name.trim() === '' || email.trim() === '') {
      const badRequestHTML = generateErrorHTML('400 Bad Request', 'Invalid form data');
      res.writeHead(400);
      res.end(badRequestHTML);
      return;
    }

    const submitHTML = generateFormSubmitPage(name, email);
    res.writeHead(200);
    res.end(submitHTML);
  } else {
    const notFoundHTML = generateErrorHTML('404 Not Found', 'Page Not Found');
    res.writeHead(404);
    res.end(notFoundHTML);
  }
}

module.exports = { handleRequest };