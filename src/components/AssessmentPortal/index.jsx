import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import TrustedPartners from './TrustedPartners';
import FeaturesSection from './FeaturesSection';
import ProcessSection from './ProcessSection';
import CTASection from './CTASection';
import StatsFooter from './StatsFooter';

export default function AssessmentPortal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden bg-gradient-to-b from-[#0B061A] via-[#150A30] to-[#0B061A]">
      
      {/* Global subtle hexagon/grid pattern overlay for the whole page */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
      <div className="relative z-10">
        <HeroSection />
        <TrustedPartners />
        <FeaturesSection />
        <ProcessSection />
        <CTASection />
        <StatsFooter />
      </div>
    </div>
  );
}
