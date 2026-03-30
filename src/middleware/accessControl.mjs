// Мідлвар для перевірки прав доступу до статей
export function checkArticleAccess(req, res, next) {
  // Перевірка прав доступу на основі ролі користувача з сесії Passport
  const userRole = req.user?.role || 'guest';
  
  // Для прикладу: тільки авторизовані користувачі можуть отримати доступ до статей
  if (userRole === 'guest') {
    res.status(403).json({
      success: false,
      message: 'Access denied. You do not have permission to access articles.'
    });
    return;
  }
  
  next();
}
