# My React App

React додаток, створений за допомогою Vite.

## Структура проекту

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── Button.jsx    # Компонент кнопки
│   │   └── Input.jsx     # Компонент вводу
│   ├── App.jsx           # Основний компонент
│   ├── main.jsx          # Точка входу
│   └── App.css           # Стилі
├── index.html
├── package.json
└── vite.config.js
```

## Встановлення та запуск

1. Встановлення залежностей:
```bash
npm install
```

2. Запуск dev сервера:
```bash
npm run dev
```

3. Збірка для продакшену:
```bash
npm run build
```

## Компоненти

### Button

Компонент для відображення кнопки.

**Props:**
- `text` (рядок) - текст кнопки
- `type` (рядок) - тип кнопки: `button` або `submit` (за замовчуванням `button`)
- `onClick` (функція) - обробник кліку

**Приклад використання:**
```jsx
<Button
  text="Натисни мене"
  type="button"
  onClick={handleClick}
/>
```

### Input

Компонент для вводу тексту.

**Props:**
- `placeholder` (рядок) - плейсхолдер поля вводу
- `type` (рядок) - тип поля: `text` або `password` (за замовчуванням `text`)
- `onChange` (функція) - обробник зміни значення
- `value` (рядок) - поточне значення поля

**Приклад використання:**
```jsx
<Input
  placeholder="Введіть текст..."
  type="text"
  value={inputValue}
  onChange={handleChange}
/>
```

## Демо

Посилання на демо-версію: [Vercel] або [Netlify]

## Ліцензія

ISC
