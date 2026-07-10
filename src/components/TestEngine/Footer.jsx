import React from "react";
import { ArrowLeft, ArrowRight, Bookmark, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

export function Footer({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  isMarked,
  onMarkForReview,
  onClear,
}) {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 select-none font-sans">
      {/* Left side actions — aligned to options left edge */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <Button
          variant="outline"
          onClick={onClear}
          className="group flex items-center gap-2.5 font-extrabold uppercase tracking-wider text-[11.5px] font-['Outfit'] h-12 px-6 rounded-xl border-[#202750] !bg-[#050B1E] text-[#A5B4FC] hover:!text-white hover:!bg-[#0C122C]/70 hover:border-slate-500 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(165,180,252,0.25)] transition-all duration-300 transform"
        >
          <RotateCcw className="h-4.5 w-4.5 text-current transition-transform duration-500 group-hover:rotate-[-180deg]" />
          Clear Response
        </Button>
        
        <Button
          variant="outline"
          onClick={onMarkForReview}
          className={`group flex items-center gap-2.5 font-extrabold uppercase tracking-wider text-[11.5px] font-['Outfit'] h-12 px-6 rounded-xl transition-all duration-300 !bg-[#050B1E] text-amber-500 hover:!text-amber-400 hover:!bg-amber-500/5 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transform
            ${isMarked
              ? "border-amber-500 bg-amber-500/10 text-amber-400"
              : "border-amber-500/35 hover:border-amber-500/60"}`}
        >
          <Bookmark className={`h-4.5 w-4.5 text-current transition-transform duration-300 group-hover:scale-110 ${isMarked ? 'fill-current' : 'fill-none'}`} />
          {isMarked ? "MARKED FOR REVIEW" : "MARK FOR REVIEW"}
        </Button>
      </div>

      {/* Right side navigation — aligned to options right edge */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <Button
          variant="outline"
          disabled={disablePrevious}
          onClick={onPrevious}
          className="group flex items-center gap-2.5 font-extrabold uppercase tracking-wider text-[11.5px] font-['Outfit'] h-12 px-6 rounded-xl disabled:opacity-20 disabled:pointer-events-none border-[#202750] !bg-[#050B1E] text-[#A5B4FC] hover:!text-white hover:!bg-[#0C122C]/70 hover:border-slate-500 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(165,180,252,0.25)] transition-all duration-300 transform"
        >
          <ArrowLeft className="h-4.5 w-4.5 text-current transition-transform duration-300 group-hover:-translate-x-1" />
          Previous
        </Button>

        <Button
          disabled={disableNext}
          onClick={onNext}
          className="group flex items-center gap-2.5 font-extrabold uppercase tracking-wider text-[11.5px] font-['Outfit'] h-12 px-7 rounded-xl disabled:opacity-20 disabled:pointer-events-none bg-gradient-to-r from-[#7D3AF2] to-[#2E6FF3] hover:from-[#651ED6] hover:to-[#1754D7] border-0 text-white shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(124,58,237,0.45)] transition-all duration-300 transform"
        >
          Save & Next
          <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </footer>
  );
}
