import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, FileText, Settings, LogOut, LayoutDashboard, 
  Search, Bell, CheckCircle2, Clock, X, Edit, Upload, ExternalLink,
  GraduationCap, Award, MapPin, Calendar, Menu, Mail, 
  ShieldCheck, FileCode, CheckCircle, ChevronRight, Bookmark
} from 'lucide-react';

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const checkSession = () => {
      const userStr = localStorage.getItem('candidateUser');
      if (!userStr) {
        navigate('/candidate-login');
        return;
      }
      try {
        setCandidate(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem('candidateUser');
        navigate('/candidate-login');
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('candidateToken');
    localStorage.removeItem('candidateUser');
    navigate('/candidate-login');
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #6366F1', borderRadius: '50%' }}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
      {/* ── Separate Sidebar View ─────────────────────────────────── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        style={{ 
          background: '#FFFFFF', 
          borderRight: '1px solid #E2E8F0',
          display: 'flex', flexDirection: 'column',
          zIndex: 100, position: 'relative',
          boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ 
            width: 36, height: 36, borderRadius: 10, 
            background: 'linear-gradient(135deg, #4F46E5, #9333EA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Briefcase size={20} color="white" />
          </div>
          {isSidebarOpen && (
            <span style={{ fontWeight: 900, fontSize: 18, color: '#1E293B', letterSpacing: '-0.5px' }}>CAREER HUB</span>
          )}
        </div>

        {/* Navigation Modules */}
        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <NavButton 
            icon={LayoutDashboard} label="Dashboard" 
            active={activeTab === 'Dashboard'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Dashboard')} 
          />
          <NavButton 
            icon={Briefcase} label="Applications" 
            active={activeTab === 'Applications'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Applications')} 
          />
          <NavButton 
            icon={Search} label="Search Jobs" 
            active={activeTab === 'Jobs'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Jobs')} 
          />
          <NavButton 
            icon={Mail} label="Messages" 
            active={activeTab === 'Messages'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Messages')} 
            badge="2"
          />
          <NavButton 
            icon={FileText} label="My Documents" 
            active={activeTab === 'Documents'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Documents')} 
          />
          <NavButton 
            icon={User} label="Profile" 
            active={activeTab === 'Profile'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Profile')} 
          />
          <div style={{ margin: '12px 0', borderTop: '1px solid #F1F5F9' }} />
          <NavButton 
            icon={Settings} label="Settings" 
            active={activeTab === 'Settings'} 
            expanded={isSidebarOpen} 
            onClick={() => setActiveTab('Settings')} 
          />
        </nav>

        {/* Sidebar Logout */}
        <div style={{ padding: '24px 12px', borderTop: '1px solid #F1F5F9' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              background: 'transparent', color: '#64748B', display: 'flex', 
              alignItems: 'center', gap: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main View Area ────────────────────────────────────────── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Sticky Header */}
        <header style={{ 
          height: 70, background: 'white', borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}
            >
              <Menu size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#94A3B8', fontSize: 14 }}>Pages</span>
              <span style={{ color: '#E2E8F0' }}>/</span>
              <span style={{ color: '#1E293B', fontWeight: 600, fontSize: 14 }}>{activeTab}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative' }}>
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <Bell size={20} />
                <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid white' }} />
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{candidate?.name || 'User'}</div>
                <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>Active Portal</div>
              </div>
              <div style={{ 
                width: 36, height: 36, borderRadius: '50%', 
                background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700,
                boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
              }}>
                {(candidate?.name || 'U').split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Module Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Dashboard' && <OverviewModule candidate={candidate} />}
              {activeTab === 'Applications' && <ApplicationsModule />}
              {activeTab === 'Jobs' && <JobsModule />}
              {activeTab === 'Messages' && <MessagesModule />}
              {activeTab === 'Documents' && <DocumentsModule />}
              {activeTab === 'Profile' && <ProfileModule candidate={candidate} />}
              {activeTab === 'Settings' && <SettingsModule />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ── Generic Nav Button ────────────────────────────────── */
function NavButton({ icon: Icon, label, active, expanded, onClick, badge }) {
  return (
    <button 
      onClick={onClick}
      style={{ 
        width: '100%', padding: '12px 14px', borderRadius: 12, border: 'none',
        background: active ? '#F1F5FF' : 'transparent', 
        color: active ? '#4F46E5' : '#64748B', 
        display: 'flex', alignItems: 'center', gap: 12, 
        cursor: 'pointer', transition: 'all 0.2s',
        position: 'relative'
      }}
    >
      <Icon size={20} style={{ flexShrink: 0, strokeWidth: active ? 2.5 : 2 }} />
      {expanded && <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>}
      {expanded && badge && (
        <span style={{ 
          marginLeft: 'auto', background: '#4F46E5', color: 'white', 
          fontSize: 10, padding: '2px 6px', borderRadius: 10, fontWeight: 800 
        }}>{badge}</span>
      )}
      {active && (
        <motion.div 
          layoutId="sidebarActive"
          style={{ position: 'absolute', left: 0, width: 4, height: 20, background: '#4F46E5', borderRadius: '0 4px 4px 0' }}
        />
      )}
    </button>
  );
}

/* ── MODULE: Overview ─────────────────────────────────────── */
function OverviewModule({ candidate }) {
  const stats = [
    { label: 'Active Applications', val: '4', icon: CheckCircle2, color: '#4F46E5' },
    { label: 'Upcoming Interviews', val: '1', icon: Clock, color: '#F59E0B' },
    { label: 'New Job Matches', val: '12', icon: Briefcase, color: '#10B981' },
    { label: 'Saved Items', val: '8', icon: Bookmark, color: '#EC4899' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
        borderRadius: 24, padding: '48px', color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: 40, opacity: 0.1 }}>
          <Briefcase size={200} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Welcome back, {candidate?.name || 'Candidate'}!</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 500, lineHeight: 1.6 }}>
            You have <span style={{ color: '#818CF8', fontWeight: 700 }}>1 interview</span> scheduled for this week. 
            Keep your profile updated to increase your chances by 40%.
          </p>
          <button style={{ 
            marginTop: 24, background: '#4F46E5', color: 'white', border: 'none', 
            padding: '12px 24px', borderRadius: 12, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(79,70,229,0.4)'
          }}>
            View Next Step
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'white', padding: 24, borderRadius: 20, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ background: `${s.color}10`, color: s.color, width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={28} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#1E293B' }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 20 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ActivityItem title="Application Status Updated" sub="Frontend Developer - In Review" time="2h ago" icon={CheckCircle2} color="#10B981" />
            <ActivityItem title="New Message from HR" sub="Regarding your recent application" time="5h ago" icon={Mail} color="#4F46E5" />
            <ActivityItem title="Interview Scheduled" sub="Technical Round with Team A" time="1d ago" icon={Clock} color="#F59E0B" />
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1E293B', marginBottom: 20 }}>Profile Strength</h3>
          <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 20 }}>
            <svg width="140" height="140" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900 }}>75%</div>
          </div>
          <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>Add your <b>Experience</b> to reach 100% and unlock premium jobs.</p>
          <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #E2E8F0', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Complete Profile</button>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, sub, time, icon: Icon, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderRadius: 12, border: '1px solid #F1F5F9' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}10`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#64748B' }}>{sub}</div>
      </div>
      <div style={{ fontSize: 11, color: '#94A3B8' }}>{time}</div>
    </div>
  );
}

/* ── MODULE: Applications ────────────────────────────────── */
function ApplicationsModule() {
  return (
    <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Track Status</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          {['All', 'Under Review', 'Interview', 'Closed'].map(f => (
            <button key={f} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: f === 'All' ? '#F1F5FF' : 'transparent', color: f === 'All' ? '#4F46E5' : '#64748B', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <th style={{ padding: '20px 0', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Position</th>
              <th style={{ padding: '20px 0', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Applied On</th>
              <th style={{ padding: '20px 0', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '20px 0', textAlign: 'right', fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { role: 'Frontend Developer', company: 'IT Solutions', date: '24 Oct, 2026', status: 'In Review', color: '#3B82F6' },
              { role: 'Cloud Engineer', company: 'Digital Cloud', date: '20 Oct, 2026', status: 'Interview', color: '#F59E0B' },
              { role: 'UI/UX Designer', company: 'Creative Agency', date: '12 Oct, 2026', status: 'Closed', color: '#EF4444' }
            ].map((app, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '24px 0' }}>
                  <div style={{ fontWeight: 800, color: '#1E293B', fontSize: 15 }}>{app.role}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8' }}>{app.company}</div>
                </td>
                <td style={{ padding: '24px 0', color: '#64748B', fontSize: 14 }}>{app.date}</td>
                <td style={{ padding: '24px 0' }}>
                  <span style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, background: `${app.color}10`, color: app.color }}>{app.status}</span>
                </td>
                <td style={{ padding: '24px 0', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#4F46E5', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── MODULE: Profile ──────────────────────────────────────── */
function ProfileModule({ candidate }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 32, textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 24, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
              <User size={48} />
            </div>
            <button style={{ position: 'absolute', bottom: -10, right: -10, width: 32, height: 32, borderRadius: 10, background: 'white', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <Edit size={16} />
            </button>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1E293B', margin: '0 0 4px' }}>{candidate?.name}</h3>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>{candidate?.email}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {['React', 'Node.js', 'AWS'].map(t => <span key={t} style={{ padding: '4px 10px', borderRadius: 6, background: '#F8FAFC', color: '#64748B', fontSize: 11, fontWeight: 700, border: '1px solid #E2E8F0' }}>{t}</span>)}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 24 }}>
          <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16 }}>Resume & CV</h4>
          <div style={{ padding: 16, borderRadius: 12, border: '1px dashed #CBD5E1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
            <FileCode size={32} color="#94A3B8" />
            <div style={{ fontSize: 12, color: '#64748B' }}>Drag & drop your resume here</div>
            <button style={{ color: '#4F46E5', background: 'none', border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Browse Files</button>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Professional Information</h3>
          <button style={{ background: '#F1F5FF', color: '#4F46E5', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Edit Profile</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <ProfileField label="Full Name" val={candidate?.name} />
          <ProfileField label="Email Address" val={candidate?.email} />
          <ProfileField label="Phone Number" val={candidate?.phone || "+91 98765 43210"} />
          <ProfileField label="Experience" val={candidate?.experience || "3.5 Years"} />
          <ProfileField label="Current Location" val="Hyderabad, India" />
          <ProfileField label="Notice Period" val="Immediate" />
        </div>
        <div style={{ marginTop: 40 }}>
          <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16 }}>About Me</h4>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
            Passionate software developer with expertise in React, Node.js, and Cloud Infrastructure. 
            Looking for opportunities to build scalable digital solutions and contribute to innovative teams.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, val }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 15, color: '#1E293B', fontWeight: 700 }}>{val}</div>
    </div>
  );
}

/* ── Placeholder Modules ─────────────────────────────────── */
function JobsModule() { return <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px solid #E2E8F0' }}><Search size={48} color="#CBD5E1" /><h3 style={{ marginTop: 20 }}>Explore Opportunities</h3><p style={{ color: '#64748B' }}>Personalized job recommendations coming soon.</p></div>; }
function MessagesModule() { return <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px solid #E2E8F0' }}><Mail size={48} color="#CBD5E1" /><h3 style={{ marginTop: 20 }}>Inbox</h3><p style={{ color: '#64748B' }}>Connect with HR and Hiring Managers directly here.</p></div>; }
function DocumentsModule() { return <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px solid #E2E8F0' }}><FileText size={48} color="#CBD5E1" /><h3 style={{ marginTop: 20 }}>Document Vault</h3><p style={{ color: '#64748B' }}>Securely store your certifications, IDs and payslips.</p></div>; }
function SettingsModule() { return <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px solid #E2E8F0' }}><Settings size={48} color="#CBD5E1" /><h3 style={{ marginTop: 20 }}>Account Security</h3><p style={{ color: '#64748B' }}>Manage your password, 2FA and privacy settings.</p></div>; }
