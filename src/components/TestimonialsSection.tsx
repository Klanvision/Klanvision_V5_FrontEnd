// ============================================================
// TestimonialsSection.tsx
// Sliding-track carousel: 3 cards always visible, 1 card advances at a time.
// Track physically slides left by one card-width every 4 s.
// Seamless infinite loop via duplicated cards + instant-reset.
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck, UserRound, Medal, LockKeyhole, Zap, Globe, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechStartup Pvt. Ltd.',
    icon: User,
    rating: 5,
    text: 'Klanvision transformed our outdated website into a modern, fast, and beautiful platform. Our conversions increased by 180% within three months of launch. Absolutely outstanding work!',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Head, RetailBrand',
    icon: UserCheck,
    rating: 5,
    text: 'The SEO and digital marketing team at Klanvision is phenomenal. We went from page 8 to page 1 on Google for our key terms. The ROI has been exceptional.',
  },
  {
    name: 'Aditya Reddy',
    role: 'Founder, HealthTech Solutions',
    icon: UserRound,
    rating: 5,
    text: 'Our mobile app was delivered on time with zero bugs. The UI/UX design exceeded our expectations. Klanvision truly understands the healthcare domain. Highly recommended!',
  },
  {
    name: 'Sneha Patel',
    role: 'CTO, FinServe Inc.',
    icon: User,
    rating: 5,
    text: 'The cloud migration was seamless. Zero downtime, perfect documentation, and the team stayed with us through every step. Klanvision is now our go-to technology partner.',
  },
  {
    name: 'Meera Nair',
    role: 'VP Digital, EduLearn Platform',
    icon: UserRound,
    rating: 5,
    text: 'Klanvision rebuilt our entire e-learning platform. Page load times dropped by 70% and student engagement tripled. They really understand user experience at scale.',
  },
  {
    name: 'Sanjay Singhania',
    role: 'Operations Director, GlobalLogistics',
    icon: Globe,
    rating: 5,
    text: "The API integrations provided by Klanvision automated 90% of our manual tracking processes. We've seen a 40% reduction in operational costs and 100% data accuracy across our global network.",
  },
  {
    name: 'Ananya Das',
    role: 'Creative Director, StudioX',
    icon: Medal,
    rating: 5,
    text: "Working with Klanvision was a breath of fresh air. Their eye for detail and commitment to premium design is unmatched. They didn't just build a site; they built a digital masterpiece for our brand.",
  },
  {
    name: 'Karthik Iyer',
    role: 'CTO, SecureBank India',
    icon: LockKeyhole,
    rating: 5,
    text: 'Security was our #1 priority. Klanvision delivered a robust, zero-trust infrastructure that passed every audit with flying colors. Their cybersecurity expertise is truly enterprise-grade.',
  },
  {
    name: 'Deepika Rao',
    role: 'E-commerce Manager, FashionHub',
    icon: Zap,
    rating: 5,
    text: "Our previous site crashed every Black Friday. Klanvision's new architecture handled our record-breaking traffic this year without a single millisecond of lag. Our revenue goals were smashed!",
  },
];

const N = testimonials.length;   // 6
const VISIBLE = 3;
const GAP = 24;                   // px gap between cards
// Duplicate cards so the track appears infinite: [...originals, ...originals]
const track = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  // activeIndex = index of the first visible card in the TRACK (0 … N-1, then wraps)
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Measure container width (and update on resize)
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // cardWidth = (containerWidth - (VISIBLE-1)*GAP) / VISIBLE
  // stepPx    = cardWidth + GAP  =  (containerWidth + GAP) / VISIBLE
  const stepPx = containerWidth > 0 ? (containerWidth + GAP) / VISIBLE : 0;
  const translateX = -activeIndex * stepPx;

  // Auto-advance: move forward by 1 every 4 s
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimate(true);
      setActiveIndex(prev => prev + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // When we've slid through all N originals (activeIndex === N),
  // instantly reset to 0 so the loop is seamless.
  useEffect(() => {
    if (activeIndex === N) {
      // Wait for the slide animation to finish, then snap back silently
      const t = setTimeout(() => {
        setAnimate(false);
        setActiveIndex(0);
      }, 520); // slightly > transition duration
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  // Re-enable animation one frame after the silent reset
  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  const goTo = (idx: number) => {
    setAnimate(true);
    setActiveIndex(idx);
    startTimer();
  };

  const dotActive = activeIndex % N; // which original card is leading

  return (
<<<<<<< HEAD
    <section id="testimonials" style={{ background: 'white', padding: '80px 0' }}>
=======
    <section id="testimonials" style={{ background: 'var(--bg-main)', padding: '80px 0', transition: 'background 0.3s ease' }}>

>>>>>>> 681f246 (Launch version-v5)
      <div className="container">

        {/* ── Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="accent-bar" />
          <h2
<<<<<<< HEAD
            className="font-bold tracking-tight text-[#1F2937]"
=======
            className="font-bold tracking-tight text-[var(--text-main)]"

>>>>>>> 681f246 (Launch version-v5)
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
              fontWeight: 700, lineHeight: 1.15,
              letterSpacing: '-0.02em', marginBottom: 16,
            }}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{
<<<<<<< HEAD
            color: '#6B7280', fontSize: 16, maxWidth: 540,
            margin: '0 auto', lineHeight: 1.7,
            fontFamily: "'Roboto','Poppins',sans-serif",
          }}>
=======
            color: 'var(--text-muted)', fontSize: 16, maxWidth: 540,
            margin: '0 auto', lineHeight: 1.7,
            fontFamily: "'Roboto','Poppins',sans-serif",
          }}>

>>>>>>> 681f246 (Launch version-v5)
            Real stories from businesses that transformed their digital presence with Klanvision.
          </p>
        </motion.div>

        {/* ── Sliding-track carousel */}
        <div
          ref={containerRef}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            style={{
              display: 'flex',
              gap: GAP,
              // track is wide enough to hold all duplicated cards
              width: `calc(${track.length / VISIBLE * 100}% + ${track.length / VISIBLE * GAP}px)`,
            }}
            animate={{ x: translateX }}
            transition={animate ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0 }}
          >
            {track.map((t, i) => {
              const cardWidthStyle = `calc((${containerWidth}px - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`;
              return (
                <div
                  key={i}
                  className="testimonial-card"
                  style={{
                    minWidth: cardWidthStyle,
                    maxWidth: cardWidthStyle,
                    flexShrink: 0,
                    boxSizing: 'border-box',
<<<<<<< HEAD
                  }}
                >
=======
                    background: 'var(--bg-surface)',
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid var(--border-main)',
                    borderRadius: '24px',
                    padding: '32px',
                    transition: 'all 0.3s ease'
                  }}
                >

>>>>>>> 681f246 (Launch version-v5)
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <span key={si} style={{ color: '#FBBF24' }}>
                        <Star size={16} fill="currentColor" />
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p style={{
<<<<<<< HEAD
                    color: '#374151', fontSize: 15, lineHeight: 1.75, marginBottom: 24,
=======
                    color: 'var(--text-main)', fontSize: 15, lineHeight: 1.75, marginBottom: 24,
>>>>>>> 681f246 (Launch version-v5)
                    fontStyle: 'italic', fontFamily: "'Roboto','Poppins',sans-serif",
                  }}>
                    &ldquo;{t.text}&rdquo;
                  </p>

<<<<<<< HEAD
                  {/* Author */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    paddingTop: 20, borderTop: '1px solid #F3F4F6',
=======

                  {/* Author */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    paddingTop: 20, borderTop: '1px solid var(--border-main)',
>>>>>>> 681f246 (Launch version-v5)
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'white',
                    }}>
                      <t.icon size={22} />
                    </div>
                    <div>
<<<<<<< HEAD
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16 }}>
                        {t.name}
                      </div>
=======
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text-main)' }}>
                        {t.name}
                      </div>

>>>>>>> 681f246 (Launch version-v5)
                      <div style={{ color: '#9CA3AF', fontSize: 13, marginTop: 2, fontFamily: "'Roboto',sans-serif" }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Dot Indicators – one per original testimonial */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36 }}>
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === dotActive ? 28 : 10,
                background: i === dotActive
                  ? 'linear-gradient(90deg, #6366f1, #a855f7)'
<<<<<<< HEAD
                  : '#D1D5DB',
=======
                  : 'var(--border-main)',

>>>>>>> 681f246 (Launch version-v5)
              }}
              transition={{ duration: 0.35 }}
              style={{ height: 10, borderRadius: 5, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        {/* ── Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 56, flexWrap: 'wrap' }}
        >
          {[
            { icon: Medal, text: 'ISO Certified Quality' },
            { icon: LockKeyhole, text: 'Data Privacy Compliant' },
            { icon: Zap, text: '99.9% Uptime SLA' },
            { icon: Globe, text: 'Global-Ready Solutions' },
          ].map((b) => (
            <div key={b.text} style={{
              display: 'flex', alignItems: 'center', gap: 10,
<<<<<<< HEAD
              background: '#F5F6FA', borderRadius: 50,
              padding: '10px 22px', fontSize: 14, fontWeight: 600, color: '#374151',
              fontFamily: "'Poppins',sans-serif",
            }}>
=======
              background: 'var(--bg-surface-soft)', borderRadius: 50,
              padding: '10px 22px', fontSize: 14, fontWeight: 600, color: 'var(--text-main)',
              fontFamily: "'Poppins',sans-serif",
              border: '1px solid var(--border-main)'
            }}>

>>>>>>> 681f246 (Launch version-v5)
              <span style={{ display: 'flex', alignItems: 'center', color: '#4F46E5' }}>
                <b.icon size={18} />
              </span>
              {b.text}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
