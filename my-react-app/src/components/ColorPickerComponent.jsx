import { useState } from 'react';
import { ChromePicker, SketchPicker, TwitterPicker } from 'react-color';
import { toast } from 'react-toastify';
import { FaCopy, FaCheck } from 'react-icons/fa';

const ColorPickerComponent = ({ onColorChange }) => {
  const [color, setColor] = useState('#4f46e5');
  const [showCopied, setShowCopied] = useState(false);
  const [activePicker, setActivePicker] = useState('chrome');

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    onColorChange(newColor);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    toast.success(`Скопійовано: ${color}`, {
      position: 'bottom-center',
      autoClose: 2000,
    });
    setTimeout(() => setShowCopied(false), 2000);
  };

  const renderPicker = () => {
    switch (activePicker) {
      case 'chrome':
        return (
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            width="100%"
            disableAlpha={true}
          />
        );
      case 'sketch':
        return (
          <SketchPicker
            color={color}
            onChange={handleColorChange}
            width="100%"
          />
        );
      case 'twitter':
        return (
          <TwitterPicker
            color={color}
            onChange={handleColorChange}
            width="100%"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="color-picker-component">
      <h2>Вибір кольору</h2>
      <p className="color-description">
        Оберіть колір для налаштування теми вашого додатку
      </p>

      <div className="picker-tabs">
        {['chrome', 'sketch', 'twitter'].map((picker) => (
          <button
            key={picker}
            className={`picker-tab ${activePicker === picker ? 'active' : ''}`}
            onClick={() => setActivePicker(picker)}
          >
            {picker.charAt(0).toUpperCase() + picker.slice(1)}
          </button>
        ))}
      </div>

      <div className="picker-container">
        {renderPicker()}
      </div>

      <div className="color-result">
        <div
          className="color-preview"
          style={{ backgroundColor: color }}
        />
        <div className="color-info">
          <span className="color-hex">{color}</span>
          <button className="copy-button" onClick={copyToClipboard}>
            {showCopied ? <FaCheck /> : <FaCopy />}
            {showCopied ? 'Скопійовано' : 'Копіювати'}
          </button>
        </div>
      </div>

      <div className="color-presets">
        <h4>Популярні кольори</h4>
        <div className="preset-colors">
          {['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'].map((presetColor) => (
            <button
              key={presetColor}
              className="preset-color"
              style={{ backgroundColor: presetColor }}
              onClick={() => handleColorChange({ hex: presetColor })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerComponent;
