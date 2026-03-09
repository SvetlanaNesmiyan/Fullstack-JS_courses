import { useState, useCallback } from 'react'

/**
 * Дочірній компонент кнопки - демонструє проблему з ререндерами
 * Використовуємо React.memo для оптимізації
 */
const MemoizedButton = ({ onClick, children, id }) => {
  console.log(`🎨 Рендер кнопки: ${children} (id: ${id})`)
  return (
    <button className="demo-button" onClick={() => onClick(id)}>
      {children}
    </button>
  )
}

/**
 * Компонент для демонстрації useCallback
 * Показує різницю між передачею функцій з мемоізацією та без неї
 */
function CallbackDemo() {
  const [counter, setCounter] = useState(0)
  const [buttonClicks, setButtonClicks] = useState({})
  const [renderCount, setRenderCount] = useState(0)

  // Збільшуємо лічильник рендерів
  setRenderCount(prev => prev + 1)

  // ❌ НЕОПТИМІЗОВАНА версія - нова функція при кожному рендері
  const handleClickWithoutCallback = (id) => {
    console.log(`❌ Клік без useCallback: ${id}`)
    setButtonClicks(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  // ✅ Оптимізована версія з useCallback
  // Функція мемоізується і не змінюється між рендерами
  const handleClickWithCallback = useCallback((id) => {
    console.log(`✅ Клік з useCallback: ${id}`)
    setButtonClicks(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }, []) // Порожній масив залежностей - функція створюється один раз

  // Інша функція для оновлення лічильника
  const incrementCounter = useCallback(() => {
    setCounter(prev => prev + 1)
  }, [])

  return (
    <div className="demo-card">
      <h3>🔗 Демонстрація useCallback</h3>
      <p className="description">
        Мемоізація колбек-функцій. Коли функція передається дочірньому компоненту,
        без useCallback вона створюється знову при кожному рендері батька,
        викликаючи непотрібні рендери дитини.
      </p>

      <div className="counter-display">
        <p>Лічильник батька: <strong>{counter}</strong></p>
        <p>Кількість рендерів компонента: <strong>{renderCount}</strong></p>
      </div>

      <div className="button-group">
        <button className="action-button" onClick={incrementCounter}>
          Збільшити лічильник (батько)
        </button>
      </div>

      <div className="buttons-comparison">
        <div className="button-section without-callback">
          <h4>❌ Без useCallback</h4>
          <p>Кожне натискання на батька викликає ререндер кнопки</p>
          <MemoizedButton 
            onClick={handleClickWithoutCallback} 
            id="without"
          >
            Кнопка без useCallback
          </MemoizedButton>
          <p className="click-count">Кліків: {buttonClicks.without || 0}</p>
        </div>

        <div className="button-section with-callback">
          <h4>✅ З useCallback</h4>
          <p>Кнопка НЕ ререндериться при зміні батька</p>
          <MemoizedButton 
            onClick={handleClickWithCallback} 
            id="with"
          >
            Кнопка з useCallback
          </MemoizedButton>
          <p className="click-count">Кліків: {buttonClicks.with || 0}</p>
        </div>
      </div>

      <div className="explanation">
        <p>
          <strong>Пояснення:</strong> Натискайте "Збільшити лічильник" і спостерігайте 
          за консоллю. Кнопка "з useCallback" не ререндериться (бачите лише один раз "🎨 Рендер кнопки"),
          тоді як кнопка "без useCallback" ререндериться при кожному кліку на батька.
        </p>
      </div>
    </div>
  )
}

export default CallbackDemo
