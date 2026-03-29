import express from 'express';
import passport from 'passport';
import User from '../models/User.mjs';
import { isAuthenticated, isGuest } from '../middleware/auth.mjs';
import { validateUserInput } from '../middleware/validation.mjs';

const router = express.Router();

// ============================================
// СТОРІНКИ АВТОРИЗАЦІЇ
// ============================================

// Сторінка входу
router.get('/login', isGuest, (req, res) => {
  const error = req.session.messages?.[0] || null;
  res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Вхід</title>
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <a href="/">Головна</a>
          <a href="/auth/register">Реєстрація</a>
        </div>
      </nav>
      <main class="container">
        <h1>Вхід</h1>
        ${error ? `<div class="error">${error}</div>` : ''}
        <form action="/auth/login" method="POST">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Увійти</button>
        </form>
        <p>Немає облікового запису? <a href="/auth/register">Зареєструватися</a></p>
      </main>
    </body>
    </html>
  `);
});

// Сторінка реєстрації
router.get('/register', isGuest, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Реєстрація</title>
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <a href="/">Головна</a>
          <a href="/auth/login">Вхід</a>
        </div>
      </nav>
      <main class="container">
        <h1>Реєстрація</h1>
        <form action="/auth/register" method="POST">
          <div class="form-group">
            <label for="username">Ім'я користувача:</label>
            <input type="text" id="username" name="username" required minlength="3">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required minlength="6">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Підтвердження пароля:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
          </div>
          <button type="submit">Зареєструватися</button>
        </form>
        <p>Вже маєте обліковий запис? <a href="/auth/login">Увійти</a></p>
      </main>
    </body>
    </html>
  `);
});

// ============================================
// API МАРШРУТИ ДЛЯ PASSSPORT АВТОРИЗАЦІЇ
// ============================================

// Вхід через Passport
router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/auth/login',
    failureMessage: true
  })
);

// Реєстрація нового користувача
router.post('/register', validateUserInput, async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    // Перевірка паролів
    if (password !== confirmPassword) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="uk">
        <head><meta charset="UTF-8"><title>Помилка</title></head>
        <body>
          <h1>Паролі не співпадають!</h1>
          <a href="/auth/register">Назад до реєстрації</a>
        </body>
        </html>
      `);
    }
    
    // Перевірка чи користувач вже існує
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="uk">
        <head><meta charset="UTF-8"><title>Помилка</title></head>
        <body>
          <h1>Користувач з таким email або ім'ям вже існує!</h1>
          <a href="/auth/register">Назад до реєстрації</a>
        </body>
        </html>
      `);
    }
    
    // Створення нового користувача
    const newUser = new User({
      username,
      email,
      password
    });
    
    await newUser.save();
    
    // Автоматичний вхід після реєстрації
    req.login(newUser, (err) => {
      if (err) {
        console.error('Помилка автоматичного входу:', err);
        return res.redirect('/auth/login');
      }
      return res.redirect('/protected');
    });
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="uk">
      <head><meta charset="UTF-8"><title>Помилка</title></head>
      <body>
        <h1>Внутрішня помилка сервера</h1>
        <a href="/auth/register">Назад до реєстрації</a>
      </body>
      </html>
    `);
  }
});

// Вихід
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Помилка знищення сесії:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

// POST вихід
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Помилка знищення сесії:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

// Отримання інформації про поточного користувача
router.get('/me', isAuthenticated, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

// ============================================
// ЗАХИЩЕНІ API МАРШРУТИ
// ============================================

// Отримання профілю користувача
router.get('/profile', isAuthenticated, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Профіль</title>
      <link rel="icon" href="/favicon.ico">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <a href="/">Головна</a>
          <a href="/protected">Захищений маршрут</a>
          <a href="/auth/logout">Вихід</a>
        </div>
      </nav>
      <main class="container">
        <h1>Профіль користувача</h1>
        <p><strong>Ім'я:</strong> ${req.user.username}</p>
        <p><strong>Email:</strong> ${req.user.email}</p>
        <p><strong>Дата реєстрації:</strong> ${req.user.createdAt?.toLocaleDateString('uk-UA') || 'Невідомо'}</p>
        <p><a href="/">Повернутися на головну</a></p>
      </main>
    </body>
    </html>
  `);
});

export default router;