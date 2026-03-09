import { useState, useMemo } from 'react'

/**
 * Компонент для демонстрації useMemo
 * Показує різницю між обчисленнями з мемоізацією та без неї
 */
function FibonacciCalculator() {
  const [number, setNumber] = useState(10)
  const [withoutMemoCount, setWithoutMemoCount] = useState(0)
  const [withMemoCount, setWithMemoCount] = useState(0)

  // НЕОПТИМІЗОВАНА версія - обчислюється при кожному рендері
  const fibonacciWithoutMemo = (n) => {
    setWithoutMemoCount(prev => prev + 1)
    console.log('▶ Обчислення fibonacci БЕЗ мемоізації:', n)
    
    if (n <= 1) return n
    return fibonacciWithoutMemo(n - 1) + fibonacciWithoutMemo(n - 2)
  }

  // Оптимізована версія з useMemo
  const fibonacciWithMemo = useMemo(() => {
    setWithMemoCount(prev => prev + 1)
    console.log('▶ Обчислення fibonacci З мемоізацією:', number)
    
    const calculate = (n) => {
      if (n <= 1) return n
      return calculate(n - 1) + calculate(n - 2)
    }
    return calculate(number)
  }, [number]) // Переобчислюється тільки коли number змінюється

  // Використовуємо результат без мемоізації для демонстрації
  const resultWithoutMemo = fibonacciWithoutMemo(number)

  const handleNumberChange = (newNumber) => {
    setNumber(newNumber)
  }

  return (
    <div className="demo-card">
      <h3>📊 Демонстрація useMemo</h3>
      <p className="description">
        Мемоізація обчислень чисел Фібоначчі. Використовуйте useMemo, 
        щоб уникнути непотрібних перерахунків при кожному рендері.
      </p>
      
      <div className="input-group">
        <label htmlFor="fib-number">Введіть число (для швидкості рекомендуємо 10-35):</label>
        <input
          id="fib-number"
          type="number"
          value={number}
          onChange={(e) => handleNumberChange(Number(e.target.value))}
          min="0"
          max="40"
        />
      </div>

      <div className="results">
        <div className="result-box without-memo">
          <h4>❌ Без useMemo</h4>
          <p className="result">Результат: {resultWithoutMemo}</p>
          <p className="count">Кількість обчислень: {withoutMemoCount}</p>
        </div>

        <div className="result-box with-memo">
          <h4>✅ З useMemo</h4>
          <p className="result">Результат: {fibonacciWithMemo}</p>
          <p className="count">Кількість обчислень: {withMemoCount}</p>
        </div>
      </div>

      <div className="explanation">
        <p>
          <strong>Пояснення:</strong> Коли ви змінюєте число, обидва результати переобчислюються. 
          Але при інших рендерах (наприклад, зміна стану в іншому компоненті), 
          версія з useMemo НЕ буде переобчислюватися, якщо залежності не змінилися.
        </p>
      </div>
    </div>
  )
}

export default FibonacciCalculator
