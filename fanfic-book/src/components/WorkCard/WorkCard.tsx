import { memo } from 'react';
import './WorkCard.css';

/**
 * Work Card Component (Шапка произведения)
 * 
 * Displays detailed information about a fanfic work including:
 * - Work ID
 * - Title
 * - Genre/Rating
 * - Status
 * - Statistics (likes)
 * - Fandom
 * - Pairing/Characters
 * - Size (pages, words, parts)
 * - Tags
 * - Description
 * 
 * @component
 * @example
 * <WorkCard />
 */
const WorkCard: React.FC = () => {
  // Work data (in real app this would come from props/API)
  const workData = {
    id: '11145063',
    title: 'Психея',
    genres: ['Слэш'],
    rating: 'NC-17',
    status: 'Завершён',
    likes: 27727,
    fandom: 'Bangtan Boys (BTS)',
    pairing: 'гг2/гг1',
    size: {
      pages: 355,
      words: 170815,
      parts: 19,
    },
    tags: [
      'Hurt/Comfort',
      'Ангст',
      'Детектив',
      'Насилие 18+',
      'Романтика',
      'Драма',
      'Флэшбэки',
      'ООС',
      'АУ',
      'Эмоциональный финал',
      'Тяжёлые темы',
    ],
    description: `гг не интересовался футболом, но до сих пор носил потрёпанный брелок с чёрно-белым мячом на ключах от квартиры.
гг не любил кофе, но упрямо давился им каждое утро и отказывался начинать день без горькости на зубах.
гг не доверял второму гг, но продолжал рассыпаться.
гг ненавидел свою работу, но изо дня в день, смотря в зеркало, врал самому себе, что так правильно.`,
  };

  return (
    <article className="work-card">
      {/* Work ID */}
      <div className="work-card__id">
        ID работы: {workData.id}
      </div>

      {/* Title */}
      <h1 className="work-card__title">{workData.title}</h1>

      {/* Genre and Rating */}
      <div className="work-card__meta">
        <span className="work-card__genre">{workData.genres.join(', ')}</span>
        <span className="work-card__rating">{workData.rating}</span>
      </div>

      {/* Status */}
      <div className="work-card__status">
        <span className="work-card__status-label">Статус:</span>
        <span className="work-card__status-value">{workData.status}</span>
      </div>

      {/* Statistics - Likes */}
      <div className="work-card__stats">
        <button className="work-card__likes-btn">
          <svg 
            className="work-card__likes-icon" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="work-card__likes-count">{workData.likes.toLocaleString()}</span>
        </button>
      </div>

      {/* Fandom */}
      <div className="work-card__fandom">
        <span className="work-card__label">Фандом:</span>
        <a href="#" className="work-card__fandom-link">{workData.fandom}</a>
      </div>

      {/* Pairing */}
      <div className="work-card__pairing">
        <span className="work-card__label">Пэйринг и персонажи:</span>
        <span className="work-card__pairing-value">{workData.pairing}</span>
      </div>

      {/* Size */}
      <div className="work-card__size">
        <span className="work-card__label">Размер:</span>
        <span className="work-card__size-value">
          {workData.size.pages} страниц, {workData.size.words.toLocaleString()} слов, {workData.size.parts} частей
        </span>
      </div>

      {/* Tags */}
      <div className="work-card__tags">
        <div className="work-card__tags-list">
          {workData.tags.map((tag, index) => (
            <span key={index} className="work-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="work-card__description">
        <p>{workData.description}</p>
      </div>

      {/* Actions */}
      <div className="work-card__actions">
        <button className="work-card__action-btn work-card__action-btn--primary">
          Читать
        </button>
        <button className="work-card__action-btn work-card__action-btn--secondary">
          В закладки
        </button>
        <button className="work-card__action-btn work-card__action-btn--tertiary">
          Подписаться
        </button>
      </div>
    </article>
  );
};

const MemoizedWorkCard = memo(WorkCard);

export default MemoizedWorkCard;
