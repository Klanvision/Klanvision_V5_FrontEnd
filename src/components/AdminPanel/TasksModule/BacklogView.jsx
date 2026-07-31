import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Plus, ChevronRight, Play, CheckCircle2, Bookmark, Flame, Zap, ArrowUp, ArrowDown, Edit, Trash2 } from 'lucide-react';

export default function BacklogView({ tasks = [], onOpenTask, onCreateTask, onDeleteTask, onStatusChange }) {
  const [activeSprint, setActiveSprint] = useState('Sprint 14 (Current Active)');
  
  const sprintTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'In Review' || t.status === 'Testing' || t.status === 'Todo');
  const backlogTasks = tasks.filter(t => t.status === 'Backlog');

  const totalSprintPoints = sprintTasks.reduce((sum, t) => sum + (t.story_points || 3), 0);
  const totalBacklogPoints = backlogTasks.reduce((sum, t) => sum + (t.story_points || 3), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ── Active Sprint Planning Header ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Play size={18} color="#10B981" /> {activeSprint}
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Sprint Goal: Deliver Core Admin RBAC & Employee Tasks Module (Aug 1 - Aug 15)</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#818CF8', background: 'rgba(99,102,241,0.15)', padding: '4px 12px', borderRadius: 8 }}>
              {sprintTasks.length} Tasks ({totalSprintPoints} SP)
            </span>
            <button
              onClick={onCreateTask}
              style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Plus size={14} /> Add Story to Sprint
            </button>
          </div>
        </div>

        {/* Sprint Tasks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sprintTasks.map(t => (
            <div
              key={t.id}
              onClick={() => onOpenTask && onOpenTask(t)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#818CF8' }}>{t.task_key || 'KLAN-101'}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>{t.title}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: t.priority === 'Highest' || t.priority === 'High' ? '#EF4444' : '#38BDF8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>
                  {t.priority}
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#A78BFA' }}>{t.story_points || 3} SP</span>
                <button
                  title="Move to Backlog"
                  onClick={e => { e.stopPropagation(); onStatusChange && onStatusChange(t.id, 'Backlog'); }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                >
                  Move to Backlog ➔
                </button>
                <button
                  title="Edit Task"
                  onClick={e => { e.stopPropagation(); onOpenTask && onOpenTask(t); }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '4px 6px', borderRadius: 6, cursor: 'pointer' }}
                >
                  <Edit size={12} />
                </button>
                <button
                  title="Delete Task"
                  onClick={e => { e.stopPropagation(); onDeleteTask && onDeleteTask(t.id); }}
                  style={{ background: 'rgba(239,68,68,0.12)', border: 'none', color: '#EF4444', padding: '4px 6px', borderRadius: 6, cursor: 'pointer' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product Backlog Queue ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Layers size={18} color="#F59E0B" /> Product Backlog
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Unallocated user stories & roadmap items</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#F59E0B', background: 'rgba(245,158,11,0.15)', padding: '4px 12px', borderRadius: 8 }}>
            {backlogTasks.length} Stories ({totalBacklogPoints} SP)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {backlogTasks.map(t => (
            <div
              key={t.id}
              onClick={() => onOpenTask && onOpenTask(t)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#F59E0B' }}>{t.task_key || 'KLAN-105'}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>{t.title}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#A78BFA' }}>{t.story_points || 3} SP</span>
                <button
                  title="Move to Active Sprint"
                  onClick={e => { e.stopPropagation(); onStatusChange && onStatusChange(t.id, 'Todo'); }}
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: '#FFF', border: 'none', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                >
                  + Add to Sprint 14
                </button>
                <button
                  title="Edit Task"
                  onClick={e => { e.stopPropagation(); onOpenTask && onOpenTask(t); }}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', padding: '4px 6px', borderRadius: 6, cursor: 'pointer' }}
                >
                  <Edit size={12} />
                </button>
                <button
                  title="Delete Task"
                  onClick={e => { e.stopPropagation(); onDeleteTask && onDeleteTask(t.id); }}
                  style={{ background: 'rgba(239,68,68,0.12)', border: 'none', color: '#EF4444', padding: '4px 6px', borderRadius: 6, cursor: 'pointer' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
