import React, { useEffect, useState } from "react";
import { ArrowLeft, Rocket, FileText, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

export function FinalSubmission({ answeredCount, totalQuestions, unansweredCount, onBack, onConfirm }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Falling star-crystal rain — 30 deterministic particles
  const fallingStars = [
    { left:  3, delay: 0,    dur: 3.8, size: 7,  type: "diamond", color: "#818CF8", opacity: 0.85 },
    { left:  8, delay: 1.5,  dur: 4.2, size: 5,  type: "star4",   color: "#00F2FE", opacity: 0.70 },
    { left: 13, delay: 0.3,  dur: 5.0, size: 9,  type: "diamond", color: "#A78BFA", opacity: 0.80 },
    { left: 18, delay: 2.1,  dur: 3.5, size: 4,  type: "star4",   color: "#60A5FA", opacity: 0.65 },
    { left: 23, delay: 0.8,  dur: 4.6, size: 8,  type: "diamond", color: "#00F2FE", opacity: 0.75 },
    { left: 28, delay: 1.9,  dur: 3.2, size: 6,  type: "star4",   color: "#818CF8", opacity: 0.90 },
    { left: 33, delay: 0.5,  dur: 4.9, size: 10, type: "diamond", color: "#A78BFA", opacity: 0.70 },
    { left: 38, delay: 2.7,  dur: 3.7, size: 5,  type: "star4",   color: "#00F2FE", opacity: 0.80 },
    { left: 43, delay: 1.1,  dur: 5.3, size: 7,  type: "diamond", color: "#60A5FA", opacity: 0.75 },
    { left: 48, delay: 0.2,  dur: 4.0, size: 4,  type: "star4",   color: "#818CF8", opacity: 0.85 },
    { left: 53, delay: 3.0,  dur: 3.6, size: 9,  type: "diamond", color: "#A78BFA", opacity: 0.65 },
    { left: 58, delay: 1.4,  dur: 4.4, size: 6,  type: "star4",   color: "#00F2FE", opacity: 0.78 },
    { left: 63, delay: 0.7,  dur: 5.1, size: 8,  type: "diamond", color: "#818CF8", opacity: 0.72 },
    { left: 68, delay: 2.3,  dur: 3.9, size: 5,  type: "star4",   color: "#60A5FA", opacity: 0.88 },
    { left: 73, delay: 1.0,  dur: 4.7, size: 10, type: "diamond", color: "#A78BFA", opacity: 0.68 },
    { left: 78, delay: 0.4,  dur: 3.4, size: 4,  type: "star4",   color: "#00F2FE", opacity: 0.82 },
    { left: 83, delay: 2.8,  dur: 5.2, size: 7,  type: "diamond", color: "#818CF8", opacity: 0.74 },
    { left: 88, delay: 1.6,  dur: 4.1, size: 6,  type: "star4",   color: "#A78BFA", opacity: 0.78 },
    { left: 93, delay: 0.9,  dur: 3.3, size: 9,  type: "diamond", color: "#60A5FA", opacity: 0.70 },
    { left: 97, delay: 2.4,  dur: 4.8, size: 5,  type: "star4",   color: "#00F2FE", opacity: 0.86 },
    { left:  5, delay: 3.5,  dur: 4.3, size: 6,  type: "diamond", color: "#A78BFA", opacity: 0.72 },
    { left: 15, delay: 1.8,  dur: 3.1, size: 4,  type: "star4",   color: "#818CF8", opacity: 0.88 },
    { left: 25, delay: 0.6,  dur: 5.5, size: 8,  type: "diamond", color: "#00F2FE", opacity: 0.68 },
    { left: 35, delay: 2.2,  dur: 4.0, size: 5,  type: "star4",   color: "#60A5FA", opacity: 0.80 },
    { left: 45, delay: 1.3,  dur: 3.6, size: 7,  type: "diamond", color: "#A78BFA", opacity: 0.76 },
    { left: 55, delay: 3.2,  dur: 4.5, size: 4,  type: "star4",   color: "#818CF8", opacity: 0.84 },
    { left: 65, delay: 0.1,  dur: 5.0, size: 9,  type: "diamond", color: "#00F2FE", opacity: 0.70 },
    { left: 75, delay: 2.6,  dur: 3.8, size: 6,  type: "star4",   color: "#A78BFA", opacity: 0.78 },
    { left: 85, delay: 1.2,  dur: 4.6, size: 8,  type: "diamond", color: "#60A5FA", opacity: 0.74 },
    { left: 91, delay: 0.4,  dur: 3.2, size: 5,  type: "star4",   color: "#818CF8", opacity: 0.90 },
    { left: 11, delay: 2.9,  dur: 4.9, size: 7,  type: "diamond", color: "#00F2FE", opacity: 0.66 },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(2,5,18,0.50)", backdropFilter: "blur(6px)" }}
    >
      {/* ── Falling star-crystal rain keyframes ── */}
      <style>{`
        @keyframes fallDown {
          0%   { transform: translateY(-60px) rotate(0deg);   opacity: 0; }
          8%   { opacity: var(--star-op); }
          90%  { opacity: var(--star-op); }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes professionalWave {
          0%   { transform: scale(0.8); opacity: 0; }
          20%  { opacity: 0.55; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .wave-ring   { position:absolute; width:140px; height:140px; border-radius:9999px; pointer-events:none; z-index:0; }
        .wave-ring-1 { animation: professionalWave 3.6s cubic-bezier(0.16,1,0.3,1) infinite 0s; }
        .wave-ring-2 { animation: professionalWave 3.6s cubic-bezier(0.16,1,0.3,1) infinite 1.2s; }
        .wave-ring-3 { animation: professionalWave 3.6s cubic-bezier(0.16,1,0.3,1) infinite 2.4s; }
      `}</style>

      {/* ── Falling star-crystal rain particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingStars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.left}%`,
              top: "-60px",
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--star-op": s.opacity,
              background: s.type === "diamond" ? s.color : "transparent",
              clipPath: s.type === "diamond"
                ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                : "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              color: s.color,
              filter: `drop-shadow(0 0 ${s.size * 0.8}px ${s.color})`,
              animation: `fallDown ${s.dur}s ease-in ${s.delay}s infinite`,
              opacity: 0,
              zIndex: 1,
              boxShadow: s.type === "star4" ? `0 0 ${s.size}px ${s.color}` : "none",
            }}
          />
        ))}
      </div>

      {/* ── Main Glassmorphism Card ── */}
      <div
        className={`relative w-full max-w-[480px] mx-4 rounded-2xl border border-[#1A2244]/80 overflow-hidden transition-all duration-300 ${mounted ? "translate-y-0 scale-100" : "translate-y-4 scale-95"}`}
        style={{
          background: "rgba(7,13,31,0.62)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="px-8 py-10 flex flex-col items-center text-center gap-6">

          {/* Company logo — zoom on hover + professional wave rings */}
          <div className="relative flex items-center justify-center w-36 h-36 shrink-0 group cursor-pointer">
            <div className="wave-ring wave-ring-1 border border-[#00F2FE]/30" />
            <div className="wave-ring wave-ring-2 border border-[#818CF8]/20" />
            <div className="wave-ring wave-ring-3 border border-[#A78BFA]/10" />

            {/* Logo — zooms smoothly on hover */}
            <div className="relative w-36 h-36 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
              <img
                src="/images/Company_Logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(129,140,248,0.5)]"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-[28px] font-[900] uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00F2FE] via-[#818CF8] to-[#A78BFA] font-['Outfit'] drop-shadow-[0_2px_15px_rgba(129,140,248,0.2)]">
              Final Submission
            </h1>
            <p className="text-[12.5px] text-slate-500 font-semibold font-['Outfit']">
              Assessment Summary &amp; Confirmation
            </p>
          </div>

          {/* Stats text */}
          <div className="space-y-1 font-['Outfit']">
            <p className="text-[15px] font-semibold text-slate-200 leading-snug">
              You have answered{" "}
              <span className="text-emerald-400 font-bold">{answeredCount}</span>{" "}
              out of{" "}
              <span className="text-indigo-400 font-bold">{totalQuestions}</span>{" "}
              questions.
            </p>
            {unansweredCount > 0 && (
              <p className="text-[15px] font-bold text-amber-400">
                {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} are unanswered.
              </p>
            )}
            <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-2">
              Are you sure you want to finish the test?<br />
              You cannot change your answers after submission.
            </p>
          </div>

          {/* 3 stat mini cards */}
          <div className="w-full grid grid-cols-3 divide-x divide-[#1A2244] rounded-xl overflow-hidden border border-[#1A2244]"
               style={{ background: "rgba(4,10,24,0.55)", backdropFilter: "blur(10px)" }}>
            <div className="flex flex-col items-center gap-1.5 py-3 px-1">
              <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
                <FileText className="w-4.5 h-4.5 text-indigo-400" />
              </div>
              <div className="font-['Outfit'] text-center">
                <p className="text-[7.5px] font-black uppercase tracking-widest text-slate-500">Total</p>
                <p className="text-[20px] font-black text-white leading-none mt-0.5">{totalQuestions}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-1">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
              </div>
              <div className="font-['Outfit'] text-center">
                <p className="text-[7.5px] font-black uppercase tracking-widest text-slate-500">Answered</p>
                <p className="text-[20px] font-black text-emerald-400 leading-none mt-0.5">{answeredCount}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 px-1">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <HelpCircle className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div className="font-['Outfit'] text-center">
                <p className="text-[7.5px] font-black uppercase tracking-widest text-slate-500">Unanswered</p>
                <p className="text-[20px] font-black text-amber-400 leading-none mt-0.5">{unansweredCount}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3 mt-1">
            <Button
              variant="outline"
              onClick={onBack}
              className="group h-12 flex items-center justify-center gap-2.5 font-extrabold uppercase tracking-wider text-[11px] font-['Outfit'] border-[#202750] !bg-[#050B1E]/70 text-[#A5B4FC] hover:!text-white hover:!bg-[#0C122C]/80 hover:border-slate-400 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(165,180,252,0.25)] transition-all duration-300 rounded-xl whitespace-nowrap"
            >
              <ArrowLeft className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Test
            </Button>

            <Button
              onClick={onConfirm}
              className="group relative overflow-hidden h-12 flex items-center justify-center gap-2.5 font-extrabold uppercase tracking-wider text-[11px] font-['Outfit'] bg-gradient-to-r from-indigo-600 to-[#2E6FF3] hover:from-indigo-700 hover:to-[#1754D7] text-white border-0 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.55)] hover:scale-[1.02] transition-all duration-300 rounded-xl whitespace-nowrap"
            >
              <span className="relative flex shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/25 animate-ping opacity-75" />
                <Rocket className="relative w-5 h-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:rotate-[-30deg]" />
              </span>
              Submit Assessment
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
