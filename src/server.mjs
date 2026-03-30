import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { logRequests } from './middleware/logger.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import { isAuthenticated } from './middleware/auth.mjs';
import { configurePassport } from './config/passport.mjs';
import userRoutes from './routes/userRoutes.mjs';
import articleRoutes from './routes/articleRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import settingsRoutes from './routes/settingsRoutes.mjs';

// Отримуємо шлях до кореневої директорії проекту
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const app = express();

// Підключення до MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-server';
    await mongoose.connect(mongoUri);
    console.log('MongoDB підключено успішно');
  } catch (error) {
    console.error('Помилка підключення до MongoDB:', error.message);
    // Продовжуємо роботу без MongoDB для розробки
    console.log('Сервер працюватиме в режимі демо без збереження даних');
  }
};

// Конфігурація Passport
configurePassport();

// Налаштування PUG шаблонізатора
app.set('view engine', 'pug');
app.set('views', path.join(projectRoot, 'src', 'views', 'pug'));

// Підтримка JSON тіла запиту
app.use(express.json());

// Підтримка URL-encoded тіла запиту
app.use(express.urlencoded({ extended: true }));

// Підтримка cookie
app.use(cookieParser());

// Статичні файли (CSS, favicon)
app.use(express.static(path.join(projectRoot, 'public')));

// Налаштування сесій з MongoDB store
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Захист від XSS
    secure: process.env.NODE_ENV === 'production', // HTTPS only в production
    maxAge: 24 * 60 * 60 * 1000, // 24 години
    sameSite: 'lax' // Захист від CSRF
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-server',
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // TTL в секундах (24 години)
    autoRemove: 'native'
  })
};

// Для development режиму без MongoDB
if (!process.env.MONGODB_URI) {
  sessionConfig.store = new session.MemoryStore();
}

// Ініціалізація сесій
app.use(session(sessionConfig));

// Ініціалізація Passport
app.use(passport.initialize());
app.use(passport.session());

// Мідлвар логування для всіх запитів
app.use(logRequests);

// Глобальна змінна для передачі користувача в шаблони
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Головна сторінка
app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Головна сторінка</title>
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/css/style.css">
      <style>
        body { background-color: ${theme === 'dark' ? '#2c3e50' : '#f4f4f4'}; }
      </style>
    </head>
    <body>
      <nav>
        <div class="container">
          <a href="/">Головна</a>
          <a href="/users">Користувачі (PUG)</a>
          <a href="/articles">Статті (EJS)</a>
          <a href="/auth/login">Авторизація</a>
          ${req.user ? '<a href="/auth/logout">Вихід</a>' : '<a href="/auth/login">Вхід</a>'}
        </div>
      </nav>
      <main class="container">
        <h1>Головна сторінка</h1>
        <p>Поточна тема: <strong>${theme}</strong></p>
        ${req.user ? `<p>Ласкаво просимо, <strong>${req.user.username}</strong>!</p>` : '<p>Будь ласка, <a href="/auth/login">увійдіть</a>, щоб отримати доступ до захищених ресурсів.</p>'}
        <p><a href="/users">Користувачі (PUG)</a></p>
        <p><a href="/articles">Статті (EJS)</a></p>
        <p><a href="/auth/login">Авторизація (Passport)</a></p>
        <p><a href="/settings/theme">Налаштування теми</a></p>
        <p><a href="/protected">Захищений маршрут</a></p>
      </main>
    </body>
    </html>
  `);
});

// Захищений маршрут
app.get('/protected', isAuthenticated, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Захищений маршрут</title>
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <a href="/">Головна</a>
          <a href="/auth/logout">Вихід</a>
        </div>
      </nav>
      <main class="container">
        <h1>Захищений маршрут</h1>
        <p>Вітаємо, <strong>${req.user.username}</strong>!</p>
        <p>Ви успішно пройшли авторизацію через Passport.js</p>
        <p>Ваш email: ${req.user.email}</p>
        <p><a href="/">Повернутися на головну</a></p>
      </main>
    </body>
    </html>
  `);
});

// Підключення маршрутів
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);
app.use('/settings', settingsRoutes);

// Мідлвар для 404 (повинен бути перед error handler)
app.use((req, res) => {
  res.status(404).send('Сторінку не знайдено');
});

// Мідлвар обробки помилок (повинен бути після 404)
app.use(errorHandler);

// Порт сервера
const PORT = process.env.PORT || 3000;

// Запуск сервера
let server;

const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
    console.log(`Перейдіть за посиланням: http://localhost:${PORT}`);
  });
  return server;
};

startServer();

// Експорт для тестів
export default app;
export { server };
