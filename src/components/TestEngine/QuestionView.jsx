import React from "react";
import { Check, Bookmark, AlertCircle, Sparkles } from "lucide-react";

export function QuestionView({ question, index, answer, onAnswer, totalQuestions = 30, hideHeader = false }) {
  const options = [
    { key: "A", text: question.option_a },
    { key: "B", text: question.option_b },
    { key: "C", text: question.option_c },
    { key: "D", text: question.option_d },
  ].filter(opt => opt.text); // Filter out empty options if any

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      case "hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/25";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/25";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 select-none text-left font-sans flex-1 flex flex-col justify-start w-full">
      {/* Question Metadata Header — hidden when parent renders it */}
      {!hideHeader && (
        <div className="flex items-center justify-between border-b border-[#1E295D]/25 pb-4.5">
          <span className="text-[12.5px] font-['Outfit'] font-black uppercase tracking-widest flex items-center gap-2">
            <Bookmark className="w-4.5 h-4.5 text-[#00F2FE] fill-[#00F2FE]/20 drop-shadow-[0_0_8px_rgba(0,242,254,0.65)]" />
            <span className="text-[#8B9BB4]">QUESTION</span> 
            <span className="text-[#818CF8] bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">{(index + 1).toString().padStart(2, "0")}</span>
            <span className="text-slate-600">/</span> 
            <span className="text-slate-400 font-extrabold">{totalQuestions.toString().padStart(2, "0")}</span>
          </span>
          <div className="flex gap-2">
            <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty || "Medium"}
            </span>
            <span className="text-[9.5px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2.5 py-1.5 rounded-lg">
              {question.marks || 1} {question.marks === 1 ? "Mark" : "Marks"}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <h3 className="text-[16.5px] font-extrabold text-[#F8FAFC] leading-relaxed font-['Outfit'] drop-shadow-[0_2px_10px_rgba(99,102,241,0.15)]">
          {question.question_text}
        </h3>
        <p className="text-[11px] text-[#8B9BB4] font-semibold font-['Outfit']">Choose the correct answer</p>
      </div>

      {/* Options Selection Cards */}
      <div className="grid grid-cols-1 gap-2.5">
        {options.map((opt) => {
          const isSelected = answer === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onAnswer(question.id, opt.key)}
              className={`w-full text-left p-3.5 rounded-xl border text-[13px] font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_4px_12px_rgba(0,0,0,0.2)]
                ${isSelected 
                  ? "border-emerald-500/50 bg-[#061C18]/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                  : "border-[#111A35] bg-[#050B1E] hover:bg-white/[0.01] hover:border-[#1F2E5C]"}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Option Index Bubble */}
                <div className={`h-8 w-8 rounded-full font-black flex items-center justify-center border shrink-0 transition-all duration-300 font-['Outfit'] text-[13px]
                  ${isSelected 
                    ? "bg-transparent border-emerald-500 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                    : "bg-[#090F26] border-[#202750] text-[#A5B4FC] group-hover:border-[#2D3775]"}`}
                >
                  {opt.key}
                </div>
                <span className={`text-[13px] leading-relaxed font-semibold font-['Outfit'] transition-colors duration-300
                  ${isSelected ? "text-emerald-400" : "text-slate-300 group-hover:text-white"}`}>
                  {opt.text}
                </span>
              </div>

              {/* Selection Checkbox Ring */}
              <div className="shrink-0 ml-4">
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center text-white shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse">
                    <Check className="w-3.5 h-3.5 stroke-[4.5]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#1E295D]/40 group-hover:border-[#1E295D]/60 transition-colors" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation Banner Block (Rendered if explanation is available) */}
      {question.explanation && (
        <div className="bg-[#061C18] border border-[#10B981]/20 rounded-2xl p-5 text-left flex gap-3.5 shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
          <div className="w-9 h-9 rounded-lg bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center text-[#10B981] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[12px] font-['Outfit'] font-black uppercase text-[#10B981] tracking-wider leading-none">
              Explanation
            </h4>
            <p className="text-[11px] text-slate-300 mt-2 font-medium leading-relaxed font-sans">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
