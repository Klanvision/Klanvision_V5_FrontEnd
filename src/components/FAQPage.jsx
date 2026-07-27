import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, ChevronLeft, X, CheckCircle, Send, Loader2, HelpCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

// ── 3D Animated FAQ Icons ─────────────────────────────────────
const SvgFAQIcon3D = ({ index, active }) => {
  const type = index % 3; // Cycle through 3 different shapes
  
  return (
    <motion.svg 
      width="32" height="32" viewBox="0 0 42 42" fill="none"
      animate={active ? { rotateY: [0, 360], scale: [1, 1.1, 1] } : { y: [0, -2, 0] }}
      transition={{ duration: active ? 4 : 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id={`g-faq-${index}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={active ? "#A855F7" : "#818CF8"} />
          <stop offset="100%" stopColor={active ? "#7C3AED" : "#4F46E5"} />
        </radialGradient>
      </defs>

      {type === 0 && ( // 3D Cube representation
        <motion.path
          d="M21 6 L34 13 L34 29 L21 36 L8 29 L8 13 Z"
          fill={`url(#g-faq-${index})`}
          stroke="white" strokeWidth="0.5" strokeOpacity="0.3"
        />
      )}
      {type === 1 && ( // 3D Sphere representation
        <motion.circle
          cx="21" cy="21" r="15"
          fill={`url(#g-faq-${index})`}
        />
      )}
      {type === 2 && ( // 3D Torus/Donut representation
        <motion.path
          d="M21 8 A13 13 0 1 0 21 34 A13 13 0 1 0 21 8 Z M21 16 A5 5 0 1 1 21 26 A5 5 0 1 1 21 16 Z"
          fill={`url(#g-faq-${index})`}
          fillRule="evenodd"
        />
      )}
      
      {/* Glossy highlight */}
      <circle cx="16" cy="15" r="4" fill="white" fillOpacity="0.2" />
    </motion.svg>
  );
};

const faqs = [
  {
    q: "What services do you offer?",
    a: "We provide a comprehensive range of IT and software solutions, including web development, mobile application development, cloud services, API integration, cybersecurity, and managed IT services."
  },
  {
    q: "Do you provide support after project delivery?",
    a: "Yes, we offer post-deployment support and maintenance services to ensure system stability, performance, and continuous improvement."
  },
  {
    q: "How long does a project typically take?",
    a: "Project timelines vary depending on the scope, complexity, and specific requirements. A detailed timeline is shared during the proposal and planning phase."
  },
  {
    q: "What is your pricing model?",
    a: "Our pricing is based on project scope, complexity, and resource requirements. We offer flexible models such as fixed-price, milestone-based, and time & material (hourly/monthly)."
  },
  {
    q: "Do you offer a Service Level Agreement (SLA)?",
    a: "Yes, we provide SLAs for managed and support services, defining response times, resolution timelines, and service availability commitments."
  },
  {
    q: "How do you communicate during the project?",
    a: "We maintain regular communication through email, scheduled meetings, and collaboration tools. Progress updates are shared at defined intervals to ensure transparency."
  },
  {
    q: "What tools and technologies do you use?",
    a: "We work with modern technologies and tools based on project needs, including cloud platforms, DevOps tools, and development frameworks aligned with industry standards."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes, we strictly adhere to confidentiality standards and are happy to sign NDAs to protect your business information and intellectual property."
  },
  {
    q: "Do you provide cloud migration services?",
    a: "Yes, we offer end-to-end cloud migration and infrastructure modernization services to help businesses scale efficiently and securely."
  },
  {
    q: "Do you provide ongoing maintenance and support?",
    a: "Yes, we offer flexible support and maintenance plans based on your business needs."
  },
  {
    q: "What industries do you work with?",
    a: "We work with clients across various industries, delivering customized solutions tailored to specific business requirements."
  }
];

export default function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions | Klanvision Support',
    description: 'Find answers to common questions about Klanvision services, project timelines, pricing, NDAs, SLAs, tech stack, cloud migration and post-delivery support.',
    keywords: 'FAQ, Klanvision support, IT services questions, pricing, project timeline, NDA, SLA',
    canonical: '/faq',
  });

  const [openIndex, setOpenIndex] = useState(0);

  // Question Modal State – Simplified strictly to question entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setErrorMessage("Please enter your question before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/sunnyok1433@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          "Submitted Question": question.trim(),
          "Source Page": "Klanvision FAQ Support Popup",
          _subject: `❓ New FAQ Question Submitted`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("Failed to submit your question. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setQuestion('');
      setErrorMessage('');
    }, 300);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: 80, position: 'relative' }}>
      {/* FAQ Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #120F17 0%, #1F2937 100%)', color: 'white', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Animated background elements */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.1), transparent)', pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Navigation Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}
          >
            <a href="/" style={{ color: '#A855F7', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s', padding: '8px 16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 100 }} className="back-link">
              <ChevronLeft size={16} /> Back to Home
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, marginBottom: 16 }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Find answers to the most common questions about our services, process, and commitment to your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="container" style={{ marginTop: -40, position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ marginBottom: 16 }}
            >
              <div 
                className="card"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  background: 'var(--bg-surface)',
                  border: openIndex === i ? '1px solid var(--primary-purple)' : '1px solid var(--border-main)',
                  boxShadow: openIndex === i ? '0 10px 25px rgba(124,58,237,0.2)' : 'var(--card-shadow)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                     <div style={{ flexShrink: 0 }}>
                      <SvgFAQIcon3D index={i} active={openIndex === i} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{faq.q}</h3>
                  </div>
                  <div style={{ color: openIndex === i ? 'var(--primary-purple)' : '#9CA3AF' }}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 32px 32px 70px', color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still have questions? CTA */}
      <section className="container" style={{ textAlign: 'center', marginTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ padding: '60px 40px', background: 'var(--bg-surface)', borderRadius: 32, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-main)' }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 12, color: 'var(--text-main)' }}>Still have questions?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 16 }}>Can't find the answer you're looking for? Our support team is here to help.</p>
          
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
            style={{ 
              border: 'none', 
              cursor: 'pointer', 
              padding: '16px 40px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 10, 
              fontSize: 16, 
              fontWeight: 700 
            }}
          >
            <HelpCircle size={20} />
            Contact Support Team
          </button>
        </motion.div>
      </section>

      {/* ── Ask Question Support Modal (Simplified - Strictly Question Input) */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(2, 6, 23, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-main)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'var(--bg-surface-soft)',
                  border: '1px solid var(--border-main)',
                  color: 'var(--text-muted)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <X size={18} />
              </button>

              {!isSubmitted ? (
                <div>
                  {/* Modal Header */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)', color: '#A855F7', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
                      <HelpCircle size={14} /> KLANVISION SUPPORT
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                      Ask a Question
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                      Type your question below and click submit. Our team will receive your query instantly.
                    </p>
                  </div>

                  {errorMessage && (
                    <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#EF4444', borderRadius: '12px', fontSize: '13px', fontWeight: 600, marginBottom: '20px' }}>
                      {errorMessage}
                    </div>
                  )}

                  {/* Form - Question Field Only */}
                  <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Your Question <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={5}
                        placeholder="Enter your question or query here..."
                        required
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          background: 'var(--bg-surface-soft)',
                          border: '1px solid var(--border-main)',
                          borderRadius: '14px',
                          color: 'var(--text-main)',
                          fontSize: '14.5px',
                          lineHeight: '1.6',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        height: '50px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                        color: 'white',
                        border: 'none',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 20px rgba(124, 58, 237, 0.35)',
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Submit Question
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Success Screen */
                <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px auto'
                    }}
                  >
                    <CheckCircle size={36} />
                  </motion.div>

                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                    Question Submitted!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                    Thank you! Your question has been submitted successfully to our support team.
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: '12px 32px',
                      borderRadius: '12px',
                      background: 'var(--bg-surface-soft)',
                      border: '1px solid var(--border-main)',
                      color: 'var(--text-main)',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
