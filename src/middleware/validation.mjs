// Мідлвар для валідації даних користувача
export function validateUserInput(req, res, next) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).send('Missing required fields: username and password');
    return;
  }
  
  next();
}