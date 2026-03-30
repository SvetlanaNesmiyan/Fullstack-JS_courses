# Express Server з Passport авторизацією та MongoDB Atlas

Express.js сервер з Passport.js авторизацією, інтеграцією MongoDB Atlas для зберігання статей та даних користувачів, сесіями в MongoDB, захищеними маршрутами та підтримкою шаблонізаторів PUG/EJS.

## Опис

Цей проект реалізує Express.js сервер з:
- **Passport.js** для авторизації користувачів
- **Локальна стратегія** авторизації (email + пароль)
- **Express sessions** для збереження стану авторизації
- **MongoDB Atlas** для зберігання статей та даних користувачів
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
- MongoDB Atlas (хмарна база даних)

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
    │   ├── database.mjs     # Конфігурація MongoDB Atlas
    │   └── passport.mjs      # Конфігурація Passport
    ├── middleware/
    │   ├── logger.mjs       # Мідлвар логування
    │   ├── auth.mjs         # Мідлвар аутентифікації Passport
    │   ├── validation.mjs   # Мідлвар валідації
    │   ├── accessControl.mjs # Мідлвар контролю доступу
    │   ├── errorHandler.mjs # Мідлвар обробки помилок
    │   └── jwtAuth.mjs      # Мідлвар перевірки JWT
    ├── models/
    │   ├── User.mjs         # Модель користувача (Mongoose)
    │   └── Article.mjs      # Модель статті (Mongoose)
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

1. Клонуйте репозиторій:
   ```bash
   git clone <repository-url>
   cd express-server
   ```

2. Встановіть залежності:
   ```bash
   npm install
   ```

3. Скопіюйте `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

## Налаштування MongoDB Atlas

### Крок 1: Створення кластера в MongoDB Atlas

1. Перейдіть на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Створіть безкоштовний акаунт або увійдіть
3. Створіть новий кластер (Free Tier - M0 Sandbox)
4. Виберіть регіон найближчий до вас
5. Зачекайте на створення кластера (2-5 хвилин)

### Крок 2: Налаштування доступу

1. Перейдіть до **Security** → **Database Access**
2. Натисніть **Add New Database User**
3. Створіть користувача:
   - **Username**: `expressAdmin`
   - **Password**: `your-secure-password` (запам'ятайте!)
   - **Database User Privileges**: **Read and write to any database**

### Крок 3: Налаштування Network Access

1. Перейдіть до **Security** → **Network Access**
2. Натисніть **Add IP Address**
3. Виберіть **Allow Access from Anywhere** (0.0.0.0/0) для розробки

### Крок 4: Отримання URI підключення

1. Перейдіть до **Clusters** → **Connect**
2. Виберіть **Connect your application**
3. Скопіюйте URI підключення:
   ```
   mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Крок 5: Налаштування .env файлу

Відредагуйте `.env` файл, додавши ваш MongoDB Atlas URI:

```env
PORT=3000
JWT_SECRET=my-secret-key-12345

# MongoDB Atlas URI (замініть на ваш)
MONGODB_URI=mongodb+srv://expressAdmin:your-secure-password@cluster0.xxxxx.mongodb.net/express-server?retryWrites=true&w=majority

SESSION_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

**Важливо:** Замініть `<cluster-name>` та `<password>` на ваші реальні значення.

### Формат URI

```
mongodb+srv://username:password@cluster.mongodb.net/database?options
```

**Приклад:**
```
mongodb+srv://expressAdmin:MySecurePassword123@cluster0.abcde.mongodb.net/express-server?retryWrites=true&w=majority
```

## Запуск

```bash
npm start
```

Сервер буде доступний за адресою: http://localhost:3000

При успішному підключенні до MongoDB ви побачите:
```
MongoDB підключено: cluster0.abcde.mongodb.net
Сервер запущено на порту 3000
Перейдіть за посиланням: http://localhost:3000
```

## Конфігурація

Змінні середовища в `.env`:

| Змінна | Опис | За замовчуванням |
|--------|------|------------------|
| `PORT` | Порт сервера | 3000 |
| `MONGODB_URI` | URI MongoDB Atlas | mongodb://localhost:27017/express-server |
| `SESSION_SECRET` | Секретний ключ для сесій | - |
| `NODE_ENV` | Середовище (development/production) | development |
| `JWT_SECRET` | Секретний ключ для JWT | - |

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

### Маршрути статей (/articles) - EJS + MongoDB

#### HTML сторінки:
- **GET /articles** - список опублікованих статей з MongoDB
- **GET /articles/:articleId** - деталі статті з MongoDB
- **POST /articles** - створити нову статтю (авторизованим користувачам)
- **PUT /articles/:articleId** - оновити статтю (авторизованим користувачам)
- **DELETE /articles/:articleId** - видалити статтю (авторизованим користувачам)

#### API endpoints (читання):
- **GET /articles/api/categories** - отримати список категорій
- **GET /articles/api/category/:category** - отримати статті за категорією
- **GET /articles/api/stats** - отримати статистику статей
- **GET /articles/api/find** - знайти документи з проекцією (див. розділ "Розширене читання з проекцією")

#### API endpoints (курсори та агрегації):
- **GET /articles/api/cursor/iterate** - перебір документів за допомогою курсора
- **GET /articles/api/cursor/export** - експорт документів за допомогою курсора
- **GET /articles/api/aggregate/stats** - агрегаційний запит для збору статистики

### Маршрути налаштувань (/settings) - Cookies
- **POST /settings/theme** - зберегти тему (light/dark)
- **GET /settings/theme** - отримати поточну тему
- **DELETE /settings/theme** - очистити тему

### Маршрути користувачів (/users) - PUG шаблони

#### HTML сторінки:
- **GET /users** - список користувачів (з аутентифікацією)
- **GET /users/:userId** - деталі користувача (з аутентифікацією)

#### API endpoints:
- **POST /users** - створити нового користувача
- **PUT /users/:userId** - оновити користувача

## Модель статті (MongoDB)

[`src/models/Article.mjs`](src/models/Article.mjs) - Mongoose схема для статей:

### Поля:
- `title` (String, обов'язкове) - заголовок статті
- `content` (String, обов'язкове) - зміст статті
- `author` (ObjectId, посилання на User, необов'язкове) - автор статті
- `excerpt` (String) - короткий опис
- `tags` (Array[String]) - теги статті
- `published` (Boolean) - статус публікації
- `publishedAt` (Date) - дата публікації
- `views` (Number) - кількість переглядів
- `imageUrl` (String) - URL зображення
- `category` (String) - категорія (новини, технології, навчання, проекти, інше)
- `createdAt`, `updatedAt` (timestamps) - автоматичні поля

### Методи:
- `incrementViews()` - збільшує лічильник переглядів
- `static getPublished()` - отримує опубліковані статті
- `static getByCategory(category)` - отримує статті за категорією

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

## Конфігурація MongoDB

[`src/config/database.mjs`](src/config/database.mjs):
- Функція `connectDB()` для підключення до MongoDB Atlas
- Функція `disconnectDB()` для відключення
- Функція `clearCollections()` для тестування
- Автоматичне перепідключення
- Оптимізовані налаштування пулу з'єднань

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

# Список статей
curl http://localhost:3000/articles

# Отримати категорії статей
curl http://localhost:3000/articles/api/categories

# Отримати статистику статей
curl http://localhost:3000/articles/api/stats

# Курсори - ітерація за допомогою курсора
curl http://localhost:3000/articles/api/cursor/iterate

# Курсори - ітерація з фільтром
curl "http://localhost:3000/articles/api/cursor/iterate?filter=%7B%22published%22%3Atrue%7D&batchSize=10"

# Курсори - експорт статей
curl http://localhost:3000/articles/api/cursor/export

# Агрегаційний запит - детальна статистика
curl http://localhost:3000/articles/api/aggregate/stats
```

## Тестування

```bash
npm test
```

## API CRUD операції для статей

Всі наступні маршрути повертають JSON відповіді та призначені для програмного керування статтями.

### Створення даних (Create)

#### POST /articles/api/create-one
**Створити один документ** (insertOne)

```json
// Запит:
{
  "title": "Заголовок нової статті",
  "content": "Зміст статті...",
  "excerpt": "Короткий опис",
  "tags": ["javascript", "node.js"],
  "category": "технології",
  "published": true,
  "imageUrl": "https://example.com/image.jpg"
}

// Відповідь (201 Created):
{
  "success": true,
  "message": "Статтю створено",
  "data": {
    "_id": "65f...",
    "title": "Заголовок нової статті",
    "content": "Зміст статті...",
    "published": true,
    "publishedAt": "2024-03-29T20:00:00.000Z",
    "createdAt": "2024-03-29T20:00:00.000Z",
    ...
  }
}
```

**curl приклад:**
```bash
curl -X POST http://localhost:3000/articles/api/create-one \
  -H "Content-Type: application/json" \
  -d '{"title":"Нова стаття","content":"Зміст статті","category":"технології","published":true}'
```

---

#### POST /articles/api/create-many
**Створити багато документів** (insertMany)

```json
// Запит:
{
  "articles": [
    { "title": "Стаття 1", "content": "Зміст 1", "category": "новини" },
    { "title": "Стаття 2", "content": "Зміст 2", "category": "технології" },
    { "title": "Стаття 3", "content": "Зміст 3", "category": "навчання" }
  ]
}

// Відповідь (201 Created):
{
  "success": true,
  "message": "Створено 3 статті",
  "data": [...],
  "insertedCount": 3
}
```

**curl приклад:**
```bash
curl -X POST http://localhost:3000/articles/api/create-many \
  -H "Content-Type: application/json" \
  -d '{"articles":[{"title":"Test 1","content":"Content 1"},{"title":"Test 2","content":"Content 2"}]}'
```

### Оновлення даних (Update)

#### PUT /articles/api/update-one/:id
**Оновити один документ** (updateOne)

```json
// Запит:
{
  "title": "Оновлений заголовок",
  "content": "Оновлений зміст",
  "published": true
}

// Відповідь (200 OK):
{
  "success": true,
  "message": "Статтю оновлено",
  "data": {
    "_id": "65f...",
    "title": "Оновлений заголовок",
    ...
  }
}
```

**curl приклад:**
```bash
curl -X PUT http://localhost:3000/articles/api/update-one/65f... \
  -H "Content-Type: application/json" \
  -d '{"title":"Оновлений заголовок","published":true}'
```

---

#### PUT /articles/api/update-many
**Оновити багато документів** (updateMany)

```json
// Запит:
{
  "filter": { "category": "інше" },
  "update": { "published": false }
}

// Відповідь (200 OK):
{
  "success": true,
  "message": "Оновлено 5 статей",
  "data": {
    "matchedCount": 5,
    "modifiedCount": 3,
    "acknowledged": true
  }
}
```

**curl приклад:**
```bash
curl -X PUT http://localhost:3000/articles/api/update-many \
  -H "Content-Type: application/json" \
  -d '{"filter":{"category":"інше"},"update":{"published":false}}'
```

---

#### PUT /articles/api/replace-one/:id
**Замінити один документ** (replaceOne)

Повністю замінює документ (зберігається лише `_id` та `author`).

```json
// Запит:
{
  "title": "Повністю новий заголовок",
  "content": "Повністю новий зміст",
  "excerpt": "Новий опис",
  "tags": ["новий тег"],
  "category": "новини",
  "published": true
}

// Відповідь (200 OK):
{
  "success": true,
  "message": "Статтю замінено",
  "data": { ... }
}
```

**curl приклад:**
```bash
curl -X PUT http://localhost:3000/articles/api/replace-one/65f... \
  -H "Content-Type: application/json" \
  -d '{"title":"Новий заголовок","content":"Новий зміст","category":"новини"}'
```

### Видалення даних (Delete)

#### DELETE /articles/api/delete-one/:id
**Видалити один документ** (deleteOne)

```json
// Відповідь (200 OK):
{
  "success": true,
  "message": "Статтю видалено",
  "data": {
    "_id": "65f...",
    "title": "Видалена стаття",
    ...
  }
}
```

**curl приклад:**
```bash
curl -X DELETE http://localhost:3000/articles/api/delete-one/65f...
```

---

#### DELETE /articles/api/delete-many
**Видалити багато документів** (deleteMany)

```json
// Запит:
{
  "filter": { 
    "published": false,
    "createdAt": { "$lt": "2024-01-01" }
  }
}

// Відповідь (200 OK):
{
  "success": true,
  "message": "Видалено 10 статей",
  "data": {
    "deletedCount": 10,
    "acknowledged": true
  }
}
```

**curl приклад:**
```bash
curl -X DELETE http://localhost:3000/articles/api/delete-many \
  -H "Content-Type: application/json" \
  -d '{"filter":{"published":false}}'
```

### Розширене читання з проекцією (Read)

#### GET /articles/api/find
**Знайти документи з проекцією** (find з projection)

Підтримує фільтрацію, проекцію, сортування, ліміт та пагінацію.

**Query параметри:**
| Параметр | Опис | Приклад |
|----------|------|--------|
| `filter` | JSON фільтр запиту | `{"category":"технології"}` |
| `projection` | JSON проекція полів | `{"title":1,"category":1}` |
| `sort` | JSON сортування | `{"createdAt":-1}` |
| `limit` | Кількість результатів | `10` |
| `skip` | Пропуск для пагінації | `0` |

```json
// Запит:
GET /articles/api/find?filter={"published":true}&projection={"title":1,"category":1,"views":1}&sort={"createdAt":-1}&limit=10&skip=0

// Відповідь (200 OK):
{
  "success": true,
  "data": [
    { "_id": "65f...", "title": "Стаття 1", "category": "технології", "views": 100 },
    { "_id": "65f...", "title": "Стаття 2", "category": "новини", "views": 50 }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "skip": 0
  }
}
```

**curl приклади:**

```bash
# Отримати всі опубліковані статті
curl "http://localhost:3000/articles/api/find?filter=%7B%22published%22%3Atrue%7D"

# Отримати тільки заголовки опублікованих статей
curl "http://localhost:3000/articles/api/find?filter=%7B%22published%22%3Atrue%7D&projection=%7B%22title%22%3A1%7D"

# Отримати 5 останніх статей категорії "технології"
curl "http://localhost:3000/articles/api/find?filter=%7B%22category%22%3A%22%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%97%22%7D&sort=%7B%22createdAt%22%3A-1%7D&limit=5"
```

**Приклад проекції полів:**
```bash
# Отримати тільки заголовок та дату створення (без _id)
curl "http://localhost:3000/articles/api/find?projection=%7B%22title%22%3A1%2C%22createdAt%22%3A1%2C%22_id%22%3A0%7D"
```

## Troubleshooting

### Проблема: "MongoDB підключено" не відображається
1. Перевірте правильність URI в `.env`
2. Переконайтеся, що пароль не містить спеціальних символів
3. Перевірте Network Access налаштування в Atlas

### Проблема: "Could not connect to any servers"
1. Перевірте, чи відкритий Port 27017 для вашого IP
2. Перевірте, чи правильно вказано ім'я кластера
3. Перевірте логіни та паролі в MongoDB Atlas

### Проблема: "Authentication failed"
1. Перевірте ім'я користувача та пароль в URI
2. Переконайтеся, що користувач має права на читання/запис

## Ліцензія

ISC
## Використання курсорів та агрегаційних запитів

Цей розділ описує нову функціональність для ефективної роботи з великими обсягами даних у MongoDB.

### 1. Курсори - ітерація документів

Курсори в MongoDB дозволяють обробляти документи партіями, не завантажуючи всі дані в пам'ять. Це особливо корисно для великих наборів даних.

#### GET /articles/api/cursor/iterate
**Перебір документів за допомогою курсора**

Використовує курсор для ітерації по документах замість завантаження всіх даних в пам'ять.

**Query параметри:**
| Параметр | Опис | За замовчуванням |
|----------|------|-------------------|
| `batchSize` | розмір партії для обробки | 100 |
| `filter` | JSON рядок з фільтром | {} |

```json
// Запит:
GET /articles/api/cursor/iterate?batchSize=50&filter={"published":true}

// Відповідь (200 OK):
{
  "success": true,
  "message": "Оброблено 50 статей за допомогою курсора",
  "data": {
    "processedCount": 50,
    "totalViewsSum": 1250,
    "sampleArticles": [
      { "_id": "65f...", "title": "Стаття 1", "views": 100, "category": "технології", "published": true },
      ...
    ]
  },
  "info": {
    "method": "Cursor iteration з batchSize: 50",
    "memoryEfficient": true,
    "description": "Курсор обробляє документи партіями, не завантажуючи всі дані в пам'ять"
  }
}
```

**Переваги використання курсорів:**
- **Ефективність пам'яті**: документи обробляються партіями, а не всі одночасно
- **Швидкість**: можна почати обробку даних ще до завантаження всіх документів
- **Масштабованість**: працює з великими наборами даних, які не поміщаються в оперативну пам'ять

**curl приклади:**

```bash
# Обробка всіх статей з batchSize за замовчуванням
curl http://localhost:3000/articles/api/cursor/iterate

# Обробка з меншим batchSize для великих даних
curl "http://localhost:3000/articles/api/cursor/iterate?batchSize=10"

# Обробка тільки опублікованих статей
curl "http://localhost:3000/articles/api/cursor/iterate?filter=%7B%22published%22%3Atrue%7D"
```

---

#### GET /articles/api/cursor/export
**Експорт документів за допомогою курсора (Streaming)**

Використовує streaming для великих наборів даних з можливістю обмеження кількості.

**Query параметри:**
| Параметр | Опис | За замовчуванням |
|----------|------|-------------------|
| `filter` | JSON рядок з фільтром | {} |
| `limit` | максимальна кількість документів | 1000 |

```json
// Запит:
GET /articles/api/cursor/export?filter={"published":true}&limit=100

// Відповідь (200 OK):
{
  "success": true,
  "message": "Експортовано 75 статей",
  "data": [
    { "_id": "65f...", "title": "Стаття 1", ... },
    ...
  ],
  "exportInfo": {
    "totalExported": 75,
    "method": "cursor.toArray()",
    "description": "Курсор дозволяє ефективно обробляти великі набори даних"
  }
}
```

**curl приклади:**

```bash
# Експорт всіх статей
curl http://localhost:3000/articles/api/cursor/export

# Експорт статей конкретної категорії
curl "http://localhost:3000/articles/api/cursor/export?filter=%7B%22category%22%3A%22%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%97%22%7D"

# Експорт з лімітом
curl "http://localhost:3000/articles/api/cursor/export?limit=10"
```

---

### 2. Агрегаційні запити

Агрегаційний пайплайн MongoDB дозволяє виконувати складні трансформації та обчислення даних безпосередньо на стороні бази даних.

#### GET /articles/api/aggregate/stats
**Агрегаційний запит для збору детальної статистики**

Використовує MongoDB aggregate pipeline для обчислення:
- кількості статей по категоріях
- середньої кількості переглядів
- сумарної кількості переглядів
- кількості опублікованих/неопублікованих
- найпопулярніших тегів

```json
// Запит:
GET /articles/api/aggregate/stats

// Відповідь (200 OK):
{
  "success": true,
  "message": "Агрегаційна статистика зібрана успішно",
  "data": {
    "totalArticles": 100,
    "publishedCount": 75,
    "draftCount": 25,
    "totalViews": 5000,
    "avgViews": 50,
    "maxViews": 500,
    "minViews": 0,
    "categoryStats": [
      { "category": "технології", "count": 30, "totalViews": 2000, "avgViews": 66.67 },
      { "category": "новини", "count": 25, "totalViews": 1500, "avgViews": 60 },
      ...
    ],
    "tagStats": [
      { "tag": "javascript", "count": 15, "totalViews": 800 },
      { "tag": "node.js", "count": 12, "totalViews": 600 },
      ...
    ],
    "viewsByMonth": [
      { "period": "2024-03", "count": 10, "totalViews": 500 },
      { "period": "2024-02", "count": 8, "totalViews": 400 },
      ...
    ]
  },
  "info": {
    "method": "MongoDB Aggregation Pipeline",
    "stages": [
      "$facet - паралельне виконання кількох агрегацій",
      "$group - групування даних",
      "$unwind - розгортання масивів",
      "$sort - сортування результатів",
      "$project - форматування виводу"
    ],
    "description": "Агрегаційний запит дозволяє зібрати складну статистику за один запит до БД"
  }
}
```

**Особливості агрегаційного пайплайну:**

1. **$facet** - дозволяє виконувати кілька агрегацій паралельно в одному запиті
2. **$group** - групує документи за певним полем та обчислює агрегатні функції
3. **$unwind** - розгортає масиви для обробки кожного елемента окремо
4. **$sort** - сортує результати агрегації
5. **$project** - форматує фінальний вивід, вибираючи потрібні поля

**Переваги агрегаційних запитів:**

- **Один запит до БД**: вся статистика збирається за один запит, а не кілька окремих
- **Обчислення на сервері**: тяжкі обчислення виконуються на стороні MongoDB, а не в додатку
- **Гнучкість**: можна комбінувати різні операції для складних аналітичних запитів

**curl приклади:**

```bash
# Отримати повну статистику
curl http://localhost:3000/articles/api/aggregate/stats
```

---

### Порівняння підходів

| Підхід | Коли використовувати | Переваги |
|--------|---------------------|----------|
| **Курсори** | Обробка великих наборів даних, де потрібна построчна обробка | Не завантажує всі дані в пам'ять, можливість stream-based обробки |
| **Агрегація** | Збір статистики, аналітика, складні трансформації | Обчислення на сервері БД, один запит для складних даних |
| **Звичайне find()** | Невеликі набори даних, простий пошук | Простота використання |

### Оптимізація роботи з великими даними

1. **Курсори з batchSize**: для дуже великих колекцій використовуйте менший batchSize, щоб зменшити навантаження на пам'ять

2. **Агрегаційні пайплайни**: використовуйте агрегацію замість кількох окремих запитів - це зменшує навантаження на мережу та прискорює роботу

3. **Індекси**: переконайтеся, що поля, які часто використовуються в запитах, мають індекси (вже створені в моделі Article)

4. **Проекції**: використовуйте проекції, щоб отримувати тільки потрібні поля (як у /articles/api/find)

