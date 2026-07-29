import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Shield, ShieldCheck, Eye, EyeOff, Check, X, UserPlus, Edit2, Trash2, Lock, CheckCircle2 } from 'lucide-react';
import { NoResults, normalizePermission } from './SharedComponents';

export function UserForm({ initialData, onSave, triggerToast }) {
  const availablePermissions = [
    'Dashboard',
    'Projects',
    'Users',
    'Blogs',
    'Settings',
    'Activity Log',
    'Exams',
    'Certification'
  ];

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    role: initialData?.role || 'Viewer',
    permissions: (initialData?.permissions || []).map(normalizePermission),
    isAuthorized: initialData?.isAuthorized ?? true,
    is2FAEnabled: true
  });
  const [showPass, setShowPass] = useState(false);

  const handleRoleChange = (newRole) => {
    let presetPerms = [];
    if (newRole === 'Super Admin' || newRole === 'Admin') {
      presetPerms = availablePermissions.flatMap(m => [`${m}:Read`, `${m}:Write`]);
    } else if (newRole === 'Developer') {
      presetPerms = [
        'Dashboard:Read',
        'Projects:Read', 'Projects:Write',
        'Exams:Read', 'Exams:Write',
        'Activity Log:Read',
        'Settings:Read', 'Settings:Write'
      ];
    } else if (newRole === 'Editor') {
      presetPerms = [
        'Dashboard:Read',
        'Blogs:Read', 'Blogs:Write',
        'Projects:Read'
      ];
    } else if (newRole === 'Viewer') {
      presetPerms = availablePermissions.map(m => `${m}:Read`);
    } else if (newRole === 'Custom Role') {
      presetPerms = [...formData.permissions];
    }

    setFormData(prev => ({
      ...prev,
      role: newRole,
      permissions: presetPerms
    }));
  };

  const toggleReadPermission = (mod) => {
    const readKey = `${mod}:Read`;
    const writeKey = `${mod}:Write`;
    const legacyKey = mod;

    setFormData(prev => {
      const perms = [...prev.permissions];
      const hasRead = perms.includes(readKey) || perms.includes(legacyKey);
      const hasWrite = perms.includes(writeKey) || perms.includes(legacyKey);

      let newPerms = perms.filter(p => p !== readKey && p !== legacyKey);
      if (!hasRead) {
        newPerms.push(readKey);
        if (hasWrite) newPerms.push(writeKey);
      } else {
        // Removing Read also removes Write
        newPerms = newPerms.filter(p => p !== writeKey);
      }

      return {
        ...prev,
        role: prev.role === 'Super Admin' || prev.role === 'Admin' ? 'Custom Role' : prev.role,
        permissions: newPerms
      };
    });
  };

  const toggleWritePermission = (mod) => {
    const readKey = `${mod}:Read`;
    const writeKey = `${mod}:Write`;
    const legacyKey = mod;

    setFormData(prev => {
      const perms = [...prev.permissions];
      const hasWrite = perms.includes(writeKey) || perms.includes(legacyKey);

      let newPerms = perms.filter(p => p !== writeKey && p !== legacyKey);
      if (!hasWrite) {
        newPerms.push(writeKey);
        // Granting Write automatically grants Read
        if (!newPerms.includes(readKey)) {
          newPerms.push(readKey);
        }
      }

      return {
        ...prev,
        role: prev.role === 'Super Admin' || prev.role === 'Admin' ? 'Custom Role' : prev.role,
        permissions: newPerms
      };
    });
  };

  const handleGrantAllRead = () => {
    setFormData(prev => ({
      ...prev,
      permissions: Array.from(new Set([...prev.permissions, ...availablePermissions.map(m => `${m}:Read`)]))
    }));
  };

  const handleGrantAllWrite = () => {
    setFormData(prev => ({
      ...prev,
      permissions: availablePermissions.flatMap(m => [`${m}:Read`, `${m}:Write`])
    }));
  };

  const handleDeselectAll = () => {
    setFormData(prev => ({ ...prev, permissions: [] }));
  };

  const handleAction = () => {
    if (!formData.name || !formData.email) {
      triggerToast('Please provide a name and email.', 'User Directory');
      return;
    }
    onSave(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="form-group">
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>MEMBER NAME</label>
        <div style={{ position: 'relative' }}>
          <Users size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Robert Fox" style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>EMAIL ADDRESS</label>
        <div style={{ position: 'relative' }}>
          <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="robert@klanvision.com" style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>SECURITY PASSWORD</label>
        <div style={{ position: 'relative' }}>
          <Shield size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input type={showPass ? "text" : "password"} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••••••" style={{ width: '100%', padding: '14px 48px 14px 48px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}>
            {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>

      <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={18} color="#6366F1" /> Login Authorization</label>
          <div
            onClick={() => setFormData({ ...formData, isAuthorized: !formData.isAuthorized })}
            style={{
              width: 48, height: 24, borderRadius: 20, background: formData.isAuthorized ? '#6366F1' : 'rgba(255,255,255,0.1)',
              position: 'relative', cursor: 'pointer', transition: '0.3s'
            }}
          >
            <motion.div animate={{ x: formData.isAuthorized ? 26 : 4 }} style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3 }} />
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>When enabled, this member can log in using the credentials above.</p>
      </div>

      <div className="form-group">
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 10 }}>SYSTEM ROLE</label>
        <select value={formData.role} onChange={e => handleRoleChange(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 14, background: '#111827', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', cursor: 'pointer' }}>
          <option value="Super Admin">Super Admin (Full Platform Control)</option>
          <option value="Admin">Administrator (Full Access)</option>
          <option value="Developer">Developer (Technical &amp; Build Access)</option>
          <option value="Editor">Editor (Content Management)</option>
          <option value="Viewer">Viewer (Read Only Access)</option>
          <option value="Custom Role">Custom Role (Granular RBAC Matrix)</option>
        </select>
      </div>

      {/* RBAC Permission Matrix Section */}
      <div className="form-group" style={{ background: 'rgba(0,0,0,0.2)', padding: 20, borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="#818CF8" /> GRANULAR PERMISSION MATRIX
            </label>
            <p style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Configure Read and Write access per module.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={handleGrantAllRead} style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818CF8', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 8, cursor: 'pointer' }}>ALL READ</button>
            <button type="button" onClick={handleGrantAllWrite} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 8, cursor: 'pointer' }}>ALL WRITE</button>
            <button type="button" onClick={handleDeselectAll} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 8, cursor: 'pointer' }}>CLEAR</button>
          </div>
        </div>

        {/* Matrix Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {availablePermissions.map(mod => {
            const hasRead = formData.permissions.includes(`${mod}:Read`) || formData.permissions.includes(`${mod}:Write`) || formData.permissions.includes(mod);
            const hasWrite = formData.permissions.includes(`${mod}:Write`) || formData.permissions.includes(mod);

            return (
              <div
                key={mod}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>
                  {mod}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Read Checkbox */}
                  <div
                    onClick={() => toggleReadPermission(mod)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 10,
                      background: hasRead ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: hasRead ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: hasRead ? '#818CF8' : '#64748B',
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Eye size={12} /> {hasRead ? 'Read' : 'No Read'}
                  </div>

                  {/* Write Checkbox */}
                  <div
                    onClick={() => toggleWritePermission(mod)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 10,
                      background: hasWrite ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: hasWrite ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: hasWrite ? '#10B981' : '#64748B',
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Shield size={12} /> {hasWrite ? 'Write' : 'No Write'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handleAction} className="btn-primary" style={{ marginTop: 12, width: '100%', padding: 18, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <ShieldCheck size={20} /> {initialData ? 'Update Member Security' : 'Finalize Member Account'}
      </button>
    </div>
  );
}

export default function UsersView({ users, onAddClick, onEditClick, onDeleteClick, onToggleAccess, searchQuery, roleFilter, canEdit }) {
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    const r = (role || '').toLowerCase();
    if (r.includes('super admin')) return '#8B5CF6';
    if (r.includes('admin')) return '#6366F1';
    if (r.includes('developer')) return '#06B6D4';
    if (r.includes('editor')) return '#F59E0B';
    if (r.includes('viewer')) return '#64748B';
    return '#10B981'; // Custom Role
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44 }}>
        <div>
          <h2 className="admin-section-title">Team Directory</h2>
          <p className="admin-section-subtitle">Manage administrative accounts, role permissions, and access controls.</p>
        </div>
        {canEdit && (
          <button onClick={onAddClick} className="btn-primary" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16 }}>
            <UserPlus size={22} /> Add Member
          </button>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : (
        <div className="admin-grid-cards-360" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
          {filteredUsers.map((user) => {
            const roleColor = getRoleColor(user.role);

            return (
              <motion.div key={user.id} layout whileHover={{ y: -6 }} className="clay-card clay-card-interactive" style={{ padding: '32px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', borderTop: `4px solid ${roleColor}` }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: roleColor, filter: 'blur(80px)', opacity: 0.05 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
                  <div style={{ padding: 4, borderRadius: 20, background: `linear-gradient(45deg, ${roleColor}, transparent)` }}>
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=1E293B&color=fff`} style={{ width: 72, height: 72, borderRadius: 16, display: 'block' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 20, fontWeight: 900 }}>{user.name}</h4>
                    <p style={{ fontSize: 13, color: roleColor, fontWeight: 900, letterSpacing: '0.5px' }}>{(user.role || 'Member').toUpperCase()}</p>
                  </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Authorized Modules</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {user.isAuthorized ? (
                        <div style={{ color: '#10B981', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}><ShieldCheck size={12} /> SECURE</div>
                      ) : (
                        <div style={{ color: '#F87171', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}><X size={12} /> LOCKED</div>
                      )}
                      <div
                        onClick={() => canEdit && onToggleAccess && onToggleAccess(user)}
                        style={{
                          width: 36, height: 18, borderRadius: 20, background: user.isAuthorized ? '#6366F1' : 'rgba(255,255,255,0.1)',
                          position: 'relative', cursor: canEdit ? 'pointer' : 'not-allowed', transition: '0.3s', display: 'inline-block', opacity: canEdit ? 1 : 0.6
                        }}
                      >
                        <motion.div animate={{ x: user.isAuthorized ? 20 : 2 }} style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 2 }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {user.permissions && user.permissions.length > 0 ? (
                      user.permissions.map(p => {
                        const norm = normalizePermission(p);
                        const isWrite = norm.endsWith(':Write');
                        const isRead = norm.endsWith(':Read');
                        const modName = norm.replace(':Write', '').replace(':Read', '');

                        return (
                          <span
                            key={p}
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: isWrite ? '#34D399' : isRead ? '#A5B4FC' : 'white',
                              background: isWrite ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                              padding: '4px 10px',
                              borderRadius: 10,
                              border: isWrite ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            {isWrite ? <Shield size={10} /> : <Eye size={10} />}
                            {modName} {isWrite ? '(W)' : '(R)'}
                          </span>
                        );
                      })
                    ) : (
                      <span style={{ fontSize: 11, color: '#64748B', fontStyle: 'italic' }}>No modules assigned</span>
                    )}
                  </div>
                </div>

                {canEdit && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                    <button onClick={() => onEditClick(user)} style={{ flex: 1, padding: '14px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Edit2 size={16} /> Modify</button>
                    <button onClick={() => onDeleteClick(user.id)} style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#F87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={20} /></button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
