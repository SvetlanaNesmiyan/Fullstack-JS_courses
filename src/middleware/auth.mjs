// Мідлвар для базової аутентифікації
export function basicAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send('Access denied. Invalid credentials format.');
    return;
  }
  
  next();
}