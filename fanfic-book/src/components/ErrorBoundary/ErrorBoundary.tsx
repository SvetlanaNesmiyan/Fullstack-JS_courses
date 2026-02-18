import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#1a0f2e',
          color: '#ffffff',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
            Что-то пошло не так
          </h1>
          <p style={{ color: '#b8a8c9', marginBottom: '24px' }}>
            Приносим извинения за неудобства. Пожалуйста, обновите страницу.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#7b4db3',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Обновить страницу
          </button>
          {this.state.error && (
            <pre style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#2d1b4e',
              borderRadius: '6px',
              maxWidth: '100%',
              overflow: 'auto',
              fontSize: '12px',
              color: '#ff6b6b',
            }}>
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
