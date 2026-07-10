import React, { useMemo } from "react";
import { CheckCircle2, Bookmark, Eye, Clock, ShieldCheck, Check, Info, Send, Sparkles, Circle } from "lucide-react";
import { Button } from "../ui/button";

export function Sidebar({
  studentName,
  sections,
  currentQuestionIndex,
  answers,
  markedForReview,
  visitedQuestions,
  onNavigate,
  onSubmit,
  disableSubmit,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  // Helpers to check status
  const getQuestionStatus = (qId) => {
    const isAnswered = !!answers[qId];
    const isMarked = !!markedForReview[qId];
    const isVisited = !!visitedQuestions[qId];

    if (isMarked) return "marked";
    if (isAnswered) return "answered";
    if (isVisited) return "visited";
    return "unvisited";
  };

  // Helper to count total statistics
  const totalQuestions = useMemo(() => sections.reduce((sum, s) => sum + s.questions.length, 0), [sections]);
  const answeredTotal = useMemo(() => Object.values(answers).filter(val => val !== null && val !== undefined && val !== "").length, [answers]);
  const markedTotal = useMemo(() => Object.values(markedForReview).filter(Boolean).length, [markedForReview]);
  const visitedTotal = useMemo(() => Object.values(visitedQuestions).filter(Boolean).length, [visitedQuestions]);
  const unansweredTotal = totalQuestions - answeredTotal;

  // Percentage calculations
  const answeredPct = Math.round((answeredTotal / totalQuestions) * 100) || 0;
  const markedPct = Math.round((markedTotal / totalQuestions) * 100) || 0;
  const visitedPct = Math.round((visitedTotal / totalQuestions) * 100) || 0;
  const unansweredPct = Math.round((unansweredTotal / totalQuestions) * 100) || 0;

  // SVG Radial Circle metrics
  const radius = 26;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (answeredPct / 100) * circumference;

  // Status-specific classes for question grid indicators
  const getButtonStyles = (status, isActive) => {
    let base = "h-9 w-9 text-xs font-black rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer relative ";
    if (isActive) {
      base += "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#040819] ";
    }
    
    switch (status) {
      case "answered":
        return base + "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20";
      case "marked":
        return base + "bg-purple-500/15 border-purple-500/40 text-purple-400 hover:bg-purple-500/25";
      case "visited":
        return base + "bg-blue-500/10 border-blue-500/40 text-blue-400 hover:bg-blue-500/20";
      default:
        return base + "bg-[#050B1E]/80 border-[#1E295D]/30 text-slate-500 hover:border-[#1E295D]/60";
    }
  };

  const getButtonIcon = (status) => {
    switch (status) {
      case "answered":
        return <Check className="w-2.5 h-2.5 text-emerald-400 absolute bottom-1 right-1 stroke-[4]" />;
      case "marked":
        return <Bookmark className="w-2.5 h-2.5 text-purple-400 absolute bottom-1 right-1 fill-current" />;
      case "visited":
        return <Eye className="w-2.5 h-2.5 text-blue-400 absolute bottom-1 right-1" />;
      default:
        return null;
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-40 lg:relative lg:inset-y-0 w-80 bg-[#040819] border-l border-[#111A35]/80 flex flex-col h-full transform transition-transform duration-300 ease-in-out select-none font-sans
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
    >
      {/* Legend Block / Header */}
      <div className="p-6 border-b border-[#1E295D]/15">
        <h3 className="text-[12px] font-black uppercase text-[#8B9BB4] tracking-widest font-['Outfit'] mb-4 leading-none">
          QUESTION NAVIGATION
        </h3>
        
        {/* Legendary indicator list */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 font-['Outfit']">
          <div className="group flex items-center gap-3 cursor-default hover:scale-105 transition-transform duration-300">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <Check className="w-4 h-4 stroke-[4] animate-pulse" />
            </div>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">Answered</span>
          </div>

          <div className="group flex items-center gap-3 cursor-default hover:scale-105 transition-transform duration-300">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <Bookmark className="w-3.5 h-3.5 fill-current animate-bounce" />
            </div>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">Marked</span>
          </div>

          <div className="group flex items-center gap-3 cursor-default hover:scale-105 transition-transform duration-300">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <Eye className="w-4 h-4 animate-[pulse_2s_infinite]" />
            </div>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">Visited</span>
          </div>

          <div className="group flex items-center gap-3 cursor-default hover:scale-105 transition-transform duration-300">
            <div className="w-7 h-7 rounded-lg bg-[#050B1E] border border-[#1E295D]/30 flex items-center justify-center text-slate-500 shadow-[0_0_10px_rgba(30,41,93,0.1)]">
              <Circle className="w-3.5 h-3.5 animate-[pulse_3s_infinite]" />
            </div>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">Unvisited</span>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="flex-1 overflow-y-auto p-6 space-y-7">
        {sections.map((sec, secIdx) => (
          <div key={sec.id || secIdx} className="space-y-4 text-left">
            <h4 className="text-[10.5px] font-black text-[#8B9BB4]/85 uppercase tracking-widest font-['Outfit'] leading-none">
              {sec.name}
            </h4>
            <div className="grid grid-cols-5 gap-3">
              {sec.questions.map((q, idx) => {
                const qGlobalIndex = sections.slice(0, secIdx).reduce((sum, s) => sum + s.questions.length, 0) + idx;
                const status = getQuestionStatus(q.id);
                const isActive = currentQuestionIndex === qGlobalIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => onNavigate(qGlobalIndex)}
                    className={getButtonStyles(status, isActive)}
                  >
                    {(qGlobalIndex + 1).toString().padStart(2, "0")}
                    {getButtonIcon(status)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview Section */}
      <div className="p-6 border-t border-[#1E295D]/15 bg-[#030614]/50 space-y-5">
        <h4 className="text-[10.5px] font-black text-[#8B9BB4]/80 uppercase tracking-widest font-['Outfit'] leading-none text-left">
          PROGRESS OVERVIEW
        </h4>
        
        <div className="flex items-center gap-6 bg-[#050B1E] border border-[#111A35] rounded-2xl p-5.5 shadow-inner">
          {/* Radial Chart Container - Resized to w-24 h-24 */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                className="text-slate-800"
                strokeWidth={5}
                stroke="currentColor"
                fill="transparent"
                r={38}
                cx="48"
                cy="48"
              />
              <circle
                className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                strokeWidth={5}
                strokeDasharray={238.76}
                strokeDashoffset={238.76 - (answeredPct / 100) * 238.76}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={38}
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center font-['Outfit']">
              <span className="text-[17px] font-black text-white leading-none">{answeredPct}%</span>
              <span className="text-[8.5px] text-slate-500 font-extrabold uppercase tracking-wider mt-1">{answeredTotal}/{totalQuestions} Qs</span>
            </div>
          </div>

          {/* Statistics columns list */}
          <div className="flex-1 space-y-2 text-[11px] font-semibold text-slate-400 font-['Outfit']">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Answered</span>
              </div>
              <span className="text-white font-extrabold">{answeredTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Marked</span>
              </div>
              <span className="text-white font-extrabold">{markedTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Visited</span>
              </div>
              <span className="text-white font-extrabold">{visitedTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span>Left</span>
              </div>
              <span className="text-white font-extrabold">{unansweredTotal}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="space-y-2">
          <Button
            onClick={onSubmit}
            className="group w-full py-6 font-extrabold uppercase tracking-wider text-[11.5px] font-['Outfit'] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border-0 flex items-center justify-center gap-2 hover:scale-[1.03] transition-all duration-300 transform"
          >
            Submit Assessment
            <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </Button>
          <div className="flex items-center justify-center gap-1 mt-2 text-[8.5px] text-slate-500 font-semibold uppercase tracking-wider font-['Outfit']">
            You can review your answers before submission
          </div>
        </div>
      </div>

      {/* Mobile close overlay button */}
      {isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 -left-80 bg-black/40 z-[-1] backdrop-blur-sm cursor-pointer"
        />
      )}
    </aside>
  );
}
