import { useState, useEffect } from 'react';
import StatefulComponent from './components/StatefulComponent';
import StatelessComponent from './components/StatelessComponent';
import ClassComponent from './components/ClassComponent';
import './App.css';

function App() {
  // Дані для StatelessComponent
  const [selectedItem, setSelectedItem] = useState(null);
  const [items] = useState(['Елемент 1', 'Елемент 2', 'Елемент 3', 'Елемент 4']);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    alert(`Ви вибрали: ${item}`);
  };

  // Ефект для логування при з selectedItem
  useEffect(() => {
    if (selectedItem) {
      console.log(`Вибрано елемент: ${selectedItem}`);
    }
  }, [selectedItem]);

  return (
    <div className="app">
      <h1>React Components Demo</h1>
      <p className="subtitle">
        Демонстрація різних типів компонентів: Stateful, Stateless та Class
      </p>

      <div className="components-grid">
        <section className="component-section">
          <StatefulComponent />
        </section>

        <section className="component-section">
          <StatelessComponent
            title="Інформація"
            description="Ц приклад statelessе компонента, який отримує дані через пропси та відображає їх."
            items={items}
            onItemClick={handleItemClick}
          />
        </section>

        <section className="component-section">
          <ClassComponent title="Лічильник" />
        </section>
      </div>

      {selectedItem && (
        <div className="selected-info">
          <p>Останній вибраний елемент: <strong>{selectedItem}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
