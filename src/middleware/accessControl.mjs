// Мідлвар для перевірки прав доступу до статей
export function checkArticleAccess(req, res, next) {
  // Базова перевірка прав доступу до статей
  // У реальному додатку тут би перевірялися ролі користувача
  const userRole = req.headers['x-user-role'] || 'guest';
  
  // Для прикладу: тільки admin може отримати доступ до статей
  if (userRole !== 'admin') {
    res.status(403).send('Access denied. Only admin can access articles.');
    return;
  }
  
  next();
}