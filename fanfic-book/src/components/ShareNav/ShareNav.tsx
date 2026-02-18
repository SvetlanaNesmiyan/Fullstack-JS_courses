import { memo } from 'react';
import './ShareNav.css';

const ShareNav: React.FC = memo(() => {
  const stats = [
    { icon: '❤️', value: 27727, label: 'Лайки' },
    { icon: '👁', value: 8060, label: 'Просмотры' },
    { icon: '🔔', value: 2358, label: 'Подписчики' },
    { icon: '💬', value: 10919, label: 'Отзывы' },
    { icon: '📚', value: 10919, label: 'В сборниках' },
  ];

  return (
    <section className="share-nav">
      <div className="share-nav__share">
        <span className="share-nav__label">Поделиться:</span>
        <div className="share-nav__buttons">
          <button className="share-nav__btn share-nav__btn--telegram" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </button>
          <button className="share-nav__btn share-nav__btn--vk" aria-label="Вконтакте">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.07-1.718-1.775-1.782-2.523-1.633-2.97 1.28-.132.83-.435 1.418-.864 1.418-.426 0-.672-.268-1.728-1.24-1.145-1.052-1.66-1.814-1.66-2.808 0-.595.167-1.1.963-1.658 1.13-.823 2.83-.96 3.494-.96.653 0 1.315.053 1.518.192.228.156.285.28.285.56v1.625c0 .277-.07.437-.573.437-.38 0-.793-.11-1.894-.603-1.44-.652-2.22-1.74-2.22-3.222 0-.94.587-1.884 2.115-2.72 1.382-.756 2.434-1.165 2.78-1.38.523-.323.638-.47 1.175-.47h1.745c.45 0 .582.084.728.334.175.302.76 1.18 1.945 2.437 1.408 1.493 1.768 2.2 1.993 2.2.283 0 .487-.167.487-.663V6.37c-.058-.704-.512-1.06-1.43-1.06-.46 0-.966.084-1.772.387-.84.315-1.23.448-1.23.753 0 .26.188.387.52.387.19 0 .438-.023.768-.07.91-.128 1.62-.538 2.16-1.26.6-.802.883-1.483.883-2.166 0-.448-.108-.826-.377-1.113-.3-.322-.776-.448-1.41-.448z"/>
            </svg>
          </button>
          <button className="share-nav__btn share-nav__btn--twitter" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button className="share-nav__btn share-nav__btn--link" aria-label="Копировать ссылку">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="share-nav__stats">
        {stats.map((stat, index) => (
          <div key={index} className="share-nav__stat">
            <span className="share-nav__stat-icon">{stat.icon}</span>
            <span className="share-nav__stat-value">{stat.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <button className="share-nav__download">Скачать</button>

      <div className="share-nav__contents">
        <h3 className="share-nav__contents-title">Содержание</h3>
        <ul className="share-nav__contents-list">
          <li><a href="#">Глава 1</a></li>
          <li><a href="#">Глава 2</a></li>
          <li><a href="#">Глава 3</a></li>
          <li><a href="#">...</a></li>
        </ul>
      </div>
    </section>
  );
});

export default ShareNav;
