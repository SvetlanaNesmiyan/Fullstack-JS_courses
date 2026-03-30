// Мідлвар для валідації даних користувача
export function validateUserInput(req, res, next) {
  const { username, email, password, confirmPassword } = req.body;
  
  // Перевірка обов'язкових полів
  if (!username || !email || !password || !confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: username, email, password, and confirmPassword'
    });
    return;
  }
  
  // Валідація email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
    return;
  }
  
  // Валідація пароля
  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
    return;
  }
  
  // Перевірка збігу паролів
  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
    return;
  }
  
  next();
}
