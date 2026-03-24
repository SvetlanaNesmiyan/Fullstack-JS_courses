function generateHomePage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Home</title>
</head>
<body>
<h1>Home</h1>
<p>Welcome to the Home Page</p>
</body>
</html>
`.trim();
}

function generateAboutPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>About</title>
</head>
<body>
<h1>About</h1>
<p>Learn more about us</p>
</body>
</html>
`.trim();
}

function generateContactPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Contact</title>
</head>
<body>
<h1>Contact</h1>
<p>Get in touch</p>
</body>
</html>
`.trim();
}

function generateFormSubmitPage(name, email) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Form Submitted</title>
</head>
<body>
<h1>Form Submitted</h1>
<p>Name: ${name}</p>
<p>Email: ${email}</p>
</body>
</html>
`.trim();
}

function generateErrorHTML(title, message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
</head>
<body>
<h1>${title}</h1>
<p>${message}</p>
</body>
</html>
`.trim();
}

module.exports = {
  generateHomePage,
  generateAboutPage,
  generateContactPage,
  generateFormSubmitPage,
  generateErrorHTML
};