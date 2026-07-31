import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare, Clock, AlertTriangle, Layers, Users, TrendingUp,
  Calendar, Award, CheckCircle2, PlayCircle, BarChart3, Activity, ArrowUpRight,
  Trophy, Zap, Target, Palette, Star
} from 'lucide-react';
import EmployeeDetailModal from './EmployeeDetailModal';

import { calculateDynamicMemberPerf } from './EmployeeWorkloadView';

export default function TasksDashboard({ tasks = [], projects = [], users = [], onOpenTask }) {
  const [dashTimeframe, setDashTimeframe] = useState('monthly'); // 'weekly' | 'monthly' | 'yearly'
  const [inspectEmployee, setInspectEmployee] = useState(null);

  // Metric calculations
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Todo' || t.status === 'Backlog' || t.status === 'Ready').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'In Review' || t.status === 'Testing' || t.status === 'QA').length;
  const completedTasks = tasks.filter(t => t.status === 'Done' || t.status === 'Closed').length;
  const overdueTasks = tasks.filter(t => new Date(t.due_date) < new Date() && t.status !== 'Done' && t.status !== 'Closed').length;
  
  const totalProjects = projects.length || 8;
  const activeProjects = projects.filter(p => p.status === 'Active' || !p.status).length || 6;
  const completedProjects = projects.filter(p => p.status === 'Completed').length || 2;
  const teamMembers = users.length > 0 ? users : [
    { id: 1, name: 'Alex Morgan', email: 'alex@klanvision.com', role: 'Super Admin', department: 'Engineering' },
    { id: 2, name: 'Sarah Tech Lead', email: 'sarah@klanvision.com', role: 'Team Lead', department: 'Frontend Architecture' },
    { id: 3, name: 'David Backend', email: 'david@klanvision.com', role: 'Backend Engineer', department: 'Cloud Infrastructure' },
    { id: 4, name: 'Elena Designer', email: 'elena@klanvision.com', role: 'UI/UX Designer', department: 'Design System' },
  ];
  const totalEmployees = teamMembers.length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 78;

  const urgentTasks = tasks.filter(t => t.priority === 'Highest' || t.priority === 'High').slice(0, 4);
  const recentTasks = [...tasks].sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now())).slice(0, 5);

  // Dynamic performance calculations for all members
  const dynamicEmployeePerf = teamMembers.map(m => {
    const perf = calculateDynamicMemberPerf(m, tasks, dashTimeframe);
    return {
      rawMember: m,
      name: m.name,
      role: m.role || 'Member',
      score: `${perf.efficiencyScore}%`,
      rating: perf.stars,
      sp: `${perf.completedSP} / ${perf.targetSP} SP`,
      badge: perf.badge,
      icon: perf.badgeIcon,
      color: perf.badgeColor
    };
  });

  const totalCompletedSP = dynamicEmployeePerf.reduce((sum, e) => sum + parseInt(e.sp), 0);
  const avgEfficiency = Math.round(dynamicEmployeePerf.reduce((sum, e) => sum + parseInt(e.score), 0) / dynamicEmployeePerf.length);

  const currentTF = {
    label: `${dashTimeframe.toUpperCase()} Performance Overview`,
    velocity: `${totalCompletedSP} Story Points`,
    onTime: `${avgEfficiency}% On Time`,
    score: `${avgEfficiency}%`,
    employeeData: dynamicEmployeePerf
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── Top Metrics Row ────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total Tasks', val: totalTasks, sub: 'Across all projects', icon: Layers, gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#818CF8' },
          { label: 'In Progress', val: inProgressTasks, sub: 'Active sprint execution', icon: PlayCircle, gradient: 'linear-gradient(135deg, #0EA5E9, #0284C7)', color: '#38BDF8' },
          { label: 'Completed Tasks', val: completedTasks, sub: `${completionRate}% Completion Rate`, icon: CheckCircle2, gradient: 'linear-gradient(135deg, #10B981, #059669)', color: '#34D399' },
          { label: 'Overdue / Blocked', val: overdueTasks, sub: 'Requires immediate action', icon: AlertTriangle, gradient: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#F87171' },
          { label: 'Active Projects', val: `${activeProjects}/${totalProjects}`, sub: `${completedProjects} Projects Delivered`, icon: Activity, gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', color: '#A78BFA' },
          { label: 'Team Members', val: totalEmployees, sub: 'Assigned to sprints', icon: Users, gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#FBBF24' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8' }}>{m.label}</span>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: m.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <m.icon size={18} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#FFF', letterSpacing: '-0.5px' }}>{m.val}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: m.color, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ArrowUpRight size={12} />
                {m.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Middle Grid: Productivity Chart & High Priority Queue ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Productivity & Sprint Execution Progress */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0 }}>Team Performance & Velocity Throughput</h3>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Calculated weekly, monthly, and yearly task completion rates</p>
            </div>
            <div style={{ display: 'flex', gap: 6, background: '#0F172A', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { id: 'weekly', label: 'Weekly' },
                { id: 'monthly', label: 'Monthly (Active)' },
                { id: 'yearly', label: 'Yearly' },
              ].map(t => {
                const isActive = dashTimeframe === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setDashTimeframe(t.id)}
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: 8,
                      background: isActive ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'transparent',
                      color: isActive ? '#FFF' : '#94A3B8',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none'
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphical Progress Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: `${dashTimeframe.toUpperCase()} Velocity Throughput`, progress: 92, points: currentTF.velocity, color: '#10B981' },
              { label: 'On-Time Task Delivery Rate', progress: 95, points: `${currentTF.onTime} On Time`, color: '#6366F1' },
              { label: 'Overall Efficiency Fulfillment', progress: 96, points: `${currentTF.score} Rating`, color: '#0EA5E9' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>
                  <span>{s.label}</span>
                  <span style={{ color: s.color }}>{s.points} ({s.progress}%)</span>
                </div>
                <div style={{ height: 8, borderRadius: 6, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.progress}%`, background: s.color, borderRadius: 6, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Analytics Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ textTransform: 'uppercase' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>{dashTimeframe.toUpperCase()} Velocity</span>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#FFF', marginTop: 2 }}>{currentTF.velocity}</div>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>Efficiency Score</span>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#10B981', marginTop: 2 }}>{currentTF.score} Rating</div>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>On-Time Rate</span>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', marginTop: 2 }}>{currentTF.onTime}</div>
            </div>
          </div>
        </div>

        {/* Urgent & High Priority Tasks */}
        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#FFF', margin: 0 }}>High Priority Tasks</h3>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#EF4444', background: 'rgba(239,68,68,0.12)', padding: '2px 8px', borderRadius: 6 }}>{urgentTasks.length} Critical</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {urgentTasks.map(t => (
              <div
                key={t.id}
                onClick={() => onOpenTask && onOpenTask(t)}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#818CF8' }}>{t.task_key || 'KLAN-101'}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#EF4444', background: 'rgba(239,68,68,0.15)', padding: '1px 6px', borderRadius: 4 }}>{t.priority}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#64748B' }}>
                  <span>Assignee: {t.assignee || 'Unassigned'}</span>
                  <span>Due: {t.due_date || 'Today'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Employee Performance Leaderboard Section ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={20} color="#F59E0B" /> Live Employee Performance & Rating Matrix ({dashTimeframe.toUpperCase()})
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Verified velocity, efficiency scores, and completed story points per team member</p>
          </div>
          <div style={{ display: 'flex', gap: 6, background: '#0F172A', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'yearly', label: 'Yearly' },
            ].map(t => {
              const isActive = dashTimeframe === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setDashTimeframe(t.id)}
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 8,
                    background: isActive ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'transparent',
                    color: isActive ? '#FFF' : '#818CF8',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none'
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {currentTF.employeeData.map(e => (
            <div
              key={e.name}
              onClick={() => setInspectEmployee(e)}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 800, fontSize: 14 }}>
                    {e.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: '#818CF8' }}>{e.role}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 6, borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 12 }}>
                <span style={{ color: '#94A3B8' }}>Efficiency Score:</span>
                <strong style={{ color: '#10B981', fontWeight: 900 }}>{e.score}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#94A3B8' }}>{dashTimeframe.toUpperCase()} Output:</span>
                <strong style={{ color: '#A78BFA', fontWeight: 800 }}>{e.sp}</strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, color: e.color, background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {e.icon && <e.icon size={13} color={e.color} />}
                  {e.badge}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B' }}>
                  <Star size={12} fill="#F59E0B" color="#F59E0B" /> {e.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Section: Recent Activity Timeline Stream ── */}
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFF', marginBottom: 16 }}>Recent Task Stream & Audit Activity</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recentTasks.map(t => (
            <div
              key={t.id}
              onClick={() => onOpenTask && onOpenTask(t)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 800, padding: '4px 8px', borderRadius: 6, background: 'rgba(99,102,241,0.15)', color: '#818CF8' }}>{t.task_key || 'KLAN-102'}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    Reporter: <strong style={{ color: '#94A3B8' }}>{t.reporter || 'Admin'}</strong> • Assigned to: <strong style={{ color: '#94A3B8' }}>{t.assignee || 'Team Lead'}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 6, background: t.status === 'Done' ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)', color: t.status === 'Done' ? '#10B981' : '#38BDF8' }}>
                  {t.status || 'Todo'}
                </span>
                <span style={{ fontSize: 11, color: '#64748B' }}>{t.story_points || 3} SP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Individual Employee Performance Inspection Modal ── */}
      {inspectEmployee && (
        <EmployeeDetailModal
          employee={inspectEmployee}
          tasks={tasks}
          onClose={() => setInspectEmployee(null)}
          onOpenTask={onOpenTask}
        />
      )}
    </div>
  );
}
