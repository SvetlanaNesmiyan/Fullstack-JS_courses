// Мідлвар для перевірки прав доступу до статей
import { isAuthenticated } from './auth.mjs';

export function checkArticleAccess(req, res, next) {
  // Використовуємо Passport для перевірки автентифікації
  if (!req.isAuthenticated()) {
    res.status(403).send('Access denied. You do not have permission to access articles.');
    return;
  }
  
  next();
}

// Експортуємо також isAuthenticated для сумісності
export { isAuthenticated };
