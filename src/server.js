import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { logRequests } from './middleware/logger.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import userRoutes from './routes/userRoutes.mjs';
import articleRoutes from './routes/articleRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import settingsRoutes from './routes/settingsRoutes.mjs';

// Отримуємо шлях до кореневої директорії проекту
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const app = express();

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

// Мідлвар логування для всіх запитів
app.use(logRequests);

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
          <a href="/auth">Авторизація</a>
        </div>
      </nav>
      <main class="container">
        <h1>Головна сторінка</h1>
        <p>Поточна тема: <strong>${theme}</strong></p>
        <p><a href="/users">Користувачі (PUG)</a></p>
        <p><a href="/articles">Статті (EJS)</a></p>
        <p><a href="/auth">Авторизація (JWT)</a></p>
        <p><a href="/settings/theme">Налаштування теми</a></p>
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

// Мідлвар обробки помилок
app.use(errorHandler);

// Порт сервера
const PORT = 3000;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Експорт для тестів
export default app;