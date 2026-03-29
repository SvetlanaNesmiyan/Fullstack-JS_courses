/**
 * Конфігурація підключення до MongoDB Atlas
 * @module db/config
 */

import mongoose from 'mongoose';

/**
 * Конфігурація підключення до MongoDB
 */
const dbConfig = {
  /**
   * URI підключення до MongoDB
   * @type {string}
   */
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-server',

  /**
   * Опції підключення mongoose
   */
  options: {
    // Максимальна кількість з'єднань у пулі
    maxPoolSize: 10,
    // Тайм-аут з'єднання в мілісекундах
    serverSelectionTimeoutMS: 5000,
    // Тайм-аут сокету в мілісекундах
    socketTimeoutMS: 45000,
    // Автоматичне перепідключення
    autoReconnect: true,
    // Використовувати нову топологію сервера
    useNewUrlParser: true,
    // Використовувати новий парсер для Unified Topology
    useUnifiedTopology: true,
  }
};

/**
 * Підключення до MongoDB
 * @returns {Promise<mongoose.Connection>}
 */
export async function connectDB() {
  try {
    const conn = await mongoose.connect(dbConfig.uri, dbConfig.options);
    console.log(`MongoDB підключено: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('Помилка підключення до MongoDB:', error.message);
    process.exit(1);
  }
}

/**
 * Відключення від MongoDB
 * @returns {Promise<void>}
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB відключено');
  } catch (error) {
    console.error('Помилка відключення від MongoDB:', error.message);
  }
}

/**
 * Очищення колекцій (для тестування)
 * @returns {Promise<void>}
 */
export async function clearCollections() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

export default { connectDB, disconnectDB, clearCollections };