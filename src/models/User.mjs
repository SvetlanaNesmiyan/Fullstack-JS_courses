import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Ім'я користувача обов'язкове"],
    trim: true,
    minlength: [3, "Ім'я має містити щонайменше 3 символи"],
    maxlength: [30, "Ім'я не може перевищувати 30 символів"]
  },
  email: {
    type: String,
    required: [true, "Email обов'язковий"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Будь ласка, введіть коректний email"]
  },
  password: {
    type: String,
    required: [true, "Пароль обов'язковий"],
    minlength: [6, "Пароль має містити щонайменше 6 символів"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Хешування пароля перед збереженням
userSchema.pre('save', async function(next) {
  // Тільки хешуємо пароль якщо він був змінений
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Оновлюємо поле updatedAt при зміні документа
userSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Метод для порівняння паролів
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Видаляємо пароль з JSON виводу
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;