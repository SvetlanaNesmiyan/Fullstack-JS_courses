// Мідлвар для перевірки прав доступу до статей
export function checkArticleAccess(req, res, next) {
  // Базова перевірка прав доступу до статей
  // У реальному додатку тут би перевірялися ролі користувача
  const userRole = req.headers['x-user-role'] || 'guest';
  
  // Для прикладу: тільки авторизовані користувачі можуть отримати доступ до статей
  if (userRole === 'guest') {
    res.status(403).send('Access denied. You do not have permission to access articles.');
    return;
  }
  
  next();
}