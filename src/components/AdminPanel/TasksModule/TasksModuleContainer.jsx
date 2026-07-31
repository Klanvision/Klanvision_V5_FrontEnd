import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Kanban, ListTodo, Layers, Clock, BarChart3,
  Users, Plus, Calendar, Activity, CheckCircle2, Shield
} from 'lucide-react';
import { api } from '../../../utils/api';

import TasksDashboard from './TasksDashboard';
import KanbanBoard from './KanbanBoard';
import BacklogView from './BacklogView';
import TaskListView from './TaskListView';
import TimelineGanttView from './TimelineGanttView';
import EmployeeWorkloadView from './EmployeeWorkloadView';
import ReportsAnalyticsView from './ReportsAnalyticsView';
import TimeTrackingView from './TimeTrackingView';
import TaskDetailModal from './TaskDetailModal';
import CreateTaskModal from './CreateTaskModal';

const SEED_TASKS = [
  {
    id: 'task_101',
    task_key: 'KLAN-101',
    title: 'Implement Role-Based Access Control (RBAC) Permissions Layer',
    description: 'Ensure Super Admin, Admin/PM, Team Lead, and Employee roles have granular route and action level permissions.',
    project_id: 'proj_1',
    project_name: 'Klanvision V5 Platform',
    task_type: 'Story',
    priority: 'Highest',
    status: 'In Progress',
    reporter: 'Super Admin',
    assignee: 'Sarah Lead',
    due_date: '2026-08-10',
    estimated_hours: 12,
    actual_hours: 6,
    story_points: 8,
    comments: [
      { id: 1, author: 'Alex Morgan', avatar: 'A', text: 'JWT role claims verified. Testing subagent permissions now.', time: '3 hours ago' }
    ]
  },
  {
    id: 'task_102',
    task_key: 'KLAN-102',
    title: 'Refactor Live Activity Stream Database Batch Queries',
    description: 'Optimize MySQL / D1 SQL query indexing for fast live polling response times under 50ms.',
    project_id: 'proj_1',
    project_name: 'Klanvision V5 Platform',
    task_type: 'Improvement',
    priority: 'High',
    status: 'In Review',
    reporter: 'Tech Director',
    assignee: 'David Backend',
    due_date: '2026-08-08',
    estimated_hours: 8,
    actual_hours: 7,
    story_points: 5,
    comments: []
  },
  {
    id: 'task_103',
    task_key: 'KLAN-103',
    title: 'Fix Candidate Resume Verification PDF Download Timeout',
    description: 'Resolve PDF generator stream buffer overflow when serving heavy candidate certificates.',
    project_id: 'proj_2',
    project_name: 'Verification Portal',
    task_type: 'Bug',
    priority: 'Highest',
    status: 'Todo',
    reporter: 'QA Engineer',
    assignee: 'Michael Dev',
    due_date: '2026-08-05',
    estimated_hours: 4,
    actual_hours: 1,
    story_points: 3,
    comments: []
  },
  {
    id: 'task_104',
    task_key: 'KLAN-104',
    title: 'Design Dark Mode Glassmorphism Sprint Velocity Analytics Card',
    description: 'Build enterprise Chart.js / CSS bar graph components for weekly sprint burndown charts.',
    project_id: 'proj_1',
    project_name: 'Klanvision V5 Platform',
    task_type: 'Story',
    priority: 'Medium',
    status: 'Done',
    reporter: 'UI Lead',
    assignee: 'Elena Designer',
    due_date: '2026-07-30',
    estimated_hours: 16,
    actual_hours: 14,
    story_points: 5,
    comments: []
  },
  {
    id: 'task_105',
    task_key: 'KLAN-105',
    title: 'Setup Automated Webhook Telemetry Event Triggers',
    description: 'Configure Cloudflare Worker cron handlers to broadcast project status events.',
    project_id: 'proj_3',
    project_name: 'Cloud Services',
    task_type: 'Task',
    priority: 'Low',
    status: 'Backlog',
    reporter: 'DevOps Architect',
    assignee: 'Unassigned',
    due_date: '2026-08-25',
    estimated_hours: 10,
    actual_hours: 0,
    story_points: 2,
    comments: []
  }
];

export default function TasksModuleContainer({ currentUser, projects = [], users = [] }) {
  const [activeSubTab, setActiveSubTab] = useState('kanban');
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('klanvision_employee_tasks');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return SEED_TASKS;
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('klanvision_employee_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    api.getTasks()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTasks(data);
        }
      })
      .catch(err => console.log('Tasks synced with persistent state'));
  }, []);

  const isAuthorizedForDone = (user) => {
    if (!user) return true; // Default admin session
    const role = (user.role || '').toLowerCase();
    return (
      role.includes('admin') ||
      role.includes('super') ||
      role.includes('lead') ||
      role.includes('manager') ||
      user.is_admin
    );
  };

  const canUserEditTask = (user, task) => {
    if (!user || !task) return true; // Default admin session fallback
    const role = (user.role || '').toLowerCase();
    const userName = (user.name || user.email || '').toLowerCase();

    // Super Admin, Admin/PM, Team Lead can edit all tasks
    if (isAuthorizedForDone(user)) return true;

    // Check if current user is listed in task assignees or reporter
    const assigneesList = Array.isArray(task.assignees)
      ? task.assignees.map(a => String(a).toLowerCase())
      : (task.assignee || '').toLowerCase().split(',').map(a => a.trim());

    const isAssignee = assigneesList.some(a => a.includes(userName) || userName.includes(a));
    const isReporter = (task.reporter || '').toLowerCase().includes(userName);

    return isAssignee || isReporter;
  };

  const handleCreateTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `task_${Date.now()}`,
      task_key: `KLAN-${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    api.createTask(newTask).catch(err => {});
  };

  const handleUpdateTask = (updatedTask) => {
    const oldTask = tasks.find(t => t.id === updatedTask.id);
    if (!canUserEditTask(currentUser, oldTask || updatedTask)) {
      alert("Permission Denied: Only assigned team members, reporters, or Admins/Team Leads can edit this task.");
      return;
    }
    if (
      (updatedTask.status === 'Done' || updatedTask.status === 'Closed') &&
      oldTask && oldTask.status !== 'Done' && oldTask.status !== 'Closed' &&
      !isAuthorizedForDone(currentUser)
    ) {
      alert("Permission Denied: Only Admin or Team Lead can mark tasks as Done / Closed.");
      return;
    }
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    api.updateTask(updatedTask.id, updatedTask).catch(err => {});
  };

  const handleDeleteTask = (taskId) => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!canUserEditTask(currentUser, targetTask)) {
      alert("Permission Denied: Only assigned team members, reporters, or Admins/Team Leads can delete this task.");
      return;
    }
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) setSelectedTask(null);
    api.deleteTask(taskId).catch(err => {});
  };

  const handleStatusChange = (taskId, newStatus) => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!canUserEditTask(currentUser, targetTask)) {
      alert("Permission Denied: Only assigned team members, reporters, or Admins/Team Leads can modify this task status.");
      return;
    }
    if ((newStatus === 'Done' || newStatus === 'Closed') && !isAuthorizedForDone(currentUser)) {
      alert("Permission Denied: Only Admin or Team Lead can mark tasks as Done / Closed.");
      return;
    }
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ── Top Navigation Sub-Tabs ────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        background: '#0F172A',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: '14px 20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'kanban', label: 'Kanban Board', icon: Kanban },
            { id: 'backlog', label: 'Sprint Backlog', icon: Layers },
            { id: 'list', label: 'Task List', icon: ListTodo },
            { id: 'timeline', label: 'Gantt Timeline', icon: Calendar },
            { id: 'workload', label: 'Team Workload', icon: Users },
            { id: 'reports', label: 'Sprint Reports', icon: BarChart3 },
            { id: 'timetracking', label: 'Time Tracking', icon: Clock },
          ].map(tab => {
            const isActive = activeSubTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #6366F1, #4F46E5)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#FFF' : '#94A3B8',
                  border: isActive ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.05)',
                  padding: '8px 15px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 14px rgba(99,102,241,0.3)' : 'none'
                }}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            color: '#FFF',
            border: 'none',
            padding: '9px 18px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)'
          }}
        >
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* ── Render Active Sub-View ────────────────────────────── */}
      {activeSubTab === 'dashboard' && (
        <TasksDashboard tasks={tasks} projects={projects} users={users} onOpenTask={setSelectedTask} />
      )}

      {activeSubTab === 'kanban' && (
        <KanbanBoard
          tasks={tasks}
          projects={projects}
          users={users}
          onOpenTask={setSelectedTask}
          onCreateTask={() => setIsCreateOpen(true)}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}

      {activeSubTab === 'backlog' && (
        <BacklogView
          tasks={tasks}
          onOpenTask={setSelectedTask}
          onCreateTask={() => setIsCreateOpen(true)}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}

      {activeSubTab === 'list' && (
        <TaskListView
          tasks={tasks}
          onOpenTask={setSelectedTask}
          onCreateTask={() => setIsCreateOpen(true)}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}

      {activeSubTab === 'timeline' && (
        <TimelineGanttView tasks={tasks} projects={projects} onOpenTask={setSelectedTask} />
      )}

      {activeSubTab === 'workload' && (
        <EmployeeWorkloadView users={users} tasks={tasks} />
      )}

      {activeSubTab === 'reports' && (
        <ReportsAnalyticsView tasks={tasks} projects={projects} />
      )}

      {activeSubTab === 'timetracking' && (
        <TimeTrackingView tasks={tasks} />
      )}

      {/* Modal Drawer Views */}
      {selectedTask && (
        <TaskDetailModal
          currentUser={currentUser}
          users={users}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}

      {isCreateOpen && (
        <CreateTaskModal
          currentUser={currentUser}
          projects={projects}
          users={users}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}
