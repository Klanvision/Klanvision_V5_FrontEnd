import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Send, CheckCircle2, Clock, Calendar, User, Tag, Layers,
  Trash2, MessageSquare, Play, Pause, AlertCircle, Plus, CheckSquare
} from 'lucide-react';

export default function TaskDetailModal({ currentUser, users = [], task, onClose, onUpdate, onDelete }) {
  if (!task) return null;

  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || 'Todo');
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const defaultUserList = users.length > 0 ? users : [
    { id: 1, name: 'Alex Morgan', role: 'Super Admin' },
    { id: 2, name: 'Sarah Tech Lead', role: 'Team Lead' },
    { id: 3, name: 'David Backend', role: 'Backend Engineer' },
    { id: 4, name: 'Elena Designer', role: 'UI/UX Designer' },
  ];

  const initialAssignees = Array.isArray(task.assignees) && task.assignees.length > 0
    ? task.assignees
    : (task.assignee ? task.assignee.split(',').map(a => a.trim()) : ['Unassigned']);

  const [selectedAssignees, setSelectedAssignees] = useState(initialAssignees);
  const [dueDate, setDueDate] = useState(task.due_date || '2026-08-15');
  const [storyPoints, setStoryPoints] = useState(task.story_points || 3);

  const toggleAssignee = (memberName) => {
    setSelectedAssignees(prev =>
      prev.includes(memberName)
        ? prev.filter(name => name !== memberName)
        : [...prev, memberName]
    );
  };
  
  // Comments state
  const [comments, setComments] = useState(task.comments || [
    { id: 1, author: 'Alex Morgan', avatar: 'A', text: 'Started investigating the issue. PR draft will be linked shortly.', time: '2 hours ago' },
    { id: 2, author: 'Sarah Tech Lead', avatar: 'S', text: 'Please ensure we write unit tests for edge cases.', time: '1 hour ago' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Checklist state
  const [checklist, setChecklist] = useState(task.checklist || [
    { id: 1, text: 'Review core architecture specs', done: true },
    { id: 2, text: 'Implement database persistence handlers', done: true },
    { id: 3, text: 'Run regression tests on staging', done: false }
  ]);
  const [newCheckitem, setNewCheckitem] = useState('');

  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loggedMinutes, setLoggedMinutes] = useState(140);

  const handleSave = () => {
    const finalAssignees = selectedAssignees.length > 0 ? selectedAssignees : ['Unassigned'];

    onUpdate({
      ...task,
      title,
      description,
      status,
      priority,
      assignees: finalAssignees,
      assignee: finalAssignees.join(', '),
      due_date: dueDate,
      story_points: Number(storyPoints),
      comments,
      checklist,
      actual_hours: Math.round(loggedMinutes / 60)
    });
    onClose();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const authorName = currentUser?.name || currentUser?.email || 'Admin User';
    const commentObj = {
      id: Date.now(),
      author: authorName,
      avatar: authorName.charAt(0).toUpperCase(),
      text: newCommentText,
      time: 'Just now'
    };
    setComments(prev => [...prev, commentObj]);
    setNewCommentText('');
  };

  const toggleCheckitem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleAddCheckitem = (e) => {
    e.preventDefault();
    if (!newCheckitem.trim()) return;
    setChecklist(prev => [...prev, { id: Date.now(), text: newCheckitem, done: false }]);
    setNewCheckitem('');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(2, 6, 23, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', justifyContent: 'flex-end'
    }}>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        style={{
          width: '100%',
          maxWidth: 820,
          height: '100%',
          background: '#1E293B',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.7)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0F172A'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#818CF8', background: 'rgba(99,102,241,0.15)', padding: '4px 10px', borderRadius: 8 }}>
              {task.task_key || 'KLAN-101'}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>{task.project_name || 'Klanvision V5'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => onDelete && onDelete(task.id)} style={{ background: 'rgba(239,68,68,0.15)', border: 'none', color: '#EF4444', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Trash2 size={14} /> Delete
            </button>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#FFF', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ fontSize: 20, fontWeight: 800, color: '#FFF', background: 'transparent', border: 'none', borderBottom: '1px dashed rgba(255,255,255,0.15)', outline: 'none', paddingBottom: 6 }}
          />

          {/* Quick Properties Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>STATUS</span>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ background: '#0F172A', color: '#38BDF8', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, width: '100%' }}>
                <option value="Backlog">Backlog</option>
                <option value="Todo">Todo</option>
                <option value="Ready">Ready</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Testing">Testing</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>PRIORITY</span>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ background: '#0F172A', color: '#F59E0B', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, width: '100%' }}>
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>ASSIGNED MEMBERS ({selectedAssignees.length})</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, background: '#0F172A', padding: 6, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                {defaultUserList.map(u => {
                  const uName = u.name || u.email;
                  const isSelected = selectedAssignees.includes(uName);
                  return (
                    <button
                      key={u.id || uName}
                      type="button"
                      onClick={() => toggleAssignee(uName)}
                      style={{
                        background: isSelected ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'rgba(255,255,255,0.03)',
                        color: isSelected ? '#FFF' : '#94A3B8',
                        border: 'none',
                        borderRadius: 6,
                        padding: '3px 7px',
                        fontSize: 10,
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '}{uName.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>STORY POINTS</span>
              <input type="number" value={storyPoints} onChange={e => setStoryPoints(e.target.value)} style={{ background: '#0F172A', color: '#A78BFA', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 800, width: '100%' }} />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>Task Description</h4>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add rich details, specs, or acceptance criteria..."
              style={{ width: '100%', background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, color: '#F1F5F9', fontSize: 13, outline: 'none' }}
            />
          </div>

          {/* Checklist */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckSquare size={16} color="#34D399" /> Subtasks Checklist
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {checklist.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 10 }}>
                  <input type="checkbox" checked={item.done} onChange={() => toggleCheckitem(item.id)} />
                  <span style={{ fontSize: 13, color: item.done ? '#64748B' : '#E2E8F0', textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
                </div>
              ))}
              <form onSubmit={handleAddCheckitem} style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <input type="text" placeholder="Add subtask..." value={newCheckitem} onChange={e => setNewCheckitem(e.target.value)} style={{ flex: 1, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 12, padding: '8px 14px', borderRadius: 10, outline: 'none' }} />
                <button type="submit" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Add</button>
              </form>
            </div>
          </div>

          {/* Time Tracking Widget */}
          <div style={{ background: '#0F172A', border: '1px solid rgba(99,102,241,0.2)', padding: 18, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Clock size={20} color="#818CF8" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>Time Logged: {Math.floor(loggedMinutes / 60)}h {loggedMinutes % 60}m</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Estimated: {task.estimated_hours || 8}h</div>
              </div>
            </div>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              style={{ background: isTimerRunning ? '#EF4444' : '#10B981', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>

          {/* Comments Discussion Thread */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 800, color: '#FFF', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageSquare size={16} color="#818CF8" /> Discussion & Collaboration ({comments.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: 12, background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)', padding: 14, borderRadius: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                    {c.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#FFF' }}>{c.author}</span>
                      <span style={{ fontSize: 10, color: '#64748B' }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#CBD5E1', margin: '4px 0 0', lineHeight: 1.5 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 10 }}>
              <input
                type="text"
                placeholder="Write a comment (@mention teammate)..."
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                style={{ flex: 1, background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: 13, padding: '10px 14px', borderRadius: 10, outline: 'none' }}
              />
              <button type="submit" style={{ background: '#6366F1', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: 10, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Send size={14} /> Comment
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: 'rgba(255,255,255,0.01)' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '10px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#FFF', border: 'none', padding: '10px 22px', borderRadius: 10, fontWeight: 800, cursor: 'pointer' }}>
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
