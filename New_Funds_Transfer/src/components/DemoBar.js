import React from 'react';
import './DemoBar.css';

function DemoBar({ viewMode, resolvedView, onViewModeChange, theme, onThemeChange }) {
  const setView = (mode) => {
    onViewModeChange(mode);
    const url = new URL(window.location.href);
    url.searchParams.set('view', mode);
    window.history.replaceState({}, '', url.toString());
  };

  const desktopPressed = viewMode === 'desktop' || (viewMode === 'auto' && resolvedView === 'desktop');
  const mobilePressed = viewMode === 'mobile' || (viewMode === 'auto' && resolvedView === 'mobile');

  return (
    <header className="DemoBar" role="banner" aria-label="Demo controls">
      <span className="DemoBar-label">View:</span>
      <div className="DemoBar-actions">
        <div className="DemoBar-segment" role="group" aria-label="Layout view">
          <button
            type="button"
            aria-pressed={desktopPressed}
            onClick={() => setView('desktop')}
          >
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={mobilePressed}
            onClick={() => setView('mobile')}
          >
            Mobile
          </button>
        </div>
        <div className="DemoBar-theme DemoBar-segment" role="group" aria-label="Theme">
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => onThemeChange('light')}
          >
            Light
          </button>
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => onThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      <p className="DemoBar-hint">For demos: try desktop or mobile view, or light/dark theme.</p>
    </header>
  );
}

export default DemoBar;
