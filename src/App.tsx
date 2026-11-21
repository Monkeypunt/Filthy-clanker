import { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import { ViewMode } from './types';
import { Navigation } from './components/Navigation';
import { AboutView } from './components/AboutView';
import { DreamView } from './components/DreamView';
import { OrderModal } from './components/OrderModal';
import { MyIdolChatModal } from './components/MyIdolChatModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('about');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isWinstonChatOpen, setIsWinstonChatOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'dream') {
        setCurrentView('dream');
      } else if (hash === 'split') {
        setCurrentView('split');
      } else if (hash === 'about') {
        setCurrentView('about');
      } else if (hash === 'services') {
        setCurrentView((prev) => (prev === 'dream' ? 'about' : prev));
        setTimeout(() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
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

  const handleGoToServices = () => {
    if (currentView === 'dream') {
      setCurrentView('about');
    }
    setTimeout(() => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenOrder = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const handleOpenContact = () => {
    setSelectedService('');
    setModalOpen(true);
  };

  return (
    <div className="pet-bg-pattern min-h-screen text-[#231a14] flex flex-col font-sans relative">
      <Navigation
        currentView={currentView}
        onSelectView={handleSelectView}
        onGoToServices={handleGoToServices}
        onOpenContact={handleOpenContact}
      />

      <main className="flex-1 w-full px-4 py-8 pb-24">
        {currentView === 'about' && (
          <AboutView onOrderService={handleOpenOrder} />
        )}

        {currentView === 'dream' && (
          <DreamView />
        )}

        {currentView === 'split' && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-3xl border border-[#e7dfd5] bg-[#fffdf9]/80 p-6 shadow-sm">
              <AboutView onOrderService={handleOpenOrder} isCompact={true} />
            </div>

            <div className="rounded-3xl border border-[#e7dfd5] bg-[#fffdf9]/80 p-6 shadow-sm">
              <DreamView isCompact={true} />
            </div>
          </div>
        )}
      </main>

      <OrderModal
        isOpen={modalOpen}
        initialService={selectedService}
        onClose={() => setModalOpen(false)}
      />

      {/* Persistent Winston Idol Button in Bottom-Right Corner */}
      <button
        type="button"
        onClick={() => setIsWinstonChatOpen(true)}
        title="Chat with Winston (My Idol)"
        aria-label="Open Winston Idol Chat"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-white hover:bg-amber-50 text-[#231a14] px-4 py-3 rounded-2xl shadow-lg border-2 border-amber-400 hover:border-amber-500 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer font-semibold"
      >
        <span className="text-xl leading-none" aria-hidden="true">🦍</span>
        <span className="text-xs font-bold tracking-wide text-amber-800 whitespace-nowrap">
          My Idol
        </span>
        <PawPrint className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
      </button>

      <MyIdolChatModal
        isOpen={isWinstonChatOpen}
        onClose={() => setIsWinstonChatOpen(false)}
      />
    </div>
  );
}
