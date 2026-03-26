import express from 'express';
import { generateToken, verifyJWT } from '../middleware/jwtAuth.mjs';

const router = express.Router();

// Мокові користувачі (для демонстрації)
const users = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' },
  { id: 2, username: 'user1', password: 'user123', email: 'user1@example.com' }
];

// Реєстрація
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    res.status(400).send('Missing required fields: username, password, email');
    return;
  }
  
  // Перевірка чи користувач вже існує
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    res.status(400).send('User already exists');
    return;
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    password, // У реальному додатку потрібно хешувати пароль!
    email
  };
  
  users.push(newUser);
  
  // Створення JWT токену
  const token = generateToken({ id: newUser.id, username: newUser.username });
  
  // Збереження токену в httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000 // 1 година
  });
  
  res.send(`User registered: ${username}, Token saved in cookie`);
});

// Вхід
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).send('Missing required fields: username, password');
    return;
  }
  
  // Перевірка облікових даних
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    res.status(401).send('Invalid credentials');
    return;
  }
  
  // Створення JWT токену
  const token = generateToken({ id: user.id, username: user.username });
  
  // Збереження токену в httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000 // 1 година
  });
  
  res.send(`Login successful: ${username}, Token saved in cookie`);
});

// Вихід
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logged out successfully');
});

// Перевірка автентифікації
router.get('/me', verifyJWT, (req, res) => {
  res.send(`Authenticated user: ${req.user.username}`);
});

export default router;