# Express Server з MVC та Middleware

Express.js сервер з використанням MVC архітектури та мідлварів для логування, аутентифікації, валідації та контролю доступу.

## Опис

Цей проект реалізує Express.js сервер з повною MVC архітектурою, включаючи:
- Мідлвари для логування запитів
- Мідлвари для аутентифікації користувачів
- Мідлвари для валідації даних
- Мідлвари для перевірки прав доступу до статей

## Технології

- Node.js
- Express.js
- ES Modules

## Структура проекту

```
├── package.json              # Конфігурація проекту
├── README.md                 # Документація
├── .gitignore               # Git ігнорування
├── src/
│   ├── server.js            # Основний файл Express сервера
│   ├── native-http/
│   │   ├── server.mjs      # HTTP-сервер на нативному http модулі
│   │   └── querystring.mjs # Модуль-реекспорт querystring
│   ├── middleware/
│   │   ├── logger.mjs       # Мідлвар логування
│   │   ├── auth.mjs         # Мідлвар аутентифікації
│   │   ├── validation.mjs   # Мідлвар валідації
│   │   └── accessControl.mjs # Мідлвар контролю доступу
│   ├── controllers/
│   │   ├── userController.mjs    # Контролер користувачів
│   │   └── articleController.mjs # Контролер статей
│   └── routes/
│       ├── userRoutes.mjs    # Маршрути користувачів
│       └── articleRoutes.mjs # Маршрути статей
```

## Встановлення

1. Клонуйте репозиторій
2. Встановіть залежності:
   ```bash
   npm install
   ```

## Запуск

### Express Server (основний)
```bash
npm start
```

Сервер буде доступний за адресою: http://localhost:3000

### Native HTTP Server (альтернативний)
```bash
node src/native-http/server.mjs
```

## Доступні маршрути

### Головна сторінка
- **GET /** - повертає текст "Home Page"

### Маршрути користувачів (/users)
Усі маршрути /users використовують мідлвар аутентифікації (basicAuth):
- **GET /users** - отримати всіх користувачів
- **GET /users/:userId** - отримати користувача за ID
- **POST /users** - створити нового користувача (з валідацією)
- **PUT /users/:userId** - оновити користувача
- **DELETE /users/:userId** - видалити користувача

### Маршрути статей (/articles)
Усі маршрути /articles використовують мідлвар контролю доступу:
- **GET /articles** - отримати всі статті
- **GET /articles/:articleId** - отримати статтю за ID
- **POST /articles** - створити нову статтю
- **PUT /articles/:articleId** - оновити статтю
- **DELETE /articles/:articleId** - видалити статтю

### Native HTTP Server Маршрути (src/native-http/server.mjs)
- **GET /** - головна сторінка
- **GET /about** - сторінка "Про нас"
- **GET /contact** - сторінка контактів
- **POST /submit** - обробка форми підписки

## Мідлвари

### 1. Логування ([`src/middleware/logger.mjs`](src/middleware/logger.mjs))
Записує інформацію про кожен запит до сервера з timestamp.
```javascript
app.use(logRequests); // Глобальний мідлвар
```

### 2. Аутентифікація ([`src/middleware/auth.mjs`](src/middleware/auth.mjs))
Перевіряє наявність заголовка Authorization. Використовується для маршрутів /users.
```javascript
router.get('/', basicAuth, userController.getAllUsers);
```

### 3. Валідація ([`src/middleware/validation.mjs`](src/middleware/validation.mjs))
Перевіряє наявність обов'язкових полів username та email у POST запитах.
```javascript
router.post('/', basicAuth, validateUserInput, userController.createUser);
```

### 4. Контроль доступу ([`src/middleware/accessControl.mjs`](src/middleware/accessControl.mjs))
Перевіряє права доступу до статей на основі заголовка x-user-role.
```javascript
router.get('/', checkArticleAccess, articleController.getAllArticles);
```

## Приклади запитів

### Отримання всіх користувачів (з аутентифікацією)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ="
```

### Створення нового користувача
```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "email": "newuser@example.com"}'
```

### Отримання статей (з x-user-role)
```bash
curl -X GET http://localhost:3000/articles \
  -H "x-user-role: admin"
```

### Доступ до публічних маршрутів Native HTTP Server
```bash
curl http://localhost:3000/
curl http://localhost:3000/about
curl http://localhost:3000/contact

curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=test@example.com"
```

## Архітектура MVC

Проект побудований за паттерном MVC:

- **Model** - мокові дані в контролерах (users, articles)
- **View** - текстові відповіді сервера
- **Controller** - [`src/controllers/`](src/controllers/) обробляють бізнес-логіку
- **Routes** - [`src/routes/`](src/routes/) визначають маршрути та їх мідлвари
- **Middleware** - [`src/middleware/`](src/middleware/) виконують перевірки перед контролерами

## Тестування

Для запуску тестів:
```bash
npm test
```

## Конфігурація

Express сервер запускається на порту 3000 за замовчуванням. Змінити порт можна у файлі [`src/server.js`](src/server.js:29).
