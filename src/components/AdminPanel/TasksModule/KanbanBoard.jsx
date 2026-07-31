import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Plus, ChevronRight, ChevronLeft, User, Calendar,
  AlertCircle, CheckCircle2, Bookmark, Flame, Zap, Shield, Bug, BookOpen, Layers, Edit, Trash2
} from 'lucide-react';

const COLUMNS = [
  { id: 'Backlog', title: 'Backlog', color: '#64748B', badgeBg: 'rgba(100,116,139,0.15)' },
  { id: 'Todo', title: 'To Do', color: '#818CF8', badgeBg: 'rgba(99,102,241,0.15)' },
  { id: 'Ready', title: 'Ready', color: '#38BDF8', badgeBg: 'rgba(56,189,248,0.15)' },
  { id: 'In Progress', title: 'In Progress', color: '#F59E0B', badgeBg: 'rgba(245,158,11,0.15)' },
  { id: 'In Review', title: 'Review', color: '#A78BFA', badgeBg: 'rgba(167,139,250,0.15)' },
  { id: 'Testing', title: 'Testing / QA', color: '#EC4899', badgeBg: 'rgba(236,72,153,0.15)' },
  { id: 'Done', title: 'Done', color: '#10B981', badgeBg: 'rgba(16,185,129,0.15)' },
];

export default function KanbanBoard({ tasks = [], projects = [], users = [], onOpenTask, onCreateTask, onDeleteTask, onStatusChange }) {
  const [search, setSearch] = useState('');
  const [filterProject, setFilterProject] = useState('ALL');
  const [filterAssignee, setFilterAssignee] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');

  // Multi-filtering logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchSearch = !search || t.title?.toLowerCase().includes(search.toLowerCase()) || t.task_key?.toLowerCase().includes(search.toLowerCase());
      const matchProj = filterProject === 'ALL' || t.project_id === filterProject || t.project_name === filterProject;
      const matchAssign = filterAssignee === 'ALL' || t.assignee === filterAssignee;
      const matchPrio = filterPriority === 'ALL' || t.priority === filterPriority;
      const matchType = filterType === 'ALL' || t.task_type === filterType;
      return matchSearch && matchProj && matchAssign && matchPrio && matchType;
    });
  }, [tasks, search, filterProject, filterAssignee, filterPriority, filterType]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Bug': return <Bug size={14} color="#EF4444" />;
      case 'Story': return <BookOpen size={14} color="#10B981" />;
      case 'Epic': return <Layers size={14} color="#8B5CF6" />;
      case 'Improvement': return <Flame size={14} color="#F59E0B" />;
      default: return <Zap size={14} color="#38BDF8" />;
    }
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'Highest': return { label: 'Highest', bg: 'rgba(239,68,68,0.2)', color: '#EF4444' };
      case 'High': return { label: 'High', bg: 'rgba(245,158,11,0.2)', color: '#F59E0B' };
      case 'Medium': return { label: 'Medium', bg: 'rgba(56,189,248,0.2)', color: '#38BDF8' };
      default: return { label: 'Low', bg: 'rgba(100,116,139,0.2)', color: '#94A3B8' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
      {/* ── Search & Filter Controls Toolbar ────────────────── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        background: '#0F172A',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '14px 18px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
      }}>
        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 220, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '6px 12px' }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by task title or KLAN-101..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: 13, outline: 'none', width: '100%' }}
          />
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 12, fontWeight: 700, padding: '8px 12px', borderRadius: 10, outline: 'none', cursor: 'pointer' }}
          >
            <option value="ALL">All Priorities</option>
            <option value="Highest">Highest</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: 12, fontWeight: 700, padding: '8px 12px', borderRadius: 10, outline: 'none', cursor: 'pointer' }}
          >
            <option value="ALL">All Types</option>
            <option value="Story">Story</option>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Epic">Epic</option>
            <option value="Improvement">Improvement</option>
          </select>

          {/* Create Task Button */}
          <button
            onClick={onCreateTask}
            style={{
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              border: 'none',
              color: '#FFF',
              fontSize: 12,
              fontWeight: 800,
              padding: '8px 16px',
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
            }}
          >
            <Plus size={16} /> Create Task
          </button>
        </div>
      </div>

      {/* ── Kanban Board Columns Horizontal Scroll Container ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, minmax(260px, 1fr))',
        gap: 14,
        overflowX: 'auto',
        paddingBottom: 16
      }}>
        {COLUMNS.map(col => {
          const colTasks = filteredTasks.filter(t => (t.status || 'Todo') === col.id);

          return (
            <div
              key={col.id}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 260px)',
                minHeight: 450,
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}
            >
              {/* Column Header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.01)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>{col.title}</span>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: col.color,
                  background: 'rgba(255,255,255,0.05)',
                  padding: '2px 8px',
                  borderRadius: 10
                }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Column Task Cards Stream */}
              <div style={{
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                overflowY: 'auto',
                flex: 1
              }}>
                {colTasks.map(task => {
                  const prioBadge = getPriorityBadge(task.priority);

                  return (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onClick={() => onOpenTask && onOpenTask(task)}
                      style={{
                        background: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 14,
                        padding: 14,
                        cursor: 'pointer',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10
                      }}
                    >
                      {/* Card Header: Type + Key + Priority */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {getTypeIcon(task.task_type)}
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#818CF8' }}>
                            {task.task_key || 'KLAN-101'}
                          </span>
                        </div>

                        <span style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: prioBadge.color,
                          background: prioBadge.bg,
                          padding: '1px 6px',
                          borderRadius: 4
                        }}>
                          {prioBadge.label}
                        </span>
                      </div>

                      {/* Title */}
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC', lineHeight: 1.4 }}>
                        {task.title}
                      </div>

                      {/* Quick Workflow Stepper Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 4, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 10, fontWeight: 800 }}>
                            {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{task.assignee || 'Unassigned'}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, color: '#CBD5E1' }}>
                            {task.story_points || 3} SP
                          </span>

                          {/* Fast Move Status Buttons */}
                          {onStatusChange && (
                            <div style={{ display: 'flex', gap: 2 }} onClick={e => e.stopPropagation()}>
                              <button
                                title="Move Previous Status"
                                onClick={() => {
                                  const idx = COLUMNS.findIndex(c => c.id === task.status);
                                  if (idx > 0) onStatusChange(task.id, COLUMNS[idx - 1].id);
                                }}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '2px 4px', borderRadius: 4, cursor: 'pointer' }}
                              >
                                <ChevronLeft size={12} />
                              </button>
                              <button
                                title="Move Next Status"
                                onClick={() => {
                                  const idx = COLUMNS.findIndex(c => c.id === task.status);
                                  if (idx < COLUMNS.length - 1) onStatusChange(task.id, COLUMNS[idx + 1].id);
                                }}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '2px 4px', borderRadius: 4, cursor: 'pointer' }}
                              >
                                <ChevronRight size={12} />
                              </button>
                            </div>
                          )}

                          {/* Quick Edit & Delete Actions */}
                          <div style={{ display: 'flex', gap: 3 }} onClick={e => e.stopPropagation()}>
                            <button
                              title="Edit / Update Task"
                              onClick={() => onOpenTask && onOpenTask(task)}
                              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '3px 5px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                              <Edit size={11} />
                            </button>
                            <button
                              title="Delete Task"
                              onClick={() => onDeleteTask && onDeleteTask(task.id)}
                              style={{ background: 'rgba(239,68,68,0.12)', border: 'none', color: '#EF4444', padding: '3px 5px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
