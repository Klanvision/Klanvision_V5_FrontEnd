import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Award, CheckCircle2, Clock, Calendar, Star, Trophy,
  Zap, Target, Layers, FileText, Activity, TrendingUp, CheckSquare, MessageSquare
} from 'lucide-react';

import { calculateDynamicMemberPerf } from './EmployeeWorkloadView';

export default function EmployeeDetailModal({ employee, tasks = [], onClose, onOpenTask }) {
  if (!employee) return null;

  const [timeframe, setTimeframe] = useState('monthly'); // 'weekly' | 'monthly' | 'yearly'

  const targetMember = employee.rawMember || employee;
  const perf = calculateDynamicMemberPerf(targetMember, tasks, timeframe);

  const memberTasks = perf.memberTasks;
  const completedTasks = memberTasks.filter(t => t.status === 'Done' || t.status === 'Closed');
  const inProgressTasks = memberTasks.filter(t => t.status === 'In Progress' || t.status === 'In Review' || t.status === 'Testing');
  const pendingTasks = memberTasks.filter(t => t.status === 'Todo' || t.status === 'Backlog');

  const completedSP = perf.completedSP;
  const totalSP = perf.targetSP;
  const onTimeRate = perf.onTimeRate;
  const efficiencyScore = perf.efficiencyScore;
  const ratingStars = perf.stars;
  const periodLabel = perf.periodLabel;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: 'rgba(2, 6, 23, 0.8)',
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
          {/* Modal Top Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0F172A'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFF', fontWeight: 900, fontSize: 18,
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)'
              }}>
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FFF', margin: 0 }}>{employee.name}</h3>
                <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 700 }}>
                  {employee.role || 'Software Engineer'} • {employee.department || 'Engineering'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#FFF', padding: 8, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Timeframe Switcher Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0F172A', padding: '12px 18px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>Performance Timeframe:</span>
              <div style={{ display: 'flex', gap: 6, background: '#1E293B', padding: 3, borderRadius: 10 }}>
                {[
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'monthly', label: 'Monthly' },
                  { id: 'yearly', label: 'Yearly YTD' },
                ].map(t => {
                  const isActive = timeframe === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTimeframe(t.id)}
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'transparent',
                        color: isActive ? '#FFF' : '#94A3B8',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Key Stat Matrix Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <div style={{ background: '#0F172A', padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block' }}>EFFICIENCY SCORE</span>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#10B981', marginTop: 2 }}>{efficiencyScore}%</div>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>{periodLabel}</span>
              </div>

              <div style={{ background: '#0F172A', padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block' }}>STORY POINTS</span>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#A78BFA', marginTop: 2 }}>{completedSP} / {totalSP} SP</div>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Fulfillment</span>
              </div>

              <div style={{ background: '#0F172A', padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block' }}>ON-TIME DELIVERY</span>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#38BDF8', marginTop: 2 }}>{onTimeRate}%</div>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>SLA Target</span>
              </div>

              <div style={{ background: '#0F172A', padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', display: 'block' }}>VERIFIED RATING</span>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#F59E0B', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={18} fill="#F59E0B" color="#F59E0B" /> {ratingStars}
                </div>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Out of 5.0</span>
              </div>
            </div>

            {/* Individual Task Breakdown History */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Layers size={18} color="#6366F1" /> Assigned Tasks & Execution History ({memberTasks.length} Total)
                </h4>
                <div style={{ display: 'flex', gap: 8, fontSize: 11, fontWeight: 800 }}>
                  <span style={{ color: '#10B981', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: 6 }}>{completedTasks.length} Completed</span>
                  <span style={{ color: '#38BDF8', background: 'rgba(56,189,248,0.12)', padding: '2px 8px', borderRadius: 6 }}>{inProgressTasks.length} In Progress</span>
                  <span style={{ color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>{pendingTasks.length} Pending</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {memberTasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => { onClose(); onOpenTask && onOpenTask(t); }}
                    style={{
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 14,
                      padding: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#818CF8', background: 'rgba(99,102,241,0.15)', padding: '4px 8px', borderRadius: 6 }}>
                        {t.task_key || 'KLAN-101'}
                      </span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>{t.title}</div>
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                          Project: <strong style={{ color: '#94A3B8' }}>{t.project_name || 'Klanvision V5'}</strong> • Due: {t.due_date || 'Aug 20'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: t.priority === 'Highest' || t.priority === 'High' ? '#EF4444' : '#38BDF8', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 6 }}>
                        {t.priority}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#A78BFA' }}>{t.story_points || 3} SP</span>
                      <span style={{
                        fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 8,
                        background: t.status === 'Done' ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                        color: t.status === 'Done' ? '#10B981' : '#38BDF8'
                      }}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}

                {memberTasks.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 24, background: '#0F172A', borderRadius: 14, color: '#94A3B8', fontSize: 13 }}>
                    No assigned tasks found for this employee yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
