// Контролер для роботи з користувачами (PUG шаблони)

// Мокові дані користувачів
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user1', email: 'user1@example.com' },
  { id: 3, username: 'user2', email: 'user2@example.com' }
];

// Отримати всіх користувачів
export function getAllUsers(req, res) {
  res.render('users', { 
    title: 'Користувачі',
    users 
  });
}

// Отримати користувача за ID
export function getUserById(req, res) {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  
  res.render('userDetail', { 
    title: `Користувач ${user.username}`,
    user 
  });
}

// Створити нового користувача
export function createUser(req, res) {
  const { username, email } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    email
  };
  
  users.push(newUser);
  res.redirect('/users');
}

// Оновити користувача
export function updateUser(req, res) {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    res.status(404).send('User not found');
    return;
  }
  
  const { username, email } = req.body;
  users[userIndex] = { ...users[userIndex], username, email };
  res.redirect(`/users/${userId}`);
}

// Видалити користувача
export function deleteUser(req, res) {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    res.status(404).send('User not found');
    return;
  }
  
  users.splice(userIndex, 1);
  res.redirect('/users');
}