import React from 'react';
import { Play } from 'lucide-react';

export default function CTASection() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-8 pb-24 bg-transparent px-6 relative">
      <div className="max-w-7xl mx-auto bg-[#0A0F1C] border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Professional Enterprise Grid Background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row-reverse items-stretch">
          
          {/* Text Content */}
          <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center text-center lg:text-left z-20">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-bold tracking-widest text-xs mb-6 w-fit mx-auto lg:mx-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              TAKE THE NEXT STEP
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-5 leading-[1.15] tracking-tight pb-2">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Assessment?</span>
            </h2>
            
            <p className="text-base md:text-lg text-slate-400 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Enter your secure assessment code now and experience our next-generation enterprise testing environment.
            </p>
            
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] group w-fit mx-auto lg:mx-0"
            >
              <Play className="w-5 h-5 text-white group-hover:animate-pulse" fill="currentColor" />
              Access Assessment Now
            </button>
          </div>
          
          {/* Integrated Image Section */}
          <div className="lg:w-1/2 relative min-h-[350px] lg:min-h-full z-30">
             
             {/* Intense Central Lighting to make the middle of the image pop attractively */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/60 rounded-full blur-[120px] z-0 pointer-events-none" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/70 rounded-full blur-[90px] z-0 pointer-events-none" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/50 rounded-full blur-[60px] z-0 pointer-events-none" />
             
             <img 
               src="/images/intern.png" 
               alt="Intern" 
               className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105 drop-shadow-[30px_0_30px_rgba(0,0,0,0.8)] z-10" 
             />
          </div>
          
        </div>
      </div>
    </div>
  );
}
