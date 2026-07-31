import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit, Check, ChevronDown, ShieldAlert } from 'lucide-react';

const STATUS_OPTIONS = [
  { id: 'Backlog', label: 'Backlog', bg: 'rgba(100, 116, 139, 0.15)', color: '#94A3B8', border: '1px solid rgba(100, 116, 139, 0.35)', dot: '#64748B' },
  { id: 'Todo', label: 'Todo', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', border: '1px solid rgba(245, 158, 11, 0.35)', dot: '#F59E0B' },
  { id: 'Ready', label: 'Ready', bg: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', border: '1px solid rgba(168, 85, 247, 0.35)', dot: '#A855F7' },
  { id: 'In Progress', label: 'In Progress', bg: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8', border: '1px solid rgba(14, 165, 233, 0.35)', dot: '#0EA5E9' },
  { id: 'In Review', label: 'In Review', bg: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8', border: '1px solid rgba(14, 165, 233, 0.35)', dot: '#0EA5E9' },
  { id: 'Testing', label: 'Testing', bg: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', border: '1px solid rgba(168, 85, 247, 0.35)', dot: '#A855F7' },
  { id: 'Done', label: 'Done', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.35)', dot: '#10B981' },
];

export default function TaskListView({ tasks = [], onOpenTask, onCreateTask, onDeleteTask, onStatusChange }) {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTasks = tasks.filter(t =>
    (t.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.task_key || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.assignee || '').toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTasks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTasks.map(t => t.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStatusStyle = (status) => {
    return STATUS_OPTIONS.find(s => s.id === status) || STATUS_OPTIONS[1];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search & Bulk Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0F172A',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '14px 18px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, maxWidth: 320, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '6px 12px' }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Filter list view by key or summary..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: 13, outline: 'none', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                selectedIds.forEach(id => onDeleteTask && onDeleteTask(id));
                setSelectedIds([]);
              }}
              style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Trash2 size={14} /> Delete Selected ({selectedIds.length})
            </button>
          )}

          <button
            onClick={onCreateTask}
            style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* Task List Table */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        overflow: 'visible',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#94A3B8', whiteSpace: 'nowrap' }}>
              <th style={{ padding: '14px 16px', width: 40 }}>
                <input type="checkbox" checked={selectedIds.length === filteredTasks.length && filteredTasks.length > 0} onChange={toggleSelectAll} />
              </th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Key</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Task Summary</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Status</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Priority</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Assignee</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>SP</th>
              <th style={{ padding: '14px 16px', fontWeight: 800 }}>Due Date</th>
              <th style={{ padding: '14px 16px', fontWeight: 800, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t, idx) => {
              const currentStatus = t.status || 'Todo';
              const statusStyle = getStatusStyle(currentStatus);
              const isMenuOpen = activeMenuId === t.id;

              return (
                <tr
                  key={t.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    transition: 'background 0.2s',
                    position: 'relative'
                  }}
                >
                  <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                    <input type="checkbox" checked={selectedIds.includes(t.id)} onChange={() => toggleSelect(t.id)} />
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#818CF8', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>{t.task_key || 'KLAN-101'}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#FFF', cursor: 'pointer', verticalAlign: 'middle', maxWidth: 350 }} onClick={() => onOpenTask && onOpenTask(t)}>
                    <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                      {t.title}
                    </div>
                  </td>
                  
                  {/* Custom Glassmorphism Floating Popover Status Cell */}
                  <td style={{ padding: '14px 16px', position: 'relative', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                    <button
                      onClick={() => setActiveMenuId(isMenuOpen ? null : t.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: statusStyle.bg,
                        border: statusStyle.border,
                        borderRadius: 10,
                        padding: '6px 12px',
                        color: statusStyle.color,
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusStyle.dot }} />
                      {statusStyle.label}
                      <ChevronDown size={13} style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </button>

                    {/* Popover Menu Dropdown */}
                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.div
                          ref={menuRef}
                          initial={{ opacity: 0, scale: 0.95, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 6 }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 16,
                            zIndex: 999,
                            minWidth: 170,
                            background: '#0F172A',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 14,
                            padding: 6,
                            boxShadow: '0 16px 40px rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(12px)'
                          }}
                        >
                          {STATUS_OPTIONS.map(opt => {
                            const isSelected = currentStatus === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  if (onStatusChange) onStatusChange(t.id, opt.id);
                                  setActiveMenuId(null);
                                }}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '8px 12px',
                                  borderRadius: 8,
                                  background: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent',
                                  color: opt.color,
                                  fontSize: 12,
                                  fontWeight: 800,
                                  border: 'none',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'background 0.15s'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: opt.dot }} />
                                  {opt.label}
                                </div>
                                {isSelected && <Check size={14} color={opt.color} />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>

                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: t.priority === 'Highest' || t.priority === 'High' ? '#EF4444' : '#38BDF8', background: 'rgba(255,255,255,0.05)', padding: '3px 9px', borderRadius: 8 }}>
                      {t.priority || 'Medium'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#CBD5E1', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'middle' }}>{t.assignee || 'Unassigned'}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#A78BFA', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>{t.story_points || 3} SP</td>
                  <td style={{ padding: '14px 16px', color: '#94A3B8', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>{t.due_date || '2026-08-15'}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button onClick={() => onOpenTask && onOpenTask(t)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: 6, borderRadius: 8, cursor: 'pointer' }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => onDeleteTask && onDeleteTask(t.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#EF4444', padding: 6, borderRadius: 8, cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
