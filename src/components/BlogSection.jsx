// ============================================================
// BlogSection.tsx
// Blog articles section for Klanvision.
// Displays article cards in a responsive 3-column grid.
// Each card has a custom 3D innovative icon, tag, title, excerpt,
// author, and read-time. "View All" toggles more articles.
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, PenTool, ChevronDown, X, Link2 } from 'lucide-react';

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

// Category color helper
const getCategoryColor = (category) => {
  const colors = {
    'Technology': '#6366F1',
    'Design': '#EC4899',
    'AI': '#10B981',
    'Security': '#EF4444',
    'Strategy': '#F97316',
    'SEO': '#4F46E5',
    'Mobile Dev': '#8B5CF6',
    'Mobile Apps': '#8B5CF6',
    'Cloud': '#06B6D4'
  };
  return colors[category] || '#6366F1';
};

export default function BlogSection() {
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
    fetch(`${API_BASE_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        // Filter to only show Published blogs (or blogs with no status, which are legacy/assumed published)
        const publishedBlogs = data.filter(b => b.status === 'Published' || !b.status);
        setBlogs(publishedBlogs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs for landing page:", err);
        setLoading(false);
      });
  }, []);

  // Show only 6 posts initially, all if showAll is true
  const displayedPosts = showAll ? blogs : blogs.slice(0, 6);

  return (
    // Section – light gray background
    <section id="blog" style={{ background: 'var(--bg-main)', padding: '80px 0', transition: 'background 0.3s ease' }}>

      <div className="container">

        {/* Section Header – accent bar + heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="accent-bar" />
          <h2 className="font-bold tracking-tight text-[var(--text-main)]" style={{ marginBottom: 16 }}>
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Insights, tutorials, and industry news from the Klanvision team — stay ahead of the digital curve.
          </p>

        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 16 }}>Loading latest insights...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--bg-surface)', border: '1px dashed var(--border-main)', borderRadius: '30px' }}>
            <PenTool size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#6366F1' }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-main)' }}>No Articles Published Yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Check back soon as our expert team creates industry-leading insights.</p>
          </div>
        ) : (
          <>
            {/* Blog Cards Grid – 2 col mobile, 3 cols lg */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPosts.map((post, i) => {
                const tagColor = getCategoryColor(post.category);
                return (
                  <motion.article
                    key={post.id || post.title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -7 }}
                    onClick={() => setSelectedBlog(post)}
                    className="card"
                    style={{ 
                      overflow: 'hidden', 
                      cursor: 'pointer',
                      background: 'var(--bg-surface)',
                      boxShadow: 'var(--card-shadow)',
                      border: '1px solid var(--border-main)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{
                      height: 180, 
                      position: 'relative', 
                      overflow: 'hidden',
                      background: 'rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }} className="blog-cover">
                      {post.image ? (
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: '0.3s' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', 
                          background: `linear-gradient(135deg, ${tagColor}08, ${tagColor}15)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <PenTool size={48} style={{ color: tagColor, opacity: 0.3 }} />
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: tagColor }} />
                    </div>

                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }} className="blog-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }} className="blog-meta-top">
                        <span className="blog-tag" style={{ background: `${tagColor}15`, color: tagColor }}>
                          {post.category}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }} className="blog-date">{post.date}</span>
                      </div>

                      <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.3, color: 'var(--text-main)', flex: 1 }}>{post.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.65, marginBottom: 16 }} className="blog-excerpt">{post.excerpt || 'Read the full story to discover key insights and innovative strategies...'}</p>

                      {/* Read More & Author Link Container */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                        {/* Read More option styled exactly like services and solutions */}
                        <div 
                          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} 
                          className="read-more-wrap"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBlog(post);
                          }}
                        >
                          <span style={{ color: tagColor, fontWeight: 700, fontSize: 13, fontFamily: "'Poppins',sans-serif", letterSpacing: '0.3px' }}>Read More</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.15 }}
                            style={{
                              width: 28, height: 28, borderRadius: '50%',
                              background: tagColor,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: `0 4px 12px ${tagColor}30`,
                              flexShrink: 0,
                            }}
                          >
                            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="13 6 19 12 13 18"/>
                            </svg>
                          </motion.div>
                        </div>

                        {/* Author Link shown right hand side of Read More option button */}
                        {post.authorLink && (
                          <a 
                            href={post.authorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Author Personal Profile"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: 6,
                              color: 'var(--text-muted)',
                              fontSize: 12,
                              fontWeight: 700,
                              textDecoration: 'none',
                              padding: '6px 12px',
                              borderRadius: 10,
                              background: 'var(--bg-surface-soft)',
                              border: '1px solid var(--border-main)',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = tagColor;
                              e.currentTarget.style.borderColor = `${tagColor}50`;
                              e.currentTarget.style.background = `${tagColor}08`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.borderColor = 'var(--border-main)';
                              e.currentTarget.style.background = 'var(--bg-surface-soft)';
                            }}
                          >
                            <Link2 size={14} />
                            <span>Author Link</span>
                          </a>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-main)', marginTop: 'auto' }} className="blog-footer">
                        <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <PenTool size={12} /> 
                          <span className="author-name">{post.author}</span>
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {post.readTime}
                          {post.authorLink && (
                            <a 
                              href={post.authorLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="Author Personal Profile"
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                color: tagColor, 
                                marginLeft: 8,
                                transition: 'color 0.2s',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
                              onMouseLeave={(e) => e.currentTarget.style.color = tagColor}
                            >
                              <Link2 size={13} style={{ cursor: 'pointer' }} />
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* "View All Articles" CTA */}
            {blogs.length > 6 && (
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
            )}

            {/* ── Blog Detail Modal */}
            <AnimatePresence>
              {selectedBlog && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedBlog(null)}
                  style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: 20
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: 'var(--bg-surface)',
                      maxWidth: 700,
                      width: '100%',
                      borderRadius: 28,
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: 'var(--card-shadow)',
                      border: '1px solid var(--border-main)',
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '90vh'
                    }}
                  >
                    {/* Cover image */}
                    <div style={{ height: 240, position: 'relative', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="modal-cover">
                      {selectedBlog.image ? (
                        <img src={selectedBlog.image} alt={selectedBlog.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', 
                          background: `linear-gradient(135deg, ${getCategoryColor(selectedBlog.category)}08, ${getCategoryColor(selectedBlog.category)}15)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <PenTool size={64} style={{ color: getCategoryColor(selectedBlog.category), opacity: 0.3 }} />
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: getCategoryColor(selectedBlog.category) }} />
                      
                      {/* Close Button */}
                      <button 
                        onClick={() => setSelectedBlog(null)}
                        style={{
                          position: 'absolute',
                          top: 20, right: 20,
                          background: 'rgba(15, 23, 42, 0.6)',
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          width: 38, height: 38,
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'white',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }} className="modal-body">
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                        <span className="blog-tag" style={{ background: `${getCategoryColor(selectedBlog.category)}15`, color: getCategoryColor(selectedBlog.category), fontSize: 12, padding: '4px 12px' }}>
                          {selectedBlog.category}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{selectedBlog.date}</span>
                      </div>

                      <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 900, fontSize: 24, color: 'var(--text-main)', marginBottom: 20, lineHeight: 1.3 }}>
                        {selectedBlog.title}
                      </h3>

                      <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '12px 18px', background: 'var(--bg-surface-soft)', borderRadius: 12, marginBottom: 24, border: '1px solid var(--border-main)', flexWrap: 'wrap' }} className="modal-meta-bar">
                        <span style={{ color: 'var(--text-main)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                          <PenTool size={14} color={getCategoryColor(selectedBlog.category)} /> Author: 
                          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{selectedBlog.author}</span>
                        </span>
                        <span style={{ color: 'var(--text-main)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                          <Clock size={14} color={getCategoryColor(selectedBlog.category)} /> Read Time: <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{selectedBlog.readTime}</span>
                        </span>
                        {selectedBlog.authorLink && (
                          <a 
                            href={selectedBlog.authorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Author Personal Profile"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: 6,
                              color: getCategoryColor(selectedBlog.category), 
                              fontSize: 13,
                              fontWeight: 600,
                              textDecoration: 'none',
                              marginLeft: 'auto',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
                            onMouseLeave={(e) => e.currentTarget.style.color = getCategoryColor(selectedBlog.category)}
                          >
                            <Link2 size={15} style={{ cursor: 'pointer' }} />
                            <span>Author Profile</span>
                          </a>
                        )}
                      </div>

                      <p style={{ 
                        color: 'var(--text-main)', 
                        fontSize: 15, 
                        lineHeight: 1.8, 
                        fontFamily: "'Roboto','Poppins',sans-serif",
                        whiteSpace: 'pre-line' 
                      }}>
                        {selectedBlog.content || selectedBlog.excerpt || 'Read the full story to discover key insights and innovative strategies...'}
                      </p>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border-main)', textAlign: 'right', background: 'var(--bg-surface-soft)' }} className="modal-footer-bar">
                      <button
                        onClick={() => setSelectedBlog(null)}
                        style={{
                          padding: '12px 30px',
                          borderRadius: 12,
                          background: getCategoryColor(selectedBlog.category),
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 14,
                          fontFamily: "'Poppins',sans-serif",
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${getCategoryColor(selectedBlog.category)}40`,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Close Insights
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* ── Responsive Refinements ──────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #blog { padding: 64px 0 !important; }
          #blog .container { padding: 0 24px; }
        }
        @media (max-width: 768px) {
          #blog { padding: 56px 0 !important; }
          #blog h2 { font-size: 1.6rem !important; }
          #blog .grid { gap: 16px !important; }
          .blog-cover { height: 140px !important; }
          .blog-body { padding: 16px !important; }
          .blog-body h3 { font-size: 15px !important; }
          .blog-excerpt { font-size: 11px !important; }
        }
        @media (max-width: 480px) {
          #blog { padding: 48px 0 !important; }
          #blog h2 { font-size: 1.4rem !important; }
          #blog .grid { gap: 12px !important; }
          .blog-cover { height: 110px !important; }
          .blog-icon-wrap { transform: scale(0.65) !important; }
          .blog-body { padding: 12px 8px !important; }
          .blog-body h3 { font-size: 11px !important; margin-bottom: 6px !important; font-weight: 700 !important; height: 30px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 1.3 !important; }
          .blog-excerpt { display: -webkit-box !important; font-size: 9px !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4 !important; margin-bottom: 12px !important; height: 26px; }
          .read-more-wrap { margin-bottom: 12px !important; gap: 6px !important; }
          .read-more-wrap span { font-size: 10px !important; }
          .read-more-wrap div { width: 22px !important; height: 22px !important; }
          .blog-tag { font-size: 8px !important; padding: 2px 6px !important; }
          .blog-date { font-size: 8px !important; }
          .blog-footer { padding-top: 10px !important; }
          .author-name { display: none !important; }
          .blog-footer span { font-size: 9px !important; gap: 3px !important; }
          .blog-meta-top { margin-bottom: 8px !important; }
          
          /* Modal mobile responsiveness */
          .modal-cover { height: 150px !important; }
          .modal-body { padding: 16px !important; }
          .modal-body h3 { font-size: 18px !important; margin-bottom: 12px !important; }
          .modal-meta-bar { padding: 8px 12px !important; gap: 12px !important; margin-bottom: 16px !important; flex-wrap: wrap; }
          .modal-body p { font-size: 13px !important; line-height: 1.6 !important; }
          .modal-footer-bar { padding: 12px 16px !important; }
          .modal-footer-bar button { padding: 10px 20px !important; font-size: 13px !important; width: 100%; }
        }
      `}</style>
    </section>
  );
}
