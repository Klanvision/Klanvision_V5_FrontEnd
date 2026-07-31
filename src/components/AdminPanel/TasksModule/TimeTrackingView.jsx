import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, Plus, CheckCircle2, Calendar } from 'lucide-react';

export default function TimeTrackingView({ tasks = [] }) {
  const dynamicLogs = tasks.map((t, idx) => ({
    id: t.id,
    taskKey: t.task_key || `KLAN-10${idx + 1}`,
    title: t.title,
    hours: t.actual_hours || Math.round((t.story_points || 3) * 1.2),
    date: new Date(t.created_at || Date.now()).toISOString().split('T')[0],
    user: t.assignee || 'Sarah Tech Lead',
    status: t.status
  }));

  const totalHours = dynamicLogs.reduce((sum, l) => sum + Number(l.hours), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: '#1E293B',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={20} color="#34D399" /> Dynamic Time Tracking & Timesheet Logs
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0' }}>Live timesheet accumulator calculated dynamically from workspace tasks</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#34D399', background: 'rgba(16,185,129,0.15)', padding: '6px 14px', borderRadius: 10 }}>
              Total Logged: {totalHours} Hours Accumulated
            </span>
          </div>
        </div>

        {/* Dynamic Timesheet Entries Table */}
        <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0F172A', color: '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '12px 16px' }}>Task Key</th>
                <th style={{ padding: '12px 16px' }}>Summary</th>
                <th style={{ padding: '12px 16px' }}>Assigned Member</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Hours Logged</th>
              </tr>
            </thead>
            <tbody>
              {dynamicLogs.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 800, color: '#818CF8' }}>{l.taskKey}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>{l.title}</td>
                  <td style={{ padding: '12px 16px', color: '#CBD5E1' }}>{l.user}</td>
                  <td style={{ padding: '12px 16px', color: '#94A3B8' }}>{l.status}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 800, color: '#34D399' }}>{l.hours} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
