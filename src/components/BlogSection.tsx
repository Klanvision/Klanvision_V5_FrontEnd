// ============================================================
// BlogSection.tsx
// Blog articles section for Klanvision.
// Displays article cards in a responsive 3-column grid.
// Each card has a custom 3D innovative icon, tag, title, excerpt,
// author, and read-time. "View All" toggles more articles.
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, PenTool, ChevronDown } from 'lucide-react';

// ── Innovative 3D Blog Icons ────────────────────────────────
const SvgBlogSEO = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="seo-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#818CF8"/><stop offset="100%" stopColor="#3730A3"/></radialGradient>
    </defs>
    <circle cx="30" cy="30" r="22" fill="#1E1B4B" opacity="0.2" transform="translate(2,2)"/>
    <circle cx="30" cy="30" r="22" fill="url(#seo-bg)"/>
    <circle cx="30" cy="30" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
    <line x1="42" y1="42" x2="56" y2="56" stroke="#818CF8" strokeWidth="8" strokeLinecap="round" opacity="0.4" transform="translate(2,2)"/>
    <line x1="42" y1="42" x2="56" y2="56" stroke="white" strokeWidth="8" strokeLinecap="round"/>
    <path d="M22 30 Q30 20 38 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const SvgBlogMobile = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="mob-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#581C87"/></radialGradient>
    </defs>
    <rect x="18" y="8" width="28" height="48" rx="6" fill="#3B0764" opacity="0.2" transform="translate(2,2)"/>
    <rect x="18" y="8" width="28" height="48" rx="6" fill="url(#mob-bg)"/>
    <rect x="22" y="14" width="20" height="32" rx="2" fill="white" fillOpacity="0.15"/>
    <circle cx="32" cy="50" r="3" fill="white" fillOpacity="0.5"/>
    <path d="M20 10 Q32 6 44 10" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"/>
  </svg>
);

const SvgBlogCloud = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="cld-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#67E8F9"/><stop offset="100%" stopColor="#0E7490"/></radialGradient>
    </defs>
    <path d="M12 40 Q8 40 8 32 Q8 24 16 24 Q16 14 28 14 Q36 8 44 18 Q50 16 54 22 Q58 22 58 32 Q58 40 48 40 Z" fill="#164E63" opacity="0.2" transform="translate(2,2)"/>
    <path d="M12 40 Q8 40 8 32 Q8 24 16 24 Q16 14 28 14 Q36 8 44 18 Q50 16 54 22 Q58 22 58 32 Q58 40 48 40 Z" fill="url(#cld-bg)"/>
    <path d="M20 28 Q32 20 44 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const SvgBlogSecurity = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="sec-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#F87171"/><stop offset="100%" stopColor="#991B1B"/></radialGradient>
    </defs>
    <path d="M32 8 L54 18 L54 36 Q54 52 32 60 Q10 52 10 36 L10 18 Z" fill="#7F1D1D" opacity="0.2" transform="translate(2,2)"/>
    <path d="M32 8 L54 18 L54 36 Q54 52 32 60 Q10 52 10 36 L10 18 Z" fill="url(#sec-bg)"/>
    <path d="M24 30 L40 30 L40 44 L24 44 Z" fill="white" fillOpacity="0.2"/>
    <path d="M28 30 V24 Q28 18 32 18 Q36 18 36 24 V30" stroke="white" strokeWidth="3" fill="none"/>
  </svg>
);

const SvgBlogDesign = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="des-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#EC4899"/><stop offset="100%" stopColor="#9D174D"/></radialGradient>
    </defs>
    <circle cx="32" cy="32" r="24" fill="#831843" opacity="0.2" transform="translate(2,2)"/>
    <circle cx="32" cy="32" r="24" fill="url(#des-bg)"/>
    <circle cx="24" cy="24" r="6" fill="white" fillOpacity="0.3"/>
    <circle cx="40" cy="24" r="6" fill="white" fillOpacity="0.3"/>
    <path d="M22 42 Q32 50 42 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const SvgBlogMarketing = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="mkt-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#F97316"/><stop offset="100%" stopColor="#9A3412"/></radialGradient>
    </defs>
    <rect x="10" y="10" width="44" height="44" rx="8" fill="#7C2D12" opacity="0.2" transform="translate(2,2)"/>
    <rect x="10" y="10" width="44" height="44" rx="8" fill="url(#mkt-bg)"/>
    <path d="M20 44 V32 M32 44 V20 M44 44 V36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const SvgBlogAWS = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="aws-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#B45309"/></radialGradient>
    </defs>
    <rect x="12" y="12" width="40" height="40" rx="8" fill="#78350F" opacity="0.2" transform="translate(2,2)"/>
    <rect x="12" y="12" width="40" height="40" rx="8" fill="url(#aws-bg)"/>
    <path d="M20 40 Q32 46 44 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M42 38 L45 42 L41 43" fill="white"/>
    <text x="18" y="32" fontSize="12" fontWeight="900" fill="white" fontFamily="sans-serif">AWS</text>
  </svg>
);

const SvgBlogDevSecOps = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="dso-bg" cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#34D399"/><stop offset="100%" stopColor="#065F46"/></radialGradient>
    </defs>
    <path d="M22 32 Q22 22 32 22 Q42 22 42 32 Q42 42 32 42 Q22 42 22 32" fill="#064E3B" opacity="0.2" transform="translate(2,2)"/>
    <path d="M20 32 C20 22 30 22 32 32 C34 42 44 42 44 32 C44 22 34 22 32 32 C30 42 20 42 20 32" stroke="url(#dso-bg)" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M32 26 V38 M26 32 H38" stroke="white" strokeWidth="2" opacity="0.6"/>
  </svg>
);

// Blog post data – each entry defines icon, tag color, metadata, and content
const posts = [
  {
    icon: SvgBlogSEO,
    tag: 'SEO', tagColor: '#4F46E5',
    title: '10 SEO Strategies That Will Dominate 2025',
    excerpt: 'Discover the most effective SEO techniques to boost your organic rankings and outperform competitors in the modern search landscape.',
    date: 'April 10, 2025', readTime: '5 min read', author: 'Klanvision Team',
  },
  {
    icon: SvgBlogMobile,
    tag: 'Mobile Dev', tagColor: '#8B5CF6',
    title: 'Why Flutter is the Future of Cross-Platform Development',
    excerpt: 'Flutter has emerged as the top choice for building beautiful, natively compiled apps for mobile, web, and desktop from a single codebase.',
    date: 'April 5, 2025', readTime: '7 min read', author: 'Dev Team',
  },
  {
    icon: SvgBlogCloud,
    tag: 'Cloud', tagColor: '#06B6D4',
    title: 'Migrating to Cloud: A Step-by-Step Guide for SMBs',
    excerpt: 'Cloud migration doesn\'t have to be overwhelming. Here\'s a practical, phased approach for small and medium businesses making the move.',
    date: 'March 28, 2025', readTime: '8 min read', author: 'Cloud Experts',
  },
  {
    icon: SvgBlogSecurity,
    tag: 'Security', tagColor: '#EF4444',
    title: 'Cybersecurity Threats to Watch in 2025',
    excerpt: 'From AI-powered phishing to sophisticated ransomware, here are the key threats every business needs to prepare for this year.',
    date: 'March 20, 2025', readTime: '6 min read', author: 'Security Team',
  },
  {
    icon: SvgBlogAWS,
    tag: 'AWS Cloud', tagColor: '#F97316',
    title: 'AWS Cloud: The Backbone of Modern Transformation',
    excerpt: 'Leverage the power of AWS to scale your infrastructure, reduce costs, and accelerate innovation in a competitive digital economy.',
    date: 'March 12, 2025', readTime: '9 min read', author: 'AWS Architect',
  },
  {
    icon: SvgBlogDevSecOps,
    tag: 'DevSecOps', tagColor: '#10B981',
    title: 'DevSecOps: Why Security Must Be Shared',
    excerpt: 'Integrating security into the heart of your development lifecycle ensures faster delivery without compromising on safety or compliance.',
    date: 'March 5, 2025', readTime: '8 min read', author: 'Ops Specialist',
  },
  {
    icon: SvgBlogSecurity,
    tag: 'Cyber Defense', tagColor: '#EF4444',
    title: 'Mastering Zero Trust: Securing the Perimeter-less Enterprise',
    excerpt: 'In a world of remote work and cloud apps, the perimeter is dead. Learn how Zero Trust protects your data regardless of location.',
    date: 'Feb 28, 2025', readTime: '10 min read', author: 'CISO Office',
  },
  {
    icon: SvgBlogMobile,
    tag: 'Mobile Apps', tagColor: '#8B5CF6',
    title: 'Building Super Apps: Integrating Multiple Services',
    excerpt: 'Explore the architectural challenges and business benefits of building comprehensive super apps that solve multiple user needs.',
    date: 'Feb 15, 2025', readTime: '7 min read', author: 'Product Lead',
  },
  {
    icon: SvgBlogDesign,
    tag: 'Design', tagColor: '#EC4899',
    title: 'UI/UX Trends Shaping Digital Products in 2025',
    excerpt: 'Glassmorphism, micro-animations, and AI-personalized interfaces — the design trends redefining how users interact with digital products.',
    date: 'Feb 8, 2025', readTime: '4 min read', author: 'Creative Director',
  },
  {
    icon: SvgBlogMarketing,
    tag: 'Marketing', tagColor: '#F97316',
    title: 'Data-Driven Marketing: Beyond the Hype',
    excerpt: 'Learn how to leverage real-time analytics and customer behavior data to create marketing campaigns that truly resonate and convert.',
    date: 'Jan 25, 2025', readTime: '6 min read', author: 'Growth Lead',
  },
];

export default function BlogSection() {
  const [showAll, setShowAll] = useState(false);

  // Show only 6 posts initially, all if showAll is true
  const displayedPosts = showAll ? posts : posts.slice(0, 6);

  return (
    // Section – light gray background
<<<<<<< HEAD
    <section id="blog" style={{ background: '#F5F6FA', padding: '80px 0' }}>
=======
    <section id="blog" style={{ background: 'var(--bg-main)', padding: '80px 0', transition: 'background 0.3s ease' }}>

>>>>>>> 681f246 (Launch version-v5)
      <div className="container">

        {/* Section Header – accent bar + heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="accent-bar" />
<<<<<<< HEAD
          <h2 className="font-bold tracking-tight text-[#1F2937]" style={{ marginBottom: 16 }}>
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Insights, tutorials, and industry news from the Klanvision team — stay ahead of the digital curve.
          </p>
=======
          <h2 className="font-bold tracking-tight text-[var(--text-main)]" style={{ marginBottom: 16 }}>
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Insights, tutorials, and industry news from the Klanvision team — stay ahead of the digital curve.
          </p>

>>>>>>> 681f246 (Launch version-v5)
        </motion.div>

        {/* Blog Cards Grid – 1 col mobile, 2 cols sm, 3 cols lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, i) => (
            // Each card slides up and fades in with a staggered delay
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -7 }}         // lift on hover
              className="card"
<<<<<<< HEAD
              style={{ overflow: 'hidden', cursor: 'pointer' }}
            >
=======
              style={{ 
                overflow: 'hidden', 
                cursor: 'pointer',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-main)',
                transition: 'all 0.3s ease'
              }}
            >

>>>>>>> 681f246 (Launch version-v5)
              {/* Cover area – tinted gradient background with 3D icon */}
              <div style={{
                height: 180, background: `linear-gradient(135deg, ${post.tagColor}08, ${post.tagColor}15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                {/* 3D Icon with slight shadow */}
                <div style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))' }}>
                   <post.icon />
                </div>
                
                {/* Thin top color accent line matching tag color */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: post.tagColor }} />
              </div>

              <div style={{ padding: '24px' }}>
                {/* Tag pill + publication date row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span className="blog-tag" style={{ background: `${post.tagColor}15`, color: post.tagColor }}>
                    {post.tag}
                  </span>
<<<<<<< HEAD
                  <span style={{ color: '#9CA3AF', fontSize: 12 }}>{post.date}</span>
                </div>

                {/* Article title and excerpt */}
                <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>

                {/* Footer row – author and read time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                  <span style={{ color: '#9CA3AF', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><PenTool size={12} /> {post.author}</span>
                  <span style={{ color: '#9CA3AF', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                </div>
=======
                  <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{post.date}</span>
                </div>

                {/* Article title and excerpt */}
                <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.3, color: 'var(--text-main)' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>

                {/* Footer row – author and read time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-main)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><PenTool size={12} /> {post.author}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                </div>

>>>>>>> 681f246 (Launch version-v5)
              </div>
            </motion.article>
          ))}
        </div>

        {/* "View All Articles" CTA – centered below the grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 44 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            id="blog-load-more"
            className="btn-outline"
            onClick={() => setShowAll(!showAll)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            {showAll ? 'Show Fewer Articles' : 'View All Articles'}
            <motion.div animate={{ rotate: showAll ? 180 : 0 }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}
