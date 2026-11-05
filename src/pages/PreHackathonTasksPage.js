import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';
import PreHackathonTasks from './uprise_components/PreHackathonTasks';
import './Uprise.css';

const PreHackathonTasksPage = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('uprise_user') || sessionStorage.getItem('uprise_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('uprise_user');
    sessionStorage.removeItem('uprise_user');
    localStorage.removeItem('uprise_remember_me');
    localStorage.removeItem('uprise_remembered_email');
    setCurrentUser(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Mouse spotlight effect
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const onMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
        document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="bg-obsidian min-h-screen text-white font-grotesk overflow-x-hidden relative selection:bg-gold/30 selection:text-gold flex flex-col justify-between">
      {/* Background Spotlight Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          background: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 20%), rgba(212, 175, 55, 0.08), transparent 85%)'
        }}
      ></div>

      {/* Top Navbar */}
      <UpriseNavbar 
        user={currentUser} 
        onOpenLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area: Exclusively Pre-Hackathon Tasks */}
      <main className="relative z-10 pt-24 pb-16 flex-grow">
        {/* Navigation Breadcrumb / Quick Back Links */}
        <div className="max-w-6xl mx-auto px-6 pt-2 pb-6 flex flex-wrap items-center justify-between gap-4">
          <Link 
            to="/uprise" 
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-gold hover:text-white uppercase tracking-widest transition-colors py-2 px-4 border border-gold/40 hover:border-gold bg-gold/5"
          >
            <span>←</span>
            <span>BACK TO UPRISE SUMMIT</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              to="/pre-hackathon" 
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-lightgrey hover:text-gold uppercase tracking-widest transition-colors py-2 px-4 border border-lightgrey/30 hover:border-gold bg-pitchblack"
            >
              <span>PRE-HACKATHON OVERVIEW</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-gold hover:text-white uppercase tracking-widest transition-colors py-2 px-4 border border-gold/40 hover:border-gold bg-pitchblack"
            >
              <span>LEADERBOARD</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* The Standalone Tasks Container */}
        <div className="max-w-6xl mx-auto px-6">
          <PreHackathonTasks 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            onOpenLogin={() => setIsLoginModalOpen(true)} 
            isStandalone={true} 
          />
        </div>
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="py-12 bg-pitchblack text-center text-lightgrey text-xs font-grotesk tracking-[0.3em] uppercase z-10 relative border-t border-gold/15">
        <p className="mb-3">© 2027 UPRISE SUMMIT • PRE-HACKATHON MISSIONS GAUNTLET</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/uprise" className="hover:text-gold transition-colors">UPRISE SUMMIT</Link>
          <Link to="/pre-hackathon" className="hover:text-gold transition-colors">PRE-HACKATHON</Link>
          <Link to="/leaderboard" className="hover:text-gold transition-colors">LEADERBOARD</Link>
          <Link to="/club-activities" className="hover:text-gold transition-colors">CLUB ACTIVITIES</Link>
        </div>
      </footer>

      {/* Uprise Login Modal */}
      <UpriseLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />
    </div>
  );
};

export default PreHackathonTasksPage;

