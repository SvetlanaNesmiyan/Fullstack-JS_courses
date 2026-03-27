// Мідлвар для валідації даних користувача
export function validateUserInput(req, res, next) {
  const { username, email } = req.body;
  
  if (!username || !email) {
    res.status(400).send('Missing required fields: username and email');
    return;
  }

  next();
}
