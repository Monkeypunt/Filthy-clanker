import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onGoToServices: () => void;
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  onGoToServices,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <span className="text-base font-bold text-white tracking-tight whitespace-nowrap shrink-0">
          Ochbadrakh
        </span>

        {/* Page Switcher & Section Links */}
        <nav aria-label="Primary navigation" className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => onSelectView('about')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'about'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              About me
            </button>

            <button
              type="button"
              onClick={() => onSelectView('dream')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'dream'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              dream
            </button>

            <button
              type="button"
              onClick={() => onSelectView('split')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 hidden sm:inline-block ${
                currentView === 'split'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Side-by-side
            </button>

            <a
              href="https://ochbadrakh1.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 text-neutral-400 hover:text-white hover:bg-neutral-800/60 inline-flex items-center gap-1"
            >
              <span>My projects</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              onGoToServices();
            }}
            className="text-xs font-medium text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-white text-neutral-950 hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};
