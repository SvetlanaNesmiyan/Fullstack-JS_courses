// Мідлвар для валідації даних користувача
export function validateUserInput(req, res, next) {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    res.status(400).send('Missing required fields: username, email and password');
    return;
  }
  
  next();
}