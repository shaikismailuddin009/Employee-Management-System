import React from 'react';

export function Navbar({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onAddEmployeeClick,
}) {
  const tabs = [
    { id: 'dashboard', label: 'Employee Summary' },
    { id: 'employees', label: 'Employees' },
    { id: 'departments', label: 'Departments' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="top-navbar">
      <div className="navbar-container">
        {/* Brand & Logo */}
        <div className="navbar-left">
          <div className="brand-badge" onClick={() => onSelectTab('dashboard')}>
            <div className="brand-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#2563EB" />
                <path
                  d="M7 8h10L13.5 12l3.5 4H7l3.5-4L7 8z"
                  fill="#ffffff"
                />
              </svg>
            </div>
            <div className="brand-info">
              <span className="brand-name">EMS HR</span>
              <span className="brand-tag">PORTAL</span>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="nav-pills" aria-label="Main Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`nav-pill ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search, Actions & Profile */}
        <div className="navbar-right">
          {/* Global Search Input */}
          <div className="navbar-search">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => {
                if (activeTab === 'dashboard' && searchQuery) {
                  // If on dashboard and typing, allow seamless navigation
                }
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Icon Buttons */}
          <div className="header-icon-actions">
            <button
              type="button"
              className="icon-action-btn"
              title="Settings"
              onClick={() => onSelectTab('settings')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-action-btn"
              title="Reports & Analytics"
              onClick={() => onSelectTab('reports')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-action-btn notification-btn"
              title="Notifications"
              onClick={() => onSelectTab('dashboard')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-dot" />
            </button>
          </div>

          {/* Quick Add Employee Button */}
          {onAddEmployeeClick && (
            <button
              type="button"
              className="btn btn-primary btn-sm add-quick-btn"
              onClick={onAddEmployeeClick}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add Employee</span>
            </button>
          )}

          {/* User Profile Avatar */}
          <div className="user-profile-widget" title="HR Director (Online)">
            <div className="profile-avatar">
              <span>HR</span>
              <span className="online-indicator" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

