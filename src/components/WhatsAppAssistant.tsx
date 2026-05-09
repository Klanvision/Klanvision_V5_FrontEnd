import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

// ── Configuration ──
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "AI Solutions & Automation",
  "Cloud & DevOps Services",
  "UI/UX Design",
  "E-Commerce Solutions",
  "Digital Marketing & SEO",
  "Custom Business Solutions"
];

const BUDGETS = [
  "₹10K – ₹25K",
  "₹25K – ₹50K",
  "₹50K – ₹1L",
  "₹1L+",
  "Prefer to Discuss"
];

const TIMELINES = [
  "Urgent (1–2 Weeks)",
  "1 Month",
  "2–3 Months",
  "Flexible Timeline"
];

type Step = 'GREETING' | 'ASK_EMAIL' | 'ASK_PHONE' | 'ASK_SERVICE' | 'ASK_BUDGET' | 'ASK_TIMELINE' | 'COMPLETE';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
};

interface WhatsAppAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

export default function WhatsAppAssistant({ isOpen, onToggle, isVisible }: WhatsAppAssistantProps) {
  const [step, setStep] = useState<Step>('GREETING');
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: ''
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with personalized time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    setMessages([
      { 
        id: 1, 
        text: `${greeting} 👋\nThank you for contacting Klanvision 🚀\n\nWe’re excited to help you transform your ideas into powerful digital solutions.\n\nOur AI Business Assistant will guide you through a few quick questions to better understand your project requirements 😊\n\nMay I know your full name?`, 
        sender: 'bot', 
        timestamp: new Date() 
      }
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        options
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[\d\s-]{10,}$/.test(phone);

  const handleSend = (textOverride?: string) => {
    const text = textOverride || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    processFlow(text);
  };

  const processFlow = (input: string) => {
    switch (step) {
      case 'GREETING':
        setLeadData(prev => ({ ...prev, name: input }));
        setStep('ASK_EMAIL');
        addBotMessage(`Thank you, ${input} 😊\n\nTo proceed further, kindly provide your Business Email Address.\n\n📧 Example: example@company.com`);
        break;
      case 'ASK_EMAIL':
        if (validateEmail(input)) {
          setLeadData(prev => ({ ...prev, email: input }));
          setStep('ASK_PHONE');
          addBotMessage("Great! Now, please provide your Mobile Number.\n\n📱 Example format: +91-**********\n\n⚠️ Both details are mandatory for consultation.");
        } else {
          addBotMessage("I'm sorry, that doesn't look like a valid email. Please enter a valid Business Email Address.");
        }
        break;
      case 'ASK_PHONE':
        if (validatePhone(input)) {
          setLeadData(prev => ({ ...prev, phone: input }));
          setStep('ASK_SERVICE');
          addBotMessage("Your details have been verified successfully. 👍\n\nPlease select the service you are interested in:", SERVICES);
        } else {
          addBotMessage("Invalid phone number format. Please try again.\n\nExample: +91-**********");
        }
        break;
      case 'ASK_SERVICE':
        setLeadData(prev => ({ ...prev, service: input }));
        setStep('ASK_BUDGET');
        addBotMessage("Excellent choice 🚀\n\nPlease select your estimated project budget:", BUDGETS);
        break;
      case 'ASK_BUDGET':
        setLeadData(prev => ({ ...prev, budget: input }));
        setStep('ASK_TIMELINE');
        addBotMessage("Great 👍\n\nPlease select your expected project timeline:", TIMELINES);
        break;
      case 'ASK_TIMELINE':
        const finalData = { ...leadData, timeline: input };
        setLeadData(finalData);
        setStep('COMPLETE');
        submitLead(finalData);
        addBotMessage(`Thank you, ${leadData.name} 😊\n\nYour inquiry has been successfully submitted to the Klanvision team 🚀\n\n📌 Our experts will review your requirements and contact you shortly regarding:\n\n✔ Technical Consultation\n✔ Business Strategy\n✔ Project Planning\n\nWe look forward to working with you ✨`);
        break;
    }
  };

  const submitLead = async (data: any) => {
    try {
      await fetch('https://formsubmit.co/ajax/sunnyok1433@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "Lead Source": "WhatsApp Assistant",
          "Name": data.name,
          "Email": data.email,
          "Phone": data.phone,
          "Service": data.service,
          "Budget": data.budget,
          "Timeline": data.timeline,
          _subject: `🟢 WhatsApp Lead - ${data.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.error("Lead submission failed", err);
    }
  };

  const openWhatsApp = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const message = `🚀 *New Project Inquiry - Klanvision*\n\n` +
      `👤 *Name:* ${leadData.name}\n` +
      `📧 *Email:* ${leadData.email}\n` +
      `📱 *Phone:* ${leadData.phone}\n` +
      `🛠️ *Service:* ${leadData.service}\n` +
      `💰 *Budget:* ${leadData.budget}\n` +
      `⏳ *Timeline:* ${leadData.timeline}\n\n` +
      `Hello Klanvision Team 👋, I would like to discuss my project requirements. Please assist me with the next steps. 😊`;
    const whatsappUrl = `https://wa.me/919380202408?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="whatsapp-toggle">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, opacity: 1,
                rotate: [0, -10, 10, -10, 10, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 3 } 
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggle}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
                border: 'none', cursor: 'pointer', position: 'relative'
              }}
            >
              {isOpen ? <X size={28} /> : <FaWhatsapp size={32} />}
              {!isOpen && (
                <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: '#EF4444', borderRadius: '50%', border: '2px solid white' }} />
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="chat-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="whatsapp-chat-popup"
            >
              {/* Header */}
              <div className="chat-header" style={{ background: 'linear-gradient(135deg, #128C7E, #25D366)' }}>
                <div className="header-info">
                  <div className="brand-logo">
                    <img src="/logo.png" alt="Klanvision" />
                  </div>
                  <div>
                    <div className="header-title">Klanvision Support</div>
                    <div className="header-status">
                      <span className="status-dot" /> Online | Typically instant
                    </div>
                  </div>
                </div>
                <button onClick={onToggle} className="close-btn"><X size={20} /></button>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="messages-area">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`message-bubble ${msg.sender}`}
                    >
                      {msg.text}
                      <div className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </motion.div>
                    
                    {msg.options && step !== 'COMPLETE' && (
                      <div className="options-container">
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt}
                            whileHover={{ scale: 1.02, background: '#128C7E', color: 'white' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSend(opt)}
                            className="option-btn"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="typing-indicator">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                  </div>
                )}

                {step === 'COMPLETE' && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => openWhatsApp(e)}
                    className="whatsapp-redirect-btn"
                  >
                    <FaWhatsapp size={20} /> CHAT ON WHATSAPP
                  </motion.button>
                )}
              </div>

              {/* Input Area */}
              {step !== 'COMPLETE' && (
                <div className="input-area">
                  <div className="input-container">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSend()}
                      className="send-btn"
                      style={{ background: '#128C7E' }}
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .whatsapp-toggle {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 10000;
        }
        .chat-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: none;
        }
        .whatsapp-chat-popup {
          position: fixed;
          bottom: 180px;
          right: 24px;
          width: 360px;
          height: 600px;
          max-height: calc(100vh - 240px);
          background: var(--bg-surface);
          border-radius: 24px;
          border: 1px solid var(--border-main);
          boxShadow: 0 20px 50px rgba(0,0,0,0.3);
          z-index: 10001;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .chat-header {
          padding: 16px 20px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-logo {
          width: 38px;
          height: 38px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 4px;
        }
        .brand-logo img { width: 80%; height: auto; }
        .header-title {
          font-weight: 800;
          font-size: 15px;
        }
        .header-status {
          font-size: 10px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.7;
          padding: 4px;
        }
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: var(--bg-surface-soft);
          background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
          background-size: contain;
        }
        .message-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .message-wrapper.user { align-items: flex-end; }
        .message-wrapper.bot { align-items: flex-start; }
        .message-bubble {
          max-width: 85%;
          padding: 10px 14px;
          font-size: 13.5px;
          line-height: 1.5;
          box-shadow: 0 1px 1px rgba(0,0,0,0.1);
          white-space: pre-wrap;
          position: relative;
        }
        .message-bubble.user {
          background: #DCF8C6;
          color: #303030;
          border-radius: 15px 15px 0 15px;
        }
        .message-bubble.bot {
          background: white;
          color: #303030;
          border-radius: 15px 15px 15px 0;
        }
        .message-time {
          font-size: 9px;
          color: #9CA3AF;
          text-align: right;
          margin-top: 4px;
        }
        .options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .option-btn {
          padding: 6px 12px;
          border-radius: 50px;
          border: 1px solid #128C7E;
          background: white;
          color: #128C7E;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 8px 12px;
          background: white;
          border-radius: 15px;
          border: 1px solid #E5E7EB;
          width: fit-content;
        }
        .typing-indicator span {
          width: 4px;
          height: 4px;
          background: #9CA3AF;
          border-radius: 50%;
        }
        .whatsapp-redirect-btn {
          margin-top: 10px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: #25D366;
          color: white;
          border: none;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }
        .input-area {
          padding: 15px 20px;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-main);
        }
        .input-container {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .input-container input {
          flex: 1;
          padding: 10px 16px;
          border-radius: 50px;
          border: 1.5px solid var(--border-main);
          outline: none;
          font-size: 13.5px;
          background: var(--bg-surface-soft);
          color: var(--text-main);
        }
        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .chat-backdrop { display: block; }
          .whatsapp-chat-popup {
            inset: 0 !important;
            width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border: none !important;
          }
          .whatsapp-toggle {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
