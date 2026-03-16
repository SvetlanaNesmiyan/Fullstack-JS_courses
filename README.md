# React Demo App - Демонстрація бібліотек

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)
![ViewDemo]**https://my-react-app-ten-sigma.vercel.app**

## 📋 Опис проекту

Цей проект є демонстраційним React-додатком, створеним для демонстрації інтеграції та використання популярних React-бібліотек:

- **React Icons** - бібліотека для іконок
- **React Toastify** - система сповіщень
- **React Idle Timer** - відстеження бездіяльності користувача
- **Recharts** (додатково) - бібліотека для побудови графіків
- **React Color** (додатково) - вибір кольорів

## 🚀 Функціональність

### Дашборд
- Статистичні картки з іконками
- Інтерактивні сповіщення (success, warning, info)
- Анімований інтерфейс

### Вибір кольору
- Три типи пікерів: Chrome, Sketch, Twitter
- Копіювання кольору в буфер обміну
- Популярні кольори

### Графіки
- Лінійний графік
- Стовпчиковий графік
- Графік областей
- Кругова діаграма

### Таймер бездіяльності
- Відстеження активності користувача
- Сповіщення при бездіяльності
- Відображення часу до спрацювання

## 🛠️ Технології

- **React 18** - основна бібліотека
- **Vite** - збірка проекту
- **React Icons** - іконки
- **React Toastify** - toast-сповіщення
- **React Idle Timer** - таймер бездіяльності
- **Recharts** - графіки
- **React Color** - вибір кольору

## 📦 Встановлення

```bash
# Клонування репозиторію
git clone <repository-url>

# Перехід до директорії проекту
cd my-react-app

# Встановлення залежностей
npm install

# Запуск в режимі розробки
npm run dev
```

## 🎯 Запуск проекту

```bash
npm run dev
```

Після запуску проект буде доступний за адресою: `http://localhost:5173`

## 📁 Структура проекту

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Навігаційна панель
│   │   ├── Dashboard.jsx        # Головна сторінка
│   │   ├── ColorPickerComponent.jsx  # Вибір кольору
│   │   ├── ChartComponent.jsx   # Графіки
│   │   └── IdleTimerComponent.jsx   # Таймер бездіяльності
│   ├── App.jsx                  # Головний компонент
│   ├── App.css                  # Стилі
│   ├── index.css                # Базові стилі
│   └── main.jsx                 # Точка входу
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Конфігурація

### React Toastify
- Різні типи сповіщень: success, error, warning, info
- Автозакриття через 3 секунди
- Налаштування позиції

### React Idle Timer
- Таймаут: 10 секунд
- Throttle: 500ms
- Події: mousemove, keydown, wheel, touchstart

## 📱 Адаптивність

Проект повністю адаптивний та коректно відображається на:
- Мобільних пристроях
- Планшетах
- Десктопах

## 🤝 Автор

Створено як демонстраційний проект для вивчення React-бібліотек.

## 📄 Ліцензія

MIT License
