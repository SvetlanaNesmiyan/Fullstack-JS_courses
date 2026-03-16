import { useState, useEffect } from 'react';
import { FaClock, FaUserClock, FaExclamationTriangle, FaPlay, FaPause } from 'react-icons/fa';

const IdleTimerComponent = ({ getRemainingTime, getLastActiveTime, isIdle }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [lastActive, setLastActive] = useState(null);
  const [isCurrentlyIdle, setIsCurrentlyIdle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
      setLastActive(getLastActiveTime());
      setIsCurrentlyIdle(isIdle());
    }, 500);

    return () => clearInterval(interval);
  }, [getRemainingTime, getLastActiveTime, isIdle]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatLastActive = (date) => {
    if (!date) return 'Немає даних';
    return new Date(date).toLocaleTimeString();
  };

  return (
    <div className="idle-timer-component">
      <h2>Відстеження бездіяльності</h2>
      <p className="idle-description">
        Демонстрація використання бібліотеки React Idle Timer
      </p>

      <div className="idle-status">
        <div className={`status-indicator ${isCurrentlyIdle ? 'idle' : 'active'}`}>
          {isCurrentlyIdle ? (
            <>
              <FaPause className="status-icon" />
              <span>Бездіяльність</span>
            </>
          ) : (
            <>
              <FaPlay className="status-icon" />
              <span>Активний</span>
            </>
          )}
        </div>
      </div>

      <div className="idle-cards">
        <div className="idle-card">
          <div className="idle-card-header">
            <FaClock className="card-icon" />
            <h3>Таймер</h3>
          </div>
          <div className="idle-card-content">
            <span className="timer-value">{formatTime(remainingTime)}</span>
            <span className="timer-label">залишилось до спрацювання</span>
          </div>
        </div>

        <div className="idle-card">
          <div className="idle-card-header">
            <FaUserClock className="card-icon" />
            <h3>Остання активність</h3>
          </div>
          <div className="idle-card-content">
            <span className="timer-value">{formatLastActive(lastActive)}</span>
            <span className="timer-label">час останньої дії</span>
          </div>
        </div>
      </div>

      <div className="idle-info">
        <div className="info-box">
          <FaExclamationTriangle className="info-icon" />
          <div className="info-content">
            <h4>Як це працює?</h4>
            <p>
              Таймер спрацьовує після 10 секунд бездіяльності. 
              Рухайте мишкою, натискайте клавіші або торкайтеся екрану, 
              щоб залишатися активним.
            </p>
          </div>
        </div>
      </div>

      <div className="activity-log">
        <h4>Події:</h4>
        <ul className="log-list">
          <li>🔄 Таймер ініціалізовано</li>
          <li>👆 Відстежуються: mousemove, keydown, wheel, touchstart</li>
          <li>⏱️ Інтервал оновлення: 500ms</li>
        </ul>
      </div>
    </div>
  );
};

export default IdleTimerComponent;
