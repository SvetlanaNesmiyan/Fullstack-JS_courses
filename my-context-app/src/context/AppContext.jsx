import { createContext, useState, useCallback, useMemo } from 'react';

const defaultContextValue = {
  users: [
    { id: 1, name: 'Олександр Петренко', email: 'oleksandr@example.com', role: 'Адміністратор' },
    { id: 2, name: 'Марія Коваленко', email: 'maria@example.com', role: 'Користувач' },
    { id: 3, name: 'Іван Бондаренко', email: 'ivan@example.com', role: 'Модератор' },
  ],
  theme: 'light',
  toggleTheme: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  addUser: () => {},
  deleteUser: () => {},
};

export const AppContext = createContext(defaultContextValue);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultContextValue.users);
  const [theme, setTheme] = useState('light');
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const addUser = useCallback((user) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...user, id: Date.now() },
    ]);
  }, []);

  const deleteUser = useCallback((userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setSelectedUser((prevSelected) => 
      prevSelected?.id === userId ? null : prevSelected
    );
  }, []);

  const contextValue = useMemo(() => ({
    users,
    theme,
    toggleTheme,
    selectedUser,
    setSelectedUser,
    addUser,
    deleteUser,
  }), [users, theme, selectedUser, toggleTheme, addUser, deleteUser]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
