# React use() Hook Demo

Демонстраційний проект, який показує використання хука `use()` в React 19 для отримання даних з Promise.

## Опис проекту

Цей проект демонструє новий хук `use()`, представлений в React 19, який дозволяє отримувати дані з Promise безпосередньо в компоненті. Хук `use()` інтегрується з `Suspense`, що дозволяє відображати fallback-контент під час завантаження даних.

## Функціональність

- Використання хука `use()` для отримання даних з Promise
- Демонстрація роботи з асинхронними запитами
- Інтеграція з Suspense для відображення стану завантаження
- Обробка асинхронних даних у компоненті

## Технології

- React 19.2.0
- Vite 7.2.4
- JavaScript/JSX

## Встановлення

```bash
# Клонуйте репозиторій
git clone <url-репозиторію>
cd my-react-app

# Встановіть залежності
npm install

# Запустіть проект
npm run dev
```

## Запуск

Для запуску development сервера:

```bash
npm run dev
```

Проект буде доступний за адресою `http://localhost:5173`

Для збірки production версії:

```bash
npm run build
```

## Структура проекту

```
my-react-app/
├── src/
│   ├── components/
│   │   └── MessageComponent.jsx  # Компонент з хуком use()
│   ├── App.jsx                   # Основний компонент
│   ├── App.css                   # Стилі
│   └── main.jsx                  # Точка входу
├── package.json
├── vercel.json                   # Конфігурація Vercel
├── netlify.toml                  # Конфігурація Netlify
└── README.md
```

## Деплоймент

### Vercel

1. Встановіть Vercel CLI: `npm i -g vercel`
2. Увійдіть: `vercel login`
3. Задеплоюйте: `vercel`

Або підключіть репозиторій на [Vercel.com](https://vercel.com)

### Netlify

1. Встановіть Netlify CLI: `npm i -g netlify-cli`
2. Задеплоюйте: `netlify deploy`

Або підключіть репозиторій на [Netlify.com](https://netlify.com)

## Як це працює

1. `fetchMessage()` - функція, яка повертає Promise з затримкою в 2 секунди
2. `MessageComponent` - компонент, який використовує хук `use()` для отримання даних
3. `App` - батьківський компонент, який обгортає `MessageComponent` в `Suspense`

## Ліцензія

MIT
