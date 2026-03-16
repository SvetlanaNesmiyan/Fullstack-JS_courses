import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1><Link to="/" className="app-logo">Task Manager</Link></h1>
      <nav>
        <ul>
          <li><Link to="/">Tasks</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;