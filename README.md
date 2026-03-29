# Express Server з Passport авторизацією та сесіями

Express.js сервер з Passport.js авторизацією, збереженням сесій в MongoDB, захищеними маршрутами та підтримкою шаблонізаторів PUG/EJS.

## Опис

Цей проект реалізує Express.js сервер з:
- **Passport.js** для авторизації користувачів
- **Локальна стратегія** авторизації (email + пароль)
- **Express sessions** для збереження стану авторизації
- **MongoDB** для зберігання сесій та даних користувачів (опціонально)
- **Session cookies** з httpOnly та secure налаштуваннями
- **MVC архітектурою** з мідлварами
- **PUG/EJS шаблонізаторами**
- **Cookies** для збереження налаштувань користувача
- **JWT** (збережено для сумісності)

## Технології

- Node.js
- Express.js (v4)
- Passport.js (v0.7)
- passport-local (локальна стратегія)
- express-session (управління сесіями)
- connect-mongo (зберігання сесій в MongoDB)
- mongoose (MongoDB ODM)
- bcryptjs (хешування паролів)
- PUG (шаблонізатор)
- EJS (шаблонізатор)
- cookie-parser

## Структура проекту

```
├── package.json              # Конфігурація проекту
├── README.md                 # Документація
├── .gitignore               # Git ігнорування
├── .env.example             # Приклад змінних середовища
├── public/
│   ├── favicon.ico          # Favicon
│   └── css/
│       └── style.css        # CSS стилі
└── src/
    ├── server.js            # Основний файл сервера
    ├── config/
    │   └── passport.mjs      # Конфігурація Passport
    ├── middleware/
    │   ├── logger.mjs       # Мідлвар логування
    │   ├── auth.mjs         # Мідлвар аутентифікації Passport
    │   ├── validation.mjs   # Мідлвар валідації
    │   ├── accessControl.mjs # Мідлвар контролю доступу
    │   ├── errorHandler.mjs # Мідлвар обробки помилок
    │   └── jwtAuth.mjs      # Мідлвар перевірки JWT
    ├── models/
    │   └── User.mjs         # Модель користувача (Mongoose)
    ├── controllers/
    │   ├── userController.mjs    # Контролер користувачів (PUG)
    │   └── articleController.mjs # Контролер статей (EJS)
    ├── routes/
    │   ├── userRoutes.mjs    # Маршрути користувачів
    │   ├── articleRoutes.mjs # Маршрути статей
    │   ├── authRoutes.mjs   # Маршрути авторизації (Passport)
    │   └── settingsRoutes.mjs # Маршрути налаштувань
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
3. (Опціонально) Налаштуйте MongoDB:
   - Встановіть MongoDB локально або використовуйте MongoDB Atlas
   - Скопіюйте `.env.example` в `.env`
   - Вкажіть `MONGODB_URI`

## Запуск

```bash
npm start
```

Сервер буде доступний за адресою: http://localhost:3000

**Примітка:** Сервер працює в демо-режимі без MongoDB. Для повноцінної роботи потрібно налаштувати MongoDB.

## Конфігурація

Скопіюйте `.env.example` в `.env` та налаштуйте:

- `PORT` - порт сервера (за замовчуванням: 3000)
- `MONGODB_URI` - URI MongoDB (необов'язково)
- `SESSION_SECRET` - секретний ключ для сесій
- `NODE_ENV` - середовище (development/production)

## Доступні маршрути

### Головна сторінка
- **GET /** - головна сторінка з посиланнями

### Захищений маршрут
- **GET /protected** - доступний тільки авторизованим користувачам через Passport

### Маршрути авторизації (/auth) - Passport.js

#### HTML сторінки:
- **GET /auth/login** - сторінка входу
- **GET /auth/register** - сторінка реєстрації
- **GET /auth/logout** - вихід користувача

#### API endpoints:
- **POST /auth/register** - реєстрація нового користувача
  - Поля: `username`, `email`, `password`, `confirmPassword`
  - Автоматичний вхід після реєстрації
- **POST /auth/login** - вхід через Passport
  - Поля: `email`, `password`
  - Створює сесію з httpOnly cookie
- **POST /auth/logout** - вихід (видаляє сесію)
- **GET /auth/me** - отримати дані поточного користувача (захищений)
- **GET /auth/profile** - профіль користувача (захищений)

### Маршрути користувачів (/users) - PUG
- **GET /users** - список користувачів
- **GET /users/:userId** - деталі користувача

### Маршрути статей (/articles) - EJS
- **GET /articles** - список статей
- **GET /articles/:articleId** - деталі статті

### Маршрути налаштувань (/settings) - Cookies
- **POST /settings/theme** - зберегти тему (light/dark)
- **GET /settings/theme** - отримати поточну тему

## Мідлвари

### 1. Passport аутентифікація ([`src/middleware/auth.mjs`](src/middleware/auth.mjs))
- `isAuthenticated()` - перевіряє чи користувач авторизований
- `isGuest()` - перевіряє чи користувач є гостем
- Використовує `req.isAuthenticated()` від Passport

### 2. Логування ([`src/middleware/logger.mjs`](src/middleware/logger.mjs))
Записує інформацію про кожен запит до сервера.

### 3. Валідація ([`src/middleware/validation.mjs`](src/middleware/validation.mjs))
Перевіряє наявність обов'язкових полів.

### 4. Контроль доступу ([`src/middleware/accessControl.mjs`](src/middleware/accessControl.mjs))
Перевіряє права доступу.

### 5. JWT авторизація ([`src/middleware/jwtAuth.mjs`](src/middleware/jwtAuth.mjs))
Збережено для сумісності.

### 6. Обробка помилок ([`src/middleware/errorHandler.mjs`](src/middleware/errorHandler.mjs))
Централізована обробка помилок.

## Конфігурація Passport

[`src/config/passport.mjs`](src/config/passport.mjs):
- Локальна стратегія з email/password
- Серіалізація/десеріалізація користувачів
- Метод `comparePassword()` для перевірки паролів

## Модель користувача

[`src/models/User.mjs`](src/models/User.mjs):
- Поля: `username`, `email`, `password`
- Автоматичне хешування пароля (bcrypt)
- Метод порівняння паролів
- Timestamps

## Приклади запитів

```bash
# Головна сторінка
curl http://localhost:3000/

# Сторінка входу
curl http://localhost:3000/auth/login

# Сторінка реєстрації
curl http://localhost:3000/auth/register

# Реєстрація нового користувача
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&email=test@example.com&password=test123&confirmPassword=test123" \
  http://localhost:3000/auth/register

# Вхід користувача
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=admin@example.com&password=admin123" \
  http://localhost:3000/auth/login

# Захищений маршрут (потрібна авторизація)
curl http://localhost:3000/protected

# Вихід
curl http://localhost:3000/auth/logout

# Збереження теми
curl -X POST -d "theme=dark" http://localhost:3000/settings/theme
```

## Безпека

Сесії налаштовані з:
- `httpOnly: true` - захист від XSS
- `secure: true` (production) - тільки HTTPS
- `sameSite: 'lax'` - захист від CSRF
- Спеціальний секретний ключ сесії

Паролі зберігаються з:
- bcrypt хешуванням
- Соллю для кожного пароля

## Архітектура MVC

Проект побудований за паттерном MVC:
- **Model** - [`src/models/`](src/models/) (Mongoose)
- **View** - PUG та EJS шаблони
- **Controller** - [`src/controllers/`](src/controllers/)
- **Routes** - [`src/routes/`](src/routes/)
- **Middleware** - [`src/middleware/`](src/middleware/)

## Тестування

```bash
npm test
```

## Розширення функціональності

### OAuth авторизація (Google, Facebook)
```bash
npm install passport-google-oauth20 passport-facebook
```

### Відновлення пароля
Для реалізації потрібно:
1. Додати поле `resetToken` в модель User
2. Створити маршрут для запиту відновлення
3. Налаштувати nodemailer для відправки email

## Ліцензія

ISC