import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BarChart3, Zap, Users, Building2, Award, Lock, ChevronRight, Play, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function HeroSection() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter an assessment code");
      return;
    }
    
    setIsChecking(true);
    setError(null);
    
    try {
      const exam = await api.getExam(code.trim());
      if (exam && exam.id) {
        navigate(`/test/${code.trim()}?guest=true`);
      } else {
        setError("Invalid Assessment Code. Please check and try again.");
      }
    } catch (err) {
      setError("Invalid Assessment Code. Please check and try again.");
    } finally {
      setIsChecking(false);
    }
  };

  // Custom shadows mapped to requested styles
  const premiumShadows = {
    cardOuter: '0 20px 60px rgba(0,0,0,.45)',
    purpleGlow: '0 0 25px rgba(139,92,246,.30)',
    pinkGlow: '0 0 45px rgba(255,95,168,.18)'
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden font-['Inter'] bg-transparent">

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dark subtle overlay for text readability without being pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B061A]/30 to-[#0B061A]/80 z-10" />

        {/* Futuristic Grid */}
        <div className="absolute inset-0 opacity-[0.03] z-10"
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Ambient Glows */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-pink-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px]"
        />
        <div className="absolute bottom-[30%] left-[30%] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1280px] mx-auto w-full relative z-20" style={{ padding: '120px 32px' }}>
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[70px] items-stretch justify-between mt-10">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[48%] flex flex-col items-start">

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-full overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.3)] mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#9333EA] to-[#4F46E5]" />
              <span className="relative z-10 block text-white font-[600]" style={{ fontSize: 13, padding: '11px 28px' }}>
                ENTERPRISE TESTING SUITE
              </span>
            </motion.button>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-[800] text-white tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.1, filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}
            >
              Klanvision<br />
              <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x bg-[length:200%_auto]">
                Assessment Portal
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-[400] text-[#B8C2D6] mb-12"
              style={{ maxWidth: 480, fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)', lineHeight: '1.8' }}
            >
              Your secure gateway to enterprise assessments, AI-powered evaluations, skill verification, and real-time performance analytics with enterprise-grade security.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-5 mb-14"
            >
              {[
                { text: "Secure & Confidential Assessments", icon: Shield },
                { text: "Real-Time Performance Analytics", icon: BarChart3 },
                { text: "Seamless & User-Friendly Experience", icon: Zap }
              ].map((feat, i) => (
                <div key={i} className="group flex items-center gap-4 cursor-pointer">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/30 rounded-full blur group-hover:bg-purple-500/60 transition-all duration-300" />
                    <div className="relative w-10 h-10 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <div className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-50" />
                      <feat.icon className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <span className="text-[16px] font-[500] text-[#B8C2D6] group-hover:text-white transition-colors">
                    {feat.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-5 w-full">
              {[
                { val: "20K+", label: "Tests Conducted", imgSrc: "/images/icon_hero_tests.png" },
                { val: "50+", label: "Enterprises", imgSrc: "/images/icon_hero_enterprises.png" },
                { val: "98%", label: "Success Rate", imgSrc: "/images/icon_hero_success.png" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                  whileHover={{ y: -5 }}
                  className="relative group h-full"
                >
                  {/* Multicolor animated gradient outer glow (unclipped box shade) */}
                  <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x opacity-20 blur-md group-hover:opacity-50 transition-opacity duration-500" />

                  {/* Border Container (Clipped) */}
                  <div className="relative h-full p-[1px] rounded-[24px] overflow-hidden">
                    {/* Multicolor animated gradient border flow */}
                    <div className="absolute -inset-[50%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Card Content */}
                    <div className="relative h-full bg-[#040B14] backdrop-blur-[24px] rounded-[23px] p-6 flex flex-col items-center justify-center text-center shadow-[inset_0_0_20px_rgba(139,92,246,0.05)]">

                      {/* Centered Icon with Glow */}
                      <div className="relative mb-4 flex items-center justify-center">
                        <img src={stat.imgSrc} alt={stat.label} className="w-16 h-16 object-contain scale-[1.3] group-hover:scale-[1.5] transition-transform duration-500 mix-blend-screen relative z-10" />
                      </div>

                      <div className="text-2xl font-[800] text-white mb-2 tracking-tight" style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                        {stat.val}
                      </div>
                      <div className="text-[12px] font-[500] text-[#B8C2D6] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN (55%) */}
          <div className="w-full lg:w-[55%] flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[540px] h-full flex flex-col"
            >
              {/* Thin Outer Glowing Gradient Border */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-pink-600/40 rounded-[28px] blur-[2px]" />
              <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[28px] opacity-50" />

              {/* Main Card Background */}
              <div className="relative bg-[#0B1021] rounded-[27px] p-10 flex-1 flex flex-col items-center justify-between">

                <div className="w-full flex flex-col items-center justify-center h-full">
                  {/* Logo */}
                  <div className="mb-6 flex justify-center w-full">
                    <div className="relative">
                      {/* Glow behind logo */}
                      <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                      <img src="/images/Transparent_Logo.png" alt="Klanvision Logo" className="relative z-10 h-24 object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  {/* Welcome Heading */}
                  <div className="text-center mb-8">
                    <h2 className="text-[28px] font-[700] text-white mb-2 tracking-tight">Welcome Back!</h2>
                    <p className="text-[16px] font-[400] text-[#A0ABC0]">Enter your assessment code to begin</p>
                  </div>

                  {/* Inner Form Container */}
                  <div className="w-full bg-[#0E1528] rounded-[20px] border border-white/5 p-6 mb-8">

                    {/* Label and Icon Row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center relative flex-shrink-0">
                        <img src="/images/icon_hero_security_shield.png" alt="Assessment Code Security" className="w-full h-full object-contain scale-[1.5] mix-blend-screen" />
                      </div>
                      <label className="text-[14px] font-[500] text-[#A0ABC0]">
                        Enter Assessment Code
                      </label>
                    </div>

                    <form onSubmit={handleStart} className="space-y-6">
                      <div className="relative group">
                        <div className={`absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-[12px] blur-[2px] transition-opacity duration-300 ${isFocused ? 'opacity-50' : 'opacity-0'}`} />
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                            if (error) setError(null);
                          }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          placeholder="e.g. KV-IT-XXX-XXXX-XXXX"
                          className={`relative z-10 w-full h-[54px] bg-[#131A30] border ${error ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] px-5 text-white text-[15px] focus:outline-none focus:border-transparent transition-all placeholder:text-[#4A5568]`}
                        />
                      </div>
                      
                      <AnimatePresence>
                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-lg text-[13.5px] font-[500] shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                          >
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="relative w-full h-[54px] rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                      >
                        {/* Gradient background matching image: Blue -> Purple -> Pink/Orange */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#F97316]" />

                        <span className="relative z-10 flex items-center justify-center gap-2 text-white font-[600] text-[16px]">
                          {isChecking ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Verifying Code...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current" />
                              Access Assessment
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </div>
                </div>

                {/* Trust & Status Highlights */}
                <div className="grid grid-cols-2 gap-3 w-full mb-6">
                  <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-2.5 hover:bg-white/[0.06] transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-[600] text-white tracking-wide truncate">System Status: Optimal</div>
                      <div className="text-[10px] text-[#8B95A5] mt-0.5 truncate">AI-Proctoring active</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-2.5 hover:bg-white/[0.06] transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                      <Shield className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-[600] text-white tracking-wide truncate">Enterprise Certified</div>
                      <div className="text-[10px] text-[#8B95A5] mt-0.5 truncate">ISO 27001 standard</div>
                    </div>
                  </div>
                </div>

                {/* Security Label */}
                <div className="flex items-center justify-center gap-2 text-[#6B7280] text-[13px] font-[400] mt-8 pt-6 border-t border-white/5 w-full">
                  <Lock className="w-4 h-4" />
                  Secure, Encrypted & Trusted
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
      `}} />
    </div>
  );
}
