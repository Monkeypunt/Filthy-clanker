import React from 'react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onSelectView }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <span className="text-base font-bold text-white tracking-tight">
          Ochbadrakh
        </span>

        {/* Clean View Tabs */}
        <nav aria-label="Page switcher" className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          <button
            onClick={() => onSelectView('about')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              currentView === 'about'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            About me
          </button>

          <button
            onClick={() => onSelectView('dream')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              currentView === 'dream'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            dream
          </button>

          <button
            onClick={() => onSelectView('split')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              currentView === 'split'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Side-by-side
          </button>
        </nav>
      </div>
    </header>
  );
};
