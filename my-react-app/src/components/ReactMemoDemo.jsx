import { useState, memo } from 'react'

/**
 * ❌ Звичайний компонент БЕЗ React.memo
 * Буде ререндеритися при кожному рендері батька
 */
const RegularListItem = ({ item, onSelect }) => {
  console.log(`❌ Рендер RegularListItem: ${item.name}`)
  return (
    <div className="list-item" onClick={() => onSelect(item)}>
      <span>{item.name}</span>
      <span className="item-id">ID: {item.id}</span>
    </div>
  )
}

/**
 * ✅ Оптимізований компонент З React.memo
 * Буде ререндеритися тільки при зміні пропсів
 */
const MemoizedListItem = memo(({ item, onSelect }) => {
  console.log(`✅ Рендер MemoizedListItem: ${item.name}`)
  return (
    <div className="list-item" onClick={() => onSelect(item)}>
      <span>{item.name}</span>
      <span className="item-id">ID: {item.id}</span>
    </div>
  )
})

/**
 * Компонент для демонстрації React.memo
 * Показує різницю між звичайним та мемоізованим рендерингом списків
 */
function ReactMemoDemo() {
  const [items] = useState([
    { id: 1, name: 'Елемент 1' },
    { id: 2, name: 'Елемент 2' },
    { id: 3, name: 'Елемент 3' },
    { id: 4, name: 'Елемент 4' },
    { id: 5, name: 'Елемент 5' },
  ])
  
  const [selectedItem, setSelectedItem] = useState(null)
  const [parentCounter, setParentCounter] = useState(0)
  const [renderCount, setRenderCount] = useState(0)

  // Лічильник рендерів
  setRenderCount(prev => prev + 1)

  // Функція вибору елемента
  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  return (
    <div className="demo-card">
      <h3>🎯 Демонстрація React.memo</h3>
      <p className="description">
        React.memo - компонент вищого порядку, який мемоізує компонент.
        Дочірній компонент ререндериться тільки коли його пропси змінюються.
      </p>

      <div className="counter-display">
        <p>Лічильник батька: <strong>{parentCounter}</strong></p>
        <p>Кількість рендерів компонента: <strong>{renderCount}</strong></p>
      </div>

      <div className="button-group">
        <button className="action-button" onClick={() => setParentCounter(prev => prev + 1)}>
          Оновити батька (+1)
        </button>
      </div>

      <div className="lists-comparison">
        <div className="list-section">
          <h4>❌ Без React.memo</h4>
          <p className="list-description">
            Всі елементи ререндеряться при кожному кліку на батька
          </p>
          <div className="list">
            {items.map(item => (
              <RegularListItem 
                key={item.id} 
                item={item} 
                onSelect={handleSelect} 
              />
            ))}
          </div>
        </div>

        <div className="list-section">
          <h4>✅ З React.memo</h4>
          <p className="list-description">
            Елементи НЕ ререндеряться, бо пропси не змінилися
          </p>
          <div className="list">
            {items.map(item => (
              <MemoizedListItem 
                key={item.id} 
                item={item} 
                onSelect={handleSelect} 
              />
            ))}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="selected-info">
          <p>Вибрано: <strong>{selectedItem.name}</strong></p>
        </div>
      )}

      <div className="explanation">
        <p>
          <strong>Пояснення:</strong> Натискайте "Оновити батька" і дивіться в консоль.
          Список "з React.memo" показує значно менше рендерів, тому що пропси (item, onSelect)
          не змінилися. onSelect створюється знову при кожному рендері, але для повної
          оптимізації потрібно також використовувати useCallback!
        </p>
      </div>
    </div>
  )
}

export default ReactMemoDemo
