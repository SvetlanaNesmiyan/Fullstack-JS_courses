import { memo } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const UserProfile = memo(() => {
  const { selectedUser, theme } = useAppContext();

  if (!selectedUser) {
    return null;
  }

  return (
    <div className={`user-profile ${theme}`}>
      <h3>Профіль користувача</h3>
      <div className="profile-details">
        <div className="profile-avatar">
          {selectedUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <p className="profile-name">
            <strong>Ім'я:</strong> {selectedUser.name}
          </p>
          <p className="profile-email">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p className="profile-role">
            <strong>Роль:</strong> {selectedUser.role}
          </p>
        </div>
      </div>
    </div>
  );
});

UserProfile.displayName = 'UserProfile';

export default UserProfile;
