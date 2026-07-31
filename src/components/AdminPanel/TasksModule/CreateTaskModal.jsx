import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Layers, User, Calendar, BookOpen, Bug, Flame, Zap } from 'lucide-react';

export default function CreateTaskModal({ currentUser, projects = [], users = [], onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('Story');
  const [priority, setPriority] = useState('Medium');
  
  const defaultUserList = users.length > 0 ? users : [
    { id: 1, name: 'Alex Morgan', role: 'Super Admin' },
    { id: 2, name: 'Sarah Tech Lead', role: 'Team Lead' },
    { id: 3, name: 'David Backend', role: 'Backend Engineer' },
    { id: 4, name: 'Elena Designer', role: 'UI/UX Designer' },
  ];

  const [selectedAssignees, setSelectedAssignees] = useState([defaultUserList[0]?.name || 'Sarah Tech Lead']);
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj_1');
  const [storyPoints, setStoryPoints] = useState(3);
  const [dueDate, setDueDate] = useState('2026-08-20');

  const toggleAssignee = (memberName) => {
    setSelectedAssignees(prev =>
      prev.includes(memberName)
        ? prev.filter(name => name !== memberName)
        : [...prev, memberName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedProj = projects.find(p => p.id === projectId);
    const finalAssignees = selectedAssignees.length > 0 ? selectedAssignees : ['Unassigned'];

    onCreate({
      title,
      description,
      task_type: taskType,
      priority,
      status: 'Todo',
      assignees: finalAssignees,
      assignee: finalAssignees.join(', '),
      project_id: projectId,
      project_name: selectedProj ? selectedProj.title || selectedProj.name : 'Klanvision V5',
      story_points: Number(storyPoints),
      due_date: dueDate,
      reporter: currentUser?.name || currentUser?.email || 'Admin User'
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(2, 6, 23, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        style={{
          width: '100%',
          maxWidth: 600,
          background: '#1E293B',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 24,
          boxShadow: '0 30px 60px rgba(0,0,0,0.7)',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: 0 }}>Create Employee Task</h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', width: 32, height: 32, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16, background: '#1E293B' }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>TASK SUMMARY / TITLE *</label>
            <input
              type="text"
              required
              placeholder="e.g. Build authentication state sync module..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', padding: '10px 14px', borderRadius: 10, outline: 'none', fontSize: 14 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>PROJECT</label>
            <select
              value={projectId}
              onChange={e => setProjectId(e.target.value)}
              style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: 10, outline: 'none', fontSize: 13, fontWeight: 700 }}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title || p.name || `Project #${p.id}`}
                </option>
              ))}
              {projects.length === 0 && (
                <>
                  <option value="proj_1">Klanvision V5 Platform</option>
                  <option value="proj_2">Verification Portal</option>
                  <option value="proj_3">Cloud Infrastructure</option>
                </>
              )}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>TASK TYPE</label>
              <select value={taskType} onChange={e => setTaskType(e.target.value)} style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: 10, outline: 'none', fontSize: 13, fontWeight: 700 }}>
                <option value="Story">Story</option>
                <option value="Task">Task</option>
                <option value="Bug">Bug</option>
                <option value="Epic">Epic</option>
                <option value="Improvement">Improvement</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>PRIORITY</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0F172A', color: '#F59E0B', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: 10, outline: 'none', fontSize: 13, fontWeight: 700 }}>
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 8 }}>
              ASSIGNED EMPLOYEES / GROUPS ({selectedAssignees.length} Selected)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', padding: 12, borderRadius: 12 }}>
              {defaultUserList.map(u => {
                const uName = u.name || u.email;
                const isSelected = selectedAssignees.includes(uName);
                return (
                  <button
                    key={u.id || uName}
                    type="button"
                    onClick={() => toggleAssignee(uName)}
                    style={{
                      background: isSelected ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'rgba(255,255,255,0.04)',
                      color: isSelected ? '#FFF' : '#94A3B8',
                      border: isSelected ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ cursor: 'pointer', accentColor: '#6366F1' }}
                    />
                    {uName} ({u.role || 'Member'})
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DESCRIPTION</label>
            <textarea
              rows={3}
              placeholder="Detailed task description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', padding: '10px 14px', borderRadius: 10, outline: 'none', fontSize: 13 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '10px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#FFF', border: 'none', padding: '10px 22px', borderRadius: 10, fontWeight: 800, cursor: 'pointer' }}>Create Task</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
