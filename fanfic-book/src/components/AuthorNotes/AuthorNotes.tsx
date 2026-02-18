import { memo } from 'react';
import './AuthorNotes.css';

const AuthorNotes: React.FC = memo(() => {
  return (
    <section className="author-notes">
      <div className="author-notes__epigraph">
        <blockquote className="author-notes__quote">
          — Хочешь расследовать это дело? Пытаешься очистить совесть таким образом?
        </blockquote>
      </div>

      <div className="author-notes__content">
        <h3 className="author-notes__heading">Примечания автора</h3>
        
        <div className="author-notes__text">
          <p><strong>Название:</strong> Психея (греч. ψυχή — «душа») — в греческой мифологии возлюбленная Эроса, олицетворение человеческой души.</p>
          
          <p><strong>Предупреждение:</strong> Обязательно ознакомьтесь с метками перед прочтением! Произведение содержит контент 18+.</p>
          
          <p><strong>Примечание:</strong> Автор не претендует на достоверность процедурных и криминалистических деталей. Всё максимально упрощено и адаптировано для художественного произведения.</p>
          
          <p>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="author-notes__link">
              Визуализация →
            </a>
          </p>
        </div>

        <div className="author-notes__dedication">
          <p>Посвящение:</p>
          <p>Вам. С искренней любовью.</p>
        </div>

        <div className="author-notes__restriction">
          <span className="author-notes__restriction-label">Публикация на других ресурсах:</span>
          <span className="author-notes__restriction-value">Запрещено</span>
        </div>
      </div>
    </section>
  );
});

export default AuthorNotes;
