import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ClassComponent - Класовий компонент (Class-based)
 * Відтворює функціональність StatefulComponent з використанням класів
 * Демонструє класичний підхід до створення React компонентів
 */
class ClassComponent extends Component {
  constructor(props) {
    super(props);
    
    // Ініціалізація стану в конструкторі
    this.state = {
      count: 0,
      inputValue: ''
    };
    
    // Прив'язка контексту для методів
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Методи життєвого циклу
  componentDidMount() {
    console.log('ClassComponent: Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ClassComponent: Component updated', {
      previousCount: prevState.count,
      currentCount: this.state.count
    });
  }

  componentWillUnmount() {
    console.log('ClassComponent: Component will unmount');
  }

  // Методи для зміни стану
  increment() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  decrement() {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    const { count, inputValue } = this.state;
    const { title } = this.props;

    return (
      <div className="class-component">
        <h2>Class Component: {title}</h2>
        
        <div className="counter-section">
          <p>Лічильник: <strong>{count}</strong></p>
          <div className="button-group">
            <button onClick={this.decrement}>-</button>
            <button onClick={this.increment}>+</button>
          </div>
        </div>

        <div className="input-section">
          <p>Текст: <strong>{inputValue || '(порожньо)'}</strong></p>
          <input
            type="text"
            placeholder="Введіть текст..."
            value={inputValue}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  title: PropTypes.string
};

ClassComponent.defaultProps = {
  title: 'Class Component'
};

export default ClassComponent;
