import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Rocket, Smile } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      desc: "End-to-end encryption and proctoring ensure integrity and confidentiality.",
      color: "from-indigo-500 to-purple-500",
      shadow: "shadow-indigo-500/20",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(99,102,241,0.4)] hover:border-indigo-500/50"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      desc: "Real-time insights and detailed reports to track performance effectively.",
      color: "from-pink-500 to-orange-400",
      shadow: "shadow-pink-500/20",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(236,72,153,0.4)] hover:border-pink-500/50"
    },
    {
      icon: Rocket,
      title: "Flexible & Scalable",
      desc: "From small tests to large-scale assessments, we've got you covered.",
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(168,85,247,0.4)] hover:border-purple-500/50"
    },
    {
      icon: Smile,
      title: "User Friendly",
      desc: "Intuitive interface for both candidates and administrators.",
      color: "from-yellow-400 to-orange-500",
      shadow: "shadow-yellow-500/20",
      cardGlow: "hover:shadow-[0_15px_50px_-12px_rgba(234,179,8,0.4)] hover:border-yellow-500/50"
    }
  ];

  return (
    <div className="pt-16 pb-32 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">Powerful Features</h4>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Everything You Need for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
              Seamless Assessments
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`bg-[#0B1021] border border-white/5 p-8 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-2 ${feat.cardGlow}`}
            >
              <div className="flex justify-center mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center shadow-lg ${feat.shadow}`}>
                  <feat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 text-center">{feat.title}</h3>
              <p className="text-slate-400 text-center text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
