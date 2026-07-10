import React from 'react';

export default function StatsFooter() {
  const stats = [
    { imgSrc: "/images/stat_users.png", value: "20,000+", label: "Assessments Completed", color: "text-purple-400" },
    { imgSrc: "/images/stat_buildings.png", value: "50+", label: "Partner Companies", color: "text-cyan-400" },
    { imgSrc: "/images/stat_satisfaction.png", value: "98%", label: "Candidate Satisfaction", color: "text-orange-400" },
    { imgSrc: "/images/stat_support.png", value: "24/7", label: "Support Available", color: "text-yellow-400" }
  ];

  return (
    <div className="bg-transparent pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0A0F1C] border border-white/5 rounded-3xl p-6 flex flex-col xl:flex-row items-center xl:items-start gap-5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-white/10 hover:-translate-y-2 transition-all duration-300 group text-center xl:text-left">
            <div className="relative w-16 h-16 xl:w-16 xl:h-16 flex-shrink-0 flex items-center justify-center">
              <img src={stat.imgSrc} alt={stat.label} className="w-full h-full object-contain scale-[1.5] group-hover:scale-[1.7] transition-transform duration-500 mix-blend-screen" />
            </div>
            <div className="flex-1">
              <div className="text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">{stat.value}</div>
              <div className={`text-xs font-bold ${stat.color} uppercase tracking-wider mt-1.5 leading-tight`}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
