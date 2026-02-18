import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectPrimaryNavItems,
  selectSecondaryNavItems,
  selectActiveNavItem,
  setActiveNavItem,
  setSearchQuery,
  toggleMobileMenu,
  selectIsMobileMenuOpen,
} from '../../redux';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const primaryNavItems = useAppSelector(selectPrimaryNavItems);
  const secondaryNavItems = useAppSelector(selectSecondaryNavItems);
  const activeNavItem = useAppSelector(selectActiveNavItem);
  const isMobileMenuOpen = useAppSelector(selectIsMobileMenuOpen);
  
  const handleNavItemClick = useCallback((itemId: string) => {
    dispatch(setActiveNavItem(itemId));
  }, [dispatch]);
  
  const handleSearchClick = useCallback(() => {
    const searchQuery = prompt('Введите поисковый запрос:');
    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery));
    }
  }, [dispatch]);
  
  const handleRandomClick = useCallback(() => {
    alert('Открытие случайной работы!');
  }, []);
  
  const handleAddFanficClick = useCallback(() => {
    alert('Открытие формы добавления фанфика!');
  }, []);
  
  const handleMobileMenuToggle = useCallback(() => {
    dispatch(toggleMobileMenu());
  }, [dispatch]);
  
  return (
    <header className="header">
      <div className="header__service-bar">
        <div className="header__service-info">
          <span className="header__work-id">ID работы: 11145063</span>
        </div>
      </div>
      
      <div className="header__main">
        <div className="header__container">
          <div className="header__logo-section">
            <a href="/" className="header__logo-link">
              <div className="header__logo">
                <svg 
                  viewBox="0 0 40 40" 
                  className="header__logo-icon"
                  aria-hidden="true"
                >
                  <rect x="5" y="5" width="30" height="30" rx="4" fill="#6B4C9A" />
                  <path d="M12 12h16v2H12zM12 16h16v2H12zM12 20h16v2H12zM12 24h10v2H12z" fill="#fff" />
                </svg>
              </div>
              <span className="header__title">Книга Фанфиков</span>
            </a>
            
            <button 
              className="header__mobile-menu-toggle"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
          
          <div className={`header__nav-section ${isMobileMenuOpen ? 'header__nav-section--open' : ''}`}>
            <nav className="header__primary-nav" aria-label="Main navigation">
              <ul className="header__nav-list">
                {primaryNavItems.map((item) => (
                  <li key={item.id} className="header__nav-item">
                    <a
                      href={item.url}
                      className={`header__nav-link ${activeNavItem === item.id ? 'header__nav-link--active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavItemClick(item.id);
                      }}
                      aria-current={activeNavItem === item.id ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="header__actions">
              <button 
                className="header__action-btn header__action-btn--primary"
                onClick={handleAddFanficClick}
              >
                Добавить фанфик
              </button>
              <button 
                className="header__action-btn header__action-btn--secondary"
                onClick={handleSearchClick}
              >
                Поиск фанфиков
              </button>
              <button 
                className="header__action-btn header__action-btn--tertiary"
                onClick={handleRandomClick}
              >
                Случайная работа
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header__secondary-bar">
        <div className="header__container">
          <nav className="header__secondary-nav" aria-label="Secondary navigation">
            <ul className="header__secondary-list">
              {secondaryNavItems.map((item) => (
                <li key={item.id} className="header__secondary-item">
                  <a
                    href={item.url}
                    className="header__secondary-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
