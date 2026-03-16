import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIdleTimer } from 'react-idle-timer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ColorPickerComponent from './components/ColorPickerComponent';
import ChartComponent from './components/ChartComponent';
import IdleTimerComponent from './components/IdleTimerComponent';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themeColor, setThemeColor] = useState('#4f46e5');

  // Idle Timer налаштування
  const handleIdle = () => {
    toast.warning('Ви неактивні вже деякий час. Збережіть свої дані!', {
      position: 'top-right',
      autoClose: 5000,
    });
  };

  const handleActive = () => {
    toast.info('Радий, що ви повернулися!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const { getRemainingTime, getLastActiveTime, isIdle } = useIdleTimer({
    onIdle: handleIdle,
    onActive: handleActive,
    timeout: 10000, // 10 секунд бездіяльності для демонстрації
    throttle: 500,
    events: ['mousemove', 'keydown', 'wheel', 'touchstart'],
  });

  const handleColorChange = (color) => {
    setThemeColor(color.hex);
    toast.success('Кольорову тему змінено!', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard themeColor={themeColor} />;
      case 'color':
        return <ColorPickerComponent onColorChange={handleColorChange} />;
      case 'chart':
        return <ChartComponent themeColor={themeColor} />;
      case 'idle':
        return (
          <IdleTimerComponent
            getRemainingTime={getRemainingTime}
            getLastActiveTime={getLastActiveTime}
            isIdle={isIdle}
          />
        );
      default:
        return <Dashboard themeColor={themeColor} />;
    }
  };

  return (
    <div className="app" style={{ '--theme-color': themeColor }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
