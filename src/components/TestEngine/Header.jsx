import { Clock, Shield, Menu, User, FileText, CheckCircle2 } from "lucide-react";

export function Header({
  testName,
  timeLeft,
  formatTime,
  duration,
  questionCount,
  negativeMarking,
  negativeMarks,
  attemptNumber,
  attemptsAllowed,
  orgName,
  orgLogoUrl,
  isSidebarOpen,
  setIsSidebarOpen,
  studentName, // Added studentName to display in the header
}) {
  return (
    <header className="bg-[#040819] text-white border-b border-[#111A35]/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-30 select-none font-sans">
      <div className="flex items-center gap-5 w-full md:w-auto">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 hover:bg-[#0C122C] rounded-lg transition-colors border border-[#1E295D]/30"
        >
          <Menu className="h-5 w-5 text-slate-400" />
        </button>

        <div className="flex items-center gap-4">
          <img
            src="/images/Transparent_Logo.png"
            alt="Klanvision Logo"
            className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(124,58,237,0.4)] shrink-0"
          />
          <img
            src="/images/slogan.png"
            alt="Klanvision Slogan"
            className="h-9 w-auto object-contain border-r border-[#1E295D]/20 pr-6 shrink-0"
          />
        </div>

      </div>
 
      {/* Middle Center Container (Secure Session + Timer) */}
      <div className="flex items-center justify-center gap-5 flex-1 max-w-xl">
        {/* Secure Session (No background box, just text & animation) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
            <span className="animate-[ping_1.8s_ease-in-out_infinite] absolute inline-flex h-[80%] w-[80%] rounded-full bg-emerald-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_12px_#10B981]"></span>
          </div>
          <div>
            <p className="text-[9.5px] font-black tracking-wider text-[#10B981] uppercase leading-none font-['Outfit']">SECURE SESSION</p>
            <p className="text-[8.5px] text-[#8B9BB4] font-semibold mt-0.5 leading-none">Your exam is being monitored</p>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-6 w-[1px] bg-[#1E295D]/20 hidden sm:block" />

        {/* Floating Timer Pill */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#050B1E] border border-[#1E295D]/30 rounded-xl shrink-0">
          <Clock className={`h-4.5 w-4.5 animate-[spin_8s_linear_infinite] ${timeLeft < 180 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
          <span className={`font-mono text-base font-black tracking-widest ${timeLeft < 180 ? 'text-red-500' : 'text-[#10B981]'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-[9px] text-[#8B9BB4] font-black uppercase tracking-wider font-['Outfit'] ml-0.5">REMAINING</span>
        </div>
      </div>

      {/* Right Student & Stats grid */}
      <div className="flex items-center gap-6 text-xs text-[#8B9BB4] w-full md:w-auto justify-between md:justify-end">
        {/* Stat 1: Candidate Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:scale-105 transition-transform duration-300">
            <User className="w-4.5 h-4.5 animate-[pulse_2s_infinite]" />
          </div>
          <div className="text-left">
            <p className="text-[#8B9BB4] font-black uppercase tracking-widest text-[9.5px] font-['Outfit'] leading-none">CANDIDATE</p>
            <p className="text-white font-extrabold mt-1.5 leading-none">{studentName || "Student"}</p>
          </div>
        </div>

        {/* Stat 2: Total Questions */}
        <div className="flex items-center gap-3 border-l border-[#1E295D]/20 pl-6">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:scale-105 transition-transform duration-300">
            <FileText className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="text-left">
            <p className="text-[#8B9BB4] font-black uppercase tracking-widest text-[9.5px] font-['Outfit'] leading-none">TOTAL QUESTIONS</p>
            <p className="text-white font-extrabold mt-1.5 leading-none">{questionCount}</p>
          </div>
        </div>

        {/* Stat 3: Marks */}
        <div className="flex items-center gap-3 border-l border-[#1E295D]/20 pl-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:scale-105 transition-transform duration-300">
            <CheckCircle2 className="w-4.5 h-4.5 animate-bounce" style={{ animationDuration: '3.0s' }} />
          </div>
          <div className="text-left">
            <p className="text-[#8B9BB4] font-black uppercase tracking-widest text-[9.5px] font-['Outfit'] leading-none">MARKS</p>
            <p className="text-white font-extrabold mt-1.5 leading-none">{questionCount * 1}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
