import { FaHome, FaPalette, FaChartBar, FaClock } from 'react-icons/fa';

const Header = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: <FaHome /> },
    { id: 'color', label: 'Кольори', icon: <FaPalette /> },
    { id: 'chart', label: 'Графіки', icon: <FaChartBar /> },
    { id: 'idle', label: 'Таймер', icon: <FaClock /> },
  ];

  return (
    <header className="header">
      <div className="header-logo">
        <h1>React Demo App</h1>
        <span className="header-subtitle">Демонстрація бібліотек</span>
      </div>
      <nav className="header-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
