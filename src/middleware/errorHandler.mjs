// Мідлвар для обробки помилок
export function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
