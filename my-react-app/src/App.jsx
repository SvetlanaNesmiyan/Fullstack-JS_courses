import { useState } from 'react';
import DataFetcher from './components/DataFetcher';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');

  return (
    <div className="app">
      <h1>React Data Fetcher</h1>
      
      <div className="url-selector">
        <label htmlFor="url-select">Оберіть API endpoint: </label>
        <select 
          id="url-select"
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
        >
          <option value="https://jsonplaceholder.typicode.com/posts/1">
            Пост #1
          </option>
          <option value="https://jsonplaceholder.typicode.com/posts/2">
            Пост #2
          </option>
          <option value="https://jsonplaceholder.typicode.com/users/1">
            Користувач #1
          </option>
          <option value="https://jsonplaceholder.typicode.com/users/2">
            Користувач #2
          </option>
        </select>
      </div>

      <DataFetcher url={url} />
    </div>
  );
}

export default App;
