console.log('#8. JavaScript homework example file')

/*
 * #1
 */
function createDomElement(tagName, textContent, container) {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  container.appendChild(element);
  return element;
}

/*
 * #2
 */
function setUserInfoCookie(key, value) {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  const cookieValue = `${encodedKey}=${encodedValue}`;
  
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 10 * 1000); // 10 секунд
  
  document.cookie = `userInfo=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
  
  console.log(`User information saved to cookie: ${key}=${value}`);
}


/*
 * #3
 */
function saveUserInfo(key, value) {
  sessionStorage.setItem(key, value);
  console.log(`Saved ${key}: ${value}`);
}

function getUserInfo(key) {
  const value = sessionStorage.getItem(key);
  console.log(`Retrieved ${key}: ${value}`);
  return value;
}


export { createDomElement, setUserInfoCookie, saveUserInfo, getUserInfo }