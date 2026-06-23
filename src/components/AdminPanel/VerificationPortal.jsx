// ============================================================
// VerificationPortal.jsx
// Luxury Enterprise Certificate Verification Portal
// Animated particle network background | Deep navy + gold
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Search, ArrowRight, Lock,
  Calendar, User, BookOpen, Briefcase, Award, Globe,
  Database, CheckCircle, Mail, Phone, RefreshCw, Fingerprint, Code, Landmark
} from 'lucide-react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import CertificateReplica from './CertificateReplica';
import { api } from '../../utils/api';
import { useSEO } from '../../hooks/useSEO';

// ─────────────────────────────────────────────────────────────
// ANIMATED CANVAS BACKGROUND
// Particle network + floating shield glyphs — security theme
// ─────────────────────────────────────────────────────────────
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Particle factory ──────────────────────────────────
    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 160;
    const GOLD_COLORS = ['#C9A84C', '#D4B54E', '#E8C84A', '#F0D060', '#B8943C'];

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.55,
      vy:      (Math.random() - 0.5) * 0.55,
      r:       Math.random() * 2.5 + 1,
      color:   GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      alpha:   Math.random() * 0.5 + 0.25,
      pulse:   Math.random() * Math.PI * 2,   // phase offset for pulsing
      isNode:  Math.random() > 0.8,            // 20% are "security nodes" (bigger)
    }));

    // ── Floating shield glyphs ────────────────────────────
    const GLYPHS = Array.from({ length: 7 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      size:  Math.random() * 28 + 14,
      alpha: Math.random() * 0.07 + 0.02,
      speed: (Math.random() - 0.5) * 0.22,
      rot:   Math.random() * Math.PI * 2,
      rotV:  (Math.random() - 0.5) * 0.004,
    }));

    function drawShield(cx, cy, size, alpha, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.8, -size * 0.5);
      ctx.lineTo(size * 0.8, size * 0.1);
      ctx.quadraticCurveTo(size * 0.8, size * 0.9, 0, size);
      ctx.quadraticCurveTo(-size * 0.8, size * 0.9, -size * 0.8, size * 0.1);
      ctx.lineTo(-size * 0.8, -size * 0.5);
      ctx.closePath();
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // ── Lock / data icons (floating) ──────────────────────
    const LOCKS = Array.from({ length: 5 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      size: Math.random() * 16 + 8,
      alpha: Math.random() * 0.06 + 0.02,
      vx:   (Math.random() - 0.5) * 0.18,
      vy:   (Math.random() - 0.5) * 0.18,
    }));

    function drawLock(cx, cy, size, alpha) {
      ctx.save();
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 1;
      // Shackle
      ctx.beginPath();
      ctx.arc(cx, cy - size * 0.6, size * 0.4, Math.PI, 0);
      ctx.stroke();
      // Body
      ctx.strokeRect(cx - size * 0.5, cy - size * 0.3, size, size * 0.85);
      ctx.restore();
    }

    // ── Hexagonal subtle grid ────────────────────────────
    function drawHexGrid() {
      const hexSize = 70;
      const h = hexSize * Math.sqrt(3);
      ctx.strokeStyle = 'rgba(201,168,76,0.025)';
      ctx.lineWidth = 0.5;
      for (let row = -1; row < canvas.height / h + 2; row++) {
        for (let col = -1; col < canvas.width / (hexSize * 1.5) + 2; col++) {
          const x = col * hexSize * 1.5;
          const y = row * h + (col % 2 === 0 ? 0 : h / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + hexSize * Math.cos(angle);
            const py = y + hexSize * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    // ── Main draw loop ───────────────────────────────────
    let frame = 0;
    function draw() {
      animId = requestAnimationFrame(draw);
      frame++;

      // Deep navy gradient base
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0,   '#060c1a');
      bgGrad.addColorStop(0.4, '#0a1228');
      bgGrad.addColorStop(0.7, '#0d1630');
      bgGrad.addColorStop(1,   '#091024');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hexagonal grid
      drawHexGrid();

      // Center soft glow
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.35;
      const glowR = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.45);
      glowR.addColorStop(0, 'rgba(201,168,76,0.06)');
      glowR.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating shield glyphs
      GLYPHS.forEach(g => {
        g.y += g.speed;
        g.rot += g.rotV;
        if (g.y > canvas.height + g.size * 2) g.y = -g.size * 2;
        if (g.y < -g.size * 2) g.y = canvas.height + g.size * 2;
        drawShield(g.x, g.y, g.size, g.alpha, g.rot);
      });

      // Floating lock icons
      LOCKS.forEach(l => {
        l.x += l.vx; l.y += l.vy;
        if (l.x < 0 || l.x > canvas.width)  l.vx *= -1;
        if (l.y < 0 || l.y > canvas.height) l.vy *= -1;
        drawLock(l.x, l.y, l.size, l.alpha);
      });

      // Update & draw particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.pulse += 0.025;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Pulsing size for node particles
        const pulsedR = p.isNode ? p.r * (1.2 + 0.5 * Math.sin(p.pulse)) : p.r;
        const pulsedAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        // Outer glow ring for node particles
        if (p.isNode) {
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedR * 5);
          glowGrad.addColorStop(0, `rgba(201,168,76,${pulsedAlpha * 0.3})`);
          glowGrad.addColorStop(1, 'rgba(201,168,76,0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulsedR * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(pulsedAlpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.28;
            // Data pulse travelling along connection
            const pulseProgress = ((frame * 0.008 + i * 0.3) % 1);
            const px = particles[i].x + (particles[j].x - particles[i].x) * pulseProgress;
            const py = particles[i].y + (particles[j].y - particles[i].y) * pulseProgress;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // Moving pulse dot on connection
            if (opacity > 0.1) {
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(240,208,96,${opacity * 2})`;
              ctx.fill();
            }
          }
        }
      }

      // Scanning line effect (slow horizontal sweep — like a security scanner)
      const scanY = (frame * 0.4) % (canvas.height + 120) - 60;
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0,   'rgba(201,168,76,0)');
      scanGrad.addColorStop(0.5, 'rgba(201,168,76,0.035)');
      scanGrad.addColorStop(1,   'rgba(201,168,76,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);
    }

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// PREMIUM SHIELD LOGO SVG
// ─────────────────────────────────────────────────────────────
function ShieldLogo() {
  return (
    <svg width="58" height="64" viewBox="0 0 58 64" fill="none">
      <defs>
        <linearGradient id="shGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E070"/>
          <stop offset="40%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
        <linearGradient id="shBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#162236"/>
          <stop offset="100%" stopColor="#0a1420"/>
        </linearGradient>
        <filter id="shGlow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M29 2 L55 12 L55 34 C55 50 42 61 29 63 C16 61 3 50 3 34 L3 12 Z"
        fill="url(#shBg)" stroke="url(#shGold)" strokeWidth="2.2" filter="url(#shGlow)"/>
      <path d="M29 7 L50 16 L50 34 C50 47 39 56 29 59 C19 56 8 47 8 34 L8 16 Z"
        fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      <text x="29" y="41" textAnchor="middle" fill="url(#shGold)"
        fontSize="20" fontWeight="900" fontFamily="Georgia,serif" filter="url(#shGlow)">V</text>
      <ellipse cx="9"  cy="36" rx="4" ry="2.2" transform="rotate(-38 9 36)"  fill="#C9A84C" opacity="0.75"/>
      <ellipse cx="7"  cy="42" rx="4" ry="2.2" transform="rotate(-25 7 42)"  fill="#C9A84C" opacity="0.75"/>
      <ellipse cx="7"  cy="48" rx="4" ry="2.2" transform="rotate(-12 7 48)"  fill="#C9A84C" opacity="0.75"/>
      <ellipse cx="49" cy="36" rx="4" ry="2.2" transform="rotate(38 49 36)"  fill="#C9A84C" opacity="0.75"/>
      <ellipse cx="51" cy="42" rx="4" ry="2.2" transform="rotate(25 51 42)"  fill="#C9A84C" opacity="0.75"/>
      <ellipse cx="51" cy="48" rx="4" ry="2.2" transform="rotate(12 51 48)"  fill="#C9A84C" opacity="0.75"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// ANIMATED SHIELD (result states)
// ─────────────────────────────────────────────────────────────
function AnimatedShield({ verified, invalid }) {
  return (
    <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid transparent',
          background: 'linear-gradient(#0a1228, #0a1228) padding-box, linear-gradient(360deg, #C9A84C, transparent, #C9A84C) border-box',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.12, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: 'absolute', inset: 10, borderRadius: '50%',
          border: `2px solid ${verified ? '#10B981' : invalid ? '#EF4444' : '#C9A84C'}`,
        }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <svg width="78" height="90" viewBox="0 0 90 105" fill="none">
          <defs>
            <linearGradient id="asBg"><stop offset="0%" stopColor="#1a5c2a"/><stop offset="100%" stopColor="#0a2d14"/></linearGradient>
            <linearGradient id="asGold"><stop offset="0%" stopColor="#F0D060"/><stop offset="50%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#8B6914"/></linearGradient>
            <filter id="asGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M45 3 L85 18 L85 48 C85 72 65 92 45 102 C25 92 5 72 5 48 L5 18 Z" fill="url(#asBg)" stroke="url(#asGold)" strokeWidth="2.5" filter="url(#asGlow)"/>
          <path d="M45 10 L78 23 L78 48 C78 68 62 86 45 95 C28 86 12 68 12 48 L12 23 Z" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
          <g fill="#C9A84C" opacity="0.75">
            <ellipse cx="18" cy="58" rx="5" ry="3" transform="rotate(-40 18 58)"/>
            <ellipse cx="14" cy="65" rx="5" ry="3" transform="rotate(-30 14 65)"/>
            <ellipse cx="12" cy="73" rx="5" ry="3" transform="rotate(-20 12 73)"/>
            <ellipse cx="72" cy="58" rx="5" ry="3" transform="rotate(40 72 58)"/>
            <ellipse cx="76" cy="65" rx="5" ry="3" transform="rotate(30 76 65)"/>
            <ellipse cx="78" cy="73" rx="5" ry="3" transform="rotate(20 78 73)"/>
          </g>
          {verified ? (
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }}
              d="M30 52 L42 64 L62 42" stroke="#F0D060" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#asGlow)"/>
          ) : invalid ? (
            <><line x1="32" y1="40" x2="58" y2="66" stroke="#EF4444" strokeWidth="5" strokeLinecap="round"/>
            <line x1="58" y1="40" x2="32" y2="66" stroke="#EF4444" strokeWidth="5" strokeLinecap="round"/></>
          ) : (
            <motion.path animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              d="M45 35 L45 58 M45 65 L45 68" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round" fill="none"/>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PREMIUM 3D-STYLE SHIELD BADGE (For Valid Result)
// ─────────────────────────────────────────────────────────────
function PremiumShieldBadge() {
  return (
    <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {/* Glow behind the shield */}
      <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)', filter: 'blur(15px)' }} />
      
      {/* SVG for the shield and laurels */}
      <svg width="280" height="280" viewBox="0 0 200 200" style={{ position: 'relative', zIndex: 2 }}>
        <defs>
          <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E070"/>
            <stop offset="30%" stopColor="#C9A84C"/>
            <stop offset="70%" stopColor="#8B6914"/>
            <stop offset="100%" stopColor="#F5E070"/>
          </linearGradient>
          <linearGradient id="shieldGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B3D23"/>
            <stop offset="100%" stopColor="#041F10"/>
          </linearGradient>
          <filter id="dropShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.6"/>
          </filter>
        </defs>
        
        {/* Subtle background circles */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />

        {/* Pedestal base */}
        <ellipse cx="100" cy="170" rx="45" ry="10" fill="url(#shieldGold)" filter="url(#dropShadow)" />
        <ellipse cx="100" cy="165" rx="45" ry="10" fill="#111" />
        <ellipse cx="100" cy="160" rx="35" ry="8" fill="url(#shieldGold)" />
        <ellipse cx="100" cy="155" rx="35" ry="8" fill="#111" />
        
        {/* Laurel Leaves (Simplified elegant curves) */}
        <path d="M40 145 C20 115 20 80 35 60" fill="none" stroke="url(#shieldGold)" strokeWidth="3" strokeLinecap="round" />
        <path d="M160 145 C180 115 180 80 165 60" fill="none" stroke="url(#shieldGold)" strokeWidth="3" strokeLinecap="round" />
        {/* Leaf details */}
        {[0, 1, 2, 3, 4].map(i => (
           <g key={i}>
             <ellipse cx={32 + i*3} cy={125 - i*15} rx="6" ry="3" transform={`rotate(${30 - i*15} ${32 + i*3} ${125 - i*15})`} fill="url(#shieldGold)" />
             <ellipse cx={168 - i*3} cy={125 - i*15} rx="6" ry="3" transform={`rotate(${-30 + i*15} ${168 - i*3} ${125 - i*15})`} fill="url(#shieldGold)" />
           </g>
        ))}

        {/* Shield Body */}
        <path d="M100 25 L155 45 L155 95 C155 135 125 160 100 175 C75 160 45 135 45 95 L45 45 Z" fill="url(#shieldGreen)" stroke="url(#shieldGold)" strokeWidth="6" filter="url(#dropShadow)" strokeLinejoin="round" />
        
        {/* Inner Gold Border */}
        <path d="M100 35 L145 52 L145 95 C145 128 120 150 100 162 C80 150 55 128 55 95 L55 52 Z" fill="none" stroke="url(#shieldGold)" strokeWidth="2" strokeLinejoin="round" />

        {/* Checkmark */}
        <path d="M75 100 L92 115 L125 75" fill="none" stroke="url(#shieldGold)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" filter="url(#dropShadow)" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TRUST BADGE
// ─────────────────────────────────────────────────────────────
function TrustBadge({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        flex: '1 1 200px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        padding: '32px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 16,
      }}
    >
      <div style={{ marginBottom: 20, color: '#C9A84C' }}>
        <Icon size={42} strokeWidth={1} />
      </div>
      <h3 style={{ fontSize: 13, fontWeight: 800, color: '#C9A84C', letterSpacing: '1px', marginBottom: 12, textTransform: 'uppercase' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// DETAIL ROW
// ─────────────────────────────────────────────────────────────
function DetailRow({ icon: Icon, label, value, isLast }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '16px 24px',
      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(20, 24, 45, 0.4)',
    }}>
      <div style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div style={{ width: 140, fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ flex: 1, fontSize: 13, color: 'white', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function VerificationPortal({ certificateNumber }) {
  const [certId, setCertId]   = useState(certificateNumber || '');
  const [loading, setLoading] = useState(false);
  const [data, setData]       = useState(null);
  const [error, setError]     = useState('');
  const inputRef              = useRef(null);

  useSEO({
    title: data
      ? `Verified: ${data.name} – ${data.role} | Klanvision`
      : error ? 'Invalid Certificate | Klanvision'
      : 'Certificate Verification Portal | Klanvision',
    description: 'Verify your Klanvision internship certificates online. Instant, secure credential validation.',
    canonical: certificateNumber ? `/verify/${certificateNumber}` : '/verify',
  });

  const verify = async (id) => {
    if (!id.trim()) return;
    setLoading(true); setError(''); setData(null);
    try {
      const res = await api.verifyCertificate(id);
      if (res.verified) setData(res.certificate);
      else setError('Certificate invalid or not found');
    } catch (err) {
      setError(err.message || 'Certificate verification failed');
    } finally { setLoading(false); }
  };

  const isVerified = !loading && !!data;
  const isInvalid  = !loading && !!error;
  const mockData = data || {};

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: 'white', position: 'relative', overflowX: 'hidden',
    }}>

      {/* Animated canvas background (fixed, full page) */}
      <AnimatedBackground />

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── TOP HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '30px 52px 0',
            maxWidth: 1280, margin: '0 auto',
          }}
        >
          {/* Premium Company Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => window.location.href = '/'}
            style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
          >
            <img 
              src="/logo.png" 
              alt="Klanvision Logo" 
              style={{ 
                height: 52, 
                filter: 'drop-shadow(0 0 12px rgba(134, 59, 255, 0.4)) drop-shadow(0 0 4px rgba(71, 191, 255, 0.4))' 
              }} 
            />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 14, height: 42, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '3px', color: 'white', lineHeight: 1 }}>CERTIFY</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '5px', color: '#C9A84C', marginTop: 4 }}>VERIFICATION</div>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            animate={{ boxShadow: ['0 0 0 rgba(134,59,255,0)', '0 0 24px rgba(134,59,255,0.25)', '0 0 0 rgba(134,59,255,0)'] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 22px', borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(10,18,40,0.85), rgba(20,20,45,0.85))',
              border: '1px solid rgba(134,59,255,0.3)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(134,59,255,0.15), rgba(71,191,255,0.15))', 
              border: '1px solid rgba(71,191,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 0 10px rgba(134,59,255,0.2)'
            }}>
              <ShieldCheck size={18} color="#47bfff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, background: 'linear-gradient(90deg, #fff, #e0e0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secure Verification</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginTop: 1, letterSpacing: '0.2px' }}>Trusted • Transparent • Reliable</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── MAIN TITLE ── */}
        <div style={{ textAlign: 'center', padding: '60px 24px 0', maxWidth: 1100, margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.75 }}
            style={{
              fontSize: 'clamp(52px, 9vw, 104px)',
              fontWeight: 900, letterSpacing: '10px', margin: '0 0 2px',
              color: 'white',
              fontFamily: "Georgia, 'Times New Roman', serif",
              textShadow: '0 4px 60px rgba(0,0,0,0.6)',
              lineHeight: 1.02,
            }}
          >
            CERTIFICATE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginBottom: 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 180, justifyContent: 'flex-end', overflow: 'hidden' }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }} />
              <motion.div 
                animate={{ x: [0, -8, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                style={{ display: 'flex', color: '#C9A84C', opacity: 0.8 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18 L9 12 L15 6"/></svg>
              </motion.div>
            </div>
            <h2 style={{
              fontSize: 'clamp(20px, 3.8vw, 38px)',
              fontWeight: 700, letterSpacing: '14px', margin: 0,
              color: '#C9A84C',
              fontFamily: "'Outfit', sans-serif",
              textShadow: '0 0 40px rgba(201,168,76,0.5)',
            }}>VERIFICATION</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 180, overflow: 'hidden' }}>
              <motion.div 
                animate={{ x: [0, 8, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                style={{ display: 'flex', color: '#C9A84C', opacity: 0.8 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18 L15 12 L9 6"/></svg>
              </motion.div>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.6), transparent)' }} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.8px', margin: 0 }}
          >
            Authenticate. Verify. Be Assured.
          </motion.p>
        </div>

        {/* ── GLASSMORPHISM SEARCH PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.65 }}
          style={{ padding: '38px 24px 56px', maxWidth: 880, margin: '0 auto' }}
        >
          <div style={{
            background: 'rgba(10,18,40,0.6)',
            border: '1px solid rgba(201,168,76,0.28)',
            borderRadius: 16, padding: '30px 36px',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px rgba(201,168,76,0.04)',
          }}>
            <p style={{
              textAlign: 'center', margin: '0 0 22px',
              fontSize: 15.5, fontWeight: 500,
              color: 'rgba(255,255,255,0.72)', letterSpacing: '0.3px',
            }}>
              Enter Certificate Number to Verify
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Input */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center',
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9, overflow: 'hidden',
              }}>
                <div style={{ padding: '0 14px 0 20px', color: 'rgba(255,255,255,0.32)', flexShrink: 0, display: 'flex' }}>
                  <Search size={18} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value.toUpperCase())}
                  placeholder="KV-IT-WDI-2026-000758"
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    padding: '17px 14px', fontSize: 15, fontWeight: 600,
                    color: 'white', fontFamily: 'monospace', letterSpacing: '1.5px',
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && verify(certId)}
                />
              </div>

              {/* Gold-outlined button */}
              <motion.button
                whileHover={{ background: 'rgba(201,168,76,0.12)', boxShadow: '0 0 28px rgba(201,168,76,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => verify(certId)}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '17px 28px',
                  background: 'transparent',
                  border: '1.5px solid #C9A84C',
                  borderRadius: 9,
                  cursor: loading ? 'wait' : 'pointer',
                  color: '#C9A84C',
                  fontWeight: 800, fontSize: 13, letterSpacing: '2px',
                  fontFamily: "'Outfit', sans-serif",
                  whiteSpace: 'nowrap', transition: 'all 0.3s', flexShrink: 0,
                }}
              >
                {loading
                  ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}><RefreshCw size={16} /></motion.div>
                  : <>VERIFY CERTIFICATE <ArrowRight size={15} /></>
                }
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            RESULTS
        ══════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loader"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ maxWidth: 660, margin: '0 auto 52px', padding: '0 24px' }}
            >
              <div style={{
                background: 'rgba(10,18,40,0.75)', border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 24, padding: '56px 40px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
                backdropFilter: 'blur(16px)',
              }}>
                <AnimatedShield />
                <div style={{ textAlign: 'center' }}>
                  <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ color: '#C9A84C', fontWeight: 700, fontSize: 13, letterSpacing: '2.5px', marginBottom: 8 }}>
                    VERIFYING CERTIFICATE...
                  </motion.p>
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, margin: 0 }}>Retrieving from secure database registry</p>
                </div>
                <div style={{ width: '100%', maxWidth: 300, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '55%', height: '100%', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', borderRadius: 10 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {isVerified && (
            <motion.div key="result"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.65 }}
              style={{ maxWidth: 1000, margin: '0 auto 52px', padding: '0 24px' }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #021a11, #010f0b)', border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 24, padding: '36px 48px',
                display: 'flex', alignItems: 'center', gap: 48, marginBottom: 40,
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 80px rgba(74,222,128,0.03)',
              }}>
                <PremiumShieldBadge />
                <div style={{ flex: 1 }}>
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18,
                      background: 'rgba(74,222,128,0.12)', padding: '8px 16px', borderRadius: 20,
                      border: '1px solid rgba(74,222,128,0.2)'
                    }}>
                    <div style={{ background: '#4ade80', borderRadius: '50%', padding: 2, display: 'flex' }}>
                      <CheckCircle size={12} color="#021a11" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>VERIFICATION RESULT</span>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <span style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, color: '#4ade80', marginRight: 12, fontFamily: "Georgia, 'Times New Roman', serif" }}>VALID</span>
                    <span style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, color: 'white', fontFamily: "Georgia, 'Times New Roman', serif" }}>CERTIFICATE</span>
                  </motion.div>
                  
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginTop: 12, marginBottom: 36, lineHeight: 1.5 }}>
                    This certificate is authentic, valid and issued by<br/>an authorized institution.
                  </motion.p>
                  
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: 24, 
                      padding: '20px 24px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                      <Calendar size={28} color="#4ade80" strokeWidth={1.5} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#4ade80', letterSpacing: '0.5px', marginBottom: 4 }}>VERIFIED ON</div>
                        <div style={{ fontSize: 14, color: 'white', marginBottom: 2 }}>{data.certificate_date || data.certificateDate || 'May 22, 2024'}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>10:30 AM (IST)</div>
                      </div>
                    </div>
                    
                    <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                      <ShieldCheck size={28} color="#4ade80" strokeWidth={1.5} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#4ade80', letterSpacing: '0.5px', marginBottom: 4 }}>VERIFIED BY</div>
                        <div style={{ fontSize: 14, color: 'white', marginBottom: 2 }}>Certify Verification</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>System</div>
                      </div>
                    </div>
                    
                    <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                      <Fingerprint size={28} color="#4ade80" strokeWidth={1.5} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#4ade80', letterSpacing: '0.5px', marginBottom: 4 }}>STATUS</div>
                        <div style={{ fontSize: 14, color: '#4ade80' }}>Active</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
                  marginBottom: 32,
                }}>
                  <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, letterSpacing: '4.5px', color: 'white' }}>CERTIFICATE DETAILS</h3>
                  <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
                </div>
                
                <div style={{ 
                  display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24,
                  padding: '32px', background: 'rgba(10,18,40,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20
                }} className="cert-details-grid">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CertificateReplica data={mockData} />
                  </div>
                  
                  <div style={{ 
                    background: 'rgba(20,24,45,0.3)', border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: 16, overflow: 'hidden' 
                  }}>
                    <DetailRow icon={User}        label="Student Name"       value={mockData.name} />
                    <DetailRow icon={BookOpen}    label="Course / Program"   value={mockData.role || mockData.domain} />
                    <DetailRow icon={Calendar}    label="Issue Date"         value={mockData.certificate_date || mockData.certificateDate || 'May 22, 2024'} />
                    <DetailRow icon={Code}        label="Technical Lead"     value={mockData.technicalLead || mockData.technical_lead || 'S Priyanka DevOps'} />
                    <DetailRow icon={User}        label="Internship Manager" value={mockData.internshipManager || mockData.internship_manager || 'Rama Krishna'} />
                    <DetailRow icon={Landmark}    label="Issued By"          value="Klanvision IT Solutions Pvt Ltd" />
                    <DetailRow icon={ShieldCheck} label="Certificate ID"     value={mockData.certificate_number || mockData.certificateNumber} isLast />
                  </div>
                </div>
              </motion.div>

              {certificateNumber && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                  style={{ textAlign: 'center', marginTop: 24 }}>
                  <button onClick={() => window.location.href = '/verify'}
                    style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', padding: '10px 26px', borderRadius: 30, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                    ← Verify Another Certificate
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {isInvalid && (
            <motion.div key="error"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ maxWidth: 660, margin: '0 auto 52px', padding: '0 24px' }}
            >
              <div style={{
                background: 'rgba(10,18,40,0.75)', border: '1px solid rgba(239,68,68,0.22)',
                borderRadius: 24, padding: '52px 40px', textAlign: 'center', backdropFilter: 'blur(16px)',
              }}>
                <AnimatedShield invalid />
                <h2 style={{ fontSize: 28, fontWeight: 900, color: 'white', margin: '24px 0 12px' }}>Certificate Not Found</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
                  The certificate ID does not exist in our secure registry or has been revoked. Please double-check and try again.
                </p>
                <button
                  onClick={() => { setError(''); setCertId(''); setTimeout(() => inputRef.current?.focus(), 100); }}
                  style={{ padding: '14px 34px', borderRadius: 30, background: 'linear-gradient(90deg, #C9A84C, #F0D060)', border: 'none', color: '#060c1a', fontWeight: 900, fontSize: 13, cursor: 'pointer' }}
                >Try Again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════
            TRUST BADGES
        ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1020, margin: '16px auto 64px', padding: '0 24px' }}
        >
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <TrustBadge icon={Lock}        title="100% AUTHENTIC"    desc="All certificates are verified against our secure, encrypted database." delay={0} />
            <TrustBadge icon={Database}    title="TRUSTED DATABASE"  desc="Real-time verification from an authorized and secure source." delay={0.1} />
            <TrustBadge icon={ShieldCheck} title="DATA PROTECTION"   desc="Your data is safe with us. We never share your information." delay={0.2} />
            <TrustBadge icon={Globe}       title="GLOBALLY ACCEPTED" desc="Our certificates are recognized by leading institutions worldwide." delay={0.3} />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer style={{ background: '#0a1228', padding: '60px 24px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="verify-footer-grid">
            
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                 <div style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ color: '#C9A84C', fontWeight: '900', fontSize: 20, fontFamily: 'Georgia' }}>V</div>
                 </div>
                 <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 260 }}>
                   Certify Verification ensures the authenticity and integrity of every certificate.<br/>Verify with confidence.
                 </div>
              </div>
            </div>

            {/* Middle */}
            <div>
              <h4 style={{ color: 'white', fontSize: 15, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>Need Help?</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                  <Mail size={16} color="#C9A84C" /> support@certifyverification.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                  <Phone size={16} color="#C9A84C" /> +91 98765 43210
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <h4 style={{ color: 'white', fontSize: 15, fontWeight: 600, marginBottom: 20, marginTop: 0 }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: 12 }}>
                {[FaFacebook, FaLinkedin, FaTwitter, FaInstagram].map((Icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', cursor: 'pointer' }}>
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          <div style={{ textAlign: 'center', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
            <Lock size={12} color="#C9A84C" /> © 2024 Certify Verification. All Rights Reserved.
          </div>
        </footer>
      </div>

      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .cert-details-grid  { grid-template-columns: 1fr 1fr !important; }
        .verify-footer-grid { grid-template-columns: 1.2fr 1fr 1fr; }
        @media (max-width: 720px) {
          .cert-details-grid   { grid-template-columns: 1fr !important; }
          .verify-footer-grid  { grid-template-columns: 1fr !important; }
        }
        input::placeholder { color: rgba(255,255,255,0.22); letter-spacing: 1px; }
        input:focus        { outline: none; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
