// Контролер для роботи з користувачами (PUG шаблони)

import User from '../models/User.mjs';

// Отримати всіх користувачів
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select('-password');
    res.render('users', { 
      title: 'Користувачі',
      users 
    });
  } catch (error) {
    res.status(500).send('Помилка отримання користувачів: ' + error.message);
  }
}

// Отримати користувача за ID
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.render('userDetail', { 
      title: `Користувач ${user.username}`,
      user 
    });
  } catch (error) {
    res.status(500).send('Помилка отримання користувача: ' + error.message);
  }
}

// Створити нового користувача
export async function createUser(req, res) {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Помилка створення користувача: ' + error.message);
  }
}

// Оновити користувача
export async function updateUser(req, res) {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId, 
      { username, email },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.redirect(`/users/${req.params.userId}`);
  } catch (error) {
    res.status(500).send('Помилка оновлення користувача: ' + error.message);
  }
}

// Видалити користувача
export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Помилка видалення користувача: ' + error.message);
  }
}