import React from 'react';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const steps = [
    {
      id: "01",
      title: "Enter Code",
      desc: "Enter the unique assessment code provided by your administrator.",
      color: "from-blue-500 to-cyan-500",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(34,211,238,0.4)] hover:border-cyan-500/50",
      icon: "/images/icon_process_code.png",
      alt: "Enter Code Icon"
    },
    {
      id: "02",
      title: "Verify & Start",
      desc: "System verifies your code and you're ready to begin your assessment.",
      color: "from-green-500 to-emerald-500",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(52,211,153,0.4)] hover:border-emerald-500/50",
      icon: "/images/icon_process_verify.png",
      alt: "Verify Icon"
    },
    {
      id: "03",
      title: "Complete Assessment",
      desc: "Answer questions, solve problems, and showcase your skills.",
      color: "from-purple-500 to-pink-500",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(236,72,153,0.4)] hover:border-pink-500/50",
      icon: "/images/icon_process_test.png",
      alt: "Assessment Icon"
    },
    {
      id: "04",
      title: "Get Results",
      desc: "Receive instant results and detailed performance analytics.",
      color: "from-orange-500 to-yellow-500",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(234,179,8,0.4)] hover:border-yellow-500/50",
      icon: "/images/icon_process_results.png",
      alt: "Results Icon"
    }
  ];


  return (
    <div className="pt-16 pb-32 bg-transparent relative overflow-hidden">

      <style>
        {`
          @keyframes travel-line {
            0% { left: 0%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            10% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            90% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { left: 100%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          }
          .animate-travel-line {
            animation: travel-line 4s infinite linear;
          }
        `}
      </style>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 font-[800] uppercase tracking-[0.25em] text-sm mb-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            Simple Process
          </h4>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 tracking-tight drop-shadow-sm pb-2">How It Works?</h2>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

            {/* The Continuous Piercing Chain at EXACT MIDDLE of card (desktop only) */}
            <div className="absolute top-[170px] left-[12.5%] right-[12.5%] h-[4px] hidden lg:flex items-center justify-between z-0 opacity-100 -translate-y-1/2">
              {/* The structural chain link line */}
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              {/* The glowing colored power-line */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 via-pink-500 to-yellow-500 blur-[3px] opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 via-pink-400 to-yellow-400 rounded-full" />

              {/* Impressive Animation: Traveling Energy Pulses */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="w-[150px] h-full bg-white shadow-[0_0_20px_5px_rgba(255,255,255,1)] animate-travel-pulse absolute top-0" />
                <div className="w-[150px] h-full bg-white shadow-[0_0_20px_5px_rgba(255,255,255,1)] animate-travel-pulse absolute top-0" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>

            {/* Premium Cyber-Chain Nodes (Perfectly aligned in the gaps between the 4 cards) */}
            <div className="absolute top-[170px] left-[25%] -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-8 h-8 rounded-full bg-[#0B1021] items-center justify-center z-10">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-cyan-400/60 animate-[spin_4s_linear_infinite]" />
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_3px_rgba(34,211,238,0.8)] animate-pulse" />
            </div>

            <div className="absolute top-[170px] left-[50%] -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-8 h-8 rounded-full bg-[#0B1021] items-center justify-center z-10">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-emerald-400/60 animate-[spin_4s_linear_infinite]" />
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_3px_rgba(16,185,129,0.8)] animate-pulse" />
            </div>

            <div className="absolute top-[170px] left-[75%] -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-8 h-8 rounded-full bg-[#0B1021] items-center justify-center z-10">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-pink-400/60 animate-[spin_4s_linear_infinite]" />
              <div className="w-2.5 h-2.5 bg-pink-400 rounded-full shadow-[0_0_12px_3px_rgba(236,72,153,0.8)] animate-pulse" />
            </div>

            <style>
              {`
                @keyframes travel-pulse {
                  0% { left: -15%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { left: 110%; opacity: 0; }
                }
                .animate-travel-pulse {
                  animation: travel-pulse 3s infinite linear;
                }
              `}
            </style>

            {/* Hidden SVG filter: makes pure black transparent based on luminance */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <defs>
                <filter id="remove-black-process">
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            1 1 1 1 -1"
                  />
                </filter>
              </defs>
            </svg>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`flex flex-col items-center text-center p-8 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-2 ${step.cardGlow} relative group`}
              >
                {/* The isolated card background at -z-10 so the chain can pass IN FRONT of it */}
                <div className="absolute inset-0 bg-[#0B1021] border border-white/5 rounded-3xl -z-10 group-hover:border-white/20 transition-colors" />

                {/* Icon — SVG icons (no black bg), or img with filter */}
                <div className="w-24 h-24 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  {step.IconComponent ? (
                    <step.IconComponent />
                  ) : (
                    <img
                      src={step.icon}
                      alt={step.alt}
                      draggable="false"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'url(#remove-black-process)',
                        transform: 'scale(1.7)',
                        transition: 'transform 0.5s ease',
                        display: 'block',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.95)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.7)'}
                    />
                  )}
                </div>

                {/* Text wrapped in dark background to explicitly cut the line and create a gap */}
                <div className="text-slate-400 font-[800] text-sm mb-3 tracking-widest relative z-10 bg-[#0B1021] px-6 py-1.5 rounded-full border border-white/5">
                  STEP {step.id}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-slate-400 text-[14px] leading-relaxed max-w-[250px] relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
