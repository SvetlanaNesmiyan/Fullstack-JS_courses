console.log('#11. JavaScript homework example file')

/*
 * #1
 */

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

console.log(isValidEmail('example@example.com')) 
console.log(isValidEmail('invalid-email'))      

/*
 * #2
 */

function isValidUrl(url) {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return urlRegex.test(url);
}

console.log(isValidUrl('https://www.example.com')) 
console.log(isValidUrl('invalid-url'))          

export { isValidEmail, isValidUrl }