import { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="component-container">
        <h2>User Data Fetcher</h2>
        <div className="loading">
          <p>Loading users...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-container">
        <h2>User Data Fetcher</h2>
        <div className="error">
          <p>Error loading users: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="component-container">
      <h2>User Data Fetcher</h2>
      <p className="data-info">
        Fetched {users.length} users from JSONPlaceholder API
      </p>
      <div className="user-list">
        {users.slice(0, 5).map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
      {users.length > 5 && (
        <p className="show-more">...and {users.length - 5} more users</p>
      )}
    </div>
  );
}
