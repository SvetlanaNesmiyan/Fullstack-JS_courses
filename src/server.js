import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { logRequests } from './middleware/logger.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import userRoutes from './routes/userRoutes.mjs';
import articleRoutes from './routes/articleRoutes.mjs';

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

// Статичні файли (CSS)
app.use(express.static(path.join(projectRoot, 'public')));

// Мідлвар логування для всіх запитів
app.use(logRequests);

// Головна сторінка
app.get('/', (req, res) => {
  res.send('<h1>Головна сторінка</h1><p><a href="/users">Користувачі (PUG)</a></p><p><a href="/articles">Статті (EJS)</a></p>');
});

// Підключення маршрутів користувачів з мідлварами
app.use('/users', userRoutes);

// Підключення маршрутів статей з мідлварами
app.use('/articles', articleRoutes);

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