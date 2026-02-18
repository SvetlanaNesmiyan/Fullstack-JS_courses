import { memo } from 'react';
import './Rewards.css';

const Rewards: React.FC = memo(() => {
  const rewards = [
    { id: 1, user: 'Calipso', reward: '💎 Бриллиант', date: '18.02.2026' },
    { id: 2, user: 'oksana.11111', reward: '❤️❤️❤️', date: '18.02.2026' },
    { id: 3, user: 'Kaa212117', reward: '🔥 Поддержка', date: '18.02.2026' },
    { id: 4, user: 'LunaStar', reward: '🌟 Звезда', date: '17.02.2026' },
    { id: 5, user: 'DarkAngel', reward: '💜 Лучшее', date: '17.02.2026' },
  ];

  const totalRewards = 164;

  return (
    <section className="rewards">
      <h2 className="rewards__title">Награды от читателей</h2>
      
      <div className="rewards__list">
        {rewards.map((reward) => (
          <div key={reward.id} className="rewards__item">
            <span className="rewards__user">{reward.user}</span>
            <span className="rewards__reward">{reward.reward}</span>
            <span className="rewards__date">{reward.date}</span>
          </div>
        ))}
      </div>
      
      <p className="rewards__more">... и ещё {totalRewards} награды!</p>
      
      <button className="rewards__btn">Наградить</button>
    </section>
  );
});

export default Rewards;
