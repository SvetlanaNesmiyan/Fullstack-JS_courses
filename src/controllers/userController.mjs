// Контролер для роботи з користувачами

// Мокові дані користувачів
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user1', email: 'user1@example.com' }
];

// Отримати всіх користувачів
export function getAllUsers(req, res) {
  res.send(`Users: ${JSON.stringify(users)}`);
}

// Отримати користувача за ID
export function getUserById(req, res) {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  
  res.send(`User: ${JSON.stringify(user)}`);
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
  res.status(201).send(`User created: ${JSON.stringify(newUser)}`);
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
  res.send(`User updated: ${JSON.stringify(users[userIndex])}`);
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
  res.send('User deleted');
}