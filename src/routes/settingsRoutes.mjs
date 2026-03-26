import express from 'express';

const router = express.Router();

// Збереження теми користувача
router.post('/theme', (req, res) => {
  const { theme } = req.body;
  
  if (!theme) {
    res.status(400).send('Missing required field: theme');
    return;
  }
  
  // Збереження теми в cookie
  res.cookie('theme', theme, {
    maxAge: 86400000 * 30, // 30 днів
    httpOnly: false // Дозволяємо доступ з JavaScript для демонстрації
  });
  
  res.send(`Theme saved: ${theme}`);
});

// Отримання теми користувача
router.get('/theme', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.send(`Current theme: ${theme}`);
});

// Очищення теми
router.delete('/theme', (req, res) => {
  res.clearCookie('theme');
  res.send('Theme cleared');
});

export default router;