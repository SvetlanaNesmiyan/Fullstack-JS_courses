import { useState } from 'react'
import FibonacciCalculator from './FibonacciCalculator'
import CallbackDemo from './CallbackDemo'
import ReactMemoDemo from './ReactMemoDemo'
import UserProfile from './UserProfile'

/**
 * Головний компонент додатку - Демонстрація мемоізації в React
 * Включає інтерактивні приклади useMemo, useCallback та React.memo
 */
function DemoApp() {
  const [activeDemo, setActiveDemo] = useState('intro')

  const demos = [
    { id: 'intro', label: 'Вступ' },
    { id: 'useMemo', label: 'useMemo' },
    { id: 'useCallback', label: 'useCallback' },
    { id: 'React.memo', label: 'React.memo' },
    { id: 'userProfile', label: 'UserProfile API' },
  ]

  return (
    <div className="demo-app">
      <header className="app-header">
        <h1>🚀 Демонстрація мемоізації в React</h1>
        <p className="subtitle">
          Інтерактивні приклади використання useMemo, useCallback та React.memo
        </p>
      </header>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`nav-button ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-content">
        {activeDemo === 'intro' && (
          <div className="intro-section">
            <h2>Ласкаво просимо до демонстрації мемоізації!</h2>
            
            <div className="intro-cards">
              <div className="intro-card">
                <h3>📊 useMemo</h3>
                <p>
                  Мемоізує результат обчислень. Корисно для важких обчислень,
                  які не потрібно перевиконувати при кожному рендері.
                </p>
                <button 
                  className="learn-more"
                  onClick={() => setActiveDemo('useMemo')}
                >
                  Спробувати →
                </button>
              </div>

              <div className="intro-card">
                <h3>🔗 useCallback</h3>
                <p>
                  Мемоізує функцію-колбек. Запобігає створенню нових функцій
                  при кожному рендері, що важливо для передачі в дочірні компоненти.
                </p>
                <button 
                  className="learn-more"
                  onClick={() => setActiveDemo('useCallback')}
                >
                  Спробувати →
                </button>
              </div>

              <div className="intro-card">
                <h3>🎯 React.memo</h3>
                <p>
                  Мемоізує цілий компонент. Компонент ререндериться тільки
                  коли його пропси змінюються.
                </p>
                <button 
                  className="learn-more"
                  onClick={() => setActiveDemo('React.memo')}
                >
                  Спробувати →
                </button>
              </div>
            </div>

            <div className="tips-section">
              <h3>💡 Поради щодо мемоізації:</h3>
              <ul>
                <li>Не використовуйте мемоізацію скрізь - це має свою ціну</li>
                <li>Мемоізуйте тільки "дорогі" обчислення та компоненти</li>
                <li>Використовуйте React DevTools Profiler для профілювання</li>
                <li>Спочатку оптимізуйте алгоритми, потім мемоізацію</li>
              </ul>
            </div>
          </div>
        )}

        {activeDemo === 'useMemo' && <FibonacciCalculator />}
        
        {activeDemo === 'useCallback' && <CallbackDemo />}
        
        {activeDemo === 'React.memo' && <ReactMemoDemo />}
        
        {activeDemo === 'userProfile' && <UserProfile />}
      </main>

      <footer className="app-footer">
        <p>
          Відкрийте консоль браузера (F12) щоб бачити логи рендерингу!
        </p>
      </footer>
    </div>
  )
}

export default DemoApp
