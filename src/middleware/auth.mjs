// Мідлвар для перевірки автентифікації через Passport

/**
 * Перевіряє чи користувач авторизований
 * Використовує req.isAuthenticated() від Passport
 */
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // Перевіряємо AJAX запити
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ 
      error: 'Не авторизовано', 
      message: 'Будь ласка, увійдіть для доступу до цього ресурсу' 
    });
  }
  
  // Для звичайних запитів - перенаправляємо на сторінку входу
  res.redirect('/auth/login');
}

/**
 * Мідлвар для перевірки гостьового доступу
 * Перенаправляє авторизованих користувачів на головну сторінку
 */
export function isGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  
  res.redirect('/');
}

/**
 * Мідлвар для передачі користувача в контекст
 * Робить користувача доступним у всіх шаблонах
 */
export function attachUser(req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
}

export default { isAuthenticated, isGuest, attachUser };