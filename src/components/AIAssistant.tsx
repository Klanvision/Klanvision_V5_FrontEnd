import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

// ── Configuration ──
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "AI Solutions & Automation",
  "Cloud & DevOps Services",
  "UI/UX Design",
  "E-Commerce Solutions",
  "Digital Marketing & SEO",
  "Other Business Requirements"
];

const BUDGETS = [
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Prefer to Discuss with Team"
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

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

export default function AIAssistant({ isOpen, onToggle, isVisible }: AIAssistantProps) {
  const [step, setStep] = useState<Step>('GREETING');
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: ''
  });

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome to Klanvision 👋\nWe help businesses transform ideas into powerful digital solutions 🚀\n\nI’m your AI Assistant, and I’ll guide you through a few quick questions to better understand your requirements.\n\nTo get started, may I know your full name?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    setMessages([{ 
      id: 1, 
      text: `${greeting}! Welcome to Klanvision 👋\nWe help businesses transform ideas into powerful digital solutions 🚀\n\nI’m your AI Assistant, and I’ll guide you through a few quick questions to better understand your requirements.\n\nTo get started, may I know your full name?`, 
      sender: 'bot', 
      timestamp: new Date() 
    }]);
  }, []);

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
        addBotMessage(`Thank you, ${input} 😊\n\nTo provide you with a free consultation, please share your Business Email Address.`);
        break;
      case 'ASK_EMAIL':
        if (validateEmail(input)) {
          setLeadData(prev => ({ ...prev, email: input }));
          setStep('ASK_PHONE');
          addBotMessage("Great! Now, please provide your Mobile Number so we can reach out for a quick discussion.");
        } else {
          addBotMessage("I'm sorry, that doesn't look like a valid email address. Could you please try again?\n\nExample: ✔ example@company.com");
        }
        break;
      case 'ASK_PHONE':
        if (validatePhone(input)) {
          setLeadData(prev => ({ ...prev, phone: input }));
          setStep('ASK_SERVICE');
          addBotMessage("Perfect 👍\nPlease select the service you are interested in:", SERVICES);
        } else {
          addBotMessage("I'm sorry, that doesn't look like a valid phone number. Could you please try again?\n\nExample format: ✔ +91-**********");
        }
        break;
      case 'ASK_SERVICE':
        setLeadData(prev => ({ ...prev, service: input }));
        if (input === "Other Business Requirements") {
            addBotMessage("Thank you for sharing your requirement 😊\n\nFor customized business solutions and detailed discussions, our experts would be happy to assist you personally.\n\n📧 support@klanvision.com\n📞 +91 70323 62358\n\nOur team will contact you shortly with the best possible solution tailored to your business needs 🚀");
            setStep('COMPLETE');
        } else {
            setStep('ASK_BUDGET');
            addBotMessage("Excellent choice 🚀\n\nTo help us recommend the most suitable solution, please select your estimated project budget range:", BUDGETS);
        }
        break;
      case 'ASK_BUDGET':
        setLeadData(prev => ({ ...prev, budget: input }));
        setStep('ASK_TIMELINE');
        addBotMessage("Great 👍\n\nWhat is your expected project timeline?", TIMELINES);
        break;
      case 'ASK_TIMELINE':
        setLeadData(prev => ({ ...prev, timeline: input }));
        setStep('COMPLETE');
        submitLead({ ...leadData, timeline: input });
        addBotMessage(`Thank you for sharing your project details, ${leadData.name} 😊\n\n📌 Our team will carefully review your requirements and contact you shortly with:\n\n✔ Project Consultation\n✔ Technical Suggestions\n✔ Estimated Cost & Timeline\n✔ Best Suitable Technologies\n\nWe look forward to working with you and helping your business grow digitally 🚀\n\nHave a wonderful day ✨`);
        break;
    }
  };

  const submitLead = async (data: any) => {
    try {
      await fetch('https://formsubmit.co/ajax/sunnyok1433@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "Name": data.name,
          "Email": data.email,
          "Phone": data.phone,
          "Service": data.service,
          "Budget": data.budget,
          "Project Timeline": data.timeline,
          _subject: `🚀 New AI Lead - ${data.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.error("Lead submission failed", err);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="ai-assistant-toggle">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggle}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
                border: 'none', cursor: 'pointer', position: 'relative'
              }}
            >
              {isOpen ? <X size={28} /> : <Bot size={32} />}
              {!isOpen && (
                <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: '#EF4444', borderRadius: '50%', border: '2px solid var(--bg-main)' }} />
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
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
              className="ai-chat-popup"
            >
              {/* Header */}
              <div className="chat-header" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                <div className="header-info">
                  <div className="bot-icon"><Bot size={22} /></div>
                  <div>
                    <div className="header-title">Klanvision AI</div>
                    <div className="header-status">
                      <span className="status-dot" /> Online Support
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
                    </motion.div>
                    
                    {msg.options && step !== 'COMPLETE' && (
                      <div className="options-container">
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt}
                            whileHover={{ scale: 1.02, background: '#4F46E5', color: 'white' }}
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
              </div>

              {/* Input Area */}
              {step !== 'COMPLETE' && (
                <div className="input-area">
                  <div className="input-container">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type your message..."
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSend()}
                      className="send-btn"
                      style={{ background: '#4F46E5' }}
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
        .ai-assistant-toggle {
          position: fixed;
          bottom: 24px;
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
        .ai-chat-popup {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 400px;
          height: 600px;
          max-height: calc(100vh - 140px);
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
        .bot-icon {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header-title {
          font-weight: 800;
          font-size: 15px;
        }
        .header-status {
          font-size: 10px;
          opacity: 0.8;
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
          gap: 16px;
          background: var(--bg-surface-soft);
        }
        .message-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .message-wrapper.user { align-items: flex-end; }
        .message-wrapper.bot { align-items: flex-start; }
        .message-bubble {
          max-width: 85%;
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.5;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          white-space: pre-wrap;
        }
        .message-bubble.user {
          background: #4F46E5;
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
        .message-bubble.bot {
          background: var(--bg-surface);
          color: var(--text-main);
          border: 1px solid var(--border-main);
          border-radius: 18px 18px 18px 4px;
        }
        .options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }
        .option-btn {
          padding: 8px 16px;
          border-radius: 50px;
          border: 1.5px solid #4F46E5;
          background: transparent;
          color: #4F46E5;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: var(--bg-surface);
          border-radius: 15px;
          border: 1px solid var(--border-main);
          width: fit-content;
        }
        .typing-indicator span {
          width: 5px;
          height: 5px;
          background: var(--text-muted);
          border-radius: 50%;
        }
        .input-area {
          padding: 16px 20px;
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
          font-size: 14px;
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
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        @media (max-width: 768px) {
          .ai-chat-popup {
            width: 360px;
            right: 20px;
            bottom: 90px;
          }
        }

        @media (max-width: 480px) {
          .chat-backdrop { display: block; }
          .ai-chat-popup {
            inset: 0 !important;
            width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border: none !important;
          }
          .ai-assistant-toggle {
            bottom: 16px;
            right: 16px;
          }
          .message-bubble { font-size: 13px; }
        }
      `}</style>
    </>
  );
}
