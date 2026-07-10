import React from 'react';
import { Server, Database, Layers, Cloud, Activity, Code, Globe, Box, Target, Cpu, Shield, Zap, Compass, Hexagon, Terminal, Command, Briefcase, Monitor, Lock, Link, Rocket } from 'lucide-react';

export default function TrustedPartners() {
  // 30 Enterprise tech, consulting, and B2B companies with attractive text gradients and matching tech icons
  const companies = [
    { name: 'IBM', icon: Server, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-[900] tracking-wider text-[34px]', iconColor: 'text-cyan-400' },
    { name: 'ORACLE', icon: Database, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-[800] tracking-widest text-[28px]', iconColor: 'text-red-500' },
    { name: 'SAP', icon: Layers, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-[900] italic text-[34px]', iconColor: 'text-blue-500' },
    { name: 'Salesforce', icon: Cloud, color: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-[700] text-[30px] tracking-tight', iconColor: 'text-cyan-400' },
    { name: 'CISCO', icon: Activity, color: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-[800] text-[28px] tracking-widest', iconColor: 'text-teal-400' },
    { name: 'accenture', icon: Target, color: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-[700] text-[32px] lowercase tracking-tight', suffix: <span className="text-[#A100FF] ml-1 font-[900]">&gt;</span>, iconColor: 'text-purple-400' },
    { name: 'Capgemini', icon: Globe, color: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 font-[800] text-[28px] tracking-tight', iconColor: 'text-indigo-400' },
    { name: 'Infosys', icon: Code, color: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400 font-[800] text-[30px]', iconColor: 'text-sky-400' },
    { name: 'Atlassian', icon: Box, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-[700] text-[28px]', iconColor: 'text-blue-500' },
    { name: 'Microsoft', icon: Command, color: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 font-[600] text-[28px]', iconColor: 'text-gray-300' },
    { name: 'Google Cloud', icon: Cloud, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400 font-[700] text-[28px]', iconColor: 'text-blue-400' },
    { name: 'AWS', icon: Server, color: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 font-[800] text-[28px] tracking-wider', iconColor: 'text-orange-400' },
    { name: 'Snowflake', icon: Hexagon, color: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-[700] text-[30px]', iconColor: 'text-cyan-300' },
    { name: 'Databricks', icon: Database, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-[800] text-[28px]', iconColor: 'text-red-500' },
    { name: 'Palantir', icon: Shield, color: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-400 font-[900] text-[32px] tracking-widest', iconColor: 'text-slate-300' },
    { name: 'Splunk', icon: Activity, color: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-[800] text-[30px]', iconColor: 'text-pink-500' },
    { name: 'Palo Alto Networks', icon: Lock, color: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-[700] text-[26px]', iconColor: 'text-gray-300' },
    { name: 'CrowdStrike', icon: Zap, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600 font-[900] text-[28px]', iconColor: 'text-red-500' },
    { name: 'Fortinet', icon: Shield, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 font-[800] text-[28px]', iconColor: 'text-red-400' },
    { name: 'ServiceNow', icon: Layers, color: 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 font-[700] text-[30px]', iconColor: 'text-emerald-400' },
    { name: 'Workday', icon: Briefcase, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 font-[800] text-[28px]', iconColor: 'text-blue-400' },
    { name: 'Adobe', icon: Compass, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 font-[900] text-[30px]', iconColor: 'text-red-500' },
    { name: 'Zoom', icon: Monitor, color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 font-[700] text-[32px]', iconColor: 'text-blue-400' },
    { name: 'Slack', icon: Terminal, color: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 font-[800] text-[28px]', iconColor: 'text-purple-400' },
    { name: 'Stripe', icon: Link, color: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-[700] text-[30px]', iconColor: 'text-indigo-400' },
    { name: 'Square', icon: Box, color: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 font-[800] text-[30px]', iconColor: 'text-gray-200' },
    { name: 'Shopify', icon: Target, color: 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-[700] text-[28px]', iconColor: 'text-green-400' },
    { name: 'Twilio', icon: Code, color: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 font-[800] text-[28px]', iconColor: 'text-red-400' },
    { name: 'GitHub', icon: Globe, color: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-400 font-[700] text-[30px]', iconColor: 'text-slate-300' },
    { name: 'GitLab', icon: Rocket, color: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-[800] text-[28px]', iconColor: 'text-orange-400' }
  ];

  // Double the array for seamless infinite scrolling
  const marqueeItems = [...companies, ...companies];

  return (
    <div className="relative py-8 bg-transparent z-10">
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left {
            display: flex;
            width: max-content;
            animation: scroll-left 90s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Widened Container to show more companies */}
      <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Clean, Professional Container Wrapper */}
        <div className="relative w-full shadow-[0_10px_50px_rgba(0,0,0,0.2)]">
          
          {/* Main Card Background */}
          <div className="relative bg-[#0B1021] border border-white/5 rounded-[24px] p-6 lg:py-6 lg:px-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden">
            
            {/* Subtle inner background glow */}
            <div className="absolute top-1/2 left-[20%] w-[400px] h-[150px] bg-blue-600/10 blur-[90px] -translate-y-1/2" />

            {/* LEFT SIDE TEXT */}
            <div className="w-full lg:w-[320px] flex-shrink-0 text-center lg:text-left relative z-30">
              <h3 className="text-[17px] font-[800] italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 uppercase tracking-[0.25em] leading-[1.8] border-l-0 lg:border-l-[6px] lg:border-purple-500/50 lg:pl-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Trusted By Leading Companies Worldwide
              </h3>
            </div>

            {/* RIGHT SIDE SCROLLING MARQUEE */}
            <div className="flex-1 w-full relative overflow-hidden flex items-center 
                            before:absolute before:left-0 before:w-[60px] before:h-full before:bg-gradient-to-r before:from-[#0B1021] before:to-transparent before:z-20 
                            after:absolute after:right-0 after:w-[60px] after:h-full after:bg-gradient-to-l after:from-[#0B1021] after:to-transparent after:z-20">
              <div className="animate-scroll-left flex items-center gap-12 px-4">
                {marqueeItems.map((company, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-md ${company.color}`}
                  >
                    {company.icon && <company.icon className={`w-8 h-8 ${company.iconColor}`} />}
                    {company.name}
                    {company.suffix && company.suffix}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
