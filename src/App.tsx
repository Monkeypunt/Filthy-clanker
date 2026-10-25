import { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navigation } from './components/Navigation';
import { AboutView } from './components/AboutView';
import { DreamView } from './components/DreamView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('about');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'dream') {
        setCurrentView('dream');
      } else if (hash === 'split') {
        setCurrentView('split');
      } else if (hash === 'about') {
        setCurrentView('about');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    window.location.hash = view;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <Navigation currentView={currentView} onSelectView={handleSelectView} />

      <main className="flex-1 w-full px-4 py-8">
        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'dream' && (
          <DreamView />
        )}

        {currentView === 'split' && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <AboutView isCompact={true} />
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <DreamView isCompact={true} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
