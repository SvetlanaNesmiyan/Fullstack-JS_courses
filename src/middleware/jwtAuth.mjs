// Мідлвар для перевірки JWT токену
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my-secret-key-12345';

export function verifyJWT(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).send('Access denied. No token provided.');
    return;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
}

// Генерація JWT токену
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export { JWT_SECRET };