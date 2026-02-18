import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import UserList from './components/UserList';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const AppContent = () => {
  const { theme } = useAppContext();

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>React Context Demo</h1>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <UserList />
      </main>
      <footer className="app-footer">
        <p>Демонстрація роботи React Context API</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
