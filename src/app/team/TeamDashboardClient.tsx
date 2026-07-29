'use client'
import { useEffect, useMemo, useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

// ── Typer ─────────────────────────────────────────────────────────────────

type TeamMember = { id: string; username: string; avatar: string | null }

type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  status: 'active' | 'paused' | 'done'
  created_by: string | null
  created_at: string
}

type TaskStatus = 'todo' | 'in_progress' | 'done'
type TaskPriority = 'low' | 'normal' | 'high'

type Task = {
  id: string
  project_id: string | null
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  assignee_id: string | null
  created_by: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

type Prompt = {
  id: string
  project_id: string | null
  title: string
  content: string
  tags: string[]
  created_by: string | null
  created_at: string
}

type Activity = {
  id: string
  kind: 'note' | 'task' | 'prompt' | 'project'
  message: string
  task_id: string | null
  prompt_id: string | null
  project_id: string | null
  created_by: string | null
  created_at: string
}

type Tab = 'tasks' | 'prompts' | 'activity'

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'Att göra',
  in_progress: 'Pågår',
  done: 'Klart',
}
const STATUS_ORDER: TaskStatus[] = ['todo', 'in_progress', 'done']

const PRIORITY_LABEL: Record<TaskPriority, string> = { low: 'Låg', normal: 'Normal', high: 'Hög' }
const PRIORITY_COLOR: Record<TaskPriority, string> = { low: '#5a7a8a', normal: '#1e5c82', high: '#c0392b' }

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diffMs / 60000)
  if (min < 1) return 'just nu'
  if (min < 60) return `${min} min sedan`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} tim sedan`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d} dag${d === 1 ? '' : 'ar'} sedan`
  return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

// ── Delade stilar ─────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: 'var(--white)',
  borderRadius: 'var(--radius-inner)',
  border: '1px solid rgba(10,123,140,0.10)',
  boxShadow: 'var(--shadow-xs)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 10,
  border: '1.5px solid var(--input-border)',
  background: 'var(--input-bg)',
  fontSize: 13,
  color: 'var(--txt)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const btnPrimary: React.CSSProperties = {
  padding: '9px 16px',
  borderRadius: 10,
  border: 'none',
  background: 'var(--grad-sea)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
}

const btnGhost: React.CSSProperties = {
  padding: '9px 16px',
  borderRadius: 10,
  border: '1.5px solid var(--input-border)',
  background: 'transparent',
  color: 'var(--txt2)',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
}

// ── Huvudkomponent ──────────────────────────────────────────────────────────

export default function TeamDashboardClient({
  currentUser,
  teamMembers,
  initialProjects,
  initialTasks,
  initialPrompts,
  initialActivity,
}: {
  currentUser: { id: string; username: string }
  teamMembers: TeamMember[]
  initialProjects: Project[]
  initialTasks: Task[]
  initialPrompts: Prompt[]
  initialActivity: Activity[]
}) {
  const supabase = useMemo(() => createClient(), [])

  const [tab, setTab] = useState<Tab>('tasks')
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [activity, setActivity] = useState<Activity[]>(initialActivity)
  const [projectFilter, setProjectFilter] = useState<string | null>(null)

  const memberById = useMemo(() => {
    const m = new Map<string, TeamMember>()
    for (const t of teamMembers) m.set(t.id, t)
    return m
  }, [teamMembers])

  const projectById = useMemo(() => {
    const m = new Map<string, Project>()
    for (const p of projects) m.set(p.id, p)
    return m
  }, [projects])

  // ── Realtime — Tom och Max ser varandras ändringar direkt ────────────────
  useEffect(() => {
    const channel = supabase
      .channel('team-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_tasks' }, payload => {
        setTasks(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_prompts' }, payload => {
        setPrompts(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_projects' }, payload => {
        setProjects(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'team_activity' }, payload => {
        setActivity(prev => [payload.new as Activity, ...prev].slice(0, 100))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── CRUD: tasks ───────────────────────────────────────────────────────────
  const createTask = useCallback(async (input: {
    title: string; project_id: string | null; assignee_id: string | null
    priority: TaskPriority; due_date: string | null
  }) => {
    const { data, error } = await supabase
      .from('team_tasks')
      .insert({ ...input, created_by: currentUser.id, status: 'todo' as TaskStatus })
      .select()
      .single()
    if (!error && data) setTasks(prev => [data as Task, ...prev])
  }, [supabase, currentUser.id])

  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    await supabase.from('team_tasks').update({ status }).eq('id', id)
  }, [supabase])

  const updateTaskAssignee = useCallback(async (id: string, assignee_id: string | null) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, assignee_id } : t))
    await supabase.from('team_tasks').update({ assignee_id }).eq('id', id)
  }, [supabase])

  const deleteTask = useCallback(async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    await supabase.from('team_tasks').delete().eq('id', id)
  }, [supabase])

  // ── CRUD: prompts ─────────────────────────────────────────────────────────
  const createPrompt = useCallback(async (input: { title: string; content: string; tags: string[]; project_id: string | null }) => {
    const { data, error } = await supabase
      .from('team_prompts')
      .insert({ ...input, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) {
      setPrompts(prev => [data as Prompt, ...prev])
      await supabase.from('team_activity').insert({
        kind: 'prompt', message: `Ny prompt: ${input.title}`, prompt_id: (data as Prompt).id,
        project_id: input.project_id, created_by: currentUser.id,
      })
    }
  }, [supabase, currentUser.id])

  const deletePrompt = useCallback(async (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
    await supabase.from('team_prompts').delete().eq('id', id)
  }, [supabase])

  // ── CRUD: activity (manuell notering) ────────────────────────────────────
  const postNote = useCallback(async (message: string, project_id: string | null) => {
    const { data, error } = await supabase
      .from('team_activity')
      .insert({ kind: 'note', message, project_id, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) setActivity(prev => [data as Activity, ...prev])
  }, [supabase, currentUser.id])

  // ── CRUD: projects ────────────────────────────────────────────────────────
  const createProject = useCallback(async (input: { name: string; color: string; description: string | null }) => {
    const slug = input.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || `projekt-${Date.now()}`
    const { data, error } = await supabase
      .from('team_projects')
      .insert({ ...input, slug, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) setProjects(prev => [...prev, data as Project])
  }, [supabase, currentUser.id])

  const filteredTasks = projectFilter ? tasks.filter(t => t.project_id === projectFilter) : tasks
  const filteredPrompts = projectFilter ? prompts.filter(p => p.project_id === projectFilter) : prompts

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 100px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* ── Header ────────────────────────────────────────────────────── */}
        <Link href="/feed" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--txt3)', textDecoration: 'none', marginBottom: 16,
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
          Tillbaka till appen
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--sea)', margin: 0,
              fontFamily: 'var(--font-display), var(--font-display-fallback)',
            }}>
              Team
            </h1>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '2px 0 0' }}>
              Svalla — delad arbetsyta för Tom &amp; Max
            </p>
          </div>
          <div style={{ display: 'flex' }}>
            {teamMembers.map(m => (
              <div key={m.id} title={m.username} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--grad-sea)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, border: '2px solid var(--bg)',
                marginLeft: -8,
              }}>
                {initials(m.username)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Projekt-strip ─────────────────────────────────────────────── */}
        <ProjectStrip
          projects={projects}
          tasks={tasks}
          active={projectFilter}
          onSelect={setProjectFilter}
          onCreate={createProject}
        />

        {/* ── Tabbar ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 4, margin: '18px 0 16px', background: 'var(--surface-2)', padding: 4, borderRadius: 'var(--radius-pill)', width: 'fit-content' }}>
          {(['tasks', 'prompts', 'activity'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '8px 18px', borderRadius: 'var(--radius-pill)', border: 'none',
                background: tab === t ? 'var(--white)' : 'transparent',
                color: tab === t ? 'var(--sea)' : 'var(--txt3)',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                boxShadow: tab === t ? 'var(--shadow-xs)' : 'none',
              }}
            >
              {t === 'tasks' ? 'Uppgifter' : t === 'prompts' ? 'Promptbibliotek' : 'Aktivitet'}
            </button>
          ))}
        </div>

        {tab === 'tasks' && (
          <TasksBoard
            tasks={filteredTasks}
            projects={projects}
            projectById={projectById}
            memberById={memberById}
            teamMembers={teamMembers}
            onCreate={createTask}
            onStatusChange={updateTaskStatus}
            onAssigneeChange={updateTaskAssignee}
            onDelete={deleteTask}
          />
        )}

        {tab === 'prompts' && (
          <PromptLibrary
            prompts={filteredPrompts}
            projects={projects}
            projectById={projectById}
            onCreate={createPrompt}
            onDelete={deletePrompt}
          />
        )}

        {tab === 'activity' && (
          <ActivityFeed
            activity={activity}
            projects={projects}
            memberById={memberById}
            currentUser={currentUser}
            onPost={postNote}
          />
        )}
      </div>
    </div>
  )
}

// ── Realtime-hjälpare ────────────────────────────────────────────────────────

function applyRealtimeChange<T extends { id: string }>(
  prev: T[],
  payload: { eventType: string; new: unknown; old: unknown },
): T[] {
  if (payload.eventType === 'INSERT') {
    const row = payload.new as T
    if (prev.some(p => p.id === row.id)) return prev
    return [row, ...prev]
  }
  if (payload.eventType === 'UPDATE') {
    const row = payload.new as T
    return prev.map(p => p.id === row.id ? row : p)
  }
  if (payload.eventType === 'DELETE') {
    const row = payload.old as T
    return prev.filter(p => p.id !== row.id)
  }
  return prev
}

// ── Projekt-strip ────────────────────────────────────────────────────────────

function ProjectStrip({ projects, tasks, active, onSelect, onCreate }: {
  projects: Project[]
  tasks: Task[]
  active: string | null
  onSelect: (id: string | null) => void
  onCreate: (input: { name: string; color: string; description: string | null }) => void
}) {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#1e5c82')

  function progress(projectId: string) {
    const ts = tasks.filter(t => t.project_id === projectId)
    if (ts.length === 0) return null
    const done = ts.filter(t => t.status === 'done').length
    return { done, total: ts.length }
  }

  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
      <button
        onClick={() => onSelect(null)}
        style={{
          ...card, flexShrink: 0, padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700,
          color: active === null ? '#fff' : 'var(--txt2)',
          background: active === null ? 'var(--grad-sea)' : 'var(--white)',
          border: active === null ? 'none' : '1px solid rgba(10,123,140,0.10)',
        }}
      >
        Alla projekt
      </button>

      {projects.map(p => {
        const prog = progress(p.id)
        return (
          <button
            key={p.id}
            onClick={() => onSelect(active === p.id ? null : p.id)}
            style={{
              ...card, flexShrink: 0, padding: '10px 16px', cursor: 'pointer', textAlign: 'left',
              minWidth: 160,
              borderLeft: `4px solid ${p.color}`,
              outline: active === p.id ? `2px solid ${p.color}` : 'none',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{p.name}</div>
            {prog && (
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(prog.done / prog.total) * 100}%`, background: p.color }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 3 }}>{prog.done}/{prog.total} klara</div>
              </div>
            )}
          </button>
        )
      })}

      {adding ? (
        <div style={{ ...card, flexShrink: 0, padding: 10, display: 'flex', gap: 6, alignItems: 'center', minWidth: 260 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Projektnamn…" style={{ ...inputStyle, width: 130 }} autoFocus />
          <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 8, padding: 0, background: 'none', cursor: 'pointer' }} />
          <button
            onClick={() => { if (name.trim()) { onCreate({ name: name.trim(), color, description: null }); setName(''); setAdding(false) } }}
            style={{ ...btnPrimary, padding: '8px 12px' }}
          >
            Lägg till
          </button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} style={{ ...card, flexShrink: 0, padding: '10px 16px', cursor: 'pointer', fontSize: 13, color: 'var(--txt3)', border: '1.5px dashed rgba(10,123,140,0.25)' }}>
          + Nytt projekt
        </button>
      )}
    </div>
  )
}

// ── Uppgiftstavla ────────────────────────────────────────────────────────────

function TasksBoard({ tasks, projects, projectById, memberById, teamMembers, onCreate, onStatusChange, onAssigneeChange, onDelete }: {
  tasks: Task[]
  projects: Project[]
  projectById: Map<string, Project>
  memberById: Map<string, TeamMember>
  teamMembers: TeamMember[]
  onCreate: (input: { title: string; project_id: string | null; assignee_id: string | null; priority: TaskPriority; due_date: string | null }) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onAssigneeChange: (id: string, assignee_id: string | null) => void
  onDelete: (id: string) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [projectId, setProjectId] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('normal')
  const [dueDate, setDueDate] = useState('')

  function submit() {
    if (!title.trim()) return
    onCreate({
      title: title.trim(),
      project_id: projectId || null,
      assignee_id: assigneeId || null,
      priority,
      due_date: dueDate || null,
    })
    setTitle(''); setProjectId(''); setAssigneeId(''); setPriority('normal'); setDueDate(''); setShowForm(false)
  }

  return (
    <div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)} style={{ ...btnPrimary, marginBottom: 16 }}>+ Ny uppgift</button>
      ) : (
        <div style={{ ...card, padding: 14, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Vad ska göras?" style={inputStyle} autoFocus />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 120 }}>
              <option value="">Inget projekt</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 100 }}>
              <option value="">Ej tilldelad</option>
              {teamMembers.map(m => <option key={m.id} value={m.id}>{m.username}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 90 }}>
              <option value="low">Låg</option>
              <option value="normal">Normal</option>
              <option value="high">Hög</option>
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 130 }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} style={btnPrimary}>Skapa</button>
            <button onClick={() => setShowForm(false)} style={btnGhost}>Avbryt</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {STATUS_ORDER.map(status => (
          <div key={status}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
              {STATUS_LABEL[status]} · {tasks.filter(t => t.status === status).length}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 40 }}>
              {tasks.filter(t => t.status === status).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  project={task.project_id ? projectById.get(task.project_id) : undefined}
                  assignee={task.assignee_id ? memberById.get(task.assignee_id) : undefined}
                  teamMembers={teamMembers}
                  onStatusChange={onStatusChange}
                  onAssigneeChange={onAssigneeChange}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskCard({ task, project, assignee, teamMembers, onStatusChange, onAssigneeChange, onDelete }: {
  task: Task
  project?: Project
  assignee?: TeamMember
  teamMembers: TeamMember[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onAssigneeChange: (id: string, assignee_id: string | null) => void
  onDelete: (id: string) => void
}) {
  const overdue = task.due_date && task.status !== 'done' && new Date(task.due_date) < new Date(new Date().toDateString())
  const idx = STATUS_ORDER.indexOf(task.status)

  return (
    <div style={{ ...card, padding: 12, borderLeft: project ? `4px solid ${project.color}` : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.35 }}>{task.title}</div>
        <button onClick={() => onDelete(task.id)} title="Ta bort" style={{ background: 'none', border: 'none', color: 'var(--txt3)', cursor: 'pointer', fontSize: 14, lineHeight: 1, flexShrink: 0 }}>
          ×
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: PRIORITY_COLOR[task.priority], background: `${PRIORITY_COLOR[task.priority]}18`, padding: '2px 7px', borderRadius: 6 }}>
          {PRIORITY_LABEL[task.priority]}
        </span>
        {project && (
          <span style={{ fontSize: 10, color: 'var(--txt3)' }}>{project.name}</span>
        )}
        {task.due_date && (
          <span style={{ fontSize: 10, color: overdue ? '#c0392b' : 'var(--txt3)', fontWeight: overdue ? 700 : 400 }}>
            {overdue ? '⚠ ' : ''}{new Date(task.due_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <select
          value={task.assignee_id ?? ''}
          onChange={e => onAssigneeChange(task.id, e.target.value || null)}
          style={{ fontSize: 11, border: 'none', background: 'transparent', color: assignee ? 'var(--sea)' : 'var(--txt3)', fontWeight: 600, cursor: 'pointer' }}
        >
          <option value="">Ej tilldelad</option>
          {teamMembers.map(m => <option key={m.id} value={m.id}>{m.username}</option>)}
        </select>

        <div style={{ display: 'flex', gap: 4 }}>
          {idx > 0 && (
            <button onClick={() => onStatusChange(task.id, STATUS_ORDER[idx - 1]!)} title={`Flytta till ${STATUS_LABEL[STATUS_ORDER[idx - 1]!]}`} style={miniBtn}>←</button>
          )}
          {idx < STATUS_ORDER.length - 1 && (
            <button onClick={() => onStatusChange(task.id, STATUS_ORDER[idx + 1]!)} title={`Flytta till ${STATUS_LABEL[STATUS_ORDER[idx + 1]!]}`} style={{ ...miniBtn, background: 'var(--sea)', color: '#fff' }}>→</button>
          )}
        </div>
      </div>
    </div>
  )
}

const miniBtn: React.CSSProperties = {
  width: 24, height: 24, borderRadius: 6, border: '1px solid var(--input-border)',
  background: 'transparent', color: 'var(--txt2)', fontSize: 12, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

// ── Promptbibliotek ──────────────────────────────────────────────────────────

function PromptLibrary({ prompts, projects, projectById, onCreate, onDelete }: {
  prompts: Prompt[]
  projects: Project[]
  projectById: Map<string, Project>
  onCreate: (input: { title: string; content: string; tags: string[]; project_id: string | null }) => void
  onDelete: (id: string) => void
}) {
  const [q, setQ] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [projectId, setProjectId] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const p of prompts) for (const t of p.tags) s.add(t)
    return Array.from(s).sort()
  }, [prompts])
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const filtered = prompts.filter(p => {
    if (tagFilter && !p.tags.includes(tagFilter)) return false
    if (!q) return true
    const hay = `${p.title} ${p.content} ${p.tags.join(' ')}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  })

  async function copy(p: Prompt) {
    try {
      await navigator.clipboard.writeText(p.content)
      setCopiedId(p.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch { /* no-op */ }
  }

  function submit() {
    if (!title.trim() || !content.trim()) return
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    onCreate({ title: title.trim(), content: content.trim(), tags, project_id: projectId || null })
    setTitle(''); setContent(''); setTagsInput(''); setProjectId(''); setShowForm(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Sök promptar…" style={{ ...inputStyle, flex: 1, minWidth: 180 }} />
        <button onClick={() => setShowForm(v => !v)} style={btnPrimary}>{showForm ? 'Stäng' : '+ Ny prompt'}</button>
      </div>

      {allTags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          <button onClick={() => setTagFilter(null)} style={{ ...tagChip, background: !tagFilter ? 'var(--sea)' : 'var(--surface-2)', color: !tagFilter ? '#fff' : 'var(--txt2)' }}>Alla</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setTagFilter(t === tagFilter ? null : t)} style={{ ...tagChip, background: tagFilter === t ? 'var(--sea)' : 'var(--surface-2)', color: tagFilter === t ? '#fff' : 'var(--txt2)' }}>
              #{t}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ ...card, padding: 14, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel — t.ex. 'Faktagranska guide-utkast'" style={inputStyle} autoFocus />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Själva prompten…" rows={5} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'ui-monospace, monospace' }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="Taggar, kommaseparerat" style={{ ...inputStyle, flex: 1, minWidth: 140 }} />
            <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 140 }}>
              <option value="">Inget projekt</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} style={btnPrimary}>Spara prompt</button>
            <button onClick={() => setShowForm(false)} style={btnGhost}>Avbryt</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--txt3)', padding: '20px 0', textAlign: 'center' }}>Inga promptar än — lägg till den första.</div>
        )}
        {filtered.map(p => {
          const proj = p.project_id ? projectById.get(p.project_id) : undefined
          return (
            <div key={p.id} style={{ ...card, padding: 14, borderLeft: proj ? `4px solid ${proj.color}` : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{p.title}</div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => copy(p)} style={{ ...btnGhost, padding: '5px 10px', fontSize: 11 }}>
                    {copiedId === p.id ? 'Kopierad ✓' : 'Kopiera'}
                  </button>
                  <button onClick={() => onDelete(p.id)} title="Ta bort" style={{ background: 'none', border: 'none', color: 'var(--txt3)', cursor: 'pointer', fontSize: 16 }}>×</button>
                </div>
              </div>
              <pre style={{
                fontSize: 12, color: 'var(--txt2)', background: 'var(--surface-2)', borderRadius: 8,
                padding: '10px 12px', margin: '8px 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                fontFamily: 'ui-monospace, monospace', maxHeight: 160, overflowY: 'auto',
              }}>
                {p.content}
              </pre>
              {p.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <span key={t} style={{ ...tagChip, background: 'var(--surface-2)', color: 'var(--txt3)' }}>#{t}</span>)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const tagChip: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
}

// ── Aktivitetsflöde ──────────────────────────────────────────────────────────

function ActivityFeed({ activity, projects, memberById, currentUser, onPost }: {
  activity: Activity[]
  projects: Project[]
  memberById: Map<string, TeamMember>
  currentUser: { id: string; username: string }
  onPost: (message: string, project_id: string | null) => void
}) {
  const [message, setMessage] = useState('')
  const [projectId, setProjectId] = useState('')

  function submit() {
    if (!message.trim()) return
    onPost(message.trim(), projectId || null)
    setMessage(''); setProjectId('')
  }

  const iconFor = (kind: Activity['kind']) => {
    switch (kind) {
      case 'task': return '✓'
      case 'prompt': return '⌘'
      case 'project': return '★'
      default: return '💬'
    }
  }

  return (
    <div>
      <div style={{ ...card, padding: 12, marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          placeholder="Dela en uppdatering med Max/Tom…"
          style={{ ...inputStyle, flex: 1, minWidth: 180 }}
        />
        <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 130 }}>
          <option value="">Inget projekt</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button onClick={submit} style={btnPrimary}>Dela</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activity.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--txt3)', padding: '20px 0', textAlign: 'center' }}>Inget har hänt än.</div>
        )}
        {activity.map(a => {
          const author = a.created_by ? memberById.get(a.created_by) : undefined
          const authorName = author?.username ?? (a.created_by === currentUser.id ? currentUser.username : 'System')
          return (
            <div key={a.id} style={{ display: 'flex', gap: 10, padding: '10px 4px', borderBottom: '1px solid rgba(10,123,140,0.06)' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0,
              }}>
                {iconFor(a.kind)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--txt)' }}>{a.message}</div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
                  {authorName} · {relativeTime(a.created_at)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
