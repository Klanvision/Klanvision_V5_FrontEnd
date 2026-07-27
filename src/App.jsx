// ============================================================
// App.jsx
// Root application component for the Klanvision website.
// Manages the initial loading screen and renders the full
// page layout: Navbar → Sections → Footer → Floating buttons.
// ============================================================

import './index.css';
import './App.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── Section Components ───────────────────────────────────────
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StrategicServices from './components/StrategicServices';
import ServicesSection from './components/ServicesSection';
import WhyPartner from './components/WhyPartner';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import WhatsAppAssistant from './components/WhatsAppAssistant';

import CareersPage from './components/CareersPage';
import JobApplicationPage from './components/JobApplicationPage';
import AdminPanel from './components/AdminPanel';
import ResetPassword from './components/AdminPanel/ResetPassword';
import AssessmentPortal from './components/AssessmentPortal';
import Engine from './components/TestEngine/Engine';
import VerificationPortal from './components/AdminPanel/VerificationPortal';
import FAQPage from './components/FAQPage';
import RefundPolicyPage from './components/RefundPolicyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import ServicePolicyPage from './components/ServicePolicyPage';
import TermsPage from './components/TermsPage';
import ConsultationPage from './components/ConsultationPage';
import ManagedServicesPage from './components/ManagedServicesPage';
import CybersecurityPage from './components/CybersecurityPage';
import WebDevelopmentPage from './components/WebDevelopmentPage';
import MobileAppPage from './components/MobileAppPage';
import CloudServicesPage from './components/CloudServicesPage';
import UpgradeMigrationPage from './components/UpgradeMigrationPage';
import APIIntegrationPage from './components/APIIntegrationPage';
import AuthenticVerificationPage from './components/AuthenticVerificationPage';
import DataProtectionPage from './components/DataProtectionPage';
import TrustedDatabasePage from './components/TrustedDatabasePage';
import GlobalAcceptancePage from './components/GlobalAcceptancePage';
import PlansPage from './components/PlansPage';

import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

// ── Loader Component ─────────────────────────────────────────
// Full-screen branded splash screen displayed for 2.4 seconds
// on first load. Fades out with a slight scale-up exit animation.
function Loader() {
  const [status, setStatus] = useState('INITIALIZING...');
  
  useEffect(() => {
    const statuses = [
      'INITIALIZING...',
      'SYNCHRONIZING VISION...',
      'ASSEMBLING INNOVATION...',
      'GENERATING EXCELLENCE...',
      'SYSTEM READY'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % statuses.length;
      setStatus(statuses[i]);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        display: 'flex', flexDirection: 'column',

        alignItems: 'center', justifyContent: 'center', gap: 30,
        overflow: 'hidden',
        padding: '20px'
      }}
    >
      {/* Celebratory Firework & Cracker Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cracker-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 500],
              y: [0, (Math.random() - 0.5) * 500],
            }}
            transition={{ 
              duration: 2.5, 
              Infinity, 
              delay: i * 0.4,
              ease: "easeOut" 
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'white',
              boxShadow: `0 0 15px 5px ${['#4F46E5', '#7C3AED', '#FF6B35', '#FACC15', '#EC4899'][i % 5]}`,
            }}
          />
        ))}
        
        {/* Large Fireworks */}
        {[...Array(4)].map((_, i) => (
          <div key={`firework-${i}`} style={{ position: 'absolute', top: `${20 + Math.random() * 60}%`, left: `${10 + Math.random() * 80}%` }}>
            {[...Array(12)].map((_, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: [0, Math.cos(j * 30 * (Math.PI / 180)) * 100],
                  y: [0, Math.sin(j * 30 * (Math.PI / 180)) * 100],
                }}
                transition={{ 
                  duration: 2, 
                  Infinity, 
                  delay: i * 0.7,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: ['#FF6B35', '#7C3AED', '#4F46E5'][i % 3],
                  boxShadow: `0 0 10px ${['#FF6B35', '#7C3AED', '#4F46E5'][i % 3]}`
                }}
              />
            ))}
          </div>
        ))}
      </div>


      {/* Innovative Logo Core & Orbits */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15, height: 320, width: 320 }}>
        {/* Pulsating background aura */}
        <div style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.12)',
          filter: 'blur(35px)',
          animation: 'pulse 2.2s infinite ease-in-out'
        }} />

        {/* Orbit 1: Outer glowing radar track with rotating satellites (Encloses logo & slogan without touching them) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: 290,
            height: 290,
            borderRadius: '50%',
            border: '1.2px dotted rgba(99, 102, 241, 0.35)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.05)'
          }}
        >
          {/* Glowing Orange Satellite Node */}
          <div style={{
            position: 'absolute',
            top: '12%',
            right: '12%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#F97316',
            boxShadow: '0 0 12px 3px rgba(249, 115, 22, 0.85)'
          }} />

          {/* Glowing Cyan Satellite Node */}
          <div style={{
            position: 'absolute',
            bottom: '12%',
            left: '12%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00F2FE',
            boxShadow: '0 0 12px 3px rgba(0, 242, 254, 0.85)'
          }} />
        </motion.div>

        {/* Orbit 2: Middle glowing solid ring with double arcs (Encloses logo & slogan completely without touching them) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: 255,
            height: 255,
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTop: '2px solid #7C3AED',
            borderBottom: '2px solid #00F2FE',
            filter: 'drop-shadow(0 0 7px rgba(124, 58, 237, 0.45))'
          }}
        />

        {/* Orbit 3: Inner fast gradient ring with side arcs (Encloses logo & slogan completely without touching them) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderLeft: '2px solid #EC4899',
            borderRight: '2px solid #F97316',
            filter: 'drop-shadow(0 0 5px rgba(236, 72, 153, 0.35))'
          }}
        />

        {/* Central Logo & Slogan */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <img 
            src="/images/Transparent_Logo.png" 
            alt="Klanvision Logo" 
            style={{ height: 70, width: 'auto', filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.6))', objectFit: 'contain' }} 
          />
          <img 
            src="/images/slogan.png" 
            alt="Klanvision Slogan" 
            style={{ height: 30, width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))', objectFit: 'contain' }} 
          />
        </motion.div>
      </div>

      {/* Visionary Status Section */}
      <div style={{ textAlign: 'center', zIndex: 1, marginTop: -5 }}>
        <div style={{ height: 16 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              style={{ 
                color: '#64748B', 
                fontSize: 'clamp(9px, 2.5vw, 11px)', 
                fontWeight: 800,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontFamily: 'monospace'
              }}
            >
              {status}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative System Metrics */}
      <div style={{ 
        position: 'absolute', bottom: 30, left: 30, right: 30, 
        display: 'flex', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 15
      }}>
        <div style={{ display: 'flex', gap: 15 }}>
          <span style={{ color: '#334155', fontSize: 9, fontWeight: 800 }}>CORE_GENESIS</span>
          <span style={{ color: '#334155', fontSize: 9, fontWeight: 800 }}>v4.2.0</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ color: '#059669', fontSize: 9, fontWeight: 800, letterSpacing: '1px' }}>SECURE_SESSION</span>
        </div>
      </div>


      <style>{`
        @keyframes shimmer-text {
          to { background-position: 200% center; }
        }
      `}</style>
    </motion.div>
  );
}



// ── App Component ────────────────────────────────────────────
// Controls app-level state: shows Loader for 2.4s,
// then fades in the full site content.
function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Only show loader on first home load of session
  const isHomePage = currentPath === '/' || currentPath === '/home';
  const hasShownSplash = typeof window !== 'undefined' && sessionStorage.getItem('klanvision_splash_shown') === 'true';
  const [loading, setLoading] = useState(isHomePage && !hasShownSplash);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('klanvision_theme') || 'dark';
  });
  const [activeBot, setActiveBot] = useState(null);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('klanvision_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Hide loader after 2400ms – only runs when on the home page for the first time in session
  useEffect(() => {
    if (!isHomePage || hasShownSplash) return;
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('klanvision_splash_shown', 'true');
    }, 2400);
    return () => clearTimeout(t);   // cleanup on unmount
  }, [isHomePage, hasShownSplash]);

  // Auto-scroll to section ID when hash is present in URL (e.g. /#services)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, loading ? 2500 : 300);
      return () => clearTimeout(timer);
    }
  }, [location, loading]);



  if (currentPath === '/admin') {
    return <AdminPanel />;
  }
  if (currentPath === '/admin/reset-password') {
    return <ResetPassword />;
  }
  if (currentPath === '/test') {
    return (
      <>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AssessmentPortal />
        <Footer />
      </>
    );
  }
  if (currentPath.startsWith('/test/')) {
    const parsedTestId = currentPath.split('/')[2];
    return <Engine testId={parsedTestId} />;
  }
  if (currentPath === '/verify' || currentPath === '/verify/' || currentPath === '/verify-certificate' || currentPath.startsWith('/verify/')) {
    const certNum = currentPath.startsWith('/verify/') ? currentPath.substring(8) : '';
    return <VerificationPortal certificateNumber={certNum} />;
  }

  return (
    <>
      {/* AnimatePresence handles the fade-out exit animation of Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {/* Main site content – fades in after loader exits */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Fixed navigation bar at the top */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />


          {/* Page sections in scroll order */}
          <main>
            {currentPath === '/faq' && <FAQPage />}
            {currentPath === '/refund-policy' && <RefundPolicyPage />}
            {currentPath === '/privacy-policy' && <PrivacyPolicyPage />}
            {currentPath === '/service-policy' && <ServicePolicyPage />}
            {currentPath === '/terms' && <TermsPage />}
            {currentPath === '/plans' && <PlansPage />}
            {currentPath === '/it-consultation' && <ConsultationPage />}
            {currentPath === '/managed-services' && <ManagedServicesPage />}
            {currentPath === '/cybersecurity' && <CybersecurityPage />}
            {currentPath === '/web-development' && <WebDevelopmentPage />}
            {currentPath === '/mobile-app' && <MobileAppPage />}
            {currentPath === '/cloud-services' && <CloudServicesPage />}
            {currentPath === '/upgrade-migration' && <UpgradeMigrationPage />}
            {currentPath === '/api-integration' && <APIIntegrationPage />}
            {currentPath === '/careers' && <CareersPage />}
            {currentPath === '/apply' && <JobApplicationPage />}
            {currentPath === '/services' && <ServicesPage />}
            {currentPath === '/portfolio' && <PortfolioPage />}
            {currentPath === '/blog' && <BlogPage />}
            {currentPath === '/about' && <AboutPage />}
            {currentPath === '/contact' && <ContactPage />}
            {currentPath === '/verify-authentic' && <AuthenticVerificationPage />}
            {currentPath === '/verify-protection' && <DataProtectionPage />}
            {currentPath === '/verify-database' && <TrustedDatabasePage />}
            {currentPath === '/verify-global' && <GlobalAcceptancePage />}
            {(currentPath === '/' || currentPath === '/home') && (
              <>
                <Hero />                  {/* Full-screen hero with heading, CTA, and image */}
                <StrategicServices />     {/* 8-card digital services overview grid */}
                <ServicesSection />       {/* Detailed 8-card service offerings */}
                <WhyPartner />            {/* Reasons to partner + animated stats + CTA banner */}
                <PortfolioSection />      {/* Filterable project portfolio grid */}
                <TestimonialsSection />   {/* Client testimonials + trust badges */}
                <BlogSection />           {/* 6 blog article cards */}
                <AboutSection />          {/* Company info, milestones, and highlights */}
                <ContactSection />        {/* Contact form + info card + support image */}
              </>
            )}
          </main>

          {/* Site footer with brand, links, legal, and contact info */}
          <Footer />

          {/* Sidebar Overlay */}
          <AnimatePresence>
            {activeBot && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveBot(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 10000,
                  cursor: 'pointer'
                }}
              />
            )}
          </AnimatePresence>

          {/* Chat Assistants */}
          <AIAssistant 
            isOpen={activeBot === 'ai'} 
            onToggle={() => setActiveBot(prev => prev === 'ai' ? null : 'ai')} 
            isVisible={activeBot === null || activeBot === 'ai'}
          />

          <WhatsAppAssistant 
            isOpen={activeBot === 'whatsapp'} 
            onToggle={() => setActiveBot(prev => prev === 'whatsapp' ? null : 'whatsapp')} 
            isVisible={activeBot === null || activeBot === 'whatsapp'}
          />
        </motion.div>

      )}
    </>
  );
}

export default App;
