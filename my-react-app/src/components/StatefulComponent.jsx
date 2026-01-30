import { useState } from 'react';

/**
 * StatefulComponent - Компонент зі станом (stateful)
 * Використовує хук useState для управління лічильником
 */
function StatefulComponent() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="stateful-component">
      <h2>Stateful Component (Зі станом)</h2>
      
      <div className="counter-section">
        <p>Лічильник: <strong>{count}</strong></p>
        <div className="button-group">
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
        </div>
      </div>

      <div className="input-section">
        <p>Текст: <strong>{inputValue || '(порожньо)'}</strong></p>
        <input
          type="text"
          placeholder="Введіть текст..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default StatefulComponent;
