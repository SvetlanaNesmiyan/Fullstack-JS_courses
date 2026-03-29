import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.mjs';

// Конфігурація локальної стратегії Passport
export function configurePassport() {
  // Серіалізація користувача для збереження в сесії
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Десеріалізація користувача з сесії
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Локальна стратегія авторизації
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Використовуємо email замість username
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          // Знаходження користувача за email
          const user = await User.findOne({ email });
          
          if (!user) {
            return done(null, false, { message: 'Користувача з таким email не знайдено' });
          }

          // Перевірка пароля
          const isMatch = await user.comparePassword(password);
          
          if (!isMatch) {
            return done(null, false, { message: 'Неправильний пароль' });
          }

          // Успішна авторизація
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

export default passport;