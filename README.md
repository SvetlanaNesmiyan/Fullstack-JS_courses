# Express Server з MVC, Middleware, Шаблонізаторами, Cookies та JWT

Express.js сервер з MVC архітектурою, мідлварами, підтримкою PUG/EJS шаблонізаторів, cookies та JWT авторизацією.

## Опис

Цей проект реалізує Express.js сервер з:
- MVC архітектурою
- Мідлварами для логування, аутентифікації, валідації та контролю доступу
- PUG шаблонізатором для маршрутів користувачів
- EJS шаблонізатором для маршрутів статей
- Cookies для збереження налаштувань користувача (тема сайту)
- JWT авторизацією з збереженням токенів в httpOnly cookies
- Favicon для всіх сторінок

## Технології

- Node.js
- Express.js (v4)
- PUG (шаблонізатор для користувачів)
- EJS (шаблонізатор для статей)
- cookie-parser (робота з cookies)
- jsonwebtoken (JWT авторизація)
- CSS (стилі для сторінок)

## Структура проекту

```
├── package.json              # Конфігурація проекту
├── README.md                 # Документація
├── .gitignore               # Git ігнорування
├── public/
│   ├── favicon.ico          # Favicon
│   └── css/
│       └── style.css        # CSS стилі
└── src/
    ├── server.js            # Основний файл сервера
    ├── middleware/
    │   ├── logger.mjs       # Мідлвар логування
    │   ├── auth.mjs         # Мідлвар аутентифікації
    │   ├── validation.mjs   # Мідлвар валідації
    │   ├── accessControl.mjs # Мідлвар контролю доступу
    │   ├── errorHandler.mjs # Мідлвар обробки помилок
    │   └── jwtAuth.mjs      # Мідлвар перевірки JWT
    ├── controllers/
    │   ├── userController.mjs    # Контролер користувачів (PUG)
    │   └── articleController.mjs # Контролер статей (EJS)
    ├── routes/
    │   ├── userRoutes.mjs    # Маршрути користувачів
    │   ├── articleRoutes.mjs # Маршрути статей
    │   ├── authRoutes.mjs   # Маршрути авторизації (JWT)
    │   └── settingsRoutes.mjs # Маршрути налаштувань (cookies)
    └── views/
        ├── pug/              # PUG шаблони
        │   ├── layout.pug
        │   ├── users.pug
        │   └── userDetail.pug
        └── ejs/              # EJS шаблони
            ├── layout.ejs
            ├── articles.ejs
            └── articleDetail.ejs
```

## Встановлення

1. Клонуйте репозиторій
2. Встановіть залежності:
   ```bash
   npm install
   ```

## Запуск

Запустіть сервер:
```bash
npm start
```

Сервер буде доступний за адресою: http://localhost:3000

## Доступні маршрути

### Головна сторінка
- **GET /** - повертає HTML з посиланнями та поточною темой

### Маршрути користувачів (/users) - PUG шаблони
Усі маршрути /users використовують мідлвар аутентифікації (basicAuth):
- **GET /users** - отримати всіх користувачів (PUG)
- **GET /users/:userId** - отримати користувача за ID (PUG)

### Маршрути статей (/articles) - EJS шаблони
Усі маршрути /articles використовують мідлвар контролю доступу:
- **GET /articles** - отримати всі статті (EJS)
- **GET /articles/:articleId** - отримати статтю за ID (EJS)

### Маршрути авторизації (/auth) - JWT
- **POST /auth/register** - реєстрація користувача, створює JWT token в httpOnly cookie
- **POST /auth/login** - вхід користувача, створює JWT token в httpOnly cookie
- **POST /auth/logout** - вихід, видаляє JWT cookie
- **GET /auth/me** - перевірка автентифікації (захищений маршрут)

### Маршрути налаштувань (/settings) - Cookies
- **POST /settings/theme** - зберегти тему оформлення (light/dark)
- **GET /settings/theme** - отримати поточну тему
- **DELETE /settings/theme** - очистити тему

## Мідлвари

### 1. Логування ([`src/middleware/logger.mjs`](src/middleware/logger.mjs))
Записує інформацію про кожен запит до сервера з timestamp.

### 2. Аутентифікація ([`src/middleware/auth.mjs`](src/middleware/auth.mjs))
Перевіряє наявність заголовка Authorization. Використовується для маршрутів /users.

### 3. Валідація ([`src/middleware/validation.mjs`](src/middleware/validation.mjs))
Перевіряє наявність обов'язкових полів username та password у POST запитах.

### 4. Контроль доступу ([`src/middleware/accessControl.mjs`](src/middleware/accessControl.mjs))
Перевіряє права доступу до статей на основі заголовка x-user-role.

### 5. JWT авторизація ([`src/middleware/jwtAuth.mjs`](src/middleware/jwtAuth.mjs))
Перевіряє JWT токен з cookies або заголовка Authorization.

### 6. Обробка помилок ([`src/middleware/errorHandler.mjs`](src/middleware/errorHandler.mjs))
Централізована обробка помилок сервера.

## Приклади запитів

```bash
# Головна сторінка
curl http://localhost:3000/

# Favicon
curl http://localhost:3000/favicon.ico

# Користувачі (потрібен заголовок авторизації)
curl -H "Authorization: Bearer token" http://localhost:3000/users

# Статті (потрібен заголовок x-user-role)
curl -H "x-user-role: admin" http://localhost:3000/articles

# Реєстрація
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"newuser","password":"pass123","email":"user@test.com"}' \
  http://localhost:3000/auth/register

# Вхід
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  http://localhost:3000/auth/login

# Перевірка автентифікації (з cookie)
curl -b cookies.txt http://localhost:3000/auth/me

# Збереження теми
curl -X POST -d "theme=dark" http://localhost:3000/settings/theme

# Отримання теми
curl http://localhost:3000/settings/theme
```

## Тестові користувачі

- Username: `admin`, Password: `admin123`
- Username: `user1`, Password: `user123`

## Архітектура MVC

Проект побудований за паттерном MVC:
- **Model** - мокові дані в контролерах (users, articles)
- **View** - PUG та EJS шаблони
- **Controller** - [`src/controllers/`](src/controllers/) обробляють бізнес-логіку
- **Routes** - [`src/routes/`](src/routes/) визначають маршрути та їх мідлвари
- **Middleware** - [`src/middleware/`](src/middleware/) виконують перевірки перед контролерами

## Тестування

Для запуску тестів:
```bash
npm test
```

## Конфігурація

Сервер запускається на порту 3000 за замовчуванням. Змінити порт можна у файлі [`src/server.js`](src/server.js:62).