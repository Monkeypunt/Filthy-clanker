import React from 'react';
import { PawPrint } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-[#e7dfd5] bg-[#faf7f2]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <span className="inline-flex items-center gap-2 text-base font-bold text-[#231a14] tracking-tight whitespace-nowrap shrink-0">
          <PawPrint className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <span>Ochbadrakh</span>
        </span>

        {/* Page Switcher & Section Links */}
        <nav aria-label="Primary navigation" className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1 p-1 bg-[#efe8dc] border border-[#e2d8cb] rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => onSelectView('about')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'about'
                  ? 'bg-white text-[#231a14] shadow-sm font-semibold'
                  : 'text-[#66574c] hover:text-[#231a14]'
              }`}
            >
              About me
            </button>

            <button
              type="button"
              onClick={() => onSelectView('dream')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'dream'
                  ? 'bg-white text-[#231a14] shadow-sm font-semibold'
                  : 'text-[#66574c] hover:text-[#231a14]'
              }`}
            >
              dream
            </button>

            <button
              type="button"
              onClick={() => onSelectView('split')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 hidden sm:inline-block cursor-pointer ${
                currentView === 'split'
                  ? 'bg-white text-[#231a14] shadow-sm font-semibold'
                  : 'text-[#66574c] hover:text-[#231a14]'
              }`}
            >
              Side-by-side
            </button>
          </div>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              onGoToServices();
            }}
            className="text-xs font-medium text-[#66574c] hover:text-[#231a14] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#231a14] text-[#faf7f2] hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};
