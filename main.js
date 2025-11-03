console.log('#14. JavaScript homework file');

/*
 * #1
 */
async function getData(segment) {
  try {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const url = `${baseUrl}${segment}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`HTTP Error: ${response.status}`);
      return response.status;
    }
    
    const data = await response.json();
    console.log('GET Data:', data);
    return data;
    
  } catch (error) {
    console.log('Error during GET request:', error.message);
    return error.message;
  }
}

/*
 * #2
 */
async function postData(segment, data) {
  try {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const url = `${baseUrl}${segment}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorMessage = `HTTP Error: ${response.status}`;
      console.log(errorMessage);
      return errorMessage;
    }
    
    const responseData = await response.json();
    console.log('POST Response:', responseData);
    return responseData;
    
  } catch (error) {
    console.log('Error during POST request:', error.message);
    return error.message;
  }
}

/*
 * #3
 */
async function putData(id, data) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorMessage = `HTTP Error: ${response.status}`;
      console.log(errorMessage);
      return errorMessage;
    }
    
    const responseData = await response.json();
    console.log('PUT Response:', responseData);
    return responseData;
    
  } catch (error) {
    console.log('Error during PUT request:', error.message);
    return error.message;
  }
}

/*
 * #4
 */
async function patchData(id, data) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorMessage = `HTTP Error: ${response.status}`;
      console.log(errorMessage);
      return errorMessage;
    }
    
    const responseData = await response.json();
    console.log('PATCH Response:', responseData);
    return responseData;
    
  } catch (error) {
    console.log('Error during PATCH request:', error.message);
    return error.message;
  }
}

/*
 * #5
 */
async function deleteData(id) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    const response = await fetch(url, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log(`Post with id ${id} has been successfully deleted.`);
      return true;
    } else {
      console.log(`Failed to delete post with id ${id}. Status: ${response.status}`);
      return response.status;
    }
    
  } catch (error) {
    console.log(`Error during deletion: ${error.message}`);
    return error.message;
  }
}

async function examples() {
  console.log('=== GET Example ===');
  await getData('/posts/1');
  
  console.log('\n=== POST Example ===');
  await postData('/posts', {
    title: 'New Post',
    body: 'This is a new post',
    userId: 1
  });
  
  console.log('\n=== PUT Example ===');
  await putData(1, {
    id: 1,
    title: 'Updated Post',
    body: 'This post has been updated',
    userId: 1
  });
  
  console.log('\n=== PATCH Example ===');
  await patchData(1, {
    title: 'Partially Updated Post'
  });
  
  console.log('\n=== DELETE Example ===');
  await deleteData(1);
}

examples();

export { getData, postData, putData, patchData, deleteData };