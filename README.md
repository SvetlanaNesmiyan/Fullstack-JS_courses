# React Data Fetcher

Простий React додаток для демонстрації отримання даних з API з використанням бібліотеки axios та хуків React.

## Опис проекту

Цей проект демонструє:
- Використання хука `useEffect` для асинхронних запитів до API
- Використання бібліотеки `axios` для HTTP-запитів
- Обробку станів завантаження (loading) та помилок (error)
- Рефетч даних при зміні URL (використання залежностей у useEffect)

## Демо-версія

Проект розгорнуто на Vercel: **https://my-react-app-ten-sigma.vercel.app**

## Структура проекту

```
my-react-app/
├── src/
│ ├── components/
│ │ └── DataFetcher.jsx  # Компонент для отримання та відображення даних
│ ├── App.jsx            # Основний компонент з вибором URL
│ ├── App.css            # Стилі
│ └── main.jsx           # Точка входу
├── package.json
└── README.md
```

## Встановлення

```bash
# Клонуйте репозиторій
git clone <repository-url>
cd my-react-app

# Встановіть залежності
npm install

# Запустіть додаток
npm run dev
```

## Використання

Додаток надає випадаюче меню для вибору різних API endpoints:
- Пост #1 (jsonplaceholder.typicode.com/posts/1)
- Пост #2 (jsonplaceholder.typicode.com/posts/2)
- Користувач #1 (jsonplaceholder.typicode.com/users/1)
- Користувач #2 (jsonplaceholder.typicode.com/users/2)

При зміні вибору компонент автоматично робить новий запит до API.

## Технології

- React 18
- Vite
- Axios
- ESLint

## Ліцензія

MIT
