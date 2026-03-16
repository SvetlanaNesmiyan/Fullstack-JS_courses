import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUsers, FaShoppingCart, FaDollarSign, FaChartLine, FaBell, FaCheckCircle } from 'react-icons/fa';

const Dashboard = ({ themeColor }) => {
  const [stats] = useState([
    { id: 1, title: 'Користувачі', value: '1,234', icon: <FaUsers />, color: '#3b82f6' },
    { id: 2, title: 'Замовлення', value: '567', icon: <FaShoppingCart />, color: '#10b981' },
    { id: 3, title: 'Дохід', value: '$12,345', icon: <FaDollarSign />, color: '#f59e0b' },
    { id: 4, title: 'Зростання', value: '+23%', icon: <FaChartLine />, color: '#ef4444' },
  ]);

  const notifications = [
    { id: 1, text: 'Новий користувач зареєстрований', type: 'info' },
    { id: 2, text: 'Замовлення #1234 виконано', type: 'success' },
    { id: 3, text: 'Low stock alert: Product ABC', type: 'warning' },
  ];

  const handleNotificationClick = (type) => {
    switch (type) {
      case 'info':
        toast.info('Інформаційне повідомлення');
        break;
      case 'success':
        toast.success('Успішна операція!');
        break;
      case 'warning':
        toast.warning('Попередження: критичний рівень запасів');
        break;
      default:
        toast('默认 повідомлення');
    }
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Дашборд</h2>
      
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="notifications-section">
        <h3>Сповіщення (спробуйте натиснути!)</h3>
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.type}`}
              onClick={() => handleNotificationClick(notif.type)}
            >
              <span className="notif-icon">
                {notif.type === 'success' ? <FaCheckCircle /> : <FaBell />}
              </span>
              <span className="notif-text">{notif.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
