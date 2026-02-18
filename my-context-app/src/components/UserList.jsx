import { memo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import UserProfile from './UserProfile';

const UserList = memo(() => {
  const { users, selectedUser, setSelectedUser, addUser, deleteUser } = useAppContext();

  const handleUserClick = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  const handleAddUser = () => {
    const name = prompt('Введіть ім\'я користувача:');
    if (name) {
      const email = prompt('Введіть email:');
      if (email) {
        addUser({
          name,
          email,
          role: 'Користувач',
        });
      }
    }
  };

  const handleDeleteUser = (e, userId) => {
    e.stopPropagation();
    if (confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Список користувачів</h2>
        <button className="add-user-btn" onClick={handleAddUser}>
          + Додати користувача
        </button>
      </div>
      
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteUser(e, user.id)}
              title="Видалити користувача"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Вкладений компонент, який також використовує контекст */}
      {selectedUser && <UserProfile />}
    </div>
  );
});

UserList.displayName = 'UserList';

export default UserList;
