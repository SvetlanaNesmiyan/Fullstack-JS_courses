// Мідлвар для обробки помилок
export function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  res.status(500).send(`Server Error: ${err.message}`);
}