import React, { useState, useEffect } from 'react';
import TransferFundsPage from './pages/TransferFundsPage';

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <rect x="2" y="4" width="16" height="2" rx="1" />
      <rect x="2" y="9" width="16" height="2" rx="1" />
      <rect x="2" y="14" width="16" height="2" rx="1" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function UserAvatar() {
  return (
    <span className="AppNav-avatar" aria-label="User profile">D</span>
  );
}

const NAV_TABS = ['Summary', 'Move money', 'Documents', 'Reports', 'Management', 'Apps', 'Products', 'Tools'];

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('ift-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ift-theme', theme); } catch (_) {}
  }, [theme]);

  return (
    <>
      <nav className="AppNav" role="navigation">
        <div className="AppNav-left">
          <button type="button" className="AppNav-hamburger" aria-label="Menu">
            <HamburgerIcon />
          </button>
        </div>

        <div className="AppNav-center">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`AppNav-tab${tab === 'Move money' ? ' AppNav-tab--active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="AppNav-right">
          <button
            type="button"
            className="AppNav-icon-btn"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <MailIcon />
          </button>
          <UserAvatar />
        </div>
      </nav>

      <div className="AppLayout">
        <aside className="AppSidebar" aria-label="Section navigation">
          <button type="button" className="AppSidebar-icon" aria-label="Accounts" title="Accounts">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
          <button type="button" className="AppSidebar-icon" aria-label="Transfer" title="Transfer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" /></svg>
          </button>
          <button type="button" className="AppSidebar-icon" aria-label="History" title="History">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          </button>
        </aside>

        <main className="AppContent">
          <TransferFundsPage />
        </main>
      </div>
    </>
  );
}

export default App;
