import PropTypes from 'prop-types';

/**
 * StatelessComponent - Компонент без стану (stateless)
 * Приймає пропси та відображає дані
 * Демонструє роботу з пропсами без власного стану
 */
function StatelessComponent({ 
  title, 
  description, 
  items = [], 
  onItemClick 
}) {
  return (
    <div className="stateless-component">
      <h2>Stateless Component (Без стану)</h2>
      
      <div className="info-section">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {items.length > 0 && (
        <div className="items-section">
          <h4>Список елементів:</h4>
          <ul>
            {items.map((item, index) => (
              <li 
                key={index} 
                onClick={() => onItemClick && onItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

StatelessComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func
};

StatelessComponent.defaultProps = {
  description: '',
  items: [],
  onItemClick: null
};

export default StatelessComponent;
