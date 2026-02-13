import { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Помилка при завантаженні даних');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <div>Завантаження даних...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <div>
      <h2>Отримані дані:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
