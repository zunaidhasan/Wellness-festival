import { useState } from 'react';
import { PageId, Session, TicketTier } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrototypeToolbar } from './components/PrototypeToolbar';
import { SessionDetailModal } from './components/SessionDetailModal';
import { TicketCheckoutModal } from './components/TicketCheckoutModal';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { TicketsPage } from './pages/TicketsPage';
import { AboutPage } from './pages/AboutPage';
import { FaqContactPage } from './pages/FaqContactPage';
import { TICKET_TIERS } from './data/festivalData';
import { CheckCircle2, X } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'fluid'>('fluid');

  // Bookmarking state for schedule
  const [bookmarkedSessionIds, setBookmarkedSessionIds] = useState<string[]>([
    'd1-1',
    'd2-6',
  ]);

  // Modals state
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const [activeTicketTier, setActiveTicketTier] = useState<TicketTier | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const handleNavigate = (page: PageId, targetSection?: string) => {
    setCurrentPage(page);
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSessionModal = (session: Session) => {
    setActiveSession(session);
    setIsSessionModalOpen(true);
  };

  const handleToggleBookmark = (sessionId: string) => {
    setBookmarkedSessionIds((prev) => {
      const exists = prev.includes(sessionId);
      const next = exists ? prev.filter((id) => id !== sessionId) : [...prev, sessionId];
      showToast(
        exists
          ? 'Session removed from your saved schedule.'
          : 'Session saved to your personal schedule.'
      );
      return next;
    });
  };

  const handleSelectTier = (tier: TicketTier) => {
    setActiveTicketTier(tier);
    setIsTicketModalOpen(true);
  };

  const handleSelectPassFromHome = (tierId: string) => {
    const tier = TICKET_TIERS.find((t) => t.id === tierId) || TICKET_TIERS[1];
    setActiveTicketTier(tier);
    setIsTicketModalOpen(true);
  };

  const handleTicketSuccess = (tierName: string, quantity: number) => {
    showToast(`Successfully simulated reservation: ${quantity}x ${tierName}!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-gray-900 wireframe-grid selection:bg-gray-800 selection:text-white">
      {/* Top Prototype Helper / Navigation Toolbar */}
      <PrototypeToolbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        showAnnotations={showAnnotations}
        onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
        viewportMode={viewportMode}
        onSetViewportMode={setViewportMode}
      />

      {/* Main Container Wrapper (Desktop 1440px constraint if selected or fluid) */}
      <div
        className={`w-full mx-auto flex-1 flex flex-col transition-all duration-200 ${
          viewportMode === 'desktop'
            ? 'max-w-[1440px] shadow-2xl bg-white border-x-2 border-gray-400 my-0'
            : 'max-w-full'
        }`}
      >
        {/* Sticky Header with Logo, Navigation Links, "Get Tickets" Button & Mobile Menu */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          showAnnotations={showAnnotations}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onSelectPass={handleSelectPassFromHome}
              showAnnotations={showAnnotations}
            />
          )}

          {currentPage === 'schedule' && (
            <SchedulePage
              onNavigate={handleNavigate}
              onOpenSessionModal={handleOpenSessionModal}
              bookmarkedSessionIds={bookmarkedSessionIds}
              onToggleBookmark={handleToggleBookmark}
              showAnnotations={showAnnotations}
            />
          )}

          {currentPage === 'tickets' && (
            <TicketsPage
              onNavigate={handleNavigate}
              onSelectTier={handleSelectTier}
              showAnnotations={showAnnotations}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onNavigate={handleNavigate}
              showAnnotations={showAnnotations}
            />
          )}

          {currentPage === 'faq-contact' && (
            <FaqContactPage
              onNavigate={handleNavigate}
              showAnnotations={showAnnotations}
            />
          )}
        </main>

        {/* Global Structural Footer */}
        <Footer onNavigate={handleNavigate} showAnnotations={showAnnotations} />
      </div>

      {/* Interactive Modals */}
      <SessionDetailModal
        session={activeSession}
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        isBookmarked={activeSession ? bookmarkedSessionIds.includes(activeSession.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <TicketCheckoutModal
        tier={activeTicketTier}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSuccess={handleTicketSuccess}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200 font-sans text-sm">
          <CheckCircle2 className="w-4 h-4 text-gray-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
