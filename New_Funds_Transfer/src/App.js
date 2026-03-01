import React, { useState, useEffect } from 'react';
import DemoBar from './components/DemoBar';
import TransferFundsPage from './pages/TransferFundsPage';

function getViewFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  if (view === 'desktop' || view === 'mobile') return view;
  return 'auto';
}

function getResolvedView(viewMode, width) {
  if (viewMode === 'desktop' || viewMode === 'mobile') return viewMode;
  return width < 768 ? 'mobile' : 'desktop';
}

function App() {
  const [viewMode, setViewMode] = useState(() => getViewFromUrl());
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('ift-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) {}
    return 'light';
  });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('ift-theme', theme);
    } catch (_) {}
  }, [theme]);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const resolvedView = getResolvedView(viewMode, windowWidth);
  const layoutClass = resolvedView === 'mobile' ? 'layout-mobile' : 'layout-desktop';
  const showDeviceFrame = resolvedView === 'mobile' && windowWidth >= 768;

  return (
    <>
      <DemoBar
        viewMode={viewMode}
        resolvedView={resolvedView}
        onViewModeChange={setViewMode}
        theme={theme}
        onThemeChange={setTheme}
      />
      <div className={`App-content ${layoutClass}`} data-view={resolvedView}>
        {showDeviceFrame ? (
          <div className="DeviceFrame">
            <div className="DeviceFrame-inner">
              <TransferFundsPage />
            </div>
          </div>
        ) : (
          <TransferFundsPage />
        )}
      </div>
    </>
  );
}

export default App;
