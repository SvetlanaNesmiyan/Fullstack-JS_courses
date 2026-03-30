// Мідлвар для валідації даних користувача
export function validateUserInput(req, res, next) {
  const { username, password, email, confirmPassword } = req.body;
  
  if (!username || !password || !email || !confirmPassword) {
    res.status(400).send('Missing required fields: username, password, email and confirmPassword');
    return;
  }
  
  if (password !== confirmPassword) {
    res.status(400).send('Passwords do not match');
    return;
  }
  
  // Проста перевірка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).send('Invalid email format');
    return;
  }
  
  next();
}
