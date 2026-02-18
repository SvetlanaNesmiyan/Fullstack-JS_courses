import './Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  message,
  fullScreen = false,
}) => {
  const spinnerClass = `loading__spinner loading__spinner--${size}`;
  const containerClass = fullScreen 
    ? 'loading loading--fullscreen' 
    : 'loading';

  return (
    <div className={containerClass}>
      <div className={spinnerClass} role="status" aria-label="Загрузка">
        <div className="loading__spinner-inner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {message && (
        <p className="loading__message">{message}</p>
      )}
      <span className="loading__sr-only">Загрузка</span>
    </div>
  );
};

export default Loading;
