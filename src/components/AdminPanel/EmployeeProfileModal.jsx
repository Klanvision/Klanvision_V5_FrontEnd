import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Camera, User, Mail, Phone, Briefcase, Building, MapPin, Calendar,
  ShieldCheck, Lock, Upload, Save, CheckCircle2, Sparkles, Key
} from 'lucide-react';

export default function EmployeeProfileModal({ employee, onSave, onClose }) {
  if (!employee) return null;

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: employee.id || Date.now(),
    name: employee.name || '',
    email: employee.email || '',
    phone: employee.phone || '+1 (555) 234-5678',
    role: employee.role || 'Software Engineer',
    department: employee.department || 'Engineering',
    employeeId: employee.employeeId || `EMP-2026-${String(employee.id || 101).padStart(3, '0')}`,
    location: employee.location || 'New York, USA (Remote)',
    joiningDate: employee.joiningDate || '2025-01-15',
    avatar: employee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name || 'Employee')}&background=6366F1&color=fff`,
    isAuthorized: employee.isAuthorized ?? true,
    password: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(formData.avatar);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle local image file upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            width: '100%',
            maxWidth: 680,
            maxHeight: '90vh',
            background: '#1E293B',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
          }}
        >
          {/* Top Modal Header Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            padding: '24px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={22} color="#818CF8" /> Employee Profile Settings
              </h3>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Update personal details, profile picture, and access credentials</p>
            </div>

            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#FFF', padding: 8, borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Profile Avatar Upload Section */}
            <div style={{
              background: '#0F172A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 20
            }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={avatarPreview}
                  alt="Profile Avatar"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #6366F1',
                    boxShadow: '0 8px 24px rgba(99,102,241,0.35)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    position: 'absolute',
                    bottom: 0, right: 0,
                    width: 32, height: 32,
                    borderRadius: '50%',
                    background: '#6366F1',
                    border: '2px solid #0F172A',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}
                  title="Upload Profile Picture"
                >
                  <Camera size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>

              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0 }}>Employee Profile Picture</h4>
                <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 12px' }}>Supports JPG, PNG, WEBP. Click camera icon or button below to change profile photo.</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#818CF8',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <Upload size={14} /> Upload New Photo
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DESIGNATION / ROLE</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DEPARTMENT</label>
                <div style={{ position: 'relative' }}>
                  <Building size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>PHONE NUMBER</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>LOCATION</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, fontWeight: 700, outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', gap: 12, pt: 10 }}>
              <button
                type="button"
                onClick={onClose}
                style={{ flex: 1, padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: 14,
                  borderRadius: 14,
                  background: saveSuccess ? '#10B981' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
                  border: 'none',
                  color: '#FFF',
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
                  transition: 'all 0.2s'
                }}
              >
                {saveSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {saveSuccess ? 'Profile Saved Successfully!' : 'Save Employee Profile'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
