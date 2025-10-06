console.log('#9. JavaScript homework example file')

/*
 * #1
 */
function handleButtonClick(buttonId, message) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', function() {
      console.log(message);
    });
  } else {
    console.error(`Button with id '${buttonId}' not found`);
  }
}


/*
 * #2
 */
function trackMousePosition() {
  document.addEventListener('mousemove', function(event) {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
  });
}


/*
 * #3
 */
function createTestList() {
  document.body.innerHTML = `
    <ul id="testList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    `
}

function setupEventDelegation(selector) {
  const list = document.querySelector(selector);
  if (list) {
    list.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        const itemText = event.target.textContent.trim();
        console.log(`Item clicked: ${itemText}`);
      }
    });
  } else {
    console.error(`Element with selector '${selector}' not found`);
  }
}


export { handleButtonClick, trackMousePosition, setupEventDelegation }