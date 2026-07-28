import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Globe, Gem, Rocket, Smartphone, Zap, Building2, ShieldCheck, Headphones, TrendingUp, Check, ChevronDown } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function PlansPage() {
  useSEO({
    title: 'Pricing & Plans | Klanvision IT Solutions',
    description: 'Explore flexible and scalable plans built for every digital vision. View packages for Website Development and Mobile Application development.',
    keywords: 'pricing, plans, website development, mobile application, basic plan, premium plan, entrepreneur plan',
    canonical: '/plans',
  });

  const [activeTab, setActiveTab] = useState('website'); // 'website' or 'mobile'
  const [expandedPlans, setExpandedPlans] = useState({});

  const toggleExpand = (planName) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planName]: !prev[planName]
    }));
  };

  const websitePlans = [
    {
      badge: null,
      name: "BASIC",
      icon: Globe,
      iconColor: "#A855F7",
      description: "Perfect for startups and small businesses getting started online.",
      features: [
        "Responsive Design (All Devices)",
        "Up to 5 Pages",
        "Contact / Inquiry Form",
        "Basic SEO Optimization",
        "Fast Loading Speed",
        "Social Media Integration",
        "Google Maps Integration",
        "SSL Certificate",
        "Free 3 Months Maintenance",
        "Basic Support"
      ],
      color: "#A855F7",
      glowColor: "rgba(168, 85, 247, 0.45)",
      bgGradient: "linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Globe rotates slowly like Earth — symbolises online presence
      iconAnimation: { rotate: [0, 360] },
      iconTransition: { duration: 8, repeat: Infinity, ease: "linear" }
    },
    {
      badge: "MOST POPULAR",
      name: "PREMIUM",
      icon: Gem,
      iconColor: "#EC4899",
      description: "Ideal for growing businesses that need more power and flexibility.",
      features: [
        "Everything in Basic",
        "Up to 15 Pages",
        "Advanced UI/UX Design",
        "Premium Hosting",
        "Free weekly backups",
        "CMS Admin Panel",
        "Advanced On-Page SEO Optimization",
        "Basic API Integration",
        "Payment Gateway",
        "Blog / News Section",
        "Portfolio",
        "WhatsApp Integration",
        "Advanced Security",
        "AI Chatbot",
        "CDN Global Content Delivery",
        "Speed Optimization",
        "Free 6 Months Maintenance",
        "Priority Support"
      ],
      color: "#EC4899",
      glowColor: "rgba(236, 72, 153, 0.55)",
      bgGradient: "linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Gem pulses with scale & glow — symbolises premium value
      iconAnimation: { scale: [1, 1.22, 1, 1.18, 1], opacity: [1, 0.75, 1, 0.8, 1] },
      iconTransition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
    },
    {
      badge: null,
      name: "ENTREPRENEUR",
      icon: Rocket,
      iconColor: "#F97316",
      description: "Complete solution for businesses that want to scale without limits.",
      features: [
        "Everything in Premium",
        "Unlimited Pages",
        "Fully Custom Features",
        "Enterprise Cloud Hosting",
        "Daily and on demand backups",
        "Advanced SEO & Analytics",
        "API Integrations",
        "Role-Based Access Control (RBAC)",
        "CDN & Global Content Delivery",
        "Server Performance Monitoring",
        "Source Code Version Control",
        "Database Optimization",
        "E-commerce Functionality",
        "Premium Security Audit",
        "AI Chatbot",
        "CRM & ERP Integration",
        "Business Automation",
        "Analytics Dashboard",
        "Unlimited Business Emails",
        "Payment Gateway",
        "Multi-language Support",
        "Free 12 Months Maintenance",
        "Dedicated Account Manager",
        "24×7 Priority Support"
      ],
      color: "#F97316",
      glowColor: "rgba(249, 115, 22, 0.45)",
      bgGradient: "linear-gradient(180deg, rgba(249, 115, 22, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Rocket thrusts upward & comes back — symbolises unlimited growth
      iconAnimation: { y: [0, -14, 0], rotate: [-8, 8, -8], scale: [1, 1.15, 1] },
      iconTransition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
    }
  ];

  const mobilePlans = [
    {
      badge: null,
      name: "BASIC APP",
      icon: Smartphone,
      iconColor: "#A855F7",
      description: "Ideal for validation of concepts and simple utility applications.",
      features: [
        "Single Platform (Android or iOS)",
        "Up to 5 App Screens",
        "Standard UI/UX Design",
        "Basic User Authentication",
        "Local Database Integration",
        "Basic API Integration",
        "Push Notifications",
        "Google Maps Integration",
        "Social Media Login",
        "Contact & Inquiry Form",
        "App Icon & Splash Screen",
        "Basic Security",
        "Performance Optimization",
        "App Store Submission Support",
        "Source Code Handover",
        "Free 3 Months Maintenance",
        "Standard Technical Support"
      ],
      color: "#A855F7",
      glowColor: "rgba(168, 85, 247, 0.45)",
      bgGradient: "linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Smartphone bounces like a notification — symbolises app activity
      iconAnimation: { y: [0, -6, 0, -4, 0], rotate: [-4, 4, -4] },
      iconTransition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
    },
    {
      badge: "MOST POPULAR",
      name: "PREMIUM APP",
      icon: Zap,
      iconColor: "#EC4899",
      description: "High performance cross-platform app with advanced functionality.",
      features: [
        "Everything in Basic",
        "Android & iOS Support",
        "Up to 15 App Screens",
        "Custom UI/UX Design",
        "Cloud Database Integration",
        "Push Notifications",
        "Real-Time Data Synchronization",
        "Payment Gateway Integration",
        "Google Maps Integration",
        "Social Login",
        "WhatsApp Integration",
        "REST API Integration",
        "Admin Dashboard",
        "Analytics Dashboard",
        "App Performance Optimization",
        "Biometric Authentication",
        "Offline Data Support",
        "Cloud Backup",
        "Premium Security",
        "App Store & Play Store Deployment",
        "Source Code Handover",
        "Free 6 Months Maintenance",
        "Priority Technical Support"
      ],
      color: "#EC4899",
      glowColor: "rgba(236, 72, 153, 0.55)",
      bgGradient: "linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Zap flashes like electricity — symbolises speed & performance
      iconAnimation: { scale: [1, 1.3, 0.9, 1.2, 1], opacity: [1, 0.5, 1, 0.7, 1] },
      iconTransition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
    },
    {
      badge: null,
      name: "ENTERPRISE APP",
      icon: Building2,
      iconColor: "#F97316",
      description: "Fully custom enterprise application built to scale infinitely.",
      features: [
        "Everything in Premium",
        "Unlimited App Screens",
        "Fully Custom Mobile Application",
        "Android & iOS Applications",
        "Enterprise UI/UX Design",
        "Enterprise Cloud Infrastructure",
        "AI Chatbot Integration",
        "Bespoke System Integrations",
        "Enterprise API Integrations",
        "Business Process Automation",
        "CRM & ERP Integration",
        "Multi-Level Admin Dashboard",
        "Role-Based Access Control (RBAC)",
        "Analytics Dashboard",
        "AI / Machine Learning Features",
        "Real-Time Push Notifications",
        "Payment Gateway Integration",
        "Advanced Authentication (OTP, OAuth, SSO)",
        "Offline Data Synchronization",
        "Multi-language Support",
        "Cloud Database Integration",
        "Premium High-Grade Enterprise Security",
        "Application Performance Monitoring",
        "Crash Analytics & Error Monitoring",
        "Source Code Version Control",
        "Database Optimization",
        "App Store & Play Store Deployment",
        "Unlimited Business User Accounts",
        "Free 12 Months Maintenance",
        "Dedicated Account Manager",
        "24×7 Priority Support"
      ],
      color: "#F97316",
      glowColor: "rgba(249, 115, 22, 0.45)",
      bgGradient: "linear-gradient(180deg, rgba(249, 115, 22, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      // Icon: Building2 rises upward steadily — symbolises enterprise scale & structure
      iconAnimation: { y: [0, -10, 0], scale: [1, 1.08, 1] },
      iconTransition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  ];

  const currentPlans = activeTab === 'website' ? websitePlans : mobilePlans;

  const highlights = [
    {
      icon: ShieldCheck,
      iconColor: "#A855F7",
      title: "Secure & Reliable",
      desc: "Your data is protected with enterprise-grade security.",
      glow: "rgba(168, 85, 247, 0.25)"
    },
    {
      icon: Zap,
      iconColor: "#F43F5E",
      title: "High Performance",
      desc: "Optimized for speed, scalability and seamless experience.",
      glow: "rgba(244, 63, 94, 0.25)"
    },
    {
      icon: Headphones,
      iconColor: "#EC4899",
      title: "Expert Support",
      desc: "Get dedicated support from our technical experts.",
      glow: "rgba(236, 72, 153, 0.25)"
    },
    {
      icon: TrendingUp,
      iconColor: "#F97316",
      title: "Growth Focused",
      desc: "Built to help your business scale and grow effortlessly.",
      glow: "rgba(249, 115, 22, 0.25)"
    }
  ];

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', fontFamily: "'Outfit', 'Poppins', sans-serif", overflow: 'hidden', position: 'relative', transition: 'background 0.3s ease, color 0.3s ease' }}>

      {/* Decorative Blur Blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Main Container */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 80px' }}>

        {/* Navigation Back Link - Left Side Positioned professionally */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}
        >
          <a href="/" style={{ color: '#A855F7', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s', padding: '8px 16px', background: 'var(--bg-surface-soft)', border: '1px solid var(--border-main)', borderRadius: 100 }} className="back-link">
            <ChevronLeft size={16} /> Back to Home
          </a>
        </motion.div>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, marginTop: 10, marginBottom: 16, letterSpacing: '-0.5px', lineHeight: 1.25, color: 'var(--text-main)' }}>
            Success Starts with the <span style={{ background: 'linear-gradient(90deg, #A855F7, #EC4899, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Right Solution</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(14px, 1.8vw, 16px)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
            Choose the perfect solution for your business needs — scalable, secure, and future-ready to grow with your business.
          </p>
        </div>

        {/* Toggle Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 64 }}>
          <div style={{ background: 'var(--bg-surface-soft)', border: '1px solid var(--border-main)', borderRadius: 100, padding: 6, display: 'flex', gap: 8, backdropFilter: 'blur(10px)', boxShadow: 'var(--card-shadow)' }}>
            <button
              onClick={() => setActiveTab('website')}
              style={{
                background: activeTab === 'website' ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' : 'transparent',
                border: 'none',
                color: activeTab === 'website' ? '#FFFFFF' : 'var(--text-muted)',
                padding: '12px 24px',
                borderRadius: 100,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>
              WEBSITE DEVELOPMENT
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              style={{
                background: activeTab === 'mobile' ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' : 'transparent',
                border: 'none',
                color: activeTab === 'mobile' ? '#FFFFFF' : 'var(--text-muted)',
                padding: '12px 24px',
                borderRadius: 100,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
              MOBILE APPLICATION
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'stretch', marginBottom: 80 }}>
          <AnimatePresence mode="wait">
            {currentPlans.map((plan, index) => {
              const isPremium = plan.name.includes("PREMIUM");
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.035,
                    y: -10,
                    borderColor: plan.color,
                    boxShadow: `0 28px 56px -10px ${plan.glowColor}, 0 0 0 1px ${plan.iconColor}30`,
                    zIndex: 10,
                  }}
                  style={{
                    background: 'var(--bg-surface)',
                    border: isPremium ? `2.5px solid ${plan.color}` : '1.5px solid var(--border-main)',
                    borderRadius: 24,
                    padding: '48px 36px 40px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isPremium ? `0 15px 45px -10px ${plan.glowColor}` : 'var(--card-shadow)',
                    backdropFilter: 'blur(10px)',
                    zIndex: isPremium ? 3 : 1,
                    cursor: 'default',
                    willChange: 'transform',
                  }}
                >
                  {/* Premium Badge */}
                  {plan.badge && (
                    <span style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: `linear-gradient(90deg, #A855F7, #EC4899)`,
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: '1.5px',
                      color: '#FFFFFF',
                      padding: '6px 18px',
                      borderRadius: 100,
                      boxShadow: '0 4px 15px rgba(236,72,153,0.4)',
                      whiteSpace: 'nowrap'
                    }}>
                      ★ {plan.badge}
                    </span>
                  )}

                  <div>
                    {/* Dynamic Animated Top Icon */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                      {/* Outer box — STABLE, no movement */}
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 22,
                          background: `${plan.iconColor}15`,
                          border: `1.5px solid ${plan.iconColor}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 8px 32px -8px ${plan.glowColor}`,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Inner icon — ANIMATED only */}
                        <motion.div
                          animate={plan.iconAnimation}
                          transition={plan.iconTransition}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: plan.iconColor,
                            filter: `drop-shadow(0 0 8px ${plan.iconColor}90)`
                          }}
                        >
                          <plan.icon size={34} strokeWidth={1.8} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Plan Title */}
                    <h3 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', letterSpacing: '1.5px', color: plan.color, marginBottom: 12 }}>
                      {plan.name}
                    </h3>

                    {/* Plan Description */}
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', lineHeight: 1.6, marginBottom: 32, minHeight: 44 }}>
                      {plan.description}
                    </p>

                    {/* Horizontal Divider */}
                    <div style={{ height: 1, background: 'var(--border-main)', marginBottom: 32 }} />

                    {/* Features List with interactive point zoom */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {(expandedPlans[plan.name] ? plan.features : plan.features.slice(0, 10)).map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: fIdx < 10 ? 0 : (fIdx - 10) * 0.03 }}
                          whileHover={{ scale: 1.04, x: 6, color: plan.color }}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13.5, color: 'var(--text-main)', cursor: 'pointer', originX: 0 }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: `${plan.iconColor}20`, color: plan.iconColor, flexShrink: 0 }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Read More / Show Less Button if features > 10 */}
                    {plan.features.length > 10 && (
                      <div style={{ marginTop: 24, textAlign: 'left' }}>
                        <motion.button
                          onClick={() => toggleExpand(plan.name)}
                          whileHover={{ scale: 1.05, boxShadow: `0 8px 25px ${plan.glowColor}` }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: `linear-gradient(135deg, ${plan.iconColor}15, ${plan.iconColor}30)`,
                            border: `1.5px solid ${plan.iconColor}60`,
                            color: plan.iconColor,
                            padding: '10px 22px',
                            borderRadius: 100,
                            fontWeight: 700,
                            fontSize: 12.5,
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease',
                            boxShadow: `0 4px 15px ${plan.glowColor}`
                          }}
                        >
                          <span>{expandedPlans[plan.name] ? 'SHOW LESS' : `READ MORE (+${plan.features.length - 10})`}</span>
                          <motion.div
                            animate={{ rotate: expandedPlans[plan.name] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <ChevronDown size={16} strokeWidth={2.5} />
                          </motion.div>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Highlights Banner Row with attractive interactive cards and icons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24
          }}
        >
          {highlights.map((hl, hlIdx) => (
            <motion.div
              key={hlIdx}
              whileHover={{
                y: -6,
                boxShadow: `0 12px 30px -10px ${hl.glow}`,
                borderColor: hl.iconColor,
              }}
              style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-main)',
                borderRadius: 20,
                padding: '24px',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                cursor: 'pointer',
                transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: hlIdx * 0.7 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: `${hl.iconColor}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: hl.iconColor,
                  flexShrink: 0,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                <hl.icon size={24} />
              </motion.div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>{hl.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: 12.5, lineHeight: 1.5, margin: 0 }}>{hl.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {styleTag}
    </div>
  );
}

const styleTag = (
  <style>{`
    .back-link:hover {
      color: #FFFFFF !important;
      border-color: #A855F7 !important;
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
    }
    @media (max-width: 640px) {
      .plans-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
);
