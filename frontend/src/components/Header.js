import React from 'react';

function Header({ user }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>📖 ReadShare</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}!</span>
          <div className="extension-status">
            <span className="status-dot active"></span>
            Extension Active
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
