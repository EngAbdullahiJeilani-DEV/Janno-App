import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { FloatingParticles } from './components/FloatingParticles';
import { ToastContainer } from './components/ToastContainer';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { MusicPlayerBar } from './components/MusicPlayerBar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoupleProfilePage } from './pages/CoupleProfilePage';
import { TimelinePage } from './pages/TimelinePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { LoveLettersPage } from './pages/LoveLettersPage';
import { SurprisesPage } from './pages/SurprisesPage';
import { WeddingPage } from './pages/WeddingPage';
import { PublicInvitationPage } from './pages/PublicInvitationPage';
import { PublicLovePage } from './pages/PublicLovePage';
import { GiftShopPage } from './pages/GiftShopPage';
import { CountdownsPage } from './pages/CountdownsPage';
import { MusicHubPage } from './pages/MusicHubPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, activeSurpriseToUnbox, setActiveSurpriseToUnbox, surprises } = useApp();
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'couple':
        return <CoupleProfilePage />;
      case 'timeline':
        return <TimelinePage />;
      case 'memories':
        return <MemoriesPage />;
      case 'letters':
        return <LoveLettersPage />;
      case 'surprises':
        return <SurprisesPage />;
      case 'wedding':
        return <WeddingPage />;
      case 'invitation':
        return <PublicInvitationPage />;
      case 'public-love':
        return <PublicLovePage />;
      case 'gifts':
      case 'cart':
        return <GiftShopPage />;
      case 'countdowns':
      case 'anniversary':
        return <CountdownsPage />;
      case 'music':
        return <MusicHubPage />;
      case 'admin':
        return <AdminPage />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Background Romantic Canvas Particle Overlay */}
      <FloatingParticles />

      {/* Welcome Experience Opening Screen */}
      {showWelcome && (
        <WelcomeOverlay
          onExplore={() => {
            setShowWelcome(false);
            setCurrentView('landing');
          }}
          onOpenSurprise={() => {
            setShowWelcome(false);
            if (surprises.length > 0) {
              setActiveSurpriseToUnbox(surprises[0]);
            }
            setCurrentView('surprises');
          }}
        />
      )}

      {/* Main Top Navbar */}
      <Navbar />

      {/* Toast Notifications Overlay */}
      <ToastContainer />

      {/* Main Page Content Body */}
      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 pt-8">
        {renderView()}
      </main>

      {/* Floating Couple Audio Player */}
      <MusicPlayerBar />

      {/* Footer */}
      <Footer />

      {/* Mobile Screen Bottom Navigation Bar */}
      <MobileNav />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
