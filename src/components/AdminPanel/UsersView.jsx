import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Shield, ShieldCheck, Eye, EyeOff, Check, X, UserPlus, Edit2, Trash2, Lock, CheckCircle2, Camera } from 'lucide-react';
import { NoResults, normalizePermission } from './SharedComponents';
import EmployeeProfileModal from './EmployeeProfileModal';

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
    } else if (newRole === 'Team Lead') {
      presetPerms = [
        'Dashboard:Read', 'Dashboard:Write',
        'Projects:Read', 'Projects:Write',
        'Users:Read', 'Users:Write',
        'Exams:Read', 'Exams:Write',
        'Activity Log:Read'
      ];
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
          <option value="Team Lead">Team Lead (Team & Project Management)</option>
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

export default function UsersView({ users, currentUser, onAddClick, onEditClick, onDeleteClick, onToggleAccess, searchQuery, roleFilter, canEdit, onSaveUser }) {
  const [expandedUserPerms, setExpandedUserPerms] = useState({});
  const [activeProfileUser, setActiveProfileUser] = useState(null);

  const toggleExpandPerms = (userId) => {
    setExpandedUserPerms(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const isSelfOrAdmin = (targetUser) => {
    if (!targetUser) return false;
    const role = (currentUser?.role || '').toLowerCase();
    if (role.includes('super admin') || role.includes('admin') || role === 'team lead' || role === 'tl') return true;

    const currEmail = (currentUser?.email || '').toLowerCase();
    const currUsername = (currentUser?.username || '').toLowerCase();
    const currName = (currentUser?.name || '').toLowerCase();
    const targEmail = (targetUser.email || '').toLowerCase();
    const targUsername = (targetUser.username || '').toLowerCase();
    const targName = (targetUser.name || '').toLowerCase();

    return (currEmail && currEmail === targEmail)
      || (currUsername && currUsername === targUsername)
      || (currName && currName === targName)
      || (currentUser?.id !== undefined && currentUser.id === targetUser.id);
  };

  const handleOpenProfileModal = (targetUser) => {
    if (isSelfOrAdmin(targetUser)) {
      setActiveProfileUser(targetUser);
    } else {
      alert(`Permission Alert: You can only edit your own profile picture and details. (Logged in as ${currentUser?.name || 'Employee'})`);
    }
  };

  const filteredUsers = users.filter((u) => {
    const nameStr = (u.name || u.username || '').toLowerCase();
    const emailStr = (u.email || '').toLowerCase();
    const roleStr = (u.role || '').toLowerCase();
    const usernameStr = (u.username || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || nameStr.includes(q) || emailStr.includes(q) || roleStr.includes(q) || usernameStr.includes(q);
    const matchesRole = roleFilter === 'All' || roleStr === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    const r = (role || '').toLowerCase();
    if (r.includes('super admin')) return '#8B5CF6';
    if (r.includes('admin')) return '#6366F1';
    if (r.includes('team lead') || r === 'tl') return '#F59E0B';
    if (r.includes('developer')) return '#06B6D4';
    if (r.includes('editor')) return '#F59E0B';
    if (r.includes('viewer')) return '#64748B';
    return '#10B981'; // Custom Role
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44 }}>
        <div>
          <h2 className="admin-section-title">Employees Directory</h2>
          <p className="admin-section-subtitle">Manage company employees, system role permissions, and access controls.</p>
        </div>
        {canEdit && (
          <button onClick={onAddClick} className="btn-primary" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16 }}>
            <UserPlus size={22} /> Add Employee
          </button>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : (
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8', fontSize: 12, fontWeight: 800 }}>
                <th style={{ padding: '16px 20px' }}>EMPLOYEE DETAILS</th>
                <th style={{ padding: '16px 20px' }}>SYSTEM ROLE</th>
                <th style={{ padding: '16px 20px' }}>AUTHORIZED PERMISSIONS</th>
                <th style={{ padding: '16px 20px' }}>STATUS & ACCESS</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const roleColor = getRoleColor(user.role);
                const displayName = user.name || user.username || user.email?.split('@')[0] || 'Employee';
                const isAuth = (user.isAuthorized !== undefined) ? Boolean(user.isAuthorized) : (user.status !== 'Disabled' && user.status !== 'Locked');
                const userPerms = (user.permissions && user.permissions.length > 0)
                  ? user.permissions
                  : (user.role === 'Super Admin' || user.role === 'Admin')
                    ? ['Dashboard:Write', 'Projects:Write', 'Users:Write', 'Blogs:Write', 'Settings:Write', 'Activity Log:Write', 'Exams:Write', 'Certification:Write']
                    : ['Dashboard:Read', 'Projects:Read'];

                return (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.15s' }}>
                    {/* Employee Avatar & Name */}
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleOpenProfileModal(user)}>
                          <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6366F1&color=fff`}
                            style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: isSelfOrAdmin(user) ? '2px solid #6366F1' : '2px solid rgba(255,255,255,0.1)' }}
                          />
                          {isSelfOrAdmin(user) && (
                            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                              <Camera size={10} />
                            </div>
                          )}
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => handleOpenProfileModal(user)}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {displayName}
                            {(currentUser?.email?.toLowerCase() === user.email?.toLowerCase() || currentUser?.name?.toLowerCase() === displayName.toLowerCase() || currentUser?.username?.toLowerCase() === user.username?.toLowerCase()) && (
                              <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: 4 }}>You</span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: '#94A3B8' }}>{user.email || user.username || 'employee@klanvision.com'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: roleColor, background: `${roleColor}18`, padding: '4px 12px', borderRadius: 8, border: `1px solid ${roleColor}33` }}>
                        {user.role || 'Member'}
                      </span>
                    </td>

                    {/* Permissions */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 360 }}>
                        {userPerms.length > 0 ? (
                          (expandedUserPerms[user.id] ? userPerms : userPerms.slice(0, 3)).map(p => {
                            const norm = normalizePermission(p);
                            const isWrite = norm.endsWith(':Write');
                            const modName = norm.replace(':Write', '').replace(':Read', '');
                            return (
                              <span key={p} style={{ fontSize: 11, fontWeight: 800, color: isWrite ? '#34D399' : '#818CF8', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)' }}>
                                {modName} {isWrite ? '(W)' : '(R)'}
                              </span>
                            );
                          })
                        ) : (
                          <span style={{ fontSize: 11, color: '#64748B' }}>Standard Access</span>
                        )}
                        {userPerms.length > 3 && (
                          <button
                            type="button"
                            onClick={() => toggleExpandPerms(user.id)}
                            style={{
                              background: expandedUserPerms[user.id] ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.15)',
                              border: expandedUserPerms[user.id] ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(99,102,241,0.3)',
                              color: expandedUserPerms[user.id] ? '#F87171' : '#818CF8',
                              fontSize: 11,
                              fontWeight: 800,
                              padding: '3px 10px',
                              borderRadius: 6,
                              cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                          >
                            {expandedUserPerms[user.id] ? 'Show Less' : `+${userPerms.length - 3} More`}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Status & Security */}
                    <td style={{ padding: '16px 20px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {isAuth ? (
                          <span style={{ color: '#10B981', fontSize: 11, fontWeight: 800, background: 'rgba(16,185,129,0.12)', padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ShieldCheck size={12} /> SECURE
                          </span>
                        ) : (
                          <span style={{ color: '#EF4444', fontSize: 11, fontWeight: 800, background: 'rgba(239,68,68,0.12)', padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <X size={12} /> LOCKED
                          </span>
                        )}

                        <div
                          onClick={() => canEdit && onToggleAccess && onToggleAccess(user)}
                          style={{
                            width: 34, height: 18, borderRadius: 20, background: isAuth ? '#6366F1' : 'rgba(255,255,255,0.1)',
                            position: 'relative', cursor: canEdit ? 'pointer' : 'not-allowed', transition: '0.3s', display: 'inline-block'
                          }}
                        >
                          <motion.div animate={{ x: user.isAuthorized ? 18 : 2 }} style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 2 }} />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {canEdit && (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          {(currentUser?.role?.toLowerCase().includes('admin') || currentUser?.role?.toLowerCase() === 'team lead' || currentUser?.role?.toLowerCase() === 'tl') && (
                            <button onClick={() => onEditClick(user)} style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#FBBF24', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Shield size={13} /> Manage Access
                            </button>
                          )}
                          <button onClick={() => handleOpenProfileModal(user)} style={{ background: isSelfOrAdmin(user) ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)', border: isSelfOrAdmin(user) ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)', color: isSelfOrAdmin(user) ? '#818CF8' : '#94A3B8', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Edit2 size={13} /> Edit Profile
                          </button>
                          <button onClick={() => onDeleteClick(user.id)} style={{ background: 'rgba(239,68,68,0.12)', border: 'none', color: '#EF4444', padding: '6px 10px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Employee Profile & Picture Upload Modal ── */}
      {activeProfileUser && (
        <EmployeeProfileModal
          employee={activeProfileUser}
          onClose={() => setActiveProfileUser(null)}
          onSave={(updatedProfile) => {
            onEditClick && onEditClick(updatedProfile);
            onSaveUser && onSaveUser(updatedProfile);
          }}
        />
      )}
    </motion.div>
  );
}
