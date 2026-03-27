import express from 'express';
import { logRequests } from './middleware/logger.mjs';
import userRoutes from './routes/userRoutes.mjs';
import articleRoutes from './routes/articleRoutes.mjs';

const app = express();

// Підтримка JSON тіла запиту
app.use(express.json());

// Мідлвар логування для всіх запитів
app.use(logRequests);

// Головна сторінка
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Підключення маршрутів користувачів з мідлварами
app.use('/users', userRoutes);

// Підключення маршрутів статей з мідлварами
app.use('/articles', articleRoutes);

// Порт сервера
const PORT = 3000;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Експорт для тестів
export default app;