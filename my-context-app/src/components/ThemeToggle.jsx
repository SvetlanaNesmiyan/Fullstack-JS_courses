import { memo } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
