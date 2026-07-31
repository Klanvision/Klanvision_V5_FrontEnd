import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flag, Clock, Layers, ChevronRight, Play } from 'lucide-react';

export default function TimelineGanttView({ tasks = [], projects = [], onOpenTask }) {
  const months = ['Aug 2026', 'Sep 2026', 'Oct 2026'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ── Gantt Chart Header ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Calendar size={20} color="#38BDF8" /> Project Timeline & Gantt Chart
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Visual schedule with milestones, critical path, and task dependencies</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '4px 10px', borderRadius: 6 }}>● Milestone On Schedule</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#EF4444', background: 'rgba(239,68,68,0.15)', padding: '4px 10px', borderRadius: 6 }}>▲ Critical Path Flagged</span>
          </div>
        </div>

        {/* Gantt Matrix Grid Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
          {/* Left Column: Tasks */}
          <div style={{ background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.08)', padding: 14, fontSize: 12, fontWeight: 800, color: '#94A3B8' }}>
            PROJECT / TASK TITLE
          </div>

          {/* Right Column: Timeline Header */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks.length}, 1fr)`, background: '#0F172A', textAlign: 'center' }}>
            {weeks.map(w => (
              <div key={w} style={{ padding: '14px 6px', fontSize: 11, fontWeight: 800, color: '#818CF8', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Timeline Bars List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 4 }}>
          {tasks.slice(0, 8).map((t, idx) => {
            const startCol = (idx % 4) + 1;
            const spanCols = (idx % 3) + 2;

            return (
              <div
                key={t.id}
                onClick={() => onOpenTask && onOpenTask(t)}
                style={{ display: 'grid', gridTemplateColumns: '250px 1fr', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ padding: '12px 14px', fontSize: 12, fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#38BDF8' }}>{t.task_key || 'KLAN-101'}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{t.title}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks.length}, 1fr)`, padding: '8px 0', position: 'relative' }}>
                  <div
                    style={{
                      gridColumn: `${startCol} / span ${spanCols}`,
                      height: 24,
                      borderRadius: 6,
                      background: idx % 2 === 0 ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'linear-gradient(135deg, #10B981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#FFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    {t.status} ({t.story_points || 3} SP)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
